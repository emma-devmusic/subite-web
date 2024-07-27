'use client'
import { sidebarData } from '@/mocks/mocks';
import { SidebarLayout } from './SidebarLayout';
import { MenuItem } from '@/components/menuItem';
import { useAppDispatch, useAppSelector } from '@/store';
import { getPermissions } from '@/store/manageUserSlice';
import { useEffect, useState } from 'react';

const Sidebar = () => {

    const dispatch = useAppDispatch()
    const { isAdmin } = useAppSelector(state => state.manageUser)
    const [sidebarState, setSidebarState] = useState<any>(sidebarData)

    useEffect(() => {
        dispatch(getPermissions())
    },[])


    return (
        <SidebarLayout>
            <ul className="space-y-2 pb-2">
                {
                    sidebarState.map((item: any) =>
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
