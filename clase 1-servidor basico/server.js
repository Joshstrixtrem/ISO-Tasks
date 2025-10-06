import http from 'http';

const port = 3000;

// Variables para Fibonacci
let fibPrev = 0;
let fibCurrent = 1;
let requestCount = 0;

const server = http.createServer((request, response) => {
    // Incrementar contador de solicitudes
    requestCount++;
    
    // 1. Número entero al azar (entre 1 y 1000)
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    
    // 2. Siguiente número en secuencia Fibonacci
    let fibNext;
    if (requestCount === 1) {
        fibNext = 0;
    } else if (requestCount === 2) {
        fibNext = 1;
    } else {
        fibNext = fibPrev + fibCurrent;
        fibPrev = fibCurrent;
        fibCurrent = fibNext;
    }
    
    // 3. Objeto diferente para cada método HTTP
    let responseObject = {};
    
    switch (request.method) {
        case 'GET':
            responseObject = {
                method: 'GET',
                message: 'Solicitud GET recibida - Lee datos',
                randomNumber: randomNumber,
                fibonacciNumber: fibNext,
                timestamp: new Date().toISOString()
            };
            break;
            
        case 'POST':
            responseObject = {
                method: 'POST',
                message: 'Solicitud POST recibida - Crea nuevo dato',
                randomNumber: randomNumber,
                fibonacciNumber: fibNext,
                timestamp: new Date().toISOString(),
                data: 'Dato creado exitosamente'
            };
            break;
            
        case 'PUT':
            responseObject = {
                method: 'PUT',
                message: 'Solicitud PUT recibida - Actualiza dato',
                randomNumber: randomNumber,
                fibonacciNumber: fibNext,
                timestamp: new Date().toISOString(),
                data: 'Dato actualizado exitosamente'
            };
            break;
            
        case 'DELETE':
            responseObject = {
                method: 'DELETE',
                message: 'Solicitud DELETE recibida - Elimina dato',
                randomNumber: randomNumber,
                fibonacciNumber: fibNext,
                timestamp: new Date().toISOString(),
                data: 'Dato eliminado exitosamente'
            };
            break;
            
        default:
            responseObject = {
                method: request.method,
                message: `Método ${request.method} recibido`,
                randomNumber: randomNumber,
                fibonacciNumber: fibNext,
                timestamp: new Date().toISOString(),
                note: 'Método HTTP no manejado específicamente'
            };
    }
    
    // Configurar headers para JSON
    response.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    
    // Enviar respuesta
    response.write(JSON.stringify(responseObject, null, 2));
    response.end();
    
    // Mostrar en consola del servidor
    console.log(`[${new Date().toLocaleTimeString()}] ${request.method} request - Random: ${randomNumber}, Fibonacci: ${fibNext}`);
});

server.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    console.log(`Puedes probarlo con:`);
    console.log(`- Navegador: http://localhost:3000`);
    console.log(`- Postman: Enviar solicitudes GET, POST, PUT, DELETE`);
    console.log(`Reinicia el servidor con Ctrl+C para resetear la secuencia Fibonacci`);
});