import {Request, Response} from "express";
import * as clientService from "../services/client.service";

export async function createClient(req: Request, res: Response): Promise<void> {
    const { name, email, phone } = req.body;

    try {
        const client = await clientService.createClient(name, email, phone);
        res.status(201).json(client);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar cliente", error });
    }
}

export async function listClients(req: Request, res: Response): Promise<void> {
    try {
        const clients = await clientService.listClients();
        res.status(200).json(clients);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao listar clientes", error });
    }   

}

export async function updateClient(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    try {
        const client = await clientService.updateClient(Number(id), name, email, phone);   
        res.status(200).json(client);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao update", error });
    }

}


export async function deleteClient (req: Request, res: Response): Promise<void> {
    const  { id } = req.params;

    try {
        clientService.deleteClient(Number(id));
        res.status(200).json({ message: "Client deletado"});
    }

    catch (error) {
        res.status(500).json( { message: "Erro ao deletar"});
    }

}

export async function getClientById (req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try{
        const client = await clientService.getClientById(Number(id));
        res.status(200).json(client);

    }
    catch (error) {
        res.status(500).json({ message: "Erro! Não encontrado"});
    }

}