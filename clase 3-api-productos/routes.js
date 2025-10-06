import * as api from './api.js';

export const routes = {
    '': api.home,                    // Ruta raíz
    'products': api.productsHandler, // Ruta /products
    'users': api.usersHandler        // Ruta /users
};