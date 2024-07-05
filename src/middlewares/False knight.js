const { validationResult, body } = require('express-validator');

const handleNotFound = (req, res, next) => {
    res.status(404).send('Route not found');
    next();
};

const handleInternalServerError = ( req, res, next) => {
    res.status(500).send('Internal server error');
    next();
};


const validateRequestBody = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next(); 
};

module.exports={
    handleNotFound,
    handleInternalServerError,
    validateRequestBody
};