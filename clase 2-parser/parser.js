// parser.js - Módulo principal del parser
export const parser = (request) => {
    return new Promise((resolve, reject) => {
        let chunks = [];
        
        // Verificar headers primero
        const contentType = request.headers['content-type'];
        if (!contentType || !contentType.includes('application/json')) {
            reject(new Error('Content-Type debe ser application/json'));
            return;
        }
        
        // Recoger los chunks de datos
        request.on("data", (chunk) => {
            chunks.push(chunk);
        });
        
        // Cuando termina la recepción de datos
        request.on("end", () => {
            try {
                // Verificar si hay datos
                if (chunks.length === 0) {
                    reject(new Error('No se recibió ningún dato en el cuerpo de la solicitud'));
                    return;
                }
                
                // Unir todos los buffers y convertir a string
                const data = Buffer.concat(chunks).toString();
                
                // Verificar si la cadena está vacía
                if (!data || data.trim() === '') {
                    reject(new Error('El cuerpo de la solicitud está vacío'));
                    return;
                }
                
                console.log('📝 Datos crudos recibidos:', data);
                
                // Parsear el JSON
                const jsonData = JSON.parse(data);
                
                // Resolver la promesa con los datos parseados
                resolve(jsonData);
            } catch (error) {
                // Rechazar si hay error en el parseo
                reject(new Error(`Error parsing JSON: ${error.message}`));
            }
        });
        
        // Manejar errores en la solicitud
        request.on("error", (error) => {
            reject(error);
        });
    });
};