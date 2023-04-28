const express = require('express');
const ctrlLocations = require('../controllers/locations')
const ctrlOthers = require('../controllers/others')

const router = express.Router();

/* Location pages */
router.get('/', ctrlLocations.homeList);
router.get('/location/:locationId', ctrlLocations.locationInfo);
router.route('/location/:locationId/review/new')
    .get(ctrlLocations.addReview).post(ctrlLocations.doAddReview);

/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
