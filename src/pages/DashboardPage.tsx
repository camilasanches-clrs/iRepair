
import type { ServiceOrder } from '../types/ServiceOrder'
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
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}