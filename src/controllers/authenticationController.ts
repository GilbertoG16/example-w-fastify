import { FastifyReply, FastifyRequest } from "fastify";
import jwt from 'jsonwebtoken';

export async function loginController(request: FastifyRequest, reply: FastifyReply) {
    const { username, password } = request.body as { username: string; password: string };
    const SECRET = process.env.JWT_SECRET;

    if (!SECRET) {
        throw new Error('JWT_SECRET no está definido en las variables de entorno');
    }
    
    // Simulación de validación de usuario
    if (username === "admin" && password === "password123") {
        const token = jwt.sign({ id: 1, role: "admin" }, SECRET, { expiresIn: "1h" });

        return reply.code(200).send({ token, msg: "Login exitoso" });
    } else {
        return reply.code(401).send({ error: "Credenciales inválidas" });
    }
}