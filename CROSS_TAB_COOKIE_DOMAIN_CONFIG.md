# Configuración de Dominio para CrossTabCookieManager - Cliente

## Descripción

La clase `CrossTabCookieManager` en el cliente Next.js ahora soporta configuración del dominio de cookies a través de variables de entorno.

## Configuración por Entorno

### Desarrollo Local (.env.development)
```env
NEXT_PUBLIC_COOKIE_DOMAIN=localhost
```

### Staging (.env.stage)
```env
NEXT_PUBLIC_COOKIE_DOMAIN=.ding.com.ar
```

### Producción (.env.production)
```env
NEXT_PUBLIC_COOKIE_DOMAIN=.ding.com.ar
```

## Diferencias con el Dashboard

### Variables de Entorno
- **Dashboard (Vite)**: `VITE_COOKIE_DOMAIN`
- **Cliente (Next.js)**: `NEXT_PUBLIC_COOKIE_DOMAIN`

### Acceso a Variables
- **Dashboard**: `import.meta.env.VITE_COOKIE_DOMAIN`
- **Cliente**: `process.env.NEXT_PUBLIC_COOKIE_DOMAIN`

## Uso Sincronizado

Para que funcione la sincronización entre pestañas del dashboard y cliente:

1. **Ambos deben usar el mismo dominio**:
   ```env
   # Dashboard (.env)
   VITE_COOKIE_DOMAIN=localhost
   
   # Cliente (.env.development)
   NEXT_PUBLIC_COOKIE_DOMAIN=localhost
   ```

2. **Para producción con subdominios**:
   ```env
   # Dashboard
   VITE_COOKIE_DOMAIN=.ding.com.ar
   
   # Cliente
   NEXT_PUBLIC_COOKIE_DOMAIN=.ding.com.ar
   ```

## Verificación

Para verificar que ambas aplicaciones usan el mismo dominio:

```typescript
// En cualquier componente
const cookieManager = CrossTabCookieManager.getInstance();
console.log('Dominio configurado:', cookieManager.getCookieDomain());
```

## Troubleshooting

### Sincronización no funciona entre dashboard y cliente

1. Verificar que ambos archivos `.env` tengan el mismo valor para el dominio
2. Reiniciar ambos servidores de desarrollo después de cambiar variables de entorno
3. Verificar en DevTools → Application → Cookies que ambas aplicaciones crean cookies con el mismo dominio

### En desarrollo local

- Asegurar que tanto `VITE_COOKIE_DOMAIN` como `NEXT_PUBLIC_COOKIE_DOMAIN` sean `localhost`
- No usar `127.0.0.1` mezclado con `localhost`
- Verificar que ambas apps corran en los puertos correctos (3000 y 3001)

### En producción

- Usar formato `.dominio.com` para permitir subdominios
- Verificar que el dominio principal coincida con el configurado
- Testear con diferentes subdominios si es necesario