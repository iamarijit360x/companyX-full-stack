const { body, param, query } = require('express-validator');
const utilsService = require('../services/utilsService');



const validateCreateBlog = [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('author').notEmpty().withMessage('Author is required')
];

const validateEditBlog = [
    param('id').custom(value => {
        if (!utilsService.isObjectId(value)) {
            throw new Error('Invalid ObjectId.');
        }
        return true;
    }),
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('content').optional().notEmpty().withMessage('Content cannot be empty')
];

const validateViewBlogs = [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer')
];

module.exports = {validateCreateBlog, validateEditBlog, validateViewBlogs };
