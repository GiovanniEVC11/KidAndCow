const mongoose = require('mongoose');
const { Schema } = mongoose; 

const ProductionData = new Schema({
    tub: Number,
    product: String,
    bars: Number,
    pieces: Number,
    weight: Number
}, { versionKey: false } ); 

// Export Model (Name Model, Model's Object)
module.exports = mongoose.model('ProductionData', ProductionData);

/*
    const { Schema, model } = mongoose; 
    ****
    module.exports = model('productionData', productionData);
*/