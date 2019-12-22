// const { Middleware } = require('swagger-express-middleware');
import path from 'path';
import swaggerUI from 'swagger-ui-express';
import yamljs from 'yamljs';
import express, {Application, Request, Response, NextFunction} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { OpenApiValidator } from 'express-openapi-validator';
import openapiRouter from './utils/openapiRouter';
import logger from './logger';

class ExpressServer {
    port!: number;
    app!: express.Application
    openApiPath!: string 
    schema!: any // Maybe it's JsonObject
    server: any
    
    constructor(port: number, openApiYaml: string) {
        this.port = port;
        this.app = express();
        this.openApiPath = openApiYaml;
        console.log(openApiYaml);
        this.schema = yamljs.load(openApiYaml);
        this.setupMiddleware();
    }

    setupMiddleware() {
        // this.setupAllowedMedia();
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use('/spec', express.static(path.join(__dirname, 'api')));

        this.app.get('/spec', express.static(this.openApiPath));
        this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(this.schema));

        new OpenApiValidator({
            apiSpec: this.openApiPath,
        }).install(this.app);
        this.app.use(openapiRouter());
        this.app.get('/', (req: Request, res: Response) => {
            res.status(200);
            res.end('Hello World');
        });
    }

    addErrorHandler() {
        this.app.use('*', (req: Request, res: Response) => {
            res.status(404);
            res.send(JSON.stringify({ error: `path ${req.baseUrl} doesn't exist` }));
        });
        /**
         * suppressed eslint rule: The next variable is required here, even though it's not used.
         *
         ** */
        // eslint-disable-next-line no-unused-vars
        this.app.use((error: any, req: Request, res: Response, next: NextFunction) => {
            const errorResponse = error.error || error.errors || error.message || 'Unknown error';
            res.status(error.status || 500);
            res.type('json');
            res.json({ error: errorResponse });
        });
    }

    launch() {
        this.server = this.app.listen(this.port, () => {
            console.log(`server running on port ${this.port}`);
        });

        // this.server = this.app.listen(this.port, () => console.log(`Listenning on port ${this.port}`))
    }
    

    // async launch() {
    //     return new Promise(
    //         async (resolve, reject) => {
    //             try {
    //                 this.addErrorHandler();
    //                 this.server = await this.app.listen(this.port, () => {
    //                     console.log(`server running on port ${this.port}`);
    //                     resolve(this.server);
    //                 });
    //             } catch (error) {
    //                 reject(error);
    //             }
    //         },
    //     );
    // }

    async close() {
        if (this.server !== undefined) {
            await this.server.close();
            console.log(`Server on port ${this.port} shut down`);
        }
    }
}

// module.exports = ExpressServer;

export default ExpressServer;