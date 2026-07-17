import type { Client } from "../types/Client";
import { useState } from "react";
import { api } from "../services/api";
import { useEffect } from "react";

export const ClientsPage = () =>{
    const [clients, setClients] = useState<Client[]>([]);

    useEffect(() => {
        async function fetchClients() {
            const response = await api.get('/api/clients');
            setClients(response.data);
        }

        fetchClients();
    }, []);

    async function deleteClient (id:number){
        await api.delete(`/api/clients/${id}`);
        setClients (prevClients => prevClients.filter(client => client.id !== id))

    }
    
    return(
        <div>
            <h1>Clients</h1>
        

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