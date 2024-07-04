'use client'
import { sidebarData } from '@/mocks/mocks';
import { SidebarLayout } from './SidebarLayout';
import { MenuItem } from '@/components/menuItem';
import { useAppDispatch } from '@/store';
import { getUsers } from '@/store/manageUserSlice';

const Sidebar = () => {

    const dispatch = useAppDispatch()

    dispatch( getUsers() )
    

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
