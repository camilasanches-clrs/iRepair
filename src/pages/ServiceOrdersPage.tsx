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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData(){
            const ordersResponse = await api.get('/api/service-orders');
            const clientsResponse = await api.get('/api/clients');

            setServiceOrders(ordersResponse.data);
            setClients(clientsResponse.data);
            setLoading(false);
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

    async function deleteOrder(id: number) {
        await api.delete(`/api/service-orders/${id}`);
        setServiceOrders(prevOrders => prevOrders.filter(order => order.id !== id));
    }

    if (loading) {
        return (
            <p>Loading...</p>
        )
    }
    return (
        <div>
            <h1>Service Orders</h1>

            <select value={clientId} onChange={(e) => setClientId(e.target.value)}>
                <option value="">Select a client</option>
                {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                        {client.name}
                    </option>
                ))}
            </select>

            <input value={device} onChange= {(e) => setDevice(e.target.value)} placeholder="Device"/>
            <input value={issue} onChange= {(e) => setIssue(e.target.value)} placeholder="Issue"/>

            <button onClick={createOrder}>Save</button>




            {serviceOrders.map(order => (
            <div key={order.id}>
                <p>{order.device}</p>
                <p>{order.issue}</p>
                <p>{order.id}</p>
                <button onClick={() => deleteOrder(order.id)}>
                    Delete
                </button>
            </div>
        ))}

        </div>
    )
}







