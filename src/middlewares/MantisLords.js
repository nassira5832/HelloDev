const { validationResult, body } = require('express-validator');

const handleNotFoundCh3 = (req, res, next) => {
    res.status(404).send('Route not found');
    next();
};

const handleInternalServerErrorCh3 = ( req, res, next) => {
    res.status(500).send('Internal server error');
    next();
};




const validatePostRequest = (req, res, next) => {
    if (req.method === 'POST'){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }}
    next();
};

// Middleware de validation pour PUT
const validatePutRequest = (req, res, next) => {
    if (req.method === 'PUT'){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }}
    next();
};


module.exports={
    handleNotFoundCh3,
    handleInternalServerErrorCh3,
    validatePutRequest, 
    validatePostRequest 
};