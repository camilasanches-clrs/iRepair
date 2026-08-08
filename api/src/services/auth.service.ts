import bcrypt from "bcrypt";
import prisma from "../config/prismaClient";
import { User } from "@prisma/client";

export async function registerUser(name: string, email: string, password: string): Promise<User> {
    password = await bcrypt.hash(password, 10);

     return await prisma.user.create({
        data: {
            name,
            email,
            password
        }
    });

}

