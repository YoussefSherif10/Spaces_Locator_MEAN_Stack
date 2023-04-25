const about = (req, res) => {
    res.render('about', {
        title: 'About',
        paragraphs: [
            {text: `Spaces lists nearby places with Wi-Fi where people can go to get some work done. 
            It also displays facilities, opening times, a rating, and a location map for each place. 
            Users will be able to log in and submit ratings and reviews.`},
            {text: `This application has some grounding in the real world. 
            Location-based applications themselves aren’t particularly new and come in a few guises. 
            Swarm and Facebook Check In list everything nearby that they can and crowdsource data for new places 
            and information updates. Urbanspoon helps people find nearby places to eat, allowing a user to search 
            on price bracket and type of cuisine. Even companies like Starbucks and McDonald’s have sections of 
            their applications that help users find the nearest one.`}
        ]
    })
}

module.exports = {about};