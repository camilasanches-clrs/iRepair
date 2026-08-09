import {Client} from "@prisma/client";
import prisma from "../config/prismaClient";
 
export async function createClient(name: string, email: string, phone: string): Promise<Client> {
    return await prisma.client.create({
        data: { name, email, phone }
    });
}

export async function listClients(): Promise<Client[]> {
    return await prisma.client.findMany();
}


export async function updateClient(id: number, name: string, email: string, phone: string): Promise<Client | null> {
    return await prisma.client.update({
        where: { id },
        data: { name, email, phone }
    });
}   

export async function deleteClient(id: number): Promise<Client | null> {
    return await prisma.client.delete({
        where: { id }
    });
}  

export async function getClientById(id: number): Promise<Client | null> {
    return await prisma.client.findUnique({
        where: { id }
    });
}