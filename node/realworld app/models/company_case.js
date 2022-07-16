const mongoose = require('mongoose');
const Joi = require('joi');

const companySchema = new mongoose.Schema({
    company_number: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
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

const Company_case = mongoose.model('Company_case', companySchema);

const schema = Joi.object({
    company_number: Joi.string().required(),
    name: Joi.string().required(),
    cause: Joi.string().required(),
    against: Joi.string().required(),
    lawyer: Joi.array().required()
});

exports.Company = Company_case;
exports.schema = schema;