const mongoose = require('mongoose');

const QuotationMongoSchema = new mongoose.Schema({
    start: {
        country: Number,
        state: Number,
        city: Number
    },
    end: {
        country: Number,
        state: Number,
        city: Number
    },
    date: {type:Date, index: true},
    value: Number
},{
    timestamps: {
        createdAt: 'createdOn'
    }
});

QuotationMongoSchema.index({"createdOn": 1});

module.exports = mongoose.model('quotations', QuotationMongoSchema);
