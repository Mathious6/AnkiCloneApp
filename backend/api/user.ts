import {Request, Response, Router} from 'express';
import {validator_user} from "../utils/validator";
import {validationResult} from "express-validator";
import {
    HTTP_BAD_REQUEST,
    HTTP_CONFLICT,
    HTTP_CREATED,
    HTTP_INTERNAL_SERVER_ERROR,
    HTTP_NOT_FOUND,
    HTTP_OK,
    HTTP_UPDATED
} from "../utils/httpCodes";
import User from '../config/models/user.model';

const router = Router();


router.get('', async (_req: Request, res: Response): Promise<void> => {
    try {
        const users: User[] = await User.findAll();
        res.status(HTTP_OK).send(users);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.post('', validator_user, async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(HTTP_BAD_REQUEST).send({error: errors.array()});
        }

        const {mail, pseudo, password, profilePicture} = req.body;
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

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        return !user ?
            res.status(HTTP_NOT_FOUND).send({error: `User with ID ${req.params.id} not found`}) :
            res.status(HTTP_OK).send(user);
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send({error: error.message});
    }
});

router.put('/:id', validator_user, async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(HTTP_BAD_REQUEST).send({error: errors.array()});
        }

        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(HTTP_NOT_FOUND).send({error: `User with ID ${req.params.id} not found`});
        }

        const {mail, pseudo, password, profilePicture} = req.body;
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

router.put('/:id/deactivate', async (req: Request, res: Response) => {
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