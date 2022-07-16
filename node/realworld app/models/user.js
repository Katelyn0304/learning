const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    id_number: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
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
        type: String,
        required: true
    },
    code_name: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true,
        min: 1,
        max: 4,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, level: this.level }, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

const schema = Joi.object({
    id_number: Joi.string().required(),
    name: Joi.string().required(),
    birth: Joi.date().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    code_name: Joi.string().required(),
    password: Joi.string().required(),
    level: Joi.number().integer().required().min(1).max(3)
});

exports.User = User;
exports.schema = schema;