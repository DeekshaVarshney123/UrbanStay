const listing=require("../models/listing.js");


module.exports.index=async (req, res, next) => {
  let alllisting = await listing.find({});
  if (alllisting.length === 0) {
    next(new ExpressError(404, "No listings found!"));
  }
  res.render("./listings/index.ejs", { alllisting });
}

module.exports.renderNewForm=(req,res)=>{
  res.render("./listings/new.ejs");

}

module.exports.showListing=async(req,res,next)=>{
  let {id}=req.params;
  const listingById=await listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
  if (!listingById) {
    next(new ExpressError(404 ,"Listing not found!"));
  }
  res.render("./listings/show.ejs",{listingById});
}

module.exports.createListing=async(req,res,next)=>{
  const  newListing=new listing(req.body.listing);
  newListing.owner=req.user._id;
   await newListing.save();
   req.flash("success","New Listing created");
   res.redirect("/listing");
}

module.exports.renderEditForm=async(req,res,next)=>{
  let {id}=req.params;
  const listingById=await listing.findById(id);
  if (!listingById) {
    next(new ExpressError(404 ,"Listing not found!"));
  }
  res.render("./listings/edit.ejs",{listingById});
}

module.exports.updateListing=async (req, res, next) => {
  let { id } = req.params;
  console.log(id);
  const updatedListing = await listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (!updatedListing) {
    return next(new ExpressError(404, "Listing not found!"));
  }
  req.flash("success","listing updated");
  res.redirect(`/listing/${id}`);
}

module.exports.deleteListing=async (req, res, next) => {
  const { id } = req.params;
  const deletedListing = await listing.findByIdAndDelete(id);
  if (!deletedListing) {
    return next(new ExpressError(404, "Listing not found!"));
  }
  req.flash("success","Listing deleted");
  res.redirect("/listing");
}