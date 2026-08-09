import { ServiceOrder } from "@prisma/client";
import { Client } from "@prisma/client"
import prisma from "../config/prismaClient";

export async function createServiceOrder(device: string, issue: string, clientId: number): Promise<ServiceOrder> {
    return await prisma.serviceOrder.create({
        data: { device, issue, clientId }
    });
}

export async function listServiceOrder(): Promise<ServiceOrder[]> {
    return await prisma.serviceOrder.findMany();
}


export async function updateServiceOrder(id: number, device: string, issue: string, clientId: number, status: string): Promise< ServiceOrder | null> {
    return await prisma.serviceOrder.update({
        where: { id },
        data: { device, issue , clientId, status }
    });
}   

export async function deleteServiceOrder(id: number): Promise< ServiceOrder | null> {
    return await prisma.serviceOrder.delete({
        where: { id }
    });
}  

export async function getServiceOrderById(id: number): Promise<ServiceOrder | null> {
    return await prisma.serviceOrder.findUnique({
        where: { id }
    });
}