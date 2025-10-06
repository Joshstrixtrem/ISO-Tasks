export const parser = (request) => {
    return new Promise((resolve, reject) => {
        let chunks = [];
        
        const contentType = request.headers['content-type'];
        if (!contentType || !contentType.includes('application/json')) {
            reject(new Error('Content-Type debe ser application/json'));
            return;
        }
        
        request.on("data", (chunk) => {
            chunks.push(chunk);
        });
        
        request.on("end", () => {
            try {
                if (chunks.length === 0) {
                    reject(new Error('No se recibió ningún dato'));
                    return;
                }
                
                const data = Buffer.concat(chunks).toString();
                
                if (!data || data.trim() === '') {
                    reject(new Error('El cuerpo está vacío'));
                    return;
                }
                
                const jsonData = JSON.parse(data);
                resolve(jsonData);
            } catch (error) {
                reject(new Error(`Error parsing JSON: ${error.message}`));
            }
        });
        
        request.on("error", (error) => {
            reject(error);
        });
    });
};