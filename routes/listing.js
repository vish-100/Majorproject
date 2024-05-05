const express =require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const {reviewSchema}=require("../schema.js");
const Listing = require("../models/listing.js");

const {isLoggedIn} = require("../middleware.js");
const {isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


router.route("/")
.get( wrapAsync(listingController.index))

.post( isLoggedIn ,upload.single("listing[image]"),validateListing, wrapAsync(listingController.createListing));


/* .post(upload.single("listing[image]"), (req,res) =>{

    
    res.send(req.file);
}); */

//New Route
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));

router.route("/:id")

.get( wrapAsync(listingController.showListing))

.put( isLoggedIn ,upload.single("listing[image]"), isOwner ,validateListing, wrapAsync(listingController.updateListing))

.delete( isLoggedIn ,isOwner , wrapAsync(listingController.destroyListing));

router.get("/:id/edit", isLoggedIn, isOwner , wrapAsync(listingController.renderEditForm));
 module.exports=router;