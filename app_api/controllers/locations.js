const mongoose = require('mongoose');
const Loc = mongoose.model('Location')

const responseSuccess = (status, data, res) => {
    res.status(status).json(data)
}

const responseFailure = (status, msg, res) => {
  res.status(status).json({"message": msg});
}

const locationsList = async (req, res) => {
  // api/locations?lng=-0.9690884&lat=51.455041
  // that is the url that we can use to get the 10 near locations to a specific coordinates

  if (!req.query.lng || !req.query.lat)
    responseFailure(400, "lng and lat parameters are required", res);

  const point = {
    type: "Point",
    coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
  };

  // find the places near to a specific longitude and latitude
  try {
    const locations = await Loc.aggregate([{
      $geoNear: {
        near: point,
        distanceField: "distance",
        maxDistance: 20000,
        spherical: true,
        $limit: 10
      }
    }]);

    // get the needed data for the starting page
    const results = locations.map(loc => {
      return {
        name: loc.name,
        address: loc.address,
        rating: loc.rating,
        facilities: loc.facilities,
        distance: loc.distance
      }
    });

    // respond with the results array
    responseSuccess(200, results, res);

  } catch (e) {
    console.log(e);
  }
}

const locationsReadOne = (req, res) => {
  Loc.findById(req.params.locationId).exec().then(data => {
    responseSuccess(200, data, res);
  }).catch(err => {
    responseFailure(404, "Location not found", res);
  });
}

const createLocation = (req, res) => {
  Loc.create({
    name: req.body.name,
    address: req.body.address,
    rating: req.body.rating,
    facilities: req.body.facilities,
    coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
    openingHours: req.body.openingHours
  }).then(location => {
    responseSuccess(201, location, res);
  }).catch(error => {
    responseFailure(400, "the document is not created", res);
  });
}

const locationsUpdateOne = (req, res) => {
  Loc.findById(req.params.locationId)
      .select('-reviews -rating')
      .exec()
      .then(location => {
        location.name = req.body.name;
        location.address = req.body.address;
        location.rating = req.body.rating;
        location.facilities = req.body.facilities;
        location.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
        location.openingHours = req.body.openingHours;

        location.save().then(response => {
          responseSuccess(200, response, res);
        }).catch(err => {
          responseFailure(400, "the location is not updated", res)
        })
      }).catch(err => {
        responseFailure(404, "Location not found", res);
      })
}

module.exports = {locationsList, locationsReadOne, createLocation, locationsUpdateOne};