const express = require('express');
const ctrlLocations = require('../controllers/locations')
const ctrlOthers = require('../controllers/others')

const router = express.Router();

/* Location pages */
router.get('/', ctrlLocations.homeList);
router.get('/location/:locationId', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);

/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
