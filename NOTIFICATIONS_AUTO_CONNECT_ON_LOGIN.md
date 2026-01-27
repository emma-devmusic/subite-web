# Auto-conexión de Notificaciones después del Login

## 🎯 Problema Resuelto

Anteriormente, cuando un usuario hacía login, el sistema de notificaciones **NO** se conectaba automáticamente porque:

1. El `NotificationsProvider` se montaba **antes** del login (cuando no había `usid`)
2. El `useEffect` que inicializaba el socket se ejecutaba una sola vez (dependencias: `[]`)
3. Después del login, aunque el `usid` ya estaba disponible, el socket no se reinicializaba

## ✅ Solución Implementada

### 1. **Estado para rastrear el USID actual**
```tsx
const [currentUsid, setCurrentUsid] = useState<string | null>(null);
```

### 2. **Polling para detectar cambios en el USID**
```tsx
useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Verificar inmediatamente al montar
    const session = SessionManager.getInstance();
    const initialUsid = session.getUSID();
    if (initialUsid !== currentUsid) {
        console.log('🔌 Initial USID detected:', initialUsid);
        setCurrentUsid(initialUsid);
    }
    
    // Polling cada 2 segundos para detectar login/logout
    const interval = setInterval(() => {
        const usid = session.getUSID();
        if (usid !== currentUsid) {
            console.log('🔌 USID changed:', { from: currentUsid, to: usid });
            
            // Si cambió de tener USID a null = LOGOUT
            if (currentUsid && !usid) {
                console.log('🔌 Logout detected - cleaning up socket');
                if (globalSocket) {
                    globalSocket.disconnect();
                    globalSocket.removeAllListeners();
                    globalSocket = null;
                    isInitialized = false;
                }
                setNotifications([]); // Limpiar notificaciones
            }
            
            setCurrentUsid(usid);
        }
    }, 2000);
    
    return () => clearInterval(interval);
}, [currentUsid]);
```

### 3. **useEffect principal con dependencia en currentUsid**
```tsx
useEffect(() => {
    // ... lógica de inicialización del socket
}, [currentUsid]); // 👈 Ahora se ejecuta cuando cambia el USID
```

### 4. **Rehidratación reactiva**
```tsx
useEffect(() => {
    if (!currentUsid) return; // Esperar a tener USID
    
    const userId = getIdFromUSID(currentUsid);
    if (!userId) return;
    
    // Cargar notificaciones del localStorage
    // ...
}, [currentUsid]); // 👈 Se ejecuta al login
```

### 5. **Funciones actualizadas para usar currentUsid**
```tsx
const markAsRead = useCallback((indexOrId: number | string) => {
    setNotifications((prev) => {
        if (!currentUsid) return prev;
        const userId = getIdFromUSID(currentUsid);
        // ...
    });
}, [currentUsid, persistLocal]);
```

## 🔄 Flujo Completo

### Antes del Login:
1. `NotificationsProvider` se monta
2. `currentUsid` es `null`
3. Polling detecta que no hay USID
4. Socket **NO** se inicializa
5. Logs: `"🔌 No USID found, skipping socket connection"`

### Después del Login:
1. Usuario hace login → `SessionManager` guarda el USID
2. **Polling detecta el cambio** (máximo 2 segundos después)
3. `currentUsid` se actualiza con el nuevo USID
4. `useEffect` principal se ejecuta de nuevo (dependencia: `[currentUsid]`)
5. Socket se inicializa automáticamente
6. Logs: `"🔌 Creating new socket connection..."`
7. Logs: `"🔌 Socket connected successfully!"`
8. Notificaciones se recargan desde localStorage

### Después del Logout:
1. Usuario hace logout → `SessionManager` elimina el USID
2. **Polling detecta el cambio** (máximo 2 segundos después)
3. Detecta que cambió de `usid` a `null` → **LOGOUT**
4. Socket se desconecta automáticamente
5. `globalSocket` se limpia y se resetea
6. Notificaciones se limpian del estado
7. `currentUsid` se actualiza a `null`
8. Logs: `"🔌 Logout detected - cleaning up socket"`
9. Logs: `"🔌 USID changed: { from: 'xxx...', to: null }"`

## 📊 Ventajas

1. ✅ **Conexión automática** después del login (sin recargar página)
2. ✅ **Desconexión automática** después del logout (sin recargar página)
3. ✅ **Limpieza automática** de notificaciones al cerrar sesión
4. ✅ **Rehidratación reactiva** de notificaciones
5. ✅ **Sin conexiones múltiples** (singleton global)
6. ✅ **Logs claros** para debugging
7. ✅ **Eficiencia**: Polling ligero cada 2 segundos
8. ✅ **Seguridad**: No quedan notificaciones de otros usuarios en memoria

## 🧪 Testing

### Verificar la conexión después del login:
1. Abrir la aplicación (sin login)
2. Abrir consola de desarrollador
3. Verificar log: `"🔌 No USID found, skipping socket connection"`
4. Hacer login
5. **Esperar máximo 2 segundos**
6. Verificar logs:
   - `"🔌 USID changed: { from: null, to: 'xxx...' }"`
   - `"🔌 Creating new socket connection..."`
   - `"🔌 Socket connected successfully!"`
7. Las notificaciones deberían cargarse automáticamente

### Verificar la desconexión después del logout:
1. Estando logueado (socket conectado)
2. Hacer logout
3. **Esperar máximo 2 segundos**
4. Verificar logs:
   - `"🔌 Logout detected - cleaning up socket"`
   - `"🔌 USID changed: { from: 'xxx...', to: null }"`
5. El socket debería desconectarse
6. Las notificaciones deberían limpiarse del estado

## 🔧 Configuración

El polling se ejecuta cada **2 segundos**. Si quieres ajustar este intervalo:

```tsx
const interval = setInterval(() => {
    // ...
}, 2000); // 👈 Cambiar este valor (en milisegundos)
```

### Recomendaciones:
- **1000ms (1 seg)**: Muy reactivo, pero más carga
- **2000ms (2 seg)**: Balance ideal (recomendado)
- **5000ms (5 seg)**: Menos carga, pero menos reactivo

## 🐛 Troubleshooting

### El socket no se conecta después del login
1. Verificar que el USID se esté guardando correctamente en `SessionManager`
2. Verificar los logs en consola
3. Asegurarse de que `NOTIFICATIONS_WS_URL` esté configurado correctamente

### Múltiples conexiones
- No debería pasar gracias al singleton `globalSocket`
- Si ocurre, verificar que no haya múltiples `NotificationsProvider` en el árbol de componentes

### Notificaciones no se cargan
1. Verificar que `localStorage` tenga datos: `notif-${userId}`
2. Verificar logs de rehidratación
3. Asegurarse de que el `userId` se esté extrayendo correctamente del USID

## 📝 Notas Técnicas

- El polling se limpia automáticamente al desmontar el componente
- El estado `currentUsid` actúa como "fuente de verdad" para todo el sistema
- Las funciones `markAsRead` y `markAllAsRead` están optimizadas con `useCallback`
- El `unreadCount` se calcula con `useMemo` para evitar recálculos innecesarios
