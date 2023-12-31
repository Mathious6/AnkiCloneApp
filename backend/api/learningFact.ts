import {Request, Response, Router} from 'express';
import {validationResult} from "express-validator";
import {HTTP_BAD_REQUEST, HTTP_INTERNAL_SERVER_ERROR, HTTP_NOT_FOUND, HTTP_OK, HTTP_UPDATED} from "../utils/httpCodes"
import LearningFact from '../config/models/learningFact.model';
import LearningPackage from "../config/models/learningPackage.model";
import User from "../config/models/user.model";
import UserLearningFact from "../config/models/userLearningFact.model";
import {validator_fact, validator_userLearningFact} from "../utils/validator";

const router = Router();

router.get('', async (_req: Request, res: Response) => {
    try {
        const learningFacts: LearningFact[] = await LearningFact.findAll();
        res.status(HTTP_OK).send(learningFacts);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.get('/:id', async (req: Request, res: Response) => {
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

router.put('/:id', validator_fact, async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(HTTP_BAD_REQUEST).send({error: errors.array()});
        }

        const {front, back, source, relatedImage, relatedLink, packageId, creatorId} = req.body;
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

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const factId: number = +req.params.id;
        const factExists: LearningFact | null = await LearningFact.findByPk(factId);
        if (!factExists) {
            return res.status(HTTP_NOT_FOUND).send({error: `Fact with ID ${factId} does not exist.`});
        }

        await UserLearningFact.destroy({where: {factId}});
        await LearningFact.destroy({where: {factId}});

        res.status(HTTP_UPDATED).send({message: `Fact with ID ${factId} has been deleted.`});
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.put('/:id/deactivate', async (req: Request, res: Response) => {
    try {
        const factId: number = +req.params.id;
        const factExists: LearningFact | null = await LearningFact.findByPk(factId);
        if (!factExists) {
            return res.status(HTTP_NOT_FOUND).send({error: `Fact with ID ${factId} does not exist.`});
        }
        await LearningFact.update({isActive: false}, {where: {factId}});
        res.status(HTTP_UPDATED).send({message: `Fact with ID ${factId} has been deactivated.`});
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({message: error.message});
    }
});

// API fact <> user

router.get('/user/:userId', async (req: Request, res: Response) => {
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

router.put('/:id/review/:userId', validator_userLearningFact, async (req: Request, res: Response) => {
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
                reviewCount: 1,
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
        res.status(HTTP_OK).send(updatedRecord);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.get('/:id/user/:userId', validator_userLearningFact, async (req: Request, res: Response) => {
    try {
        const factId = parseInt(req.params.id);
        const factExists = await LearningFact.findByPk(factId);

        const userId = parseInt(req.params.userId);
        const userExists = await User.findByPk(userId);

        if (!factExists || !userExists) {
            return res.status(HTTP_NOT_FOUND).send({error: `Fact or User not found.`});
        }

        const updatedRecord = await UserLearningFact.findOne({where: {factId, userId}});
        res.status(HTTP_OK).send(updatedRecord);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

function getDaysToAdd(confidenceLevel: number) {
    switch (confidenceLevel) {
        case 3:
            return 3;
        case 2:
            return 7;
        case 1:
            return 15;
        default:
            return 15;
    }
}

export default router;