import {Sequelize} from 'sequelize';
import {config} from 'dotenv';
import User from './models/user.model';
import LearningPackage from './models/learningPackage.model';
import UserLearningPackage from './models/userLearningPackage.model';
import LearningFact from './models/learningFact.model';
import UserLearningFact from './models/userLearningFact.model';
import Tag from './models/tag.model';
import LearningPackageTag from './models/learningPackageTag.model';

config();
const DB_NAME: string = process.env.DB_NAME || null;
const DB_USER: string = process.env.DB_USER || null;
const DB_PASSWORD: string = process.env.DB_PASSWORD || null;
const DB_HOST: string = process.env.DB_HOST || null;
const DB_PORT: number = Number(process.env.DB_PORT) || null;

const setupDatabase = async (): Promise<void> => {
    if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_PORT) {
        console.error('Missing database environment variables, refer to the BUILD.md file to set them up.');
        process.exit(1);
    }

    const sequelize: Sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        port: Number(DB_PORT),
        dialect: 'postgres',
        logging: false, // set to console.log to see the raw SQL queries
        define: {
            timestamps: false // true by default. false because default sequelize adds createdAt, modifiedAt
        }
    });

    User.initModel(sequelize);

    LearningPackage.initModel(sequelize);
    UserLearningPackage.initModel(sequelize);

    LearningFact.initModel(sequelize);
    UserLearningFact.initModel(sequelize);

    Tag.initModel(sequelize);
    LearningPackageTag.initModel(sequelize);

    await sequelize.sync();

    //TODO: Add a flag to seed the database or not
    // await seedDatabase(sequelize)
};

export default setupDatabase;