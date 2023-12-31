import {Request, Response, Router} from 'express';
import {validator_fact, validator_package} from "../utils/validator";
import {validationResult} from "express-validator";
import {Op} from "sequelize";
import {
    HTTP_BAD_REQUEST,
    HTTP_CREATED,
    HTTP_INTERNAL_SERVER_ERROR,
    HTTP_NOT_FOUND,
    HTTP_OK,
    HTTP_UPDATED
} from "../utils/httpCodes";

import LearningPackage from '../config/models/learningPackage.model';
import LearningFact from "../config/models/learningFact.model";
import User from "../config/models/user.model";
import LearningPackageTag from "../config/models/learningPackageTag.model";
import Tag from "../config/models/tag.model";
import UserLearningPackage from "../config/models/userLearningPackage.model";
import UserLearningFact from "../config/models/userLearningFact.model";

const router = Router();

router.get('', async (_req: Request, res: Response) => {
    try {
        const learningPackages: LearningPackage[] = await LearningPackage.findAll();
        res.status(HTTP_OK).send(learningPackages);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.post('', validator_package, async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(HTTP_BAD_REQUEST).send({error: errors.array()});
        }

        const {title, description, category, targetAudience, duration, creatorId} = req.body;
        const userExists: User | null = await User.findByPk(creatorId);
        if (!userExists) {
            return res.status(HTTP_NOT_FOUND).send({error: `User with ID ${creatorId} does not exist.`});
        }

        const newPackage = {title, description, category, targetAudience, duration, creatorId};
        const createdPackage: LearningPackage = await LearningPackage.create(newPackage);
        res.status(HTTP_CREATED).send(createdPackage);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.get('/summary', async (_req: Request, res: Response) => {
    try {
        const learningPackagesSummaries: LearningPackage[] = await LearningPackage.findAll({attributes: ['packageId', 'title']});
        res.status(HTTP_OK).send(learningPackagesSummaries);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.get('/search', async (req: Request, res: Response) => {
    try {
        const titleQuery = req.query.title?.toString().toLowerCase() || '';
        const tagQuery = req.query.tag?.toString().toLowerCase() || '';

        let learningPackagesByTitle = [];
        let learningPackagesByTag = [];

        if (titleQuery) {
            learningPackagesByTitle = await LearningPackage.findAll({
                where: {title: {[Op.iLike]: `%${titleQuery}%`}}
            });
        }

        if (tagQuery) {
            const tags = await Tag.findAll({
                where: {englishKeyword: {[Op.iLike]: `%${tagQuery}%`}}
            });
            const tagIds = tags.map(tag => tag.tagId);

            const learningPackageTags = await LearningPackageTag.findAll({
                where: {tagId: {[Op.in]: tagIds}}
            });
            const packageIds = learningPackageTags.map(pkgTag => pkgTag.packageId);

            learningPackagesByTag = await LearningPackage.findAll({
                where: {packageId: {[Op.in]: packageIds}}
            });
        }

        const allLearningPackages = [...learningPackagesByTitle, ...learningPackagesByTag];
        const uniqueLearningPackages = Array.from(new Set(allLearningPackages.map(pkg => pkg.packageId)))
            .map(id => {
                return allLearningPackages.find(pkg => pkg.packageId === id);
            });

        if (uniqueLearningPackages.length === 0) {
            return res.status(HTTP_NOT_FOUND).send({message: 'No matching packages found.'});
        } else {
            return res.status(HTTP_OK).send(uniqueLearningPackages);
        }
    } catch (error) {
        console.error(error);
        return res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.post('/search-title', async (req: Request, res: Response) => {
    try {
        const {title} = req.body;
        if (!title) {
            return res.status(HTTP_BAD_REQUEST).send({error: 'Title is required in the request body.'});
        }

        const learningPackage: LearningPackage | null = await LearningPackage.findOne({
            where: {title},
        });

        if (!learningPackage) {
            return res.status(HTTP_NOT_FOUND).send({error: `LearningPackage with title ${title} not found.`});
        }

        res.status(HTTP_OK).send(learningPackage);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const learningPackage: LearningPackage = await LearningPackage.findByPk(req.params.id);
        if (!learningPackage) {
            return res.status(HTTP_NOT_FOUND).send({message: `Package not found for id: ${req.params.id}`});
        }
        res.status(HTTP_OK).send(learningPackage);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.put('/:id', validator_package, async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(HTTP_BAD_REQUEST).send({error: errors.array()});
        }

        const learningPackage: LearningPackage = await LearningPackage.findByPk(req.params.id);
        if (!learningPackage) {
            return res.status(HTTP_NOT_FOUND).send({error: `Package not found for id: ${req.params.id}`});
        }

        const {title, description, category, targetAudience, duration} = req.body;
        const updatedPackage = {title, description, category, targetAudience, duration};
        await learningPackage.update(updatedPackage);
        res.status(HTTP_UPDATED).send(updatedPackage);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const learningPackage: LearningPackage = await LearningPackage.findByPk(req.params.id);
        if (!learningPackage) {
            return res.status(HTTP_NOT_FOUND).send({error: `Package not found for id: ${req.params.id}`});
        }

        const learningFacts: LearningFact[] = await LearningFact.findAll({where: {packageId: req.params.id}});
        const factsIds = learningFacts.map(fact => fact.factId);

        await UserLearningFact.destroy({where: {factId: {[Op.in]: factsIds}}});
        await UserLearningPackage.destroy({where: {learningPackageId: req.params.id}});
        await LearningFact.destroy({where: {packageId: req.params.id}});
        await LearningPackageTag.destroy({where: {packageId: req.params.id}});
        await learningPackage.destroy();

        res.status(HTTP_UPDATED).send({message: `Package deleted for id: ${req.params.id}`});
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

// API package <> fact

router.get('/:id/fact', async (req: Request, res: Response) => {
    try {
        const learningFacts: LearningFact[] = await LearningFact.findAll({where: {packageId: req.params.id}});
        res.status(HTTP_OK).send(learningFacts);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.post('/:id/fact', validator_fact, async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(HTTP_BAD_REQUEST).send({error: errors.array()});
        }

        const packageId: number = +req.params.id;
        const packageExists: LearningPackage | null = await LearningPackage.findByPk(packageId);
        if (!packageExists) {
            return res.status(HTTP_NOT_FOUND).send({error: `Package with ID ${packageId} does not exist.`});
        }

        const {front, back, source, relatedImage, relatedLink, creatorId} = req.body;
        const userExists: User | null = await User.findByPk(creatorId);
        if (!userExists) {
            return res.status(HTTP_NOT_FOUND).send({error: `User with ID ${creatorId} does not exist.`});
        }
        const newFact = {front, back, source, relatedImage, relatedLink, packageId, creatorId};
        const createdFact: LearningFact = await LearningFact.create(newFact);
        res.status(HTTP_CREATED).send(createdFact);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

// API package <> tag

router.get('/:id/tag', async (req: Request, res: Response) => {
    try {
        const packageTags: LearningPackageTag[] = await LearningPackageTag.findAll({
            where: {packageId: req.params.id}
        });
        const tagIds = packageTags.map(pkgTag => pkgTag.tagId);
        const tags: Tag[] = await Tag.findAll({
            where: {tagId: tagIds}
        });
        res.status(HTTP_OK).send(tags);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.post('/:id/tag', async (req: Request, res: Response) => {
    try {
        const packageId: number = +req.params.id;
        const packageExists: LearningPackage | null = await LearningPackage.findByPk(packageId);
        if (!packageExists) {
            return res.status(HTTP_NOT_FOUND).send({error: `Package with ID ${packageId} does not exist.`});
        }

        const {tagId} = req.body;
        const tagExists: Tag | null = await Tag.findByPk(tagId);
        if (!tagExists) {
            return res.status(HTTP_NOT_FOUND).send({error: `Tag with ID ${tagId} does not exist.`});
        }

        const packageTagExists: LearningPackageTag | null = await LearningPackageTag.findOne({
            where: {
                packageId,
                tagId
            }
        });
        if (packageTagExists) {
            return res.status(HTTP_BAD_REQUEST).send({error: `Tag with ID ${tagId} is already associated with package with ID ${packageId}.`});
        }

        const newPackageTag = {packageId, tagId};
        const createdPackageTag: LearningPackageTag = await LearningPackageTag.create(newPackageTag);
        res.status(HTTP_CREATED).send(createdPackageTag);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.delete('/:id/tag/:tagId', async (req: Request, res: Response) => {
    try {
        const packageId: number = +req.params.id;
        const packageExists: LearningPackage | null = await LearningPackage.findByPk(packageId);
        if (!packageExists) {
            return res.status(HTTP_NOT_FOUND).send({error: `Package with ID ${packageId} does not exist.`});
        }

        const tagId: number = +req.params.tagId;
        const tagExists: Tag | null = await Tag.findByPk(tagId);
        if (!tagExists) {
            return res.status(HTTP_NOT_FOUND).send({error: `Tag with ID ${tagId} does not exist.`});
        }

        await LearningPackageTag.destroy({where: {packageId, tagId}});
        res.status(HTTP_UPDATED).send({message: `Tag with ID ${tagId} was removed from package with ID ${packageId}.`});
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

// API package <> user

router.get('/user/:userId', async (req: Request, res: Response) => {
    try {
        const userId = +req.params.userId;
        const userExists = await User.findByPk(userId);
        if (!userExists) {
            return res.status(HTTP_NOT_FOUND).send({error: `User with ID ${userId} does not exist.`});
        }

        const userLearningPackages = await UserLearningPackage.findAll({
            where: {userId}
        });

        const learningPackageIds = userLearningPackages.map(userLearningPackage => userLearningPackage.learningPackageId);

        const learningPackages = await LearningPackage.findAll({
            where: {packageId: {[Op.in]: learningPackageIds}}
        });

        let customLearningPackages = [];

        // Update the progress of the user on every package started
        for (const userLearningPackage of userLearningPackages) {
            const learningFacts = await LearningFact.findAll({where: {packageId: userLearningPackage.learningPackageId}});
            const nbFacts = learningFacts.length;

            const userLearningFacts = await UserLearningFact.findAll({
                where: {
                    userId,
                    factId: {[Op.in]: learningFacts.map(fact => fact.factId)}
                }
            });

            const nbFactsMastered = userLearningFacts.filter(userLearningFact => userLearningFact.confidenceLevel === '3').length;
            const progress = Math.round((nbFactsMastered / nbFacts) * 100);
            await userLearningPackage.update({progress});

            const packageIndex = learningPackages.findIndex(learningPackage => learningPackage.packageId === userLearningPackage.learningPackageId);
            customLearningPackages.push({
                ...learningPackages[packageIndex].toJSON(),
                progress,
                expectedEndDate: userLearningPackage.expectedEndDate,
                minutesPerDayObjective: userLearningPackage.minutesPerDayObjective
            });
        }

        res.status(HTTP_OK).send(customLearningPackages);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.get('/creator/:creatorId', async (req: Request, res: Response) => {
    try {
        const creatorId = +req.params.creatorId;
        const userExists = await User.findByPk(creatorId);
        if (!userExists) {
            return res.status(HTTP_NOT_FOUND).send({error: `User with ID ${creatorId} does not exist.`});
        }

        const learningPackages = await LearningPackage.findAll({
            where: {creatorId}
        });

        res.status(HTTP_OK).send(learningPackages);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.post('/:id/start/:userId', async (req: Request, res: Response) => {
    try {
        const packageId: number = +req.params.id;
        const packageExists: LearningPackage | null = await LearningPackage.findByPk(packageId);
        if (!packageExists) {
            return res.status(HTTP_NOT_FOUND).send({error: `Package with ID ${packageId} does not exist.`});
        }

        const userId: number = +req.params.userId;
        const userExists: User | null = await User.findByPk(userId);
        if (!userExists) {
            return res.status(HTTP_NOT_FOUND).send({error: `User with ID ${userId} does not exist.`});
        }

        const learningPackageId = packageId;
        const userPackageExists: UserLearningPackage | null = await UserLearningPackage.findOne({
            where: {
                learningPackageId,
                userId
            }
        });
        if (userPackageExists) {
            return res.status(HTTP_BAD_REQUEST).send({error: `User with ID ${userId} has already started package with ID ${packageId}.`});
        }

        const newUserPackage = {learningPackageId, userId};
        const createdUserPackage: UserLearningPackage = await UserLearningPackage.create(newUserPackage);
        res.status(HTTP_CREATED).send(createdUserPackage);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.put('/:id/reset/:userId', async (req: Request, res: Response) => {
    try {
        const learningPackageId: number = +req.params.id;
        const userId: number = +req.params.userId;

        const userPackageExists: UserLearningPackage | null = await UserLearningPackage.findOne({
            where: {
                learningPackageId,
                userId
            }
        });
        if (!userPackageExists) {
            return res.status(HTTP_NOT_FOUND).send({error: `User with ID ${userId} has not started package with ID ${learningPackageId}.`});
        }

        const resetUserPackage = {
            startDate: new Date(),
            progress: 0,
            expectedEndDate: null,
            minutesPerDayObjective: null
        };

        const learningFacts = await LearningFact.findAll({where: {packageId: learningPackageId}});
        const factsIds = learningFacts.map(fact => fact.factId);

        await UserLearningFact.destroy({where: {userId, factId: {[Op.in]: factsIds}}});
        await userPackageExists.update(resetUserPackage);

        res.status(HTTP_UPDATED).send({message: `User with ID ${userId} has reset package with ID ${learningPackageId}.`});
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.delete('/:id/stop/:userId', async (req: Request, res: Response) => {
    try {
        const learningPackageId: number = +req.params.id;
        const userId: number = +req.params.userId;

        const userPackageExists: UserLearningPackage | null = await UserLearningPackage.findOne({
            where: {
                learningPackageId,
                userId
            }
        });
        if (!userPackageExists) {
            return res.status(HTTP_NOT_FOUND).send({error: `User with ID ${userId} has not started package with ID ${learningPackageId}.`});
        }

        await userPackageExists.destroy();
        res.status(HTTP_UPDATED).send({message: `User with ID ${userId} has stopped package with ID ${learningPackageId}.`});
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.get('/:id/user/:userId/overview', async (req: Request, res: Response) => {
    try {
        const learningPackageId: number = +req.params.id;
        const userId: number = +req.params.userId;

        const userPackageExists: UserLearningPackage | null = await UserLearningPackage.findOne({
            where: {
                learningPackageId,
                userId
            }
        });
        if (!userPackageExists) {
            return res.status(HTTP_NOT_FOUND).send({error: `User with ID ${userId} has not started package with ID ${learningPackageId}.`});
        }

        const packageOverview = [];
        const learningFacts = await LearningFact.findAll({where: {packageId: learningPackageId}});
        const factsIds = learningFacts.map(fact => fact.factId);
        const userLearningFacts = await UserLearningFact.findAll({where: {userId, factId: {[Op.in]: factsIds}}});
        for (const fact of learningFacts) {
            const userLearningFact = userLearningFacts.find(userLearningFact => userLearningFact.factId === fact.factId);
            packageOverview.push({
                factId: fact.factId,
                front: fact.front,
                relatedImage: fact.relatedImage,
                lastReviewed: userLearningFact?.lastReviewed || null,
                reviewCount: userLearningFact?.reviewCount || null,
            });
        }

        res.status(HTTP_OK).send(packageOverview);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

export default router;