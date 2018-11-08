module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/');
        }
    },
    ensureGuesst: function (req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/dashboard');
        } else {
            return next();
        }
    },

}