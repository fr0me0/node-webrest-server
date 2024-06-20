import { Router } from "express";
import { TodosController } from './todos/controller';
import { TodoRoutes } from './todos/routes';

export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        const todoController = new TodosController()

        // * Esto manejará todas las rutas
        router.use('/api/todos', TodoRoutes.routes); // -> [(a, b) => myFunction(a, b)]

        return router;
    }
}