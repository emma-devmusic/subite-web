# Solución: Server Actions no encuentran datos en producción

## Problema

Los Server Actions en Next.js 14 no estaban realizando peticiones a la API en producción. No se veían requests ni se obtenían datos de la base de datos.

## Causas Identificadas

### 1. **Variables de Entorno Incorrectas**
- Las Server Actions ejecutan en el **servidor**, no en el cliente
- Las variables `NEXT_PUBLIC_*` están diseñadas principalmente para el **cliente**
- En runtime del servidor, `process.env.NEXT_PUBLIC_API_BASE_URL` puede no estar disponible o tener un valor incorrecto

### 2. **Uso de Sweetalert2 en Server Actions**
- `Swal.fire()` es código de cliente que **falla silenciosamente** en Server Actions
- Esto ocultaba los errores reales de las peticiones

### 3. **Cache Agresivo**
- Next.js 14 tiene cache agresivo en Server Actions
- Aunque configuramos `cache: 'no-store'`, los Server Actions tienen su propio sistema de cache

## Solución Implementada

### 1. Crear `fetchDataServer.ts` específico para servidor

```typescript
// src/services/fetchDataServer.ts
export const fetchDataServer = async (...) => {
  // Usa variables SIN NEXT_PUBLIC_ para el servidor
  const API_BASE_URL = process.env.API_BASE_URL || 
                       process.env.NEXT_PUBLIC_API_BASE_URL || 
                       'https://acstapi.ding.com.ar/api/v1';
  
  // Incluye logs para debugging
  console.log(`[Server Action] Fetching: ${method} ${url}`);
  
  // Deshabilita cache completamente
  cache: 'no-store',
  next: { revalidate: 0 }
}
```

### 2. Actualizar Server Actions

```typescript
// Antes ❌
import Swal from "sweetalert2"
import { fetchData } from "@/services/fetchData"

export const getProducts = async () => {
  try {
    const response = await fetchData(...)
  } catch (error) {
    Swal.fire('Error', error, 'error') // Falla en servidor
  }
}

// Después ✅
import { fetchDataServer } from "@/services/fetchDataServer"

export const getProducts = async () => {
  try {
    const response = await fetchDataServer(...)
  } catch (error) {
    console.error('[getProducts] Error:', error) // Log en servidor
  }
}
```

### 3. Configurar Variables de Entorno

**En Vercel/Producción, agregar:**

```env
# Variables para SERVER (sin NEXT_PUBLIC_)
API_BASE_URL=https://acstapi.ding.com.ar/api/v1
SESSION=tu_session_key

# Variables para CLIENTE (con NEXT_PUBLIC_)
NEXT_PUBLIC_API_BASE_URL=https://acstapi.ding.com.ar/api/v1
NEXT_PUBLIC_SESSION=tu_session_key
```

## Archivos Modificados

1. ✅ `src/services/fetchDataServer.ts` - Nueva función para Server Actions
2. ✅ `src/services-actions/home/products/products.ts` - Actualizado para usar fetchDataServer
3. ✅ `.env.example` - Documentación de variables necesarias

## Cómo Verificar en Producción

### 1. Revisar los logs en Vercel

Los logs ahora mostrarán:
```
[Server Action] Fetching: GET https://acstapi.ding.com.ar/api/v1/home-template/commons-products/search?...
[Server Action] Response status: 200
[Server Action] Success, items count: 9
```

### 2. Si no aparecen logs o aparecen errores:

**Error común: "Cannot read API_BASE_URL"**
- Solución: Asegúrate de que `API_BASE_URL` (sin NEXT_PUBLIC_) esté en las variables de entorno de Vercel

**Error común: 401/403**
- Solución: Verifica que `SESSION` esté correctamente configurada

**Error común: CORS**
- Solución: Asegúrate de que el backend permita requests desde el dominio de producción

## Configuración en Vercel

1. Ve a tu proyecto → **Settings** → **Environment Variables**
2. Agrega las siguientes variables:

```
API_BASE_URL = https://acstapi.ding.com.ar/api/v1
SESSION = [tu valor de session]
NEXT_PUBLIC_API_BASE_URL = https://acstapi.ding.com.ar/api/v1
NEXT_PUBLIC_SESSION = [tu valor de session]
```

3. **Redeploy** el proyecto para que tome las nuevas variables

## Diferencia: Cliente vs Servidor

### Código de Cliente (componentes con 'use client')
- ✅ Puede usar `NEXT_PUBLIC_*` variables
- ✅ Puede usar `fetchData` original
- ✅ Puede usar Swal, window, document

### Código de Servidor (Server Actions, Server Components)
- ❌ No debe usar `NEXT_PUBLIC_*` exclusivamente
- ✅ Debe usar `fetchDataServer`
- ❌ No puede usar Swal, window, document
- ✅ Debe usar console.log para debugging

## Próximos Pasos

Si el problema persiste:

1. **Verifica que las variables estén en Vercel**
2. **Haz un redeploy completo**
3. **Revisa los logs de Function en Vercel Dashboard**
4. **Confirma que el endpoint de la API funciona** (prueba con Postman/curl)

## Notas Importantes

- Los Server Actions NO ejecutan en el navegador
- Los console.log de Server Actions aparecen en **los logs del servidor de Vercel**, no en la consola del navegador
- Cualquier código que use APIs del navegador (window, document, localStorage) fallará en Server Actions
