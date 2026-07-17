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
    
    return(
        <div>
            <h1>Clients</h1>
        </div>
    )
}