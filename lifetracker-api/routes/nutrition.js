const express  = require("express")
const router = express.Router()

router.post("/", async(req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
})
router.get("/", async(req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
})



module.exports = router
