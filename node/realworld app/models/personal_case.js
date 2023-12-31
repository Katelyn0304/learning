const mongoose = require('mongoose');
const Joi = require('joi');

const personSchema = new mongoose.Schema({
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
    cause: {
        type: String,
        required: true
    },
    against: {
        type: String,
        required: true
    },
    lawyer: [{
        _id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        code_name: {
            type: String,
            required: true
        }
    }],
    created_by: {
        _id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }
});

const Personal_case = mongoose.model('Personal_case', personSchema);

const schema = Joi.object({
    id_number: Joi.string().required(),
    name: Joi.string().required(),
    birth: Joi.date().required(),
    cause: Joi.string().required(),
    against: Joi.string().required(),
    lawyer: Joi.array().required()
});

exports.Person = Personal_case;
exports.schema = schema;