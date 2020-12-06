const session = require("express-session");
const registerRoutes = require("./register");
const users = require("../data/users");
const templateFlyersRoutes = require("./templateFlyers");
const bcrypt = require("bcrypt");
const privateRoutes = require("./private");

const constructMethod = app => {
    app.use(session({
        name: 'AuthCookie',
        secret: 'some secret string',
        resave: false,
        saveUninitialized: true
    }));

    app.get("/", (req, res) => {
        if (req.session.auth) {
            res.redirect('/templateFlyers');
        } else {
            res.render("admin/loginh", {
                hasErrorsDuringLogin: false
            });
        }
    });

    app.get("/login", async (req, res) => {
        if (req.session.auth) {

        } else {
            res.render("admin/loginh", {
                hasErrorsDuringLogin: false
            });
        }
    });

    app.post("/login", async (req, res) => {
        let loginData = req.body;
        if (!loginData.username || !loginData.password) {
            res.render("admin/loginh", {
                hasErrorsDuringLogin: true
            });
            res.status(401);
            return;
        }

        let user = null;
        try {
            user = await users.getByEmail(loginData.username);
            if (user) {
                passwordCorrect = await bcrypt.compare(loginData.password, user.hashedPassword);
                if (!passwordCorrect) {
                    user = null;
                }
            }
        } catch (e) {
            res.render("admin/loginh", {
                hasErrorsDuringLogin: true
            });
            res.status(401);
            return;
        }

        if (user) {
            req.session.auth = true;
            req.session.userid = user._id;
            req.session.email = user.email;
            req.session.firstName = user.firstName;
            req.session.lastName = user.lastName;
            req.session.flyers = user.flyers;
            res.redirect("/templateFlyers"); // redirecting to route
        } else {
            res.render("admin/loginh", {
                hasErrorsDuringLogin: true
            });
            res.status(401);
            return;
        }
    });

    app.get("/logout", (req, res) => {
        if (req.session.auth) {
            req.session.destroy();
            res.render("logout");
        } else {
            res.redirect("/");
        }
    });

    app.use("/templateFlyers", function (req, res, next) {
        if (req.session.auth) {
            next();
        } else {
            res.status(403).send("The user is not logged in");
        }
    });

    // ** important to specify this ** //
    app.use("/register", registerRoutes);
    app.use("/templateFlyers", templateFlyersRoutes);
    app.use("/private", privateRoutes);

    app.get("*", (req, res) => {
        res.status(404).send("error 404: page not found");
    });
};

module.exports = constructMethod;