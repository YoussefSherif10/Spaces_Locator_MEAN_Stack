// the home page that displays the main list of locations
const homeList = (req, res) => {
    res.render('locations-list', {
        pageHeaders: {
            title: 'Locator',
            strapLine: 'Find places to work with wifi near you!'
        },
        locations:[
            {
            name: "Star cups",
            address: "125 High Street, Reading, RG6 1PS",
            rating: 3,
            facilities: ["Hot Drinks", "Food", "Wifi"],
            distance: "100m"
            },
            {
                name: "Cafe Hero",
                address: "125 High Street, Reading, RG6 1PS",
                rating: 4,
                facilities: ["Hot Drinks", "Food", "Wifi", "Comfort"],
                distance: "200m"
            },
            {
                name: "Burger Queen",
                address: "125 High Street, Reading, RG6 1PS",
                rating: 2,
                facilities: ["Food", "Wifi"],
                distance: "250m"
            }
        ]
    });
}

// details of a location
const locationInfo = (req, res) => {
    res.render('location-info', {
        title: "Star cups",
        rating: 3,
        address: "125 High Street, Reading, RG6 1PS",
        openingHours: ["Monday - Friday : 7:00am - 7:00pm", "Saturday : 8:00am - 5:00pm", "Sunday : closed"],
        facilities: ["Hot Drinks", "Food", "Wifi"],
        imgSrc: "http://maps.googleapis.com/maps/api/staticmap?center=51.455041,-0.9690884&zoom=17&size=400x350&sensor=false&markers=51.455041,-0.9690884&scale=2&key=AIzaSyDX0W0bSoP2P81jHe4JcC1JaGXMRC4kXCo",
        reviews: [
            {
                rating: 4,
                name: "Youssef Sherif",
                date: "25 April 2023",
                review: "what a great place"
            },
            {
                rating: 3,
                name: "Nahed Ahmed",
                date: "25 April 2023",
                review: "It was okay. Coffee wasn't great."
            },
            {
                rating: 1,
                name: "Ibrahim Fekry",
                date: "25 April 2023",
                review: "Didn't like it."
            }
        ]
    });
}

// adding new review
const addReview = (req, res) => {
    res.render('location-review-form', {title: 'Star cups'});
}

module.exports = {homeList, locationInfo, addReview};

// AIzaSyDX0W0bSoP2P81jHe4JcC1JaGXMRC4kXCo  google key