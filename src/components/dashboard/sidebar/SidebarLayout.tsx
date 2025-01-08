'use client'
import { useAppDispatch, useAppSelector } from '@/store'
import { uiMenu } from '@/store/slices/uiSlice'

export const SidebarLayout = ({ children }: { children: React.ReactNode }) => {

    const { menuOpen } = useAppSelector(state => state.ui)
    const dispatch = useAppDispatch()
    const showSidebar = menuOpen ? '' : 'hidden'
    const handleToggleMenu = () => {
        dispatch(uiMenu(!menuOpen))
    }


    return (
        <div>
            <aside id="sidebar" className={"fixed z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75 " + showSidebar} aria-label="Sidebar">
                <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex-1 px-3 bg-white divide-y space-y-1">
                            {children}
                        </div>
                    </div>
                </div>
            </aside>
            <div className={"bg-gray-900 opacity-50 fixed inset-0 z-10 " + showSidebar} id="sidebarBackdrop" onClick={handleToggleMenu}></div>
        </div>
    )
}
