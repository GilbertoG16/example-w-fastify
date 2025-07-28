import fastify from 'fastify';
import dotenv from 'dotenv';
dotenv.config();

// plugins
import authPlugins from './src/plugins/authPlugins';
import allRoutes from './src/routes';

const server = fastify();

async function main() {
    // Registrar plugin de autenticación
    await server.register(authPlugins);
    await server.register(allRoutes)

    try {
        await server.listen({ port: 8080 });
        console.log('Server listening at http://localhost:8080');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

main();
