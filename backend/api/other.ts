import {Request, Response, Router} from 'express';
import LearningPackage from '../config/learningPackage.model';
import UserLearningPackage from "../config/userLearningPackage.model";
import UserLearningFact from "../config/userLearningFact.model";

const router = Router();

const HTTP_CREATED: number = 201;
const HTTP_BAD_REQUEST: number = 400;
const HTTP_NOT_FOUND: number = 404;
const HTTP_INTERNAL_SERVER_ERROR: number = 500;

router.get('/statistics/user/:userId', async (req: Request, res: Response) => {
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
        globalProgress += userLearningPackages[i].progress / nbPackages;
    }

    statistics.push({globalProgress: globalProgress});

    // Send the number of packages created by the user
    const nbCreatedPackages = await LearningPackage.count({where: {creatorId: userId}});

    statistics.push({nbCreatedPackages: nbCreatedPackages});

    res.status(200).send(statistics);
});

export default router;
