import { TableEDauctionsRecord } from "@/components/tables/TableEDauctionsRecord"
import { HeaderViews } from "../headerViews/HeaderViews"

export const RecordAuctionsView = () => {
    return (
        <div>
            <HeaderViews
                breadcrumb={false} 
                title='Subastas'
                button='Limpiar'
                searchBar
                configButtons
            />
            <TableEDauctionsRecord />
        </div>
    )
}
