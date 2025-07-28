import { FastifyPluginAsync } from "fastify";

// RUTAS
import adminRoutes from "./admin";

const allRoutes: FastifyPluginAsync = async (fastify) => {
    await fastify.register(adminRoutes, { prefix: "/admin" })
}

export default allRoutes;