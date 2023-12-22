import {Request, Response, Router} from 'express';
import User from '../config/user.model';
import {check, validationResult} from "express-validator";

const router = Router();

const HTTP_OK: number = 200;
const HTTP_CREATED: number = 201;
const HTTP_UPDATED: number = 204;
const HTTP_BAD_REQUEST: number = 400;
const HTTP_NOT_FOUND: number = 404;
const HTTP_CONFLICT: number = 409;
const HTTP_INTERNAL_SERVER_ERROR: number = 500;

const handlers_errors = [
    check('mail').isEmail(),
    check('pseudo').isLength({min: 3}).isAlphanumeric('fr-FR'),
    check('password').isLength({min: 6}),
    check('profilePicture').isURL(),
]

router.get('/user', async (_req: Request, res: Response) => {
    try {
        const users: User[] = await User.findAll();
        res.status(HTTP_OK).send(users);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.post('/user', handlers_errors, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HTTP_BAD_REQUEST).send({error: errors.array()});
    }

    const {mail, pseudo, password, profilePicture} = req.body;

    try {
        const newUser = {mail, pseudo, password, profilePicture};
        const createdUser: User = await User.create(newUser);
        res.status(HTTP_CREATED).send(createdUser);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(HTTP_CONFLICT).send({error: 'Duplicate entry'});
        } else {
            res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
        }
    }
});

router.get('/user/:id', async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(HTTP_NOT_FOUND).send({error: `User with ID ${req.params.id} not found`});
        }
        res.status(HTTP_OK).send(user);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.put('/user/:id', handlers_errors, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HTTP_BAD_REQUEST).send({error: errors.array()});
    }

    const {mail, pseudo, password, profilePicture} = req.body;

    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(HTTP_NOT_FOUND).send({error: `User with ID ${req.params.id} not found`});
        }
        const updatedUser = {mail, pseudo, password, profilePicture};
        await user.update(updatedUser);
        res.status(HTTP_UPDATED).send(updatedUser);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(HTTP_CONFLICT).send({error: 'Duplicate entry'});
        } else {
            res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
        }
    }
});

router.put('/user-deactivate/:id', async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(HTTP_NOT_FOUND).send({error: `User with ID ${req.params.id} not found`});
        }
        await user.update({isActive: false});
        const updatedUser = await User.findByPk(req.params.id);
        res.status(HTTP_UPDATED).send(updatedUser.dataValues);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

export default router;