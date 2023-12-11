import {Request, Response} from 'express';
import { Router } from 'express';
import LearningFact from '../config/learningFact.model';

const router = Router();

const HTTP_OK: number = 200;
const HTTP_CREATED: number = 201;
const HTTP_BAD_REQUEST: number = 400;
const HTTP_NOT_FOUND: number = 404;
const HTTP_INTERNAL_SERVER_ERROR: number = 500;

// LEARNING FACTS API

router.get('/package/:id_pkg/fact', async (req: Request, res: Response) => {
    const id: number = +req.params.id_pkg;
    console.log(`Handling GET request for /api/package/${id}/fact`);

    try {
        const learningFacts: LearningFact[] = await LearningFact.findAll({where: {learningPackageId: id}});
        res.status(HTTP_OK).send(learningFacts);
    } catch (error) {
        console.error(`Error fetching facts for package with ID ${id}:`, error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({message: "Internal Server Error"});
    }
});

router.post('/package/:id_pkg/fact', async (req: Request, res: Response) => {
    const learningPackageId: number = +req.params.id_pkg;
    const {front, back, source, relatedImages, relatedLinks} = req.body;
    console.log(`Handling POST request for /api/package/${learningPackageId}/facts. Data:`, req.body);

    if (!front || !back || !source) {
        res.status(HTTP_BAD_REQUEST).send({error: 'Mandatory fields are missing'});
    } else {
        try {
            const newFact = {learningPackageId, front, back, source, relatedImages, relatedLinks};
            const createdFact: LearningFact = await LearningFact.create(newFact);
            res.status(HTTP_CREATED).send(createdFact);
        } catch (error) {
            console.error("Error creating fact:", error);
            res.status(HTTP_INTERNAL_SERVER_ERROR).send({message: "Internal Server Error"});
        }
    }
});

router.put('/package/:id_pkg/fact/:id_fact', async (req: Request, res: Response) => {
    const learningPackageId: number = +req.params.id_pkg;
    const factId: number = +req.params.id_fact;
    const {front, back, source, relatedImages, relatedLinks} = req.body;
    console.log(`Handling PUT request for /api/package/${learningPackageId}/fact/${factId}. Data:`, req.body);

    if (!front || !back || !source) {
        res.status(HTTP_BAD_REQUEST).send({error: 'Mandatory fields are missing'});
    } else {
        try {
            const factToUpdate: LearningFact = await LearningFact.findByPk(factId);

            if (!factToUpdate) {
                res.status(HTTP_NOT_FOUND).send({message: `Fact with id ${factId} not found.`});
                return;
            }

            const newFact = {learningPackageId, front, back, source, relatedImages, relatedLinks};
            const [updatedRowsCount, [updatedFact]] = await LearningFact.update(newFact, {
                where: {factId: factId, learningPackageId: learningPackageId},
                returning: true
            });

            if (updatedRowsCount > 0) {
                res.status(HTTP_OK).send(updatedFact);
            } else {
                res.status(HTTP_NOT_FOUND).send({message: `Fact not found for id: ${factId}`});
            }
        } catch (error) {
            console.error("Error updating fact:", error);
            res.status(HTTP_INTERNAL_SERVER_ERROR).send({message: "Internal Server Error"});
        }
    }
});

router.delete('/package/:id_pkg/fact/:id_fact', async (req: Request, res: Response) => {
    const idPkg: number = +req.params.id_pkg;
    const idFact: number = +req.params.id_fact;
    console.log(`Handling DELETE request for /api/package/${idPkg}/fact/${idFact}`);

    try {
        const disabledFact: LearningFact = await LearningFact.findByPk(idFact);
        if (disabledFact) {
            disabledFact.isActive = false;
            await disabledFact.save();
            res.status(HTTP_OK).send(disabledFact);
        } else {
            res.status(HTTP_NOT_FOUND).send({message: `Fact with ID ${idFact} not found.`});
        }
    } catch (error) {
        console.error(`Error disabling fact with ID ${idFact}:`, error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({message: "Internal Server Error"});
    }
});

export default router;