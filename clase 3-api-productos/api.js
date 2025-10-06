import { parser } from './parser.js';

//  ARRAY GLOBAL para productos 
let products = [];
let productIdCounter = 1;

export const home = async (request, response) => {
    // Configurar CORS
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (request.method === 'OPTIONS') {
        response.writeHead(200);
        response.end();
        return;
    }
    
    if (request.method === "GET") {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(JSON.stringify({
            "message": "Solicitud GET recibida al home",
            "timestamp": new Date().toISOString()
        }, null, 2));
        response.end();
    } 
    else if (request.method === "POST") {
        try {
            //  EXPERIMENTAR CON LA DATA 
            let data = await parser(request);
            console.log("📨 Data recibida en HOME:", data);
            
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                "message": "Solicitud POST recibida al home",
                "dataRecibida": data, //  Devolvemos la data experimentada
                "timestamp": new Date().toISOString()
            }, null, 2));
            response.end();
        } catch (error) {
            response.writeHead(400, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                "error": "Error procesando JSON",
                "details": error.message
            }, null, 2));
            response.end();
        }
    } else {
        //  ERROR 405 para métodos no permitidos 
        response.writeHead(405, { "Content-Type": "application/json" });
        response.write(JSON.stringify({
            "error": "Método no permitido",
            "allowedMethods": ["GET", "POST"],
            "timestamp": new Date().toISOString()
        }, null, 2));
        response.end();
    }
};

export const productsHandler = async (request, response) => {
    // Configurar CORS
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (request.method === 'OPTIONS') {
        response.writeHead(200);
        response.end();
        return;
    }
    
    if (request.method === "GET") {
        // Obtener todos los productos del array global
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(JSON.stringify({
            "message": "Lista de productos obtenida",
            "products": products,
            "count": products.length,
            "timestamp": new Date().toISOString()
        }, null, 2));
        response.end();
        
    } else if (request.method === "POST") {
        try {
            //  AÑADIR PRODUCTO AL ARRAY GLOBAL 
            let productData = await parser(request);
            console.log("🛍️ Producto recibido:", productData);
            
            // Crear nuevo producto con ID autoincremental
            const newProduct = {
                id: productIdCounter++,
                ...productData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            
            //  AÑADIR AL ARRAY GLOBAL
            products.push(newProduct);
            
            console.log(" Producto agregado al array global. Total:", products.length);
            
            response.writeHead(201, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                "message": "Producto creado exitosamente",
                "product": newProduct,
                "totalProducts": products.length,
                "timestamp": new Date().toISOString()
            }, null, 2));
            response.end();
            
        } catch (error) {
            response.writeHead(400, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                "error": "Error creando producto",
                "details": error.message
            }, null, 2));
            response.end();
        }
    } else {
        //  ERROR 405 para métodos no permitidos 
        response.writeHead(405, { "Content-Type": "application/json" });
        response.write(JSON.stringify({
            "error": "Método no permitido",
            "allowedMethods": ["GET", "POST"],
            "timestamp": new Date().toISOString()
        }, null, 2));
        response.end();
    }
};

export const usersHandler = async (request, response) => {
    // Configurar CORS
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (request.method === 'OPTIONS') {
        response.writeHead(200);
        response.end();
        return;
    }
    
    if (request.method === "GET") {
        //  RUTA QUE SOLO ACEPTA GET 
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(JSON.stringify({
            "message": "Solicitud a Users!",
            "users": [
                { "id": 1, "name": "Usuario 1" },
                { "id": 2, "name": "Usuario 2" }
            ],
            "timestamp": new Date().toISOString()
        }, null, 2));
        response.end();
    } else {
        // ERROR 405 para métodos no permitidos 
        response.writeHead(405, { "Content-Type": "application/json" });
        response.write(JSON.stringify({
            "error": "Método no permitido",
            "allowedMethods": ["GET"],
            "timestamp": new Date().toISOString()
        }, null, 2));
        response.end();
    }
};