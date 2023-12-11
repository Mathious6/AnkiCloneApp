// IMPORTS
import * as express from 'express';
import {Express} from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

// IMPORTS FOR SWAGGER
import {serve as swaggerServe, setup as swaggerSetup} from 'swagger-ui-express';
import {readFileSync} from 'fs';
import {load as yamlLoad} from 'js-yaml';

// MODELS
import {sequelize} from '../config/database';
import LearningPackage from '../config/learningPackage.model';
import LearningFact from '../config/learningFact.model';
import User from '../config/user.model';
import UserPackageLearning from "../config/userPackageLearning.model";
import UserLearningFact from "../config/userLearningFact.model";
import Tag from "../config/tag.model";
import LearningPackageTag from "../config/learningPackageTag.model";

// IMPORTS FOR API
import learningPackageApi from '../api/learningPackage';
import learningFactApi from '../api/learningFact';
import userApi from '../api/user';
import otherApi from '../api/other';

// CONSTANTS
const app: Express = express();
const PORT: number = 3000;

app.use(express.json());

async function initializeServer(): Promise<void> {
    try {
        await sequelize.sync();

        await User.sync();
        await LearningPackage.sync();
        await LearningFact.sync();
        await UserPackageLearning.sync();
        await UserLearningFact.sync();
        await Tag.sync();
        await LearningPackageTag.sync();

        app.listen(PORT, () => {
            console.log(
                `\nServer is running on http://localhost:${PORT}` +
                `\nSwagger docs: http://localhost:${PORT}/api-docs` +
                `\nPress CTRL+C to stop the server.`)
        });
    } catch (error) {
        console.error("Error initializing the server:", error);
    }
}

app.use('/api', learningPackageApi);
app.use('/api', learningFactApi);
app.use('/api', userApi);
app.use('/api', otherApi);

initializeServer().then(_ => console.log("Server initialized."));

const swaggerDocs = yamlLoad(readFileSync('./openapi.yaml', 'utf8'));
app.use('/api-docs', swaggerServe, swaggerSetup(swaggerDocs));