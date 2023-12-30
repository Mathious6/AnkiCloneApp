import {Express} from 'express';
import {config} from 'dotenv';
import {serve as swaggerServe, setup as swaggerSetup} from 'swagger-ui-express';
import {load as yamlLoad} from 'js-yaml';
import {readFileSync} from 'fs';
import * as path from 'path';

config();

const setupSwagger = (app: Express) => {
    try {
        const swaggerDocument = yamlLoad(readFileSync(path.join(__dirname, '../openapi.yaml'), 'utf8'));
        app.use('/api-docs', swaggerServe, swaggerSetup(swaggerDocument));
    } catch (error) {
        console.error('Error initializing swagger:', error);
    }
};

export default setupSwagger;