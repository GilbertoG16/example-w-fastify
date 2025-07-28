import { FastifyPluginAsync } from "fastify";
import { loginSchema } from "../schemas/loginSchema";
import { loginController } from "../controllers/authenticationController";

const publicRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.post("/login", { schema: loginSchema }, loginController);
};

export default publicRoutes;
