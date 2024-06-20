import { Request, Response } from 'express';

const todos = [
    { id: 1, text: 'Buy milk', completedAt: new Date() },
    { id: 2, text: 'Buy bread', completedAt: null },
    { id: 3, text: 'Buy butter', completedAt: new Date() },
];

export class TodosController {
    // * DI
    constructor() { }

    public getTodos = (req: Request, res: Response) => {
        return res.json(todos);
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id; // + hará la conversión tras recibir un string

        if (isNaN(id)) return res.status(400).json({ error: 'ID is not a number' })

        const todo = todos.find(todo => todo.id === id);

        todo
            ? res.json(todo)
            : res.status(404).json({ error: `ToDo with id ${id} not found` });
    };

    public createTodo = (req: Request, res: Response) => {
        const { text } = req.body;

        if (!text) return res.status(400).json({ error: 'Text property is required' });

        const newTodo = {
            id: todos.length + 1,
            text,
            completedAt: null
        }

        todos.push(newTodo);
        res.json(newTodo);
    };

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id; // + hará la conversión tras recibir un string

        if (isNaN(id)) return res.status(400).json({ error: 'ID is not a number' })

        const todo = todos.find(todo => todo.id === id);
        if (!todo) return res.status(400).json({ error: `ToDo with id ${id} not found` });

        const { text, completedAt } = req.body;

        // ! La update se llevará a cabo modificando el objeto original, recordar que los objetos pasan por referencia
        todo.text = text || todo.text; // Cambiar solo si viene el valor
        (completedAt === null)
            ? todo.completedAt = null
            : todo.completedAt = new Date(completedAt || todo.completedAt);
        /*  Para evitar esto de la referencia se podría hacer:
            _todos.forEach((_todo, index) => {
                if (_todo.id === id) {
                    _todos[index] = _todo;
                }
            });

        */


        res.json(todo);
    };

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID is not a number' });

        const todo = todos.find(todo => todo.id === id);
        if (!todo) return res.status(400).json({ error: `ToDo with id ${id} not found` });

        todos.splice(todos.indexOf(todo), 1);
        res.json(todo);
    };
}