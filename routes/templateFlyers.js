const templateFlyers = require("../data/templateFlyers");
const express = require("express");
const router = express.Router();
const userFlyers = require("../data/userFlyers");
const users = require("../data/users");

router.get("/", async (req, res) => {
    const templateFlyersList = await templateFlyers.getAll();
    res.status(200).render("home", {
        templateFlyers: templateFlyersList
    });
});

router.get("/:id", async (req, res) => {
    try {
        let x = String(req.params.id);
        let flyerDetails = null;
        try {
            flyerDetails = await userFlyers.get(x);
        } catch (e) {
            console.log(e);
        }

        if (flyerDetails == null) {
            flyerDetails = await templateFlyers.get(x);
        }

        res.status(200).render("EditFlyer/editFlyer", {
            id: flyerDetails._id,
            background: flyerDetails.background,
            element1: flyerDetails.elements[0],
            element2: flyerDetails.elements[1],
            element3: flyerDetails.elements[2],
            element4: flyerDetails.elements[3]
        });
    } catch (e) {
        res.sendStatus(500).json({ error: e.toString() || 'Server Error', route: req.originalUrl });
    }
});

router.post("/", async (req, res) => {
    let flyerInfo = req.body;
    let fid = String(flyerInfo.id);
    let flyer = null;
    try {
        flyer = await userFlyers.get(fid);
        if (flyer != null)
            for (i = 0; i < flyerInfo.elements.length; i++) {
                const f = await userFlyers.updateElement(flyer._id, i, flyerInfo.elements[i].text, flyerInfo.elements[i].color, flyerInfo.elements[i].size);
            }
    } catch (e) {
        try {
            flyer = await templateFlyers.get(fid);
            if (flyer != null) {
                flyer = await userFlyers.create(flyerInfo.background, flyerInfo.elements);
                await users.addFlyer(String(req.session.userid),String(flyer._id));
                let u = await users.get(String(req.session.userid));
                req.session.flyers = u.flyers;
            }
        } catch (e) {
        }
    }
    res.json({id:flyer._id});
});
module.exports = router;