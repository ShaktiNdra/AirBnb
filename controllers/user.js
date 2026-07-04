
const Listing = require("../models/listing.js");
const Review = require('../models/review.js');
const User = require("../models/user.js");


module.exports.renderSignupForm = (req, res) => {
    res.render('user/signup.ejs');
}

module.exports.signUp = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username, });
        let registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err)
            }
            req.flash("success", "User was register sucessfuly !");
            res.redirect("/listings");
        })

    }
    catch (e) {
        req.flash("error", e.message);
        res.redirect('/signup')
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render('user/login.ejs');
}


module.exports.login = async (req, res) => {
    req.flash("sucess", "Welcome back to Wonderlust !");
    if (res.locals.redirectUrl) {
        res.redirect(res.locals.redirectUrl);
    } else {
        res.redirect('/listings');
    }
}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err)
        }
        req.flash("success", "You are Logout of the Platform");
        res.redirect("/listings");
    })
}