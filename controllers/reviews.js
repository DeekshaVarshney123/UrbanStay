const listing=require("../models/listing.js");
const review=require("../models/review.js");


module.exports.createReviews=async(req,res)=>{
  let {id}=req.params;
  let listingById=await listing.findById(id);
  let newReview=new review(req.body.review);
  newReview.author=req.user._id;
  listingById.reviews.push(newReview);
  await newReview.save();
  await listingById.save();
  req.flash("success","New review created");
  res.redirect(`/listing/${id}`);
}


module.exports.deleteReviews=async(req,res)=>{
  let {id,reviewId}=req.params;
   await review.findByIdAndDelete(reviewId);
   await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
   req.flash("success","review deleted");
   res.redirect(`/listing/${id}`);
}