import http from 'http';
import { parser } from './parser.js';

const port = 3002;
let requestCount = 0;

const server = http.createServer(async (request, response) => {
    requestCount++;
    
    // Configurar headers CORS
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Manejar preflight OPTIONS
    if (request.method === 'OPTIONS') {
        response.writeHead(200);
        response.end();
        return;
    }
    
    // Configurar respuesta como JSON
    response.setHeader('Content-Type', 'application/json');
    
    try {
        if (request.method === 'GET') {
            // Respuesta para GET
            response.writeHead(200);
            response.write(JSON.stringify({
                message: ' Solicitud GET recibida - Parser funcionando',
                requestCount: requestCount,
                timestamp: new Date().toISOString(),
                instructions: 'Envía una solicitud POST con JSON en el body'
            }, null, 2));
            
        } else if (request.method === 'POST') {
            // Verificar si hay contenido
            if (request.headers['content-length'] === '0' || !request.headers['content-type']?.includes('application/json')) {
                throw new Error('Content-Type debe ser application/json y el body no puede estar vacío');
            }
            
            // Usar el parser para solicitudes POST
            const parsedData = await parser(request);
            
            console.log('Datos parseados recibidos:', parsedData);
            
            response.writeHead(200);
            response.write(JSON.stringify({
                message: 'Solicitud POST parseada exitosamente',
                requestCount: requestCount,
                timestamp: new Date().toISOString(),
                receivedData: parsedData,
                dataType: typeof parsedData,
                dataStructure: Array.isArray(parsedData) ? 'array' : 'object'
            }, null, 2));
            
        } else {
            // Método no permitido
            response.writeHead(405);
            response.write(JSON.stringify({
                error: 'Método no permitido',
                allowedMethods: ['GET', 'POST'],
                timestamp: new Date().toISOString()
            }, null, 2));
        }
        
    } catch (error) {
        // Manejar errores del parser
        console.log('Error:', error.message);
        response.writeHead(400);
        response.write(JSON.stringify({
            error: 'Error procesando la solicitud',
            details: error.message,
            timestamp: new Date().toISOString(),
            help: 'Asegúrate de enviar JSON válido en el body con Content-Type: application/json'
        }, null, 2));
    }
    
    response.end();
});

server.listen(port, () => {
    console.log(`Servidor con Parser corriendo en http://localhost:${port}`);
    console.log(`Endpoints disponibles:`);
    console.log(`   GET  http://localhost:${port}  - Recibir mensaje de prueba`);
    console.log(`   POST http://localhost:${port}  - Enviar JSON para ser parseado`);
    console.log(`Verifica que estés usando el puerto ${port} en Postman`);
});