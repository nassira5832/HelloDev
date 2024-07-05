const requestLogger = function (req, res, next) {
    console.log(`Request to the path:"${req.path}" using method:${req.method} at:${new Date().toUTCString()}`);
    next();
};

module.exports = requestLogger;