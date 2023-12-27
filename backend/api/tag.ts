import {Request, Response, Router} from "express";
import {body, check, validationResult} from "express-validator";
import Tag from "../config/tag.model";

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

router.get('/tag', async (_req: Request, res) => {
    try {
        const tags: Tag[] = await Tag.findAll();
        res.status(HTTP_OK).send(tags);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.post('/tag', handler_errors, async (req: Request, res: Response) => {
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

router.put('/tag/:id', handler_errors, async (req: Request, res: Response) => {
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

router.delete('/tag/:id', async (req: Request, res: Response) => {
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

export default router;/*
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const tag_model_1 = require("../config/tag.model");
const router = (0, express_1.Router)();
const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_UPDATED = 204;
const HTTP_BAD_REQUEST = 400;
const HTTP_NOT_FOUND = 404;
const HTTP_CONFLICT = 409;
const HTTP_INTERNAL_SERVER_ERROR = 500;
const handler_errors = [
    (0, express_validator_1.check)('englishKeyword').isLength({ min: 3 }),
    (0, express_validator_1.check)('frenchTranslation').if((0, express_validator_1.body)('frenchTranslation').exists({ checkFalsy: true })).isLength({ min: 3 }),
];
router.get('/tag', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tags = yield tag_model_1.default.findAll();
        res.status(HTTP_OK).send(tags);
    }
    catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
}));
router.post('/tag', handler_errors, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(HTTP_BAD_REQUEST).send({ error: errors.array() });
    }
    const { englishKeyword, frenchTranslation } = req.body;
    try {
        const newTag = { englishKeyword, frenchTranslation };
        const createdTag = yield tag_model_1.default.create(newTag);
        res.status(HTTP_CREATED).send(createdTag);
    }
    catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(HTTP_CONFLICT).send({ error: 'Duplicate entry' });
        }
        else {
            res.status(HTTP_INTERNAL_SERVER_ERROR).send({ error: error.message });
        }
    }
}));
router.put('/tag/:id', handler_errors, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(HTTP_BAD_REQUEST).send({ error: errors.array() });
    }
    const { englishKeyword, frenchTranslation } = req.body;
    try {
        const tagId = +req.params.id;
        const tagExists = yield tag_model_1.default.findByPk(tagId);
        if (!tagExists) {
            return res.status(HTTP_NOT_FOUND).send({ error: `Tag with ID ${tagId} does not exist.` });
        }
        yield tag_model_1.default.update({ englishKeyword, frenchTranslation }, { where: { tagId } });
        res.status(HTTP_UPDATED).send();
    }
    catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
}));
router.delete('/tag/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tagId = +req.params.id;
        const tagExists = yield tag_model_1.default.findByPk(tagId);
        if (!tagExists) {
            return res.status(HTTP_NOT_FOUND).send({ error: `Tag with ID ${tagId} does not exist.` });
        }
        yield tag_model_1.default.destroy({ where: { tagId } });
        res.status(HTTP_UPDATED).send();
    }
    catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
}));
exports.default = router;*/
//# sourceMappingURL=tag.js.map
