const pageNotFound = function (req, res) {
    res.status(404).json("Page not Found :O");
};

module.exports =  pageNotFound;