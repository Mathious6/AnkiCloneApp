import {Request, Response, Router} from "express";
import {validationResult} from "express-validator";
import Tag from "../config/models/tag.model";
import {validator_tag} from "../utils/validator";
import {
    HTTP_BAD_REQUEST,
    HTTP_CONFLICT,
    HTTP_CREATED,
    HTTP_INTERNAL_SERVER_ERROR,
    HTTP_NOT_FOUND,
    HTTP_OK,
    HTTP_UPDATED
} from "../utils/httpCodes";
import LearningPackageTag from "../config/models/learningPackageTag.model";

const router: Router = Router();

router.get('', async (_req: Request, res) => {
    try {
        const tags: Tag[] = await Tag.findAll();
        res.status(HTTP_OK).send(tags);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.post('', validator_tag, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HTTP_BAD_REQUEST).send({error: errors.array()});
    }

    const {englishKeyword, frenchTranslation} = req.body;

    try {
        const newTag = {englishKeyword, frenchTranslation};
        const createdTag: Tag = await Tag.create(newTag);
        res.status(HTTP_CREATED).send(createdTag);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(HTTP_CONFLICT).send({error: 'Duplicate entry'});
        } else {
            res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
        }
    }
});

router.put('/:id', validator_tag, async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(HTTP_BAD_REQUEST).send({error: errors.array()});
        }

        const tagId: number = +req.params.id;
        const tagExists: Tag | null = await Tag.findByPk(tagId);
        if (!tagExists) {
            return res.status(HTTP_NOT_FOUND).send({error: `Tag with ID ${tagId} does not exist.`});
        }

        const {englishKeyword, frenchTranslation} = req.body;
        await Tag.update({englishKeyword, frenchTranslation}, {where: {tagId}});

        res.status(HTTP_UPDATED).send();
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const tagId: number = +req.params.id;
        const tagExists: Tag | null = await Tag.findByPk(tagId);
        if (!tagExists) {
            return res.status(HTTP_NOT_FOUND).send({error: `Tag with ID ${tagId} does not exist.`});
        }

        await LearningPackageTag.destroy({where: {tagId}});
        await Tag.destroy({where: {tagId}});
        res.status(HTTP_UPDATED).send();
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

export default router;