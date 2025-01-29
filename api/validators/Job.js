const { body } = require('express-validator');

const createJobValidator = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('requirements').notEmpty().withMessage('Company is required'),
    body('location').notEmpty().withMessage('Location is required'),
];

module.exports = { createJobValidator };
