const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const data = require("../data"); 

router.get("/", async(req,res) => {
    res.render("admin/registerh",{});
});

router.post("/", async(req,res) => {
    let userInfo = req.body;
    let hashedPassword = bcrypt.hashSync(userInfo.password, 3);
    try {
        if(userInfo.firstName.length > 0 && userInfo.firstName.length <= 20 &&
            userInfo.lastName.length > 0 && userInfo.lastName.length <= 20 &&
            userInfo.email.length > 0 && userInfo.email.length <= 40 &&
            userInfo.password.length >=8 && userInfo.password.length <= 20 &&
            userInfo.password == userInfo.repassword) {
                await data.users.create(userInfo.firstName, userInfo.lastName, userInfo.email, hashedPassword);
                res.redirect("/login");
            } else {
                res.render("admin/registerh", {errorTohFromRR:"Incorrect credentials to register"});
            }
    } catch (err) {
        res.render("admin/registerh", {errorTohFromRR: "Incorrect credentials to register"});
    }
});

router.post("/check", async(req,res) => {
    let email = req.body.email.toString();
    try {
        let user = await data.users.getByEmail(email);
        res.status(200).send(user);
    } catch (err) {
        res.sendStatus(404);
    }
});

module.exports = router;