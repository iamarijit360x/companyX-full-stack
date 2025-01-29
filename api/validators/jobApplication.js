const { body, param } = require('express-validator');
const utilsService = require('../services/utilsService');

const validateEditService = [
    body('jobId').isMongoId().withMessage('Invalid Job ID'),
    body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('phone').isString().withMessage('Phone must be a string').notEmpty().withMessage('Phone is required'),
    body('cv').matches(/\.(pdf|docx)$/i).withMessage('CV must be in PDF or DOCX format')
];

module.exports = { validateEditService };
