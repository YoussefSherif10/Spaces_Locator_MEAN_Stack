// the home page that displays the main list of locations
const homeList = (req, res) => {
    res.render('index', {title: 'Home'});
}

// details of a location
const locationInfo = (req, res) => {
    res.render('index', {title: 'details'});
}

// adding new review
const addReview = (req, res) => {
    res.render('index', {title: 'review'});
}

module.exports = {homeList, locationInfo, addReview};