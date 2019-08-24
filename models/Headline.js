const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const headlineSchema = new Schema({
    headline: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        typr: String,
        required: true
    },
    date: String,
    saved: {
        type: String,
        default: false
    }
});

const Headline = mongoose.model('Headline', headlineSchema);

module.exports = Headline;