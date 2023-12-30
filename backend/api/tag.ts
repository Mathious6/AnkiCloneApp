import {Request, Response, Router} from "express";
import {body, check, validationResult} from "express-validator";
import Tag from "../config/models/tag.model";

const router: Router = Router();

const HTTP_OK: number = 200;
const HTTP_CREATED: number = 201;
const HTTP_UPDATED: number = 204;
const HTTP_BAD_REQUEST: number = 400;
const HTTP_NOT_FOUND: number = 404;
const HTTP_CONFLICT: number = 409;
const HTTP_INTERNAL_SERVER_ERROR: number = 500;

const handler_errors = [
    check('englishKeyword').isLength({min: 3}),
    check('frenchTranslation').if(body('frenchTranslation').exists({checkFalsy: true})).isLength({min: 3}),
]

router.get('', async (_req: Request, res) => {
    try {
        const tags: Tag[] = await Tag.findAll();
        res.status(HTTP_OK).send(tags);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.post('', handler_errors, async (req: Request, res: Response) => {
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

router.put('/:id', handler_errors, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HTTP_BAD_REQUEST).send({error: errors.array()});
    }

    const {englishKeyword, frenchTranslation} = req.body;

    try {
        const tagId: number = +req.params.id;
        const tagExists: Tag | null = await Tag.findByPk(tagId);
        if (!tagExists) {
            return res.status(HTTP_NOT_FOUND).send({error: `Tag with ID ${tagId} does not exist.`});
        }

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

        await Tag.destroy({where: {tagId}});
        res.status(HTTP_UPDATED).send();
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

export default router;