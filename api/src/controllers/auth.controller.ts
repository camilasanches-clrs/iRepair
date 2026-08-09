import {Request, Response} from "express";
import * as authService from "../services/auth.service";

export async function register(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    try {
        const user = await authService.registerUser(name, email, password);
        const { password: _, ...userWithoutPassword } = user;
        res.status(201).json(userWithoutPassword);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao registrar usuário", error });
    }
}

export async function login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
        const token = await authService.loginUser(email,password);
        res.cookie("token", token, { httpOnly: true, maxAge: 15 * 60 * 1000 });
        res.status(200).json({ message: "Login realizado com sucesso" });
    }
    catch (error) {
        res.status(401).json({ message: "Credenciais inválidas", error });
    }
}