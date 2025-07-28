import fastify from 'fastify';
import dotenv from 'dotenv';

// Detectar entorno, por defecto 'development'
const env = process.env.NODE_ENV || 'development';

// Cargar variables de entorno según el entorno
dotenv.config({ path: `.env.${env}` });

// plugins
import authPlugins from './src/plugins/authPlugins';
import allRoutes from './src/routes';

// Configurar logger solo si estamos en desarrollo
const server = fastify({
    logger: env === 'development' ? true : false,
});

async function main() {
    // Registrar plugin de autenticación
    await server.register(authPlugins);

    // Registrar todas las rutas
    await server.register(allRoutes);

    try {
        await server.listen({ port: 8080 });
        console.log(`Server listening at http://localhost:8080 - Mode: ${env.toUpperCase()}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

main();
