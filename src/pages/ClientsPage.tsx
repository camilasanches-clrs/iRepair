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
            <p>Loading...</p>
        )
    }

    return(
        <div>
            <h1>Clients</h1>

            <input value ={name} onChange= {(e) => setName(e.target.value)} placeholder ="Name"/>
            <input value={email} onChange= {(e) => setEmail(e.target.value)} placeholder="Email"/>
            <input value={phone} onChange={(e)=> setPhone(e.target.value)} placeholder="Phone"/>

            <button onClick={createClient}>Save</button>
        

        {clients.map(client => (
            <div key={client.id}>
                <p>{client.name}</p>
                <button onClick={() => deleteClient(client.id)}>
                    Delete
                </button>
            </div>
        ))}

        </div>
    )
}