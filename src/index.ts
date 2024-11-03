import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { Server } from 'http';
import config from './app/config';
import router from './router';

const app: Application = express();
let server: Server;

// parser
app.use(express.json());
app.use(cors());

// root endpoint
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

// application route
app.use('/api/v1', router)

// not found route
app.all('*', (req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Endpoint Not Found",
    });
});

server = app.listen(config.port || 5000, () => {
    console.log(`MedPro is listening on port ${config.port || 5000}`);
});

// async error handle
process.on('unhandledRejection', () => {
    console.log('unhandledRejection is detected! shutting down the server...');

    if (server) {
        server.close(() => {
            process.exit(1);

        });
    };

    process.exit(1);
});


// synchronies error handle
process.on('uncaughtException', () => {
    console.log('uncaughtException is detected! shutting down the server...');
    process.exit();
});