import { FastifyPluginAsync } from "fastify";

const adminRoutes: FastifyPluginAsync = async (fastify) => {
    // Aplica preHandlers a todas las rutas dentro de este register
    fastify.register(async (admin) => {
        admin.addHook('preHandler', async (request, reply) => {
            await fastify.authenticate(request, reply);
            await fastify.authorizeRoles(['admin'])(request, reply);
        });

        admin.get('/dashboard', async (request, reply) => {
            const user = request.user;
            reply.send({
                msg: 'Dashboard admin',
                user,
            });
        });

        admin.get('/settings', async (request, reply) => {
            reply.send({
                msg: 'Admin settings page',
                user: request.user,
            });
        });

    });
};

export default adminRoutes;