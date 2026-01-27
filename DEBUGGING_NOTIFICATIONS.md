# 🐛 Debugging: Notificaciones no llegan al Cliente

## Problema
Las notificaciones de "nuevo producto creado" llegan al **Dashboard** pero NO al **Cliente (App)**.

## 🔍 Posibles Causas

### 1. **El socket escucha en el canal equivocado**

**Cómo funciona actualmente:**
```tsx
// El socket escucha en el canal del USID del usuario autenticado
globalSocket.on(`${currentUsid}`, (data: any) => {
  console.log('🔔 Notification received:', data);
  // ...
});
```

**El problema:**
- En el **Dashboard**: El admin está autenticado, su USID es (por ejemplo) `admin-123`
- En el **Cliente**: El usuario común está autenticado, su USID es (por ejemplo) `user-456`
- El backend envía la notificación al canal `admin-123`, pero el cliente está escuchando en `user-456`

### 2. **El usuario del cliente NO es Admin**

Las notificaciones de "producto pendiente de aprobación" probablemente se envían **solo a usuarios con rol Admin**.

Si el usuario del cliente **NO tiene rol Admin**, el backend **NO le enviará** esas notificaciones.

### 3. **El socket no está conectado en el cliente**

Verificar si el socket se conecta correctamente cuando el usuario hace login.

---

## ✅ Pasos para Debuggear

### Paso 1: Verificar conexión del socket en el Cliente

1. Abre el **Cliente (App)** en el navegador
2. Abre la **Consola de desarrollador** (F12)
3. Busca estos logs:

```
✅ ESPERADO (socket conectado):
🔌 Initial USID detected: xxx-xxx-xxx
🔌 Creating new socket connection...
🔌 Socket connected successfully!
```

```
❌ PROBLEMA (socket NO conectado):
🔌 No USID found, skipping socket connection
// O ningún log de socket
```

### Paso 2: Verificar el USID del usuario

En la consola del navegador (Cliente), ejecuta:

```javascript
// Ver el USID actual
document.cookie.split(';').find(c => c.includes('usid'))

// O desde el SessionManager
// (Si tienes acceso a la ventana global)
```

**Compara:**
- USID en el Dashboard (donde SÍ llegan las notificaciones)
- USID en el Cliente (donde NO llegan)

**¿Son iguales?**
- ✅ **Sí** → El problema está en otro lado
- ❌ **No** → El problema es que son usuarios diferentes

### Paso 3: Verificar si el usuario del Cliente es Admin

Las notificaciones de "producto pendiente" probablemente se envían solo a Admins.

**Comprueba:**
1. En el Dashboard: ¿Qué rol tiene el usuario autenticado?
2. En el Cliente: ¿Qué rol tiene el usuario autenticado?

### Paso 4: Verificar qué canal usa el backend

**Pregunta al equipo de backend:**
- ¿A qué canal envían las notificaciones de "producto creado"?
- ¿Envían al USID del usuario que creó el producto?
- ¿O envían a todos los usuarios con rol Admin?

**Posibles respuestas:**

#### Opción A: Envían al USID de cada Admin
```
Backend emite a:
- Canal: admin-usid-1
- Canal: admin-usid-2
- Canal: admin-usid-3
```

En este caso, el Cliente **SÍ debería recibir** las notificaciones si el usuario es Admin.

#### Opción B: Envían a un canal específico para Admins
```
Backend emite a:
- Canal: "admin-notifications"
```

En este caso, necesitamos **agregar un listener adicional** en el cliente:

```tsx
// Además del listener personal
globalSocket.on(`${currentUsid}`, (data) => { ... });

// Agregar listener para notificaciones de admin
if (userRole === 'admin') {
  globalSocket.on('admin-notifications', (data) => {
    console.log('🔔 Admin notification received:', data);
    // Procesar notificación
  });
}
```

---

## 🔧 Soluciones Posibles

### Solución 1: Mismo usuario en ambas apps

**Problema:** Estás usando diferentes cuentas en Dashboard vs Cliente

**Solución:**
1. Cerrar sesión en el Cliente
2. Iniciar sesión con la **misma cuenta Admin** que usas en el Dashboard
3. Probar si ahora llegan las notificaciones

### Solución 2: Agregar listener para canal de Admins

Si el backend usa un canal separado para Admins:

```tsx
// En NotificationsContext.tsx
globalSocket.on(`${currentUsid}`, (data: any) => {
  console.log('🔔 Personal notification received:', data);
  // ... procesamiento existente
});

// NUEVO: Listener para notificaciones de admin
const userRole = getUserRole(); // Obtener rol del usuario
if (userRole === 'admin' || userRole === 'ADMIN') {
  globalSocket.on('admin-notifications', (data: any) => {
    console.log('🔔 Admin notification received:', data);
    const userId = getIdFromUSID(currentUsid);
    if (userId) {
      setNotificationOnLocalStorage(userId, data);
      const newObj = objectNotification(data);
      setNotifications((prev) => {
        const exists = prev.some(
          (n) => n.title === newObj.title && n.message === newObj.message && n.date === newObj.date
        );
        if (exists) return prev;
        const next = [...prev, newObj];
        persistLocal(userId, next);
        return next;
      });
    }
  });
}
```

### Solución 3: Verificar configuración del backend

Contactar al equipo de backend y verificar:
1. ¿Cómo determinan a qué usuarios enviar la notificación?
2. ¿Usan el USID o el rol del usuario?
3. ¿Hay alguna configuración para habilitar notificaciones en el Cliente?

---

## 📊 Checklist de Verificación

- [ ] El socket se conecta correctamente en el Cliente (logs: "Socket connected successfully!")
- [ ] El USID del usuario es el mismo en Dashboard y Cliente
- [ ] El usuario del Cliente tiene rol Admin
- [ ] Las notificaciones aparecen en el localStorage del navegador: `notif-${userId}`
- [ ] El backend está enviando al canal correcto
- [ ] No hay errores en la consola del navegador

---

## 🚨 Logs a Compartir

Si el problema persiste, comparte estos logs:

**Consola del Dashboard (donde SÍ funciona):**
```
🔌 USID: xxx
🔔 Notification received: {...}
```

**Consola del Cliente (donde NO funciona):**
```
🔌 USID: yyy
// ¿Aparece algún log de notificación?
```

**localStorage del navegador:**
```javascript
// En la consola
localStorage.getItem('notif-123') // Reemplazar 123 con tu userId
```

---

## 💡 Recomendación Inmediata

**Ejecuta esto en la consola del Cliente:**

```javascript
// 1. Verificar USID
console.log('Current USID:', document.cookie.split(';').find(c => c.includes('usid')));

// 2. Verificar notificaciones en localStorage
Object.keys(localStorage).filter(k => k.startsWith('notif-')).forEach(key => {
  console.log(key, JSON.parse(localStorage.getItem(key)));
});

// 3. Verificar si el socket está conectado
// (Si tienes acceso a la instancia global)
```

Con esta información podré ayudarte a identificar el problema exacto.
