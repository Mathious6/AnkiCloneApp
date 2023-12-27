import {Request, Response, Router} from 'express';
import {body, check, validationResult} from "express-validator";
import LearningFact from '../config/learningFact.model';
import LearningPackage from "../config/learningPackage.model";
import User from "../config/user.model";
import UserLearningFact from "../config/userLearningFact.model";

const router = Router();

const HTTP_OK: number = 200;
const HTTP_UPDATED: number = 204;
const HTTP_BAD_REQUEST: number = 400;
const HTTP_NOT_FOUND: number = 404;
const HTTP_INTERNAL_SERVER_ERROR: number = 500;

const handlers_errors_fact = [
    check('front').isLength({min: 3}),
    check('back').isLength({min: 3}),
    check('source').isURL(),
    check('relatedImage').if(body('relatedImage').exists({checkFalsy: true})).isURL(),
    check('relatedLink').if(body('relatedLink').exists({checkFalsy: true})).isURL(),
]

const handlers_errors_userLearningFact = [
    check('confidenceLevel').isIn(['1', '2', '3']),
]

router.get('/fact', async (_req: Request, res: Response) => {
    try {
        const learningFacts: LearningFact[] = await LearningFact.findAll();
        res.status(HTTP_OK).send(learningFacts);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.get('/fact/user/:userId', async (req: Request, res: Response) => {
    try {
        const userId: number = +req.params.userId;
        const userExists: User | null = await User.findByPk(userId);
        if (!userExists) {
            return res.status(HTTP_NOT_FOUND).send({error: `User with ID ${userId} does not exist.`});
        }

        const userLearningFacts: UserLearningFact[] = await UserLearningFact.findAll({where: {userId}});
        res.status(HTTP_OK).send(userLearningFacts);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.get('/fact/:id', async (req: Request, res: Response) => {
    try {
        const factId: number = +req.params.id;
        const factExists: LearningFact | null = await LearningFact.findByPk(factId);
        if (!factExists) {
            return res.status(HTTP_NOT_FOUND).send({error: `Fact with ID ${factId} does not exist.`});
        }
        res.status(HTTP_OK).send(factExists);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.put('/fact/:id', handlers_errors_fact, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HTTP_BAD_REQUEST).send({error: errors.array()});
    }

    const {front, back, source, relatedImage, relatedLink, packageId, creatorId} = req.body;

    try {
        const packageExists: LearningPackage | null = await LearningPackage.findByPk(packageId);
        if (!packageExists) {
            return res.status(HTTP_NOT_FOUND).send({error: `Package with ID ${packageId} does not exist.`});
        }

        const userExists: User | null = await User.findByPk(creatorId);
        if (!userExists) {
            return res.status(HTTP_NOT_FOUND).send({error: `User with ID ${creatorId} does not exist.`});
        }

        const factId: number = +req.params.id;
        const factExists: LearningFact | null = await LearningFact.findByPk(factId);
        if (!factExists) {
            return res.status(HTTP_NOT_FOUND).send({error: `Fact with ID ${factId} does not exist.`});
        }

        const updatedFact = {front, back, source, relatedImage, relatedLink, packageId, creatorId};
        await LearningFact.update(updatedFact, {where: {factId}});
        res.status(HTTP_UPDATED).send(updatedFact);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.put('/fact/:id/deactivate', async (req: Request, res: Response) => {
    try {
        const factId: number = +req.params.id;
        const factExists: LearningFact | null = await LearningFact.findByPk(factId);
        if (!factExists) {
            return res.status(HTTP_NOT_FOUND).send({error: `Fact with ID ${factId} does not exist.`});
        }
        await LearningFact.update({active: false}, {where: {factId}});
        const updatedFact: LearningFact | null = await LearningFact.findByPk(factId);
        res.status(HTTP_UPDATED).send(updatedFact.dataValues);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({message: error.message});
    }
});

router.put('/fact/:id/review/:userId', handlers_errors_userLearningFact, async (req: Request, res: Response) => {
    try {
        const factId = parseInt(req.params.id);
        const userId = parseInt(req.params.userId);

        const factExists = await LearningFact.findByPk(factId);
        const userExists = await User.findByPk(userId);

        if (!factExists || !userExists) {
            return res.status(HTTP_NOT_FOUND).send({error: `Fact or User not found.`});
        }

        const daysToAdd = getDaysToAdd(req.body.confidenceLevel);
        const nextReviewDate = new Date();
        nextReviewDate.setDate(nextReviewDate.getDate() + daysToAdd);

        const [userLearningFact, created] = await UserLearningFact.findOrCreate({
            where: {factId, userId},
            defaults: {
                reviewCount: 0,
                confidenceLevel: req.body.confidenceLevel,
                lastReviewed: new Date(),
                nextReviewDate
            }
        });

        if (!created) {
            const updatedUserLearningFact = {
                reviewCount: userLearningFact.reviewCount + 1,
                confidenceLevel: req.body.confidenceLevel,
                lastReviewed: new Date(),
                nextReviewDate
            };

            await UserLearningFact.update(updatedUserLearningFact, {where: {factId, userId}});
        }

        const updatedRecord = await UserLearningFact.findOne({where: {factId, userId}});
        res.status(HTTP_UPDATED).send(updatedRecord);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

function getDaysToAdd(confidenceLevel: String) {
    switch (confidenceLevel) {
        case '1':
            return 3;
        case '2':
            return 2;
        case '3':
            return 1;
        default:
            return 3;
    }
}


export default router;