import {Request, Response, Router} from 'express';

import LearningPackage from '../config/learningPackage.model';
import User from '../config/user.model';
import UserLearningPackage from "../config/userLearningPackage.model";
import LearningFact from "../config/learningFact.model";
import UserLearningFact from "../config/userLearningFact.model";

const router = Router();
const HTTP_CREATED: number = 201;
const HTTP_BAD_REQUEST: number = 400;
const HTTP_NOT_FOUND: number = 404;
const HTTP_INTERNAL_SERVER_ERROR: number = 500;

router.post('/user/:userId/package/:packageId/start-session', async (req: Request, res: Response) => {
    const userId: number = +req.params.userId;
    const packageId: number = +req.params.packageId;
    const {expectedEndDate, minutesPerDayObjective} = req.body;
    console.log(`Handling POST request for /api/user/${userId}/package/${packageId}/start-session. Data:`, req.body);

    if (!expectedEndDate || !minutesPerDayObjective) {
        res.status(HTTP_BAD_REQUEST).send({error: 'Mandatory fields are missing'});
        return;
    }

    try {
        const user: User = await User.findByPk(userId);
        const learningPackage: LearningPackage = await LearningPackage.findByPk(packageId);

        if (!user) {
            res.status(HTTP_NOT_FOUND).send({message: `User with ID ${userId} not found.`});
            return;
        }

        if (!learningPackage) {
            res.status(HTTP_NOT_FOUND).send({message: `Package with ID ${packageId} not found.`});
            return;
        }

        let userPackageLearning: UserLearningPackage = await UserLearningPackage.findOne({
            where: {
                learningPackageId: packageId,
                userId: userId
            }
        });
        if (userPackageLearning) {
            userPackageLearning.expectedEndDate = expectedEndDate;
            userPackageLearning.minutesPerDayObjective = minutesPerDayObjective;
            await userPackageLearning.save();
        } else {
            userPackageLearning = await UserLearningPackage.create({
                learningPackageId: packageId,
                userId: userId,
                expectedEndDate: expectedEndDate,
                minutesPerDayObjective: minutesPerDayObjective
            });
        }

        res.status(HTTP_CREATED).send(userPackageLearning);
    } catch (error) {
        console.error("Error starting session:", error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({message: "Internal Server Error"});
    }
});

router.post('/user/:userId/:factId/answer', async (req: Request, res: Response) => {
    const userId: number = +req.params.userId;
    const factId: number = +req.params.factId;
    const {confidenceLevel} = req.body;
    console.log(`Handling POST request for /api/user/${userId}/${factId}/answer. Data:`, req.body);

    if (!confidenceLevel) {
        res.status(HTTP_BAD_REQUEST).send({error: 'Mandatory fields are missing'});
        return;
    }

    try {
        const user: User = await User.findByPk(userId);
        const learningFact: LearningFact = await LearningFact.findByPk(factId);

        if (!user) {
            res.status(HTTP_NOT_FOUND).send({message: `User with ID ${userId} not found.`});
            return;
        }

        if (!learningFact) {
            res.status(HTTP_NOT_FOUND).send({message: `Fact with ID ${factId} not found.`});
            return;
        }

        let userLearningFact: UserLearningFact = await UserLearningFact.findOne({
            where: {
                userId: userId,
                factId: factId
            }
        });

        const date: Date = new Date();
        const nexReviewDate: Date = new Date();
        switch (confidenceLevel) {
            case 1:
                nexReviewDate.setDate(date.getDate() + 1);
                break;
            case 2:
                nexReviewDate.setDate(date.getDate() + 2);
                break;
            case 3:
                nexReviewDate.setDate(date.getDate() + 4);
                break;
        }

        if (userLearningFact) {
            userLearningFact.confidenceLevel = confidenceLevel;
            userLearningFact.nextReviewDate = nexReviewDate;
            userLearningFact.lastReviewed = date;
            await userLearningFact.save();
        } else {
            userLearningFact = await UserLearningFact.create({
                userId: userId,
                factId: factId,
                confidenceLevel: confidenceLevel,
                nextReviewDate: nexReviewDate,
            });
        }

        res.status(HTTP_CREATED).send(userLearningFact);
    } catch (error) {
        console.error("Error answering fact:", error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({message: "Internal Server Error"});
    }
});

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

    for (let i = 0; i < 14; i++) {
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
