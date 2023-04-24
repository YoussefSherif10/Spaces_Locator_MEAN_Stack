const index = (req, res) => {
    res.render('index', {title: 'Kos Om'});
}

module.exports = {index}