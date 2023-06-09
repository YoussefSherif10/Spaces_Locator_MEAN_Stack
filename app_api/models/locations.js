const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        'default': 0,
        min: 0,
        max: 5
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        'default': Date.now
    },
    review: {
        type: String,
        required: true
    }
})

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: String,
    rating: {
        type: Number,
        'default': 0,
        min: 0,
        max: 5
    },
    facilities: [String],
    coords: [Number],
    openingHours: [String],
    reviews: [reviewSchema]
})

/**
 * the 2dsphere enables MongoDB to do the correct
 * calculations when running queries and returning results.
 * It allows MongoDB to calculate geometries based on a spherical object.
 */
locationSchema.index({coords: '2dsphere'});

mongoose.model('Location', locationSchema);