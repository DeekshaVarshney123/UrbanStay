const listing=require("./models/listing.js");
const ExpressError=require("./utils/ExpressError.js");
const {reviewSchema}=require("./schema.js");
const {listingSchema}=require("./schema.js");
const review=require("./models/review.js");



module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
      req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be logged In");
        return res.redirect("/login");
      }
      next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
      if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
      }
      next();
}

module.exports.isOwner=async (req,res,next)=>{
    let { id } = req.params;
     let findListing= await listing.findById(id);
    if(!findListing.owner._id.equals(res.locals.currentUser._id)){
      req.flash("error","you are not owner of the listing");
      return res.redirect(`/listing/${id}`);
  }
  next();
}

module.exports.listingValidate=(req,res,next)=>{
  let {error}=listingSchema.validate(req.body);
  if(error){
     next(new ExpressError(400,error));
  }else{
    next();
  }
};

module.exports.validateReview=(req,res,next)=>{
  let {error}=reviewSchema.validate(req.body);
  if(error){
     next(new ExpressError(400,error));
  }else{
    next();
  }
};


module.exports.isReviewAuthor=async (req,res,next)=>{
   let {id,reviewId}=req.params;
     let findReview= await review.findById(reviewId);
    if(!findReview.author._id.equals(res.locals.currentUser._id)){
      req.flash("error","you are not owner of the Review");
      return res.redirect(`/listing/${id}`);
  }
  next();
}