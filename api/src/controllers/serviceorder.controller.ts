import {Request, Response} from "express";
import * as serviceOrder from "../services/serviceorder.service";

export async function createServiceOrder(req: Request, res: Response): Promise<void> {
    const { device, issue, clientId } = req.body;

    try {
        const serviceorder = await serviceOrder.createServiceOrder(device, issue, clientId);
        res.status(201).json(serviceorder);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar ordem", error });
    }
}

export async function listServiceOrders(req: Request, res: Response): Promise<void> {
    try {
        const serviceorders = await serviceOrder.listServiceOrder();
        res.status(200).json(serviceorders);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao listar ordens", error });
    }   

}

export async function updateServiceOrder(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { device, issue, clientId, status } = req.body;

    try {
        const serviceorder = await serviceOrder.updateServiceOrder(Number(id), device, issue, clientId, status);   
        res.status(200).json(serviceorder);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao update", error });
    }

}


export async function deleteServiceOrder (req: Request, res: Response): Promise<void> {
    const  { id } = req.params;

    try {
        serviceOrder.deleteServiceOrder(Number(id));
        res.status(200).json({ message: "Ordem deletada"});
    }

    catch (error) {
        res.status(500).json( { message: "Erro ao deletar"});
    }

}

export async function getServiceOrderById (req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try{
        const client = await serviceOrder.getServiceOrderById(Number(id));
        res.status(200).json(client);

    }
    catch (error) {
        res.status(500).json({ message: "Erro! Não encontrado"});
    }

}