import type { ServiceOrder } from "../types/ServiceOrder";
import type { Client } from "../types/Client";
import { useState, useEffect } from "react";
import { api } from "../services/api";



export const ServiceOrdersPage = () => {
    const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [clientId, setClientId] = useState('');
    const [device, setDevice] = useState('');
    const [issue, setIssue] = useState('');

    useEffect(() => {
        async function fetchData(){
            const ordersResponse = await api.get('/api/service-orders');
            const clientsResponse = await api.get('/api/clients');

            setServiceOrders(ordersResponse.data);
            setClients(clientsResponse.data);
        }

        fetchData();
    }, []);

    async function createOrder (){
        const response = await api.post('/api/service-orders', {
            clientId: Number(clientId),
            device: device,
            issue: issue,
            status: 'open'
        })

        setServiceOrders(prevOrders => [ ...prevOrders, response.data]);

        setClientId('');
        setDevice('');
        setIssue('');
    }
    return (
        <div>
            <h1>Service Orders</h1>
        </div>
    )
}
