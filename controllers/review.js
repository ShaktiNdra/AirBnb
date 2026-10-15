
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

// Create a review
module.exports.createReview = async (req, res) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        throw new Error("Listing not found");
    }

    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    await newReview.save();

    listing.review.push(newReview._id);
    await listing.save();

    req.flash("success", "Review added successfully!");
    res.redirect(`/listings/${listing._id}`);
};

// Delete a review
module.exports.destroyReview = async (req, res) => {
    const { id, reviewId } = req.params;

    const listing = await Listing.findByIdAndUpdate(
        id,
        { $pull: { review: reviewId } }
    );

    if (!listing) {
        req.flash("error", "Listing not found.");
        return res.redirect("/listings");
    }

    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review deleted successfully!");
    res.redirect(`/listings/${id}`);
};