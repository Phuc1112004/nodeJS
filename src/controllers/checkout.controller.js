exports.form_checkout = function(req,res){
    const user = req.session.auth;  //auth() -> user()
    res.render("checkout.checkout",{user:user});
}