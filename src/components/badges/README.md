# Componente Badge - Documentación

## 📦 Descripción

El componente `Badge` es un elemento reutilizable para mostrar etiquetas de estado con diferentes variantes visuales. Está optimizado para mostrar el estado de las subastas con colores y estilos apropiados.

## 🎨 Variantes Disponibles

### 🟡 `pending` - En Espera
- **Color**: Ámbar (`amber-500`)
- **Uso**: Subastas que aún no han comenzado
- **Ícono**: ⏳

### 🟢 `running` - Activa
- **Color**: Esmeralda (`emerald-500`)
- **Uso**: Subastas en curso
- **Ícono**: 🔥

### ⚫ `finish` - Finalizada  
- **Color**: Slate (`slate-500`)
- **Uso**: Subastas terminadas
- **Ícono**: ✅

### 🔵 `default` - Por Defecto
- **Color**: Secondary (variable CSS)
- **Uso**: Estados genéricos

## 🚀 Uso

### Componente Badge Básico

```tsx
import { Badge } from '@/components/badges';

// Uso básico
<Badge variant="pending">En espera</Badge>
<Badge variant="running">Activa</Badge>
<Badge variant="finish">Finalizada</Badge>

// Con clases personalizadas
<Badge variant="running" className="absolute top-2 right-2">
  Activa
</Badge>
```

### Componente AuctionStatusBadge (Recomendado)

```tsx
import { AuctionStatusBadge } from '@/components/badges';

// Uso específico para subastas
<AuctionStatusBadge status="pending" />
<AuctionStatusBadge status="running" />
<AuctionStatusBadge status="finish" />

// Con clases adicionales
<AuctionStatusBadge 
  status="running" 
  className="custom-class" 
/>
```

## 📋 Props

### Badge Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `variant` | `'pending' \| 'running' \| 'finish' \| 'default'` | `'default'` | Variante visual del badge |
| `children` | `React.ReactNode` | - | Contenido del badge |
| `className` | `string` | `''` | Clases CSS adicionales |

### AuctionStatusBadge Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `status` | `'pending' \| 'running' \| 'finish'` | - | Estado de la subasta |
| `className` | `string` | `''` | Clases CSS adicionales |

## 🎯 Características

### ✅ **Diseño Responsive**
- Adapta automáticamente el tamaño según el contenido
- Mantiene proporciones consistentes

### ✅ **Efectos Visuales**
- Sombras personalizadas por variante
- Transiciones suaves al hacer hover
- Efecto de escala al interactuar

### ✅ **Accesibilidad**
- Contraste adecuado de colores
- Íconos descriptivos
- Texto legible

### ✅ **Reutilizable**
- Variantes predefinidas
- Extensible con clases personalizadas
- TypeScript completo

## 🔧 Personalización

### Agregar Nueva Variante

```tsx
// En Badge.tsx
const badgeVariants = {
  pending: 'bg-amber-500 text-white border-amber-600 shadow-amber-500/20',
  running: 'bg-emerald-500 text-white border-emerald-600 shadow-emerald-500/20',
  finish: 'bg-slate-500 text-white border-slate-600 shadow-slate-500/20',
  default: 'bg-secondary text-white border-secondary shadow-secondary/20',
  // Nueva variante
  cancelled: 'bg-red-500 text-white border-red-600 shadow-red-500/20'
};

// Actualizar el tipo
export type BadgeVariant = 'pending' | 'running' | 'finish' | 'default' | 'cancelled';
```

### Personalizar Estilos

```tsx
// Clases personalizadas
<Badge 
  variant="running" 
  className="!bg-gradient-to-r !from-green-400 !to-blue-500"
>
  Custom Badge
</Badge>
```

## 📁 Estructura de Archivos

```
src/components/badges/
├── index.ts                 # Exports principales
├── Badge.tsx               # Componente base
├── AuctionStatusBadge.tsx  # Componente específico
└── README.md              # Esta documentación
```

## 🧪 Ejemplos de Integración

### En Tarjetas de Producto

```tsx
import { AuctionStatusBadge } from '@/components/badges';

const ProductCard = ({ auction }) => (
  <div className="relative">
    <AuctionStatusBadge status={auction.status} />
    <img src={auction.image} alt="Product" />
    {/* Resto del contenido */}
  </div>
);
```

### En Listas

```tsx
import { Badge } from '@/components/badges';

const AuctionList = ({ auctions }) => (
  <ul>
    {auctions.map(auction => (
      <li key={auction.id} className="flex items-center justify-between">
        <span>{auction.title}</span>
        <Badge variant={auction.status}>
          {auction.statusLabel}
        </Badge>
      </li>
    ))}
  </ul>
);
```

---

**Creado**: 27 de septiembre de 2025  
**Estado**: ✅ Listo para producción