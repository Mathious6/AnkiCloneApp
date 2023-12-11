import {Request, Response} from 'express';
import { Router } from 'express';
import User from '../config/user.model';

const router = Router();

const HTTP_CREATED: number = 201;
const HTTP_BAD_REQUEST: number = 400;
const HTTP_INTERNAL_SERVER_ERROR: number = 500;

// USER API

router.post('/user', async (req: Request, res: Response) => {
    const { mail, pseudo, password, profilePicture } = req.body;
    console.log('Handling POST request for /api/user. Data:', req.body);

    if ( !mail || !pseudo || !password ) {
        res.status(HTTP_BAD_REQUEST).send({error: 'Mandatory fields are missing'});
    } else {
        try {
            const newUser = { mail, pseudo, password, profilePicture };
            const createdUser: User = await User.create(newUser);
            res.status(HTTP_CREATED).send(createdUser);
        } catch (error) {
            console.error("Error creating package:", error);
            res.status(HTTP_INTERNAL_SERVER_ERROR).send({message: "Internal Server Error"});
        }
    }
});

export default router;