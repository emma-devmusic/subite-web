
import { sidebarData } from '@/mocks/mocks';
import { SidebarLayout } from './SidebarLayout';
import { MenuItem } from '@/components/menuItem';

const Sidebar = () => {


    return (
        <SidebarLayout>
            <ul className="space-y-2 pb-2">
                {
                    sidebarData.map(item =>
                        <MenuItem
                            key={item.text}
                            link={item.link}
                            text={item.text}
                            show={item.admin}
                            icon={item.icon}
                        />)
                }
            </ul>
        </SidebarLayout>
    )
}

export default Sidebar
