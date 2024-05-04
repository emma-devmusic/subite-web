import { PopoverApp } from "@/components/popover"
import { notificationsData } from "@/mocks/mocks"
import { BellAlertIcon } from "@heroicons/react/24/outline"
import { NotificationItem } from "./NotificationItem"

export const Notifications = () => {


    return (
        <PopoverApp
            button={<BellAlertIcon />}
            classOpen='w-7 mr-4 text-cyan-800'
            classClose='text-cyan-600 hover:text-cyan-700 hover:cursor-pointer w-7 mr-4'
            position='end'
        >
            <ul className='flex flex-col'>
                {
                    notificationsData.map( item => 
                        <NotificationItem
                            id={item.id}
                            key={item.id}
                            linkTo={item.linkTo}
                            body={item.body}
                            title={item.title}
                            type={item.type}    
                        />
                    )
                }
            </ul>
        </PopoverApp>
    )
}