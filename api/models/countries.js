const mongoose = require('mongoose');


const countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    identifier : {
        type: Number,
        required: true,
        unique: true
    },
});

mongoose.model("Country", countrySchema);