
import { HeaderViews } from "../headerViews/HeaderViews"
import { TableEDproducts } from "@/components/tables/TableEDproducts"

export const ProductsView = () => {
  return (
    <div>
      <HeaderViews 
        title="Productos" 
        breadcrumb 
        searchBar 
        configButtons 
        button="Nuevo Producto"
      />
      <TableEDproducts />
    </div>
  )
}
