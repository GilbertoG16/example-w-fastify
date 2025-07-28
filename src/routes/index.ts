import { FastifyPluginAsync } from "fastify";

// RUTAS
import adminRoutes from "./admin";
import publicRoutes from "./public";

const allRoutes: FastifyPluginAsync = async (fastify) => {
    await fastify.register(adminRoutes, { prefix: "/admin" })
    await fastify.register(publicRoutes, { prefix: "/public" })
}

export default allRoutes;