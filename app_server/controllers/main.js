const index = (req, res) => {
    res.render('index', {title: 'hamada'});
}

module.exports = {index}