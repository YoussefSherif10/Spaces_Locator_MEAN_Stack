const index = (req, res) => {
    res.render('index', {title: 'Hamada'});
}

module.exports = {index}