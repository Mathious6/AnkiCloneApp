import learningPackageApi from '../api/learningPackage';
import learningFactApi from '../api/learningFact';
import userApi from '../api/user';
import tagApi from '../api/tag';
import otherApi from '../api/other';
import {Express} from 'express';

const setupRoutes = (app: Express): void => {
    app.use('/api/package', learningPackageApi);
    app.use('/api/fact', learningFactApi);
    app.use('/api/user', userApi);
    app.use('/api/tag', tagApi);
    app.use('/api', otherApi);
};

export default setupRoutes;
