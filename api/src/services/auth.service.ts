import bcrypt from "bcrypt";
import prisma from "../config/prismaClient";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";


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

export async function findUserByEmail(email: string): Promise <User | null> {
    return await prisma.user.findUnique({
        where: {
            email
        }
    });
}

export async function loginUser(email: string, password: string): Promise< string > {
    const user = await findUserByEmail(email);
     if (!user) {
    throw new Error("Credenciais inválidas");
  }

  const senhaCorreta = await bcrypt.compare(password, user.password);

  if (!senhaCorreta) {
    throw new Error("Credenciais inválidas");
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email}, 
    process.env.JWT_SECRET as string, { expiresIn: "15m"} )

    return token;
}

