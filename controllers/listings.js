const listing=require("../models/listing.js");
const ExpressError=require("../utils/ExpressError.js");




module.exports.locationListing=async (req,res,next)=>{
    let {location}=req.body.listing;
    console.log(location);
    let findListing=await listing.find({location:location});
console.log(findListing.length);
if(findListing.length==0){
   return next(new ExpressError(404, "No Result"));
}
    res.render("./listings/locListing.ejs",{findListing});
    console.log(findListing);
}



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
  let url=req.file.path;
  let filename=req.file.filename;
  const  newListing=new listing(req.body.listing);

  newListing.owner=req.user._id;
  newListing.image={url,filename};
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
  let originalUrl=listingById.image.url;
  originalUrl=originalUrl.replace("/upload","/upload/c_fill,h_150,w_250/");
 res.render("./listings/edit.ejs",{listingById,originalUrl});
}

module.exports.updateListing=async (req, res, next) => {
  let { id } = req.params;
  const updatedListing = await listing.findByIdAndUpdate(id, { ...req.body.listing });

  if(typeof req.file !="undefined"){
           let url=req.file.path;
           let filename=req.file.filename;
           updatedListing.image={url,filename};
           await updatedListing.save();
  }

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


