exports.guest = function(req,res,next){
    if(req.session.auth){
        return res.redirect("/");
    }
    return next();
}

exports.auth = function(req,res,next){
    if(req.session.auth){
        return next();
    }
    return res.redirect("/auth/login");
}

exports.admin = function(req, res, next) {
    // Kiểm tra xem người dùng có quyền admin hay không
    if (req.session.auth && req.session.auth.role === 'admin') {
        // Nếu người dùng là admin, cho phép tiếp tục
        return next(); 
    }
    // Nếu không phải admin, có thể chuyển hướng hoặc trả về lỗi tùy ý
    return res.status(403).send("Access Denied"); // Ví dụ: Trả về mã lỗi 403 - Access Denied
};

exports.staff = function(req, res, next) {
    // Kiểm tra xem người dùng có quyền staff hay không
    if (req.session.auth && req.session.auth.role === 'staff') {
        // Nếu người dùng là staff, cho phép tiếp tục
        return next();
    }
    // Nếu không phải staff, có thể chuyển hướng hoặc trả về lỗi tùy ý
    return res.status(403).send("Access Denied"); // Ví dụ: Trả về mã lỗi 403 - Access Denied
};
