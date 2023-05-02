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
        const review = location.reviews.find(r => r._id == req.params.reviewId);
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
            date: req.body.date,    // the default is the current date
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

const reviewsUpdateOne = (req, res) => {
  Loc.findById(req.params.locationId)
      .select('reviews')
      .exec()
      .then(location => {
          let review = location.reviews.find(r => r._id == req.params.reviewId);
          review.rating = req.body.rating;
          review.review = req.body.review;
          review.data = req.body.date;

          location.save()
              .then(response => {
                  responseSuccess(200, response, res);
              }).catch(err => {
                responseFailure(400, "the review is not saved", res);
              })
      }).catch(error => {
          responseFailure(404, "location not found", res);
      })
}

const reviewsDeleteOne = (req, res) => {
  Loc.findById(req.params.locationId).select('reviews').exec()
      .then(location => {
          const index = location.reviews.findIndex(r => r._id == req.params.reviewId)
          location.reviews.splice(index, 1);

          location.save().then(response => {
              responseSuccess(204, null, res);
          }).catch(error => {
              responseFailure(400, "the review is not deleted");
          })
      }).catch(err => {
          responseFailure(404, "location not found", res);
      })
}

module.exports = {reviewsReadOne, createReview, reviewsUpdateOne, reviewsDeleteOne};