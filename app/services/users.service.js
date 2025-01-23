const User=require('../models/users.model')
const logger = require('../utils/logger'); 

exports.createUser = async (userData) => {
    try {
        const user = await User.create(userData); 
        logger.info('User created successfully', user);
        return user; 
    } catch (error) {
        logger.error('Error creating user:', error);
        throw error;
    }
};


