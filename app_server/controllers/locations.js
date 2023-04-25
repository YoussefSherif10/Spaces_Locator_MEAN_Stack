// the home page that displays the main list of locations
const homeList = (req, res) => {
    res.render('locations-list', {});
}

// details of a location
const locationInfo = (req, res) => {
    res.render('location-info', {});
}

// adding new review
const addReview = (req, res) => {
    res.render('index', {title: 'review'});
}

module.exports = {homeList, locationInfo, addReview};

// AIzaSyDX0W0bSoP2P81jHe4JcC1JaGXMRC4kXCo  google key