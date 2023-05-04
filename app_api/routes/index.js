const express = require('express');
const router = express.Router();
const ctrlLocations = require('../controllers/locations');
const ctrlReviews = require('../controllers/reviews');
const ctrlUsers = require('../controllers/users');
const jwt = require("jsonwebtoken");

/* Locations */
router.route('/locations')
    .get(ctrlLocations.locationsList)
    .post(ctrlLocations.createLocation);
router.route('/locations/:locationId')
    .get(ctrlLocations.locationsReadOne)
    .put(ctrlLocations.locationsUpdateOne)
    .delete(ctrlLocations.locationsDeleteOne);

/* Reviews */
router.route('/locations/:locationId/reviews')
    .post(ctrlReviews.createReview);
router.route('/locations/:locationId/reviews/:reviewId')
    .get(ctrlReviews.reviewsReadOne)
    .put(ctrlReviews.reviewsUpdateOne)
    .delete(ctrlReviews.reviewsDeleteOne);

/* users */
router.post('/login', ctrlUsers.login);
router.post('/signup', ctrlUsers.signup);
router.get('/accessResource', (req, res)=> {
        const token = req.headers.authorization.split(' ')[1];
        //Authorization: 'Bearer TOKEN'
        if (!token) {
            res.status(200).json({success: false, message: "Error! Token was not provided."});
        }
        //Decoding the token
        const decodedToken = jwt.verify(token, "ThisIsSecret");
        // get the user data from the token
        res.status(200).json({success: true, data: {userId: decodedToken._id, email: decodedToken.email}});
    }
)


module.exports = router;