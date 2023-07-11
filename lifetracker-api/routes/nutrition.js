const express  = require("express")
const router = express.Router()
const Nutrition = require("../models/nutrition")
const permissions = require("../middleware/permissions")
const security = require("../middleware/security")


router.post("/", security.requireAuthenticatedUser, async(req, res, next) => {
    try {
        const {user} = res.locals
        const nutrition = await Nutrition.createNewNutrition({user, nutrition: req.body})
        return res.status(201).json({nutrition})

    } catch (err) {
        next(err)
    }
})
router.get("/", async(req, res, next) => {
    try {
        const nutrition = await Nutrition.listNutritions()
        return res.status(200).json({nutrition})
    } catch (err) {
        next(err)
    }
})

router.get("/:nutritionId", async(req, res, next) => {
    try {
        const {nutritionId} = req.params
        const nutrition = await Nutrition.fetchNutritionById(nutritionId)
        return res.status(200).json({nutrition})
    } catch (err) {
        next(err)
    }
})

router.patch("/:nutritionId", security.requireAuthenticatedUser, permissions.authedUserOwnsNutrition, async (req, res, next) => {
    try{
        const {nutritionId} = req.params
        const nutrition = await Nutrition.editNutrition({nutritionUpdate: req.body, nutritionId})
        return res.status(200).json({nutrition})

    } catch(err){
        next(err)
    }
})




module.exports = router
