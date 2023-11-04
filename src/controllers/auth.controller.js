const userModel = require("./../models/user.model");
const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator"); //check co the co hoac ko
const gmail = require("./../mails/gmail");
exports.register = function(req,res){
    res.render("auth/register");
};

exports.postRegister = async function(req,res){
    const data = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send(errors.array());
    }
    try{
        // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu
        const existingUser = await userModel.findOne({ email: data.email });

        if (existingUser) {
            // Email đã tồn tại, chuyển hướng sang trang đăng nhập hoặc hiển thị thông báo lỗi
            return res.redirect("/auth/login"); // Chuyển hướng đến trang đăng nhập
            // Hoặc có thể sử dụng res.render() để hiển thị trang thông báo lỗi
        }

        if(req.file){
            const file = req.file;
            // data.avatar = "/uploads/"+file.filename;
            const fs = require("fs");
            const img  = fs.readFileSync(file.path);
            data.avatar = {
                contentType: file.mimetype,
                data: img.toString("base64")
            }
        }
        const salt = await bcrypt.genSalt(10);  // kĩ thuật rắc muối thêm vào mật khẩu thành chuỗi 10 kí tự rồi mã hóa
        const hashed = await bcrypt.hash(data.password,salt);
        data.password = hashed;
        const u = new userModel(data);
        await u.save();
        //send email        
        gmail.sendMail({
            from: "T2210M Registration",
            to: u.email,
            // cc: "nhanvien@gmail.com",
            // bcc: "manager@gmail.com",
            subject: "Đăng kí tài khoản thành công",
            // text: "",
            html: "<h1>Mày nhìn cái chóa gì</h1>"
        }) 

        res.send("Done");
    }catch(error){
        res.send(error);
    }
};

exports.login = function(req,res){
    res.render("auth/login");
}
exports.postLogin = async function(req,res){
    const email = req.body.email;
    const pwd = req.body.password;
    try{
        //b1: dùng email tìm user trong db => nếu ko có báo lỗi email 
        const u = await userModel.findOne({email:email});
        if(u == null){
            return res.send("Email or PassWord is correct");
        }
        //b2: so sánh password - dùng cơ chế hash veryfy để so sánh
        const verify = await bcrypt.compare(pwd,u.password); // return true/false
        if(!verify){
            return res.send("Email or Password is correct");
        }
        // b3: phản hồi khi đúng  -- lưu user  vào session
        req.session.auth = {
            full_name: u.full_name,
            email: u.email
        }
        return res.send("Log in successfully");

    }catch(error){
        res.send(error)
    }
}