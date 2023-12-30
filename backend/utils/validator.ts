import {body, check} from "express-validator";

export const handlers_errors_p = [
    check('title').isLength({min: 3}),
    check('description').isLength({min: 3}),
    check('category').isLength({min: 3}),
    check('targetAudience').isLength({min: 3}),
    check('duration').isNumeric(),
    check('creatorId').isNumeric(),
]

export const handlers_errors_f = [
    check('front').isLength({min: 3}),
    check('back').isLength({min: 3}),
    check('source').isURL(),
    check('relatedImage').if(body('relatedImage').exists({checkFalsy: true})).isURL(),
    check('relatedLink').if(body('relatedLink').exists({checkFalsy: true})).isURL(),
]