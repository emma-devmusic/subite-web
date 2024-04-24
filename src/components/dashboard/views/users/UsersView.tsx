
import { TableEDusers } from "@/components/tables/TableEDusers"
import { HeaderViews } from "../headerViews/HeaderViews"

export const UsersView = () => {
  return (
    <div>
      <HeaderViews 
        title="Usuarios" 
        breadcrumb 
        configButtons
        searchBar
        button="Nuevo Usuario"
      />
      <TableEDusers />
    </div>
  )
}
