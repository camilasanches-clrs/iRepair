
import type { ServiceOrder, Status } from '../types/ServiceOrder'
import { useState, useEffect } from 'react'
import { api } from '../services/api'
import type { Client } from '../types/Client'
import { StatusColumn} from '../components/StatusColumn'


export const DashboardPage = () => {

    const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>([]);
    const  [loading, setLoading] = useState(true);
    const [clients, setClients] = useState<Client[]>([]);

    useEffect(() => {
        async function searchData() {
             const response = await api.get('/api/service-orders')
             const clientsResponse = await api.get('/api/clients')
             setServiceOrders(response.data)
             setClients(clientsResponse.data)
             setLoading(false)
        }

        searchData()
    }, [])
    
    if(loading) {
        return(
            <div className="flex items-center justify-center h-[60vh]">
                    <p className="text-gray-500 text-xl">Loading...</p>
            </div>
        )
    }

    const getClientName = (clientId: number) => {
        const client = clients.find(client => client.id === clientId);
        return client ? client.name : 'Unknown Client';
    }
    async function changeStatus(id: number, newStatus: Status) {
        const order = serviceOrders.find(order => order.id === id);
        if (!order) return;

        await api.put(`/api/service-orders/${id}` , {
            clientId: order.client_id,
            device: order.device,
            issue: order.issue,
            status: newStatus
        });
        
        setServiceOrders(prevOrders => prevOrders.map(order => order.id === id ? { ...order, status: newStatus } : order));
        

    }

    async function deleteOrder(id: number) {
        await api.delete(`/api/service-orders/${id}`);
        setServiceOrders(prevOrders => prevOrders.filter(order => order.id !== id));
    }
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">Dashboard</h1>

            <div className="flex flex-row gap-8">
            <StatusColumn
                serviceOrders={serviceOrders}
                status="open"
                title="Open"
                changeStatus={changeStatus}
                deleteOrder={deleteOrder}
                getClientName={getClientName}
            />
            <StatusColumn
                serviceOrders={serviceOrders}
                status="in_progress"
                title="In Progress"
                changeStatus={changeStatus}
                deleteOrder={deleteOrder}
                getClientName={getClientName}
            />
            <StatusColumn
                serviceOrders={serviceOrders}
                status="done"
                title="Done"
                changeStatus={changeStatus}
                deleteOrder={deleteOrder}
                getClientName={getClientName}
            />
            </div>

        </div>
    )
}