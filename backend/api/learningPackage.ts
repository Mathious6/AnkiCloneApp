import {Request, Response, Router} from 'express';
import {body, check, validationResult} from "express-validator";
import {Op} from "sequelize";
import LearningPackage from '../config/learningPackage.model';
import LearningFact from "../config/learningFact.model";
import User from "../config/user.model";
import LearningPackageTag from "../config/learningPackageTag.model";
import Tag from "../config/tag.model";

const router = Router();

const HTTP_OK: number = 200;
const HTTP_CREATED: number = 201;
const HTTP_UPDATED: number = 204;
const HTTP_BAD_REQUEST: number = 400;
const HTTP_NOT_FOUND: number = 404;
const HTTP_INTERNAL_SERVER_ERROR: number = 500;

const handlers_errors_p = [
    check('title').isLength({min: 3}),
    check('description').isLength({min: 3}),
    check('category').isLength({min: 3}),
    check('targetAudience').isLength({min: 3}),
    check('duration').isNumeric(),
    check('creatorId').isNumeric(),
]

const handlers_errors_f = [
    check('front').isLength({min: 3}),
    check('back').isLength({min: 3}),
    check('source').isURL(),
    check('relatedImage').if(body('relatedImage').exists({checkFalsy: true})).isURL(),
    check('relatedLink').if(body('relatedLink').exists({checkFalsy: true})).isURL(),
]

router.get('/package', async (_req: Request, res: Response) => {
    try {
        const learningPackages: LearningPackage[] = await LearningPackage.findAll();
        res.status(HTTP_OK).send(learningPackages);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({message: error.message});
    }
});

router.post('/package', handlers_errors_p, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HTTP_BAD_REQUEST).send({error: errors.array()});
    }

    const {title, description, category, targetAudience, duration, creatorId} = req.body;

    try {
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

router.get('/package/:id', async (req: Request, res: Response) => {
    try {
        const learningPackage: LearningPackage = await LearningPackage.findByPk(req.params.id);
        if (!learningPackage) {
            res.status(HTTP_NOT_FOUND).send({message: `Package not found for id: ${req.params.id}`});
        }
        res.status(HTTP_OK).send(learningPackage);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.put('/package/:id', handlers_errors_p, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HTTP_BAD_REQUEST).send({error: errors.array()});
    }

    const {title, description, category, targetAudience, duration} = req.body;

    try {
        const learningPackage: LearningPackage = await LearningPackage.findByPk(req.params.id);
        if (!learningPackage) {
            return res.status(HTTP_NOT_FOUND).send({message: `Package not found for id: ${req.params.id}`});
        }
        const updatedPackage = {title, description, category, targetAudience, duration};
        await learningPackage.update(updatedPackage);
        res.status(HTTP_UPDATED).send(updatedPackage);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.get('/package/:id/fact', async (req: Request, res: Response) => {
    try {
        const learningFacts: LearningFact[] = await LearningFact.findAll({where: {packageId: req.params.id}});
        res.status(HTTP_OK).send(learningFacts);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.post('/package/:id/fact', handlers_errors_f, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HTTP_BAD_REQUEST).send({error: errors.array()});
    }

    const {front, back, source, relatedImage, relatedLink, creatorId} = req.body;

    try {
        const packageId: number = +req.params.id;
        const packageExists: LearningPackage | null = await LearningPackage.findByPk(packageId);
        if (!packageExists) {
            return res.status(HTTP_NOT_FOUND).send({error: `Package with ID ${packageId} does not exist.`});
        }

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

router.get('/package/:id/tag', async (req: Request, res: Response) => {
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

router.post('/package/:id/tag', async (req: Request, res: Response) => {
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

router.delete('/package/:id/tag/:tagId', async (req: Request, res: Response) => {
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

router.get('/package/summary', async (_req: Request, res: Response) => {
    try {
        const learningPackagesSummaries: LearningPackage[] = await LearningPackage.findAll({attributes: ['packageId', 'title']});
        res.status(HTTP_OK).send(learningPackagesSummaries);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.get('/package/search', async (req: Request, res: Response) => {
    const titleQuery = req.query.title?.toString().toLowerCase() || null;
    const descriptionQuery = req.query.description?.toString().toLowerCase() || null;
    const categoryQuery = req.query.category?.toString().toLowerCase() || null;

    try {
        const learningPackages = await LearningPackage.findAll({
            where: {
                [Op.or]: [
                    {title: {[Op.iLike]: `%${titleQuery}%`}},
                    {description: {[Op.iLike]: `%${descriptionQuery}%`}},
                    {category: {[Op.iLike]: `%${categoryQuery}%`}}
                ]
            }
        });

        if (learningPackages.length === 0) {
            return res.status(HTTP_NOT_FOUND).send({message: 'No matching packages found.'});
        } else {
            return res.status(HTTP_OK).send(learningPackages);
        }
    } catch (error) {
        console.error(error);
        return res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});


export default router;