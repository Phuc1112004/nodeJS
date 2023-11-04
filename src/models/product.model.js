const mongoose = require("mongoose");
const product_schema = new mongoose.Schema({
    // _id
    name: {
        type:String,
        required:true
    },
    description: {
        type:String
    },
    price:{
        type:Number,
        required:true,
        // validate:{
        //     validator: (v)=>{
        //         const rule = /^[1-9]\d{3,}$/;
        //         return v.match(rule);
        //     },
        //     message: (t)=> "Giá trị vừa nhập phải lớn hơn số 1000"
        // }
    },
    thumbnail:{
        data: String,
        contentType:String
    },
    quantity:{
        type:Number,
        // require:true,
        // validate:{
        //     validator: (v)=>{
        //         const rule = /^[1-9]\d*$/;
        //         return v.match(rule);
        //     },
        //     message: (t)=> "Giá trị vừa nhập phải lớn hơn số 1"
        // }
    }
});
module.exports = mongoose.model("Product",product_schema); 