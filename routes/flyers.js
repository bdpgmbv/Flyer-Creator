const templateFlyers = require("../data/templateFlyers");
const express = require("express");
const router = express.Router();

router.get("/", async(req,res) => {
    const templateFlyers = templateFlyers.getAll();
    res.status(200).render("home",{
        templateFlyers: templateFlyers
    });
});

module.exports = router;