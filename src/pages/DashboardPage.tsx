
import type { ServiceOrder, Status } from '../types/ServiceOrder'
import { useState, useEffect } from 'react'
import { api } from '../services/api'
import type { Client } from '../types/Client'


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
            <p>Loading...</p>
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
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}