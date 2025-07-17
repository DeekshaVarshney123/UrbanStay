const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const review=require("../models/review.js");
const listing=require("../models/listing.js");

const {validateReview,isLoggedIn,isReviewAuthor}=require("../middleware.js");
const { createReviews, deleteReviews } = require("../controllers/reviews.js");



router.post("/",isLoggedIn,validateReview,wrapAsync(createReviews));

router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(deleteReviews));

module.exports=router;
