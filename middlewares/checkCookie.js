module.exports = function(cookieName) {
    return function(req, res, next) {
        if (req.cookies && req.cookies[cookieName]) {
            next();
        } else {
            res.redirect('/?message=Please%20sign%20in%20first'); 
        }
    };
};