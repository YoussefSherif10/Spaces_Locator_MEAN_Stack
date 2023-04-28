// request package allows to make http calls to the api
const request = require('request')

/**
 * set the baseUrl according to NODE_ENV as the request package needs a full qualified address
 * that differs from dev to production
 */
const apiOptions = {
    server: 'http://localhost:3000/api'
};
if (process.env.NODE_ENV === 'production')
    apiOptions.server = 'https://spaces-locator.onrender.com/api'; // the web address

/**
 * this function is used to render the data and the views to send back a response
 * it also deals with an error response and empty response scenarios
 * @param req : requestObject
 * @param res : response
 * @param body : listOfObjects
 */
const renderHomePage = (req, res, body) => {
    let message = null;

    // case of error string
    if (!(body instanceof Array)) {
        message = "API lookup error";
        body = [];  // prevent the view from throwing an error
    }
    // case of no available places
    else if (!body.length)
        message = "No nearby places";

    res.render('locations-list', {
        pageHeaders: {
            title: 'Locator',
            strapLine: 'Find places to work with wifi near you!'
        },
        locations: body,
        message: message
    });
}

/**
 * put the distance in a readable format to be shown to the user
 * @param distance : distance
 * @returns {string} : formatedDistance
 */
const formatDistance = (distance) => {
    let thisDistance = 0, unit = 'm';
    if (distance > 1000) {
        thisDistance = parseFloat(distance / 1000).toFixed(1);
        unit = 'km';
    }
    else
        thisDistance = Math.floor(distance);
    return thisDistance + unit;
}

// the home page that displays the main list of locations
const homeList = (req, res) => {
    // defining the parameters of the request
    const requestOptions = {
        url: `${apiOptions.server}/locations`,
        method: 'GET',
        json: {},
        qs: {
            lng:  -0.7992599,
            lat: 51.378091
        }
    }

    // making the api call
    request(requestOptions, (err, {statusCode}, body) => {
        // format the distance to be readable
        let data = [];
        if (statusCode === 200 && body.length) {
            data = body.map(loc => {
                loc.distance = formatDistance(loc.distance);
                return loc;
            })
        }

        // render the processed response
        renderHomePage(req, res, data);
    });
}

/**
 * render the incoming data by using the location-info view
 * @param req : requestObj
 * @param res : response
 * @param body : ApiResponse
 */
const renderLocationDetails = (req, res, body) => {
    res.render('location-info', body);
}

/**
 * renders the error to the user by re-using the about page
 * @param req
 * @param res
 */
const renderError = (req, res) => {
    res.render('about', {
        title: 'Error getting the page',
        paragraphs: [{text: "Something went wrong, You can't get that page right now"}]
    });
}

// details of a location
const locationInfo = (req, res) => {
    const requestOptions = {
        url: `${apiOptions.server}/locations/${req.params.locationId}`,
        method: 'GET',
        json: {},
        qs: {}
    }

    request(requestOptions, (error, response, body) => {
        if (body)
            renderLocationDetails(req, res, body);
        else
            renderError(req, res);
    })
}

// adding new review
const addReview = (req, res) => {
    res.render('location-review-form', {title: 'Star cups'});
}

module.exports = {homeList, locationInfo, addReview};

// AIzaSyDX0W0bSoP2P81jHe4JcC1JaGXMRC4kXCo  google key