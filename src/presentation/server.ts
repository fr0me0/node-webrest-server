import express, { Router } from 'express';
import compression from 'compression';
import path from 'path';

interface Options {
    port: number;
    routes: Router;
    public_path?: string;
}

export class Server {
    private app = express();
    private readonly port: number;
    private readonly routes: Router;
    private readonly publicPath: string;

    constructor(options: Options) {
        const { port, routes: routes, public_path = 'public' } = options;
        this.port = port;
        this.routes = routes;
        this.publicPath = public_path;
    }

    async start() {
        // * Middleware (serán funciones que se ejecutarán)
        this.app.use(express.json()); // !Parsear el body a un JSON
        this.app.use(express.urlencoded({ extended: true })); // !Parsear a x-www-form-urlencoded
        this.app.use(compression())

        // * Public Folder
        this.app.use(express.static(this.publicPath));

        // * Routes
        this.app.use(this.routes);

        // * Manejo de rutas no definidas (ayuda a los SPA)
        this.app.get('*', (req, res) => { // Cualquier peticion get representa el *
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);

            res.sendFile(indexPath);
        });

        // * Puerto a escuchar
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}