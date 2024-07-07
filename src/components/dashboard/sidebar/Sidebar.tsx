'use client'
import { sidebarData } from '@/mocks/mocks';
import { SidebarLayout } from './SidebarLayout';
import { MenuItem } from '@/components/menuItem';
import { useAppDispatch, useAppSelector } from '@/store';
import { getPermissions, getUsers } from '@/store/manageUserSlice';
import { Suspense } from 'react';

const Sidebar = () => {

    const dispatch = useAppDispatch()
    dispatch(getPermissions())

    const { isAdmin } = useAppSelector(state => state.manageUser)
    console.log(isAdmin)


    return (
        <SidebarLayout>

            <ul className="space-y-2 pb-2">
                {
                    sidebarData.map(item =>
                        <MenuItem
                            key={item.text}
                            link={item.link}
                            text={item.text}
                            show={(item.forAdmin) ? isAdmin === item.forAdmin : true}
                            icon={item.icon}
                        />)
                }
            </ul>
        </SidebarLayout>
    )
}

export default Sidebar
