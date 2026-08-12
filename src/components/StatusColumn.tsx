import type { ServiceOrder, Status } from '../types/ServiceOrder'
import {ServiceCard} from '../components/ServiceCard'

interface StatusColumnProps {
    serviceOrders: ServiceOrder[];
    status: Status;
    title: string;
    changeStatus: (id: number, newStatus: Status) => void;
    deleteOrder: (id: number) => void;
    getClientName: (clientId: number) => string;
}

export const StatusColumn = (props: StatusColumnProps) => {
    const filteredOrders = props.serviceOrders.filter(
        order => order.status === props.status
    )
    return(
        <div className="flex-1">
        <h2 className="text-xl font-bold mb-4 text-center">
        {props.title}
        </h2>

            <div className="space-y-4">
            {filteredOrders.map((order) => (
                <ServiceCard 
                    key={order.id}
                    id={order.id}
                    nameClient={props.getClientName(order.clientId)}
                    device={order.device}
                    issue={order.issue}
                    status={order.status}
                    changeStatus={props.changeStatus}
                    deleteOrder={props.deleteOrder}
                />
            ))}
            </div>

        </div>
    )
    
}

