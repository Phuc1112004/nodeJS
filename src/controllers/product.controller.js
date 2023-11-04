const productModel = require("./../models/product.model");
const { validationResult } = require("express-validator");

exports.product = function(req, res) {
    res.render("product/product");
};

exports.postProduct = function(req, res) {
    const data = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        if(req.file){
            const file = req.file;
            // data.avatar = "/uploads/"+file.filename;
            const fs = require("fs");
            const img  = fs.readFileSync(file.path);
            data.thumbnail = {
                contentType: file.mimetype,
                data: img.toString("base64")
            }
        }
        const p = new productModel(data);
        p.save();
        res.send("Done");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};