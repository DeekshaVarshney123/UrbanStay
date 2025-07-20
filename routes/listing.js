const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const listing=require("../models/listing.js");
const {isLoggedIn,isOwner,listingValidate}=require("../middleware.js");
const {index,renderNewForm, showListing, createListing, renderEditForm, updateListing, deleteListing, locationListing}=require("../controllers/listings.js");
const multer  = require('multer');
const {storage}=require("../cloudconfig.js");
const upload = multer({storage});



 
router.post("/search",isLoggedIn,wrapAsync(locationListing));
//index route 
router.get("/", wrapAsync(index));


//create route
router.get("/new",isLoggedIn,renderNewForm);

//locationListing route



// show route
router.get("/:id",wrapAsync(showListing));


router.post("/",isLoggedIn,upload.single("listing[image]"),listingValidate,wrapAsync(createListing));


// //edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(renderEditForm));


router.put("/:id",isLoggedIn,isOwner,upload.single("listing[image]"), listingValidate,wrapAsync(updateListing));


//delete route
router.delete("/:id",isLoggedIn,isOwner, wrapAsync(deleteListing));



module.exports=router;
