import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      id: number;
      role: string;
      [key: string]: any;
    };
  }

  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: import('fastify').FastifyReply) => Promise<void>;
    authorizeRoles: (allowedRoles: string[]) => (request: FastifyRequest, reply: import('fastify').FastifyReply) => Promise<void>;
  }
}
