const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

mongoose.connect('mongodb://127.0.0.1:27017/compnay-x')

 async function createUser(name, email, password, isAdmin = false) {
   
        const user = await User.create({ name, email, password, isAdmin });
        console.log(user)
}

(async () => {
    try {
        await createUser("John Doe", "john.doe@example.com", "securePassword123", true);
        console.log("User created successfully!");
    } catch (error) {
        console.error("Error creating user:", error);
    }
})();