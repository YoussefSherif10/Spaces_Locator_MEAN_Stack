const index = (req, res) => {
    res.render('index', {title: 'I love Nahuda'});
}

module.exports = {index}