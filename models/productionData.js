const mongoose = require('mongoose');
const { Schema } = mongoose; 

const productionData = new Schema({
    product: String,
    bars: String,
    pieces: String,
    tub: String,
    weight: String,
    comments: String
}); 

// Export Model (Name Model, Model's Object)
module.exports = mongoose.model('productionData', productionData);

/*
    const { Schema, model } = mongoose; 
    ****
    module.exports = model('productionData', productionData);

*/