import express, {Application, Request, Response, NextFunction} from 'express';


/**
const app: express.Application = express()

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello');
});

const port: number = 9000;
app.listen(port, () => console.log(`Listenning on port ${port}`))
// const text: String = "aaa";

// const numbers: number[] = [1, 2, 3];

// console.log("Hi");

// ^^^^^^^^^^^^^^^^^^^^^^^^6

*/

import config from './config';
import logger from './logger';
import ExpressServer from './expressServer';

interface MyInterface {
    // isAcceptable(s: string): boolean;
    expressServer: ExpressServer
}


// const launchServer: () => Promise<void> = async () => {
//     let expressServer: ExpressServer | null = null
//     try {
//         expressServer = new ExpressServer(config.URL_PORT, config.OPENAPI_YAML);
//         await expressServer.launch();
//         logger.info('Express server running');
//     } catch (error) {
//         logger.error(error);
//     } finally {
//         if (expressServer != null){
//             await expressServer.close();
//         }
//     }
// };

// let expressServer: ExpressServer | null = null
// try {
//     expressServer = new ExpressServer(config.URL_PORT, config.OPENAPI_YAML);
//     expressServer.launch();
//     logger.info('Express server running');
// } catch (error) {
//     logger.error(error);
// } finally {
//     if (expressServer != null){
//         expressServer.close();
//     }
// }

const expressServer = new ExpressServer(config.URL_PORT, config.OPENAPI_YAML);
expressServer.launch()
// const a = expressServer.app
// a.listen(config.URL_PORT, () => console.log(`Listenning on port ${config.URL_PORT}`))

// launchServer().catch(e => logger.error(e));
logger.info("hi")
