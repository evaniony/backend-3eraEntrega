export function checkUser(req, res, next) {
    if(req.session?.email){
        return next();
    }else{
        return res.status(401).render("error-page", {msg: "please, log in!"});
    }
}