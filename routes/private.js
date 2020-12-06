const path = require("path");
const userFlyers = require("../data/userFlyers");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    //todo: render login page first then if user is logged in render main
    const flyerCollection = req.session.flyers;
    let fs = [];
    for (i = 0; i < flyerCollection.length; i++) {
        const flyerCollectionid = await userFlyers.get(flyerCollection[i]);
        fs.push({
            id: flyerCollectionid._id,
            background: flyerCollectionid.background,
            element1: flyerCollectionid.elements[0],
            element2: flyerCollectionid.elements[1],
            element3: flyerCollectionid.elements[2],
            element4: flyerCollectionid.elements[3]
        });
    }
    res.status(200).render("myflyers", {
        firstName: req.session.firstName,
        lastName: req.session.lastName,
        hasFlyers: fs.length != 0,
        flyers: fs
    });
});

router.get("/:id", async (req, res) => {
    try {
        let x = String(req.params.id);
        const flyerCollectionid = await userFlyers.get(x);
        //res.json(flyerCollectionid);
        res.status(200).render("EditFlyer/editFlyer", {
            id: flyerCollectionid._id,
            background: flyerCollectionid.background,
            element1: flyerCollectionid.elements[0],
            element2: flyerCollectionid.elements[1],
            element3: flyerCollectionid.elements[2],
            element4: flyerCollectionid.elements[3]
        });
    } catch (e) {
        res.sendStatus(500).json({ error: e.toString() || 'Server Error', route: req.originalUrl });
    }
});

module.exports = router;