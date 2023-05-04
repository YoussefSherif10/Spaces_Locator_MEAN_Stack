const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

const responseSuccess = (status, data, res) => {
    res.status(status).json(data)
}

const responseFailure = (status, msg, res) => {
    res.status(status).json({"message": msg});
}

const login = async (req, res) => {
    // check the entered data
    if (!(req.body.email && req.body.password))
        return responseFailure(400, 'All fields are required', res);

    // find the user
    User.findOne({email: req.body.email})
        .exec()
        .then(user => {
            if (user.password !== req.body.password)
                return responseFailure(400, 'invalid password', res);

            // generate token
            let token;
            try {
                token = jwt.sign({
                    _id: user._id,
                    email: user.email,
                }, 'ThisIsSecret', {expiresIn: "1d"});

                // return the response containing the jwt
                return responseSuccess(200, {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    token: token
                }, res);
            } catch {
                return responseFailure(500, 'something went wrong', res);
            }

        }).catch(() => {
        return responseFailure(404, "User not found", res);
    });
}

const signup = (req, res) => {
    // check the request
    if (!(req.body.name && req.body.email && req.body.password))
        return responseFailure(400, 'All fields are required');

    // create a new user
    User.create({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    }).then(user => {
        // generate token
        let token;
        try {
            token = jwt.sign({
                _id: user._id,
                email: user.email,
            }, 'ThisIsSecret', {expiresIn: "1d"});
        } catch {
            return responseFailure(500, 'couldn\'t authenticate', res);
        }

        // send the token
        return responseSuccess(200, {token: token}, res);
    }).catch(() => {
        return responseFailure(500, 'couldn\'t save', res);
    })


}

module.exports = {login, signup};