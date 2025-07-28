import { FastifyPluginAsync } from "fastify";

const adminRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/dashboard', {
    preHandler: [fastify.authenticate, fastify.authorizeRoles(['admin'])]
  }, async (request, reply) => {
    const user = request.user; 
    
    reply.send({ 
      msg: 'Dashboard admin',
      user,  
    });
  });
}


export default adminRoutes;