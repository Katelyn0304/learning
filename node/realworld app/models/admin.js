const mongoose = require('mongoose');
const Joi = require('joi');

const adminSchema = new mongoose.Schema({
    id_number: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    birth: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    code_name: {
        type: String,
        required: true
    }
});

const Admin = mongoose.model('Admin', adminSchema);

const schema = Joi.object({
    id_number: Joi.string().required(),
    name: Joi.string().required(),
    birth: Joi.date().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
    code_name: Joi.string().required()
});

exports.Admin = Admin;
exports.schema = schema;