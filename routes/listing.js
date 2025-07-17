const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const listing=require("../models/listing.js");
const {isLoggedIn,isOwner,listingValidate}=require("../middleware.js");
const {index,renderNewForm, showListing, createListing, renderEditForm, updateListing, deleteListing}=require("../controllers/listings.js");
// index route 
router.get("/", wrapAsync(index));


//create route
router.get("/new",renderNewForm);
// show route
router.get("/:id",wrapAsync(showListing));


router.post("/",isLoggedIn,listingValidate,wrapAsync(createListing));


// //edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(renderEditForm));


router.put("/:id",isLoggedIn,isOwner, listingValidate,wrapAsync(updateListing));


//delete route
router.delete("/:id",isLoggedIn,isOwner, wrapAsync(deleteListing));

module.exports=router;
