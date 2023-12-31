import {check} from "express-validator";

export const validator_user = [
    check('mail').if(check('mail').exists()).isEmail(),
    check('pseudo').if(check('pseudo').exists()).isLength({min: 3}).isAlphanumeric('fr-FR'),
    check('password').if(check('password').exists()).isLength({min: 6}),
    check('profilePicture').if(check('profilePicture').exists()).isURL()
]

export const validator_package = [
    check('title').if(check('title').exists()).isLength({min: 3}),
    check('description').if(check('description').exists()).isLength({min: 3}),
    check('category').if(check('category').exists()).isLength({min: 3}),
    check('targetAudience').if(check('targetAudience').exists()).isLength({min: 3}),
    check('duration').if(check('duration').exists()).isNumeric(),
    check('creatorId').if(check('creatorId').exists()).isNumeric(),
]

export const validator_fact = [
    check('front').if(check('front').exists()).isLength({min: 3}),
    check('back').if(check('back').exists()).isLength({min: 3}),
    check('source').if(check('source').exists()).isURL(),
]

export const validator_tag = [
    check('englishKeyword').isLength({min: 3}),
    check('frenchTranslation').if(check('frenchTranslation').exists()).isLength({min: 3}),
]

export const validator_userLearningFact = [
    check('confidenceLevel').isIn(['1', '2', '3']),
]