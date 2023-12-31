import * as express from 'express';
import {Express} from 'express';
import {config} from 'dotenv';
import setupDatabase from '../config/database';
import setupRoutes from '../config/routes';
import setupSwagger from '../config/swagger';

config();
const app: Express = express();
const PORT: string | 3000 = process.env.PORT || 3000;
const shouldSeedDB = process.argv.includes('--seed');

app.use(express.json());

setupDatabase(shouldSeedDB)
    .then(() => setupRoutes(app))
    .then(() => setupSwagger(app))
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
            console.log(`Swagger documentation is available at http://localhost:${PORT}/api-docs`);
            console.log(`Database is running on ${process.env.DB_HOST}:${process.env.DB_PORT}`)
            console.log('Press Ctrl+C to stop the server');
        });
    }).catch(error => console.error(error));