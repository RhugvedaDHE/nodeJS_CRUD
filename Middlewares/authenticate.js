const passport = require("passport");
module.exports = (req, res, next) => {
    passport.authenticate('jwt', function(err, user, info) {
        if (err) return next(err);

        if (!user) return res.status(401).json({message: "Unauthorized Access - No Token Provided!"});
        console.log("user s: ", user);
        req.user = user;
        req.roles = user.roles;

        next();

    })(req, res, next);
};