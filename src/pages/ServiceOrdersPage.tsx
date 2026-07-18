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

    const getClientName = (clientId: number) => {
        const client = clients.find(client => client.id === clientId);
        return client ? client.name : 'Unknown Client';
    }


    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                    <p className="text-gray-500 text-xl">Loading...</p>
            </div>
        )
    }
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-center">Service Orders</h1>

            <div className="bg-white shadow-md rounded p-4 mb-4">
                <select
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    className="border border-gray-300 rounded p-2 w-full mb-3"
                >
                    <option value="">Select a client</option>
                    {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                            {client.name}
                        </option>
                    ))}
                </select>

                <input
                    value={device}
                    onChange={(e) => setDevice(e.target.value)}
                    placeholder="Device"
                    className="border border-gray-300 rounded p-2 w-full mb-3"
                />
                <input
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    placeholder="Issue"
                    className="border border-gray-300 rounded p-2 w-full mb-3"
                />

                <button 
                onClick={createOrder}
                className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Save
                </button>
            </div>


            {serviceOrders.map(order => (
            <div key={order.id} className= "bg-white shadow-md rounded p-4 mb-4 flex justify-between items-center">
                <p className="text-lg font-bold">{getClientName(order.client_id)}</p>
                <p>{order.device}</p>
                <p>{order.issue}</p>
                <p>{order.id}</p>
                <button onClick={() => deleteOrder(order.id)}  className= "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Delete
                </button>
            </div>
        ))}

        </div>
    )
}







