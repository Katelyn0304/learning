const mongoose = require('mongoose');
const Joi = require('joi');
const { required } = require('joi');

const testSchema = new mongoose.Schema({
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
    user: {
        type: new mongoose.Schema({
            code_name: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        }),
        required: true
    },
    user: {
        type: new mongoose.Schema({
            code_name: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        }),
        required: true
    }
});

const Test = mongoose.model('Test', testSchema);

const schema = Joi.object({
    id_number: Joi.string().required(),
    name: Joi.string().required(),
    birth: Joi.date().required(),
    cause: Joi.string().required(),
    against: Joi.string().required(),
});

const IdSchema = Joi.object({
    userId: Joi.objectId().required()
});

exports.Test = Test;
exports.schema = schema;
exports.IdSchema = IdSchema;