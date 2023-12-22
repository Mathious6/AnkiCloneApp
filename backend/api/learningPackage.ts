import {Request, Response} from 'express';
import { Router } from 'express';
import LearningPackage from '../config/learningPackage.model';
import User from "../config/user.model";

const router = Router();

const HTTP_OK: number = 200;
const HTTP_CREATED: number = 201;
const HTTP_BAD_REQUEST: number = 400;
const HTTP_NOT_FOUND: number = 404;
const HTTP_INTERNAL_SERVER_ERROR: number = 500;

// LEARNING PACKAGES API

router.get('/package', async (_req: Request, res: Response) => {
    console.log('Handling GET request for /api/package');

    try {
        const learningPackages: LearningPackage[] = await LearningPackage.findAll();
        res.status(HTTP_OK).send(learningPackages);
    } catch (error) {
        console.error("Error fetching packages:", error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({message: "Internal Server Error"});
    }
});

router.get('/package-summaries', async (_req: Request, res: Response) => {
    console.log('Handling GET request for /api/package-summaries');

    try {
        const learningPackagesSummaries: LearningPackage[] = await LearningPackage.findAll({attributes: ['packageId', 'title']});
        res.status(HTTP_OK).send(learningPackagesSummaries);
    } catch (error) {
        console.error("Error fetching package summaries:", error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({message: "Internal Server Error"});
    }
});

router.get('/package/search', async (req: Request, res: Response) => {
    const titleQuery: string = req.query.title?.toString().toLowerCase();
    const descriptionQuery: string = req.query.description?.toString().toLowerCase();
    const categoryQuery: string = req.query.category?.toString().toLowerCase();
    console.log(`Handling GET request for /api/package/search. Title: ${titleQuery}, Description: ${descriptionQuery}, Category: ${categoryQuery}`);

    try {
        const learningPackages: LearningPackage[] = await LearningPackage.findAll();

        const filteredPackages: LearningPackage[] = learningPackages.filter((learningPackage: LearningPackage) => {
            const titleMatch: boolean = titleQuery ? learningPackage.title.toLowerCase().includes(titleQuery) : true;
            const descriptionMatch: boolean = descriptionQuery ? learningPackage.description.toLowerCase().includes(descriptionQuery) : true;
            const categoryMatch: boolean = categoryQuery ? learningPackage.category.toLowerCase().includes(categoryQuery) : true;

            return titleMatch && descriptionMatch && categoryMatch;
        });

        if (filteredPackages.length === 0) {
            res.status(HTTP_NOT_FOUND).send({message: 'No matching packages found.'});
        } else {
            res.status(HTTP_OK).send(filteredPackages);
        }
    } catch (error) {
        console.error("Error fetching packages:", error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({message: "Internal Server Error"});
    }
});

router.get('/package/:id', async (req: Request, res: Response) => {
    const id: number = +req.params.id;
    console.log(`Handling GET request for /api/package/${id}`);

    try {
        const learningPackage: LearningPackage = await LearningPackage.findByPk(id);

        if (learningPackage) {
            res.status(HTTP_OK).send(learningPackage);
        } else {
            res.status(HTTP_NOT_FOUND).send({message: `Package with ID ${id} not found.`});
        }
    } catch (error) {
        console.error(`Error fetching package with ID ${id}:`, error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({message: "Internal Server Error"});
    }
});

router.post('/package', async (req: Request, res: Response) => {
    const title: string = req.body.title;
    const description: string = req.body.description;
    const category: string = req.body.category;
    const targetAudience: string = req.body.targetAudience;
    const duration: number = req.body.duration;
    const creatorId: number = req.body.creatorId;

    console.log('Handling POST request for /api/package. Data:', req.body);

    if (!title || !description || !category || !targetAudience || typeof duration !== 'number' || typeof creatorId !== 'number') {
        res.status(HTTP_BAD_REQUEST).send({error: 'Mandatory fields are missing or invalid'});
    } else {
        try {
            const userExists: User | null = await User.findByPk(creatorId);
            if (!userExists) {
                return res.status(HTTP_BAD_REQUEST).send({error: `User with ID ${creatorId} does not exist.`});
            }

            const creationDate: Date = new Date();
            const newPackage = {title, description, category, targetAudience, duration, creationDate, creatorId};
            const createdPackage: LearningPackage = await LearningPackage.create(newPackage);
            res.status(HTTP_CREATED).send(createdPackage);
        } catch (error) {
            console.error("Error creating package:", error);
            res.status(HTTP_INTERNAL_SERVER_ERROR).send({message: "Internal Server Error"});
        }
    }
});

router.put('/package/:id', async (req: Request, res: Response) => {
    const id: number = +req.params.id;
    const {title, description, category, targetAudience, duration} = req.body;
    console.log('Handling PUT request for /api/package/:id. Data:', req.body);

    if (!title || !description || !category || !targetAudience || typeof duration !== 'number') {
        res.status(HTTP_BAD_REQUEST).send({error: 'Mandatory fields are missing'});
    } else {
        try {
            const learningPackage: LearningPackage = await LearningPackage.findByPk(id);
            const creatorId: number = learningPackage.creatorId;
            const creationDate: Date = learningPackage.creationDate;
            const newPackage = {title, description, category, targetAudience, duration, creationDate, creatorId};
            const [updatedRowsCount, [updatedPackage]] = await LearningPackage.update(newPackage, {
                where: {packageId: id},
                returning: true
            });
            if (updatedRowsCount > 0) {
                res.status(HTTP_OK).send(updatedPackage);
            } else {
                res.status(HTTP_NOT_FOUND).send({message: `Package not found for id: ${id}`});
            }
        } catch (error) {
            console.error("Error updating package:", error);
            res.status(HTTP_INTERNAL_SERVER_ERROR).send({message: "Internal Server Error"});
        }
    }
});

export default router;