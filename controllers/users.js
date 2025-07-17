module.exports.signupForm=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signup=async(req,res)=>{

        let {username,password,email}=req.body;
       const newUser=new User({email,username});
       let registeredUser=await User.register(newUser,password);
       console.log(registeredUser);
       req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to UrbanStay");
       res.redirect("/listing");
       });
       
       
}

module.exports.loginForm=(req,res)=>{
    res.render("users/login.ejs");
}


module.exports.login=async(req,res)=>{
        req.flash("success","Welcome back to UrbanStay");
        let redirect=res.locals.redirectUrl||"/listing";
        res.redirect(redirect);
    }

    module.exports.logout=(req,res)=>{
    req.logOut((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","You are logged out!");
        res.redirect("/listing");
    });
}