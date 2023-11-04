const mongoose = require("mongoose");
const user_schema = new mongoose.Schema({
    // _id
    full_name: {
        type:String,
        required:[true,"Trường này bắt buộc phải nhập dữ liệu"],
        minLength:[6,"Độ dài tối thiểu là 6 kí tự "]
    },
    email: {
        type:String,
        required:true,
        minLength:6,
        unique:true,
        validate: {
            validator: (v)=>{
                // bộ quy tắc kiểm tra email
                const rule = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;// email regex
                return v.match(rule);
            },
            message: (t)=> "Giá trị vừa nhập không phải email"
        }
    },
    password:{
        type:String,
        required:true
    },
    // avatar:String
    avatar:{
        data: String,
        contentType:String
    }

});
module.exports = mongoose.model("User",user_schema);// users