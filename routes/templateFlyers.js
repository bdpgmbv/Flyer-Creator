const templateFlyers = require("../data/templateFlyers");
const express = require("express");
const router = express.Router();
const userFlyers = require("../data/userFlyers");

router.get("/", async(req,res) => {
    const templateFlyersList = await templateFlyers.getAll();
    res.status(200).render("home",{
        templateFlyers: templateFlyersList
    });
});

router.get("/:id", async(req,res) => {
    try {
        let x = String(req.params.id);
        let flyerDetails = null;
        try {
            flyerDetails = await userFlyers.get(x);
        } catch (e) {
            console.log(e);
        }

        if(flyerDetails == null) {
            flyerDetails = await templateFlyers.get(x);
        }

        res.status(200).render("EditFlyer/editFlyer", {
            id: flyerDetails._id,
            background: flyerDetails.background,
            element1:  flyerDetails.elements[0],
            element2:  flyerDetails.elements[1],
            element3:  flyerDetails.elements[2],
            element4:  flyerDetails.elements[3]
        });
    } catch (e) {
        res.sendStatus(500).json({ error: e.toString() || 'Server Error', route: req.originalUrl });
    }
});

module.exports = router;