import { URL } from 'url';
import { routes } from './routes.js';

export const router = (request, response) => {
    const parsedUrl = new URL(request.url, `http://${request.headers.host}`);
    const pathname = parsedUrl.pathname;
    
    // Limpiar la ruta: remover slash inicial y final 
    const trimmedPath = pathname.replace(/^\/+|\/+$/g, '');
    
    console.log(` Ruta solicitada: "${trimmedPath}" | Método: ${request.method}`);
    
    // Obtener el handler para la ruta
    const handler = routes[trimmedPath];
    
    if (handler) {
        // Si existe un handler, ejecutarlo
        handler(request, response);
    } else {
        // Si no existe, error 404
        response.writeHead(404, { "Content-Type": "application/json" });
        response.write(JSON.stringify({
            "error": "Ruta no encontrada",
            "requestedPath": pathname,
            "availableRoutes": Object.keys(routes).map(route => route || '/'),
            "timestamp": new Date().toISOString()
        }, null, 2));
        response.end();
    }
};