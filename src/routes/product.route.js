const  express =  require("express");
const router = express.Router();
const controller = require("./../controllers/product.controller")

const validateProduct = ()=>{
    return [
        check("name", "Vui lòng nhập tên sản phẩm").not().isEmpty(),
        check("description", "Vui lòng nhập mô tả").not().isEmpty(),
        check("price", "Vui lòng nhập giá và phải lớn hơn 1000").isInt({ min: 1001 }),
        check("thumnail", "Vui lòng nhập đường dẫn hình ảnh").not().isEmpty(),
        check("quantity", "Vui lòng nhập số lượng và phải lớn hơn 0").isInt({ min: 1 }),
    ]
}

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function(req,file,callback){
        callback(null,"public/uploads");
    },
    filename: function(req,file,callback){
        callback(null,Date.now() + file.originalname);
    }
});
const upload = multer({storage:storage});

router.get("/product",controller.product);
router.post("/product", upload.single("thumbnail"),controller.postProduct);
module.exports = router;