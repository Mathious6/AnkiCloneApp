import {Request, Response, Router} from 'express';
import LearningPackage from '../config/models/learningPackage.model';
import UserLearningPackage from "../config/models/userLearningPackage.model";
import UserLearningFact from "../config/models/userLearningFact.model";
import {HTTP_INTERNAL_SERVER_ERROR, HTTP_OK} from "../utils/httpCodes";

const router = Router();

router.get('/statistics/user/:userId', async (req: Request, res: Response) => {
    try {
        const userId: number = +req.params.userId;
        const statistics = []

        const userLearningFacts = await UserLearningFact.findAll({
            where: {
                userId: userId
            }
        });

        // Send a dict with the date of the 14 next days and the number of facts to review for each day
        const today = new Date();
        const nextDays = {};

        for (let i = 0; i < 17; i++) {
            const dayToCheck = new Date(today);
            dayToCheck.setDate(today.getDate() + i);

            const nbFacts = userLearningFacts.filter(fact =>
                new Date(fact.nextReviewDate).toDateString() === dayToCheck.toDateString()
            ).length;

            const formattedDate = dayToCheck.toLocaleDateString('fr');
            nextDays[formattedDate] = nbFacts;
        }

        statistics.push({nextDays: nextDays});

        // Send the number of facts to review today
        const todayFacts = nextDays[today.toLocaleDateString('fr')];
        statistics.push({todayFacts: todayFacts});

        // Send the global progress on all the started packages
        const userLearningPackages = await UserLearningPackage.findAll({
            where: {
                userId: userId
            }
        });

        const nbPackages = userLearningPackages.length;
        let globalProgress = 0;

        for (let i = 0; i < nbPackages; i++) {
            if (!isNaN(userLearningPackages[i].progress)) {
                globalProgress += userLearningPackages[i].progress / nbPackages;
            }
        }

        statistics.push({globalProgress: globalProgress});

        // Send the number of packages created by the user
        const nbCreatedPackages = await LearningPackage.count({where: {creatorId: userId}});

        statistics.push({nbCreatedPackages: nbCreatedPackages});

        res.status(HTTP_OK).send(statistics);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

export default router;
