const mongoose = require("mongoose");
const Loc = mongoose.model('Location');

const responseSuccess = (status, data, res) => {
    res.status(status).json(data)
}

const responseFailure = (status, msg, res) => {
    res.status(status).json({"message": msg});
}

const reviewsReadOne = (req, res) => {
  Loc
      .findById(req.params.locationId)
      .select('name reviews')
      .exec().then(location => {
        return location;
      }).then(location => {
        const review = location.reviews.find(r => r.name == req.params.reviewName);
        responseSuccess(200, review, res);
      }).catch(error => {
          responseFailure(404, "Review not found", res);
      })
}

const createReview = (req, res) => {
  Loc.findById(req.params.locationId)
      .select('reviews')
      .exec()
      .then(location => {
        location.reviews.push({
            rating: req.body.rating,
            name: req.body.name,
            date: req.body.date,
            review: req.body.review
        });

        location.save().then(location => {
            // updateAverageRating;
            const total = location.reviews.reduce((acc, {rating}) => {
                return acc + rating;
            }, 0);
            location.rating = total / location.reviews.length;
            location.save();

            let thisReview = location.reviews[location.reviews.length - 1];
            responseSuccess(201, thisReview, res);
        }).catch(err => {
            responseFailure(400, err.toString(), res);
        })

      }).catch(e => {
          responseFailure(404, "the location is not found", res);
  })
}

module.exports = {reviewsReadOne, createReview};