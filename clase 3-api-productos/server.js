import http from 'http';
import { router } from './router.js';

const port = 3003;

const server = http.createServer((request, response) => {
    console.log(`\n=== Nueva Solicitud ===`);
    console.log(`📨 ${request.method} ${request.url}`);
    console.log(`🕐 ${new Date().toLocaleString()}`);
    
    router(request, response);
});

server.listen(port, () => {
    console.log(`🔄 Servidor con Enrutador corriendo en http://localhost:${port}`);
    console.log(`📊 Rutas disponibles:`);
    console.log(`   GET  /              - Página de inicio`);
    console.log(`   GET  /products      - Obtener todos los productos`);
    console.log(`   POST /products      - Agregar nuevo producto`);
    console.log(`   GET  /users         - Obtener usuarios (ejemplo)`);
});