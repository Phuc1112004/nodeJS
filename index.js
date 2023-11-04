require("dotenv").config();    // sẽ sử dụng được file cấu hình .env

const express = require("express");
const app = express();  // host - app
const port = 2210;   
 
app.listen(port,function(){
    console.log("Server is running...");
})

// use views
app.set("view engine","ejs");

// use file 
app.use(express.static("public"));  // chi dung duoc trong thu muc public

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// connect database
require("./src/db/connect"); 

// set session
const session = require("express-session");
app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET,  //
        cookie: {
            maxAge: Number(process.env.COOKIE_MAXAGE), //milisecond
            secure: false,   //true se la https ,  localhost se laf false
        }
    })
)


//route
// app.get("/",function(req,res){
//     res.render("home/home");
// })

// app.get("/about-us",function(req,res){
//     res.send("aboutus/abouts");
// })
const web_route = require("./src/routes/web.route");
app.use("/",web_route);

// user
// app.get("/auth/register",function(req,res){
//     res.render("auth/register");
// })


// app.post("/auth/register",function(req,res){
//     const data = req.body;
//     const userModel = require("./src/models/user.model");
//     const u = new userModel(data);
//     u.save();
//     res.send("Done");
// })
// user chuyen sang auth.route.js 
const auth_route = require("./src/routes/auth.route");
app.use("/auth",auth_route);

// product
// app.get("/product/product",function(req,res){
//     res.render("product/product");
// })

// app.post("/product/product",function(req,res){
//     const data = req.body;
//     const productModel = require("./src/models/product.model");
//     const p = new productModel(data);
//     p.save();
//     res.send("Done");
// })
const product_route = require("./src/routes/product.route");
app.use("/product",product_route);