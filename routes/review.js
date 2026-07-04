const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js")
const Listing = require("../models/listing.js");
const Review = require('../models/review.js');
const ExpressError = require("../utils/ExpressError.js");
const {validateReview,isLoggedIn,isReviewAuthor} = require('../middleware.js')
const reviewController = require('../controllers/review.js')





// review Route
// post
router.post("/", isLoggedIn,validateReview, wrapAsync(reviewController.creteReview));


//Delete review route
router.delete("/:id/reviews/:reviewId", isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router
