import type { Client } from "../types/Client";
import { useState } from "react";
import { api } from "../services/api";
import { useEffect } from "react";

export const ClientsPage = () =>{
    const [clients, setClients] = useState<Client[]>([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchClients() {
            const response = await api.get('/api/clients');
            setClients(response.data);
            setLoading(false);
        }
        

        fetchClients();
    }, []);

    async function deleteClient (id:number){
        await api.delete(`/api/clients/${id}`);
        setClients (prevClients => prevClients.filter(client => client.id !== id))

    }
    
    async function createClient (){
        const response = await api.post('/api/clients',{
            name: name,
            email: email,
            phone: phone
            
        });

        setClients (prevClients => [...prevClients, response.data])
        setName('');
        setEmail('');
        setPhone('');
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                    <p className="text-gray-500 text-xl">Loading...</p>
            </div>
        )
    }

    return(
        <div>
            <h1 className="text-2xl font-bold mb-6 text-center" >Clients</h1>

            <div className="bg-white shadow-md rounded p-4 mb-4">

            <input className="border border-gray-300 rounded p-2 w-full mb-3"  value ={name} onChange= {(e) => setName(e.target.value)} placeholder ="Name" />
            <input className="border border-gray-300 rounded p-2 w-full mb-3" value={email} onChange= {(e) => setEmail(e.target.value)} placeholder="Email"/>
            <input className="border border-gray-300 rounded p-2 w-full mb-3" value={phone} onChange={(e)=> setPhone(e.target.value)} placeholder="Phone"/>

            <button onClick={createClient} className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-blue-600">
                Save
            </button>
            
            </div>

        {clients.map(client => (
            <div key={client.id} className="bg-white shadow-md rounded p-4 mb-4 flex justify-between items-center">
                <p className="text-lg font-bold">{client.name}</p>
                <p>{client.email}</p>
                <p>{client.phone}</p>
                <p>{client.id}</p>
                <button onClick={() => deleteClient(client.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Delete
                </button>
            </div>
        ))}

        </div>
    )
}