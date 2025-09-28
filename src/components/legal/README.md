# Componentes Legales - Documentación

## 📋 División de Contenido

El contenido legal se ha dividido en dos páginas principales:

### 🔗 Rutas Disponibles

- `/terms-and-conditions` - Términos y Condiciones
- `/privacy-policy` - Política de Privacidad

## 🧩 Componentes Disponibles

### `LegalPageLayout`
Layout principal que proporciona estructura consistente para páginas legales.

```tsx
<LegalPageLayout
  title="Título de la página"
  lastUpdated="Fecha de actualización"
>
  {/* Contenido */}
</LegalPageLayout>
```

### `LegalSection`
Sección individual con título e ícono opcional.

```tsx
<LegalSection title="Título de sección" icon="📝" id="seccion-1">
  <p>Contenido de la sección</p>
</LegalSection>
```

### `LegalList`
Lista con estilos específicos según el tipo.

```tsx
<LegalList 
  type="allowed" // 'allowed' | 'forbidden' | 'default'
  items={["Item 1", "Item 2"]}
/>
```

### `HighlightBox`
Caja destacada para información importante.

```tsx
<HighlightBox type="info" title="Título opcional">
  <p>Contenido destacado</p>
</HighlightBox>
```

### `LegalLinks`
Enlaces a páginas legales para footer u otras secciones.

```tsx
<LegalLinks layout="horizontal" showIcons={true} />
```

### `FooterLegalLinks`
Componente específico para footer con copyright.

```tsx
<FooterLegalLinks />
```

### `TableOfContents`
Índice navegable para páginas largas.

```tsx
<TableOfContents 
  sections={[
    { id: "seccion-1", title: "Título 1" },
    { id: "seccion-2", title: "Título 2" }
  ]}
/>
```

## 🎨 Características de Diseño

### ✅ **Responsive**
- Diseño adaptable para móviles y desktop
- Navegación colapsible en dispositivos pequeños

### ✅ **Accesible**
- Contraste adecuado de colores
- Navegación por teclado
- Estructura semántica HTML

### ✅ **Visual**
- Íconos descriptivos para cada sección
- Colores diferenciados por tipo de contenido
- Efectos hover y transiciones suaves

### ✅ **SEO Friendly**
- Estructura HTML semántica
- Meta tags apropiados
- Enlaces internos optimizados

## 🔧 Integración

### En Footer
```tsx
import { FooterLegalLinks } from '@/components/legal';

const Footer = () => (
  <footer className="bg-gray-100 p-6">
    <FooterLegalLinks />
  </footer>
);
```

### En Formularios de Registro
```tsx
import { LegalLinks } from '@/components/legal';

const RegisterForm = () => (
  <form>
    {/* Campos del formulario */}
    <div className="text-sm text-gray-600">
      Al registrarte, aceptás nuestros
      <LegalLinks layout="horizontal" className="inline ml-1" />
    </div>
  </form>
);
```

### Navegación con Índice
```tsx
import { TableOfContents } from '@/components/legal';

const termssSections = [
  { id: "aceptacion", title: "1. Aceptación de los Términos" },
  { id: "servicio", title: "2. Servicio de Intermediación" },
  // ... más secciones
];

// En la página
<TableOfContents sections={termssSections} />
```

## 📱 Comportamiento Móvil

- **Índice**: Se colapsa en móvil con botón expandir/colapsar
- **Layout**: Stack vertical en pantallas pequeñas
- **Enlaces**: Se adaptan para touch fácil
- **Texto**: Tamaños optimizados para legibilidad móvil

## 🔄 Mantenimiento

### Actualizar Contenido
1. Modificar el contenido en las páginas correspondientes
2. Actualizar la fecha en `lastUpdated`
3. Verificar que los enlaces internos funcionen

### Agregar Nueva Página Legal
1. Crear nueva página en `/src/app/nueva-pagina/page.tsx`
2. Usar `LegalPageLayout` como wrapper
3. Agregar enlace en `LegalLinks` component
4. Actualizar navegación si es necesario

### Personalizar Estilos
Los componentes usan Tailwind CSS. Para cambios globales:
1. Modificar las clases en cada componente
2. Usar `className` props para personalizaciones específicas
3. Mantener consistencia con el design system

---

**Creado**: 27 de septiembre de 2025  
**Estado**: ✅ Listo para producción