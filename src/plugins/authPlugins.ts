import fp from 'fastify-plugin';
import jwt from 'jsonwebtoken';

import {
    FastifyPluginAsync,
    FastifyRequest,
    FastifyReply
} from 'fastify';

const authPlugin: FastifyPluginAsync = async (fastify) => {
    const SECRET = process.env.JWT_SECRET;

    if (!SECRET) {
        throw new Error('JWT_SECRET no está definido en las variables de entorno');
    }

    const payload = { id: 1, role: 'admin' };
    const options = { expiresIn: '1h' } as any;
    const token = jwt.sign(payload, SECRET, options);

    console.log("Token generado para pruebas:", token);

    fastify.decorate('authenticate', async function (request: FastifyRequest, reply: FastifyReply) {
        try {
            const authHeader = request.headers['authorization'];
            if (!authHeader) {
                return reply.code(401).send({ error: 'Token no enviado.' });
            }

            const token = authHeader.split(' ')[1];
            if (!token) {
                return reply.code(401).send({ error: 'Token mal formado' });
            }

            // Verificamos que el token JWT sea válido y lo decodificamos
            const decoded = jwt.verify(token, SECRET) as { id: number; role: string };
            request.user = decoded;

            // --- Aquí podríamos extender la validación ---
            // Por ejemplo:
            // 1. Consultar en la base de datos si el token recibido está registrado y activo.
            // 2. Confirmar que el usuario con `id` existe y tiene el token asignado.
            // 3. Revisar si el token no ha sido revocado o expirado.
            //
            // Esto ayuda a proteger contra tokens robados o invalidados en el servidor.
            //
            // Ejemplo simplificado (pseudocódigo):
            // const validToken = await db.tokens.findOne({ token, userId: decoded.id });
            // if (!validToken) {
            //   return reply.code(401).send({ error: 'Token no válido o revocado' });
            // }

        } catch (err) {
            return reply.code(401).send({ error: 'Token inválido' });
        }
    });

    fastify.decorate('authorizeRoles', (allowedRoles: string[]) => {
        return async function (request: FastifyRequest, reply: FastifyReply) {
            if (!request.user) {
                return reply.code(401).send({ error: 'No autenticado' });
            }
            if (!allowedRoles.includes(request.user.role)) {
                return reply.code(403).send({ error: 'No autorizado para esta ruta' });
            }
        };
    });
};

export default fp(authPlugin);
