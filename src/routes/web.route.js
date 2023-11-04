const express = require("express");
const router = express.Router();
router.get("/",function(req,res){
    res.render("home/home");
})
router.get("/about-us",function(req,res){
    res.render("aboutus/about");
});

module.exports = router;