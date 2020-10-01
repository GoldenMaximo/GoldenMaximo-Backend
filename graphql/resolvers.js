require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Project = require('../models/project');
const validation = require('../middlewares/createProjectValidation');

module.exports = {
    createProject: async function ({ userInput }, req) {

        validation(userInput);

        const project = new Project({
            title: userInput.title,
            description: userInput.description,
            languages: userInput.languages,
            thumbUrl: userInput.thumbUrl,
            imageUrls: userInput.imageUrls
        });

        const result = project.save();

        return result;
    },

    login: async function ({ email, password }, req) {
        const user = await User.findOne({ email });

        if (!user) {
            const error = new Error('No user found');
            error.statusCode = 404;
            throw error;
        };

        const isEqual = await bcrypt.compare(password, user.password);

        if (!isEqual) {
            const error = new Error('Invalid password');
            error.statusCode = 401;
            throw error;
        }

        const token = await jwt.sign(
            {
                userId: user._id.toString(),
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        return {
            token,
            userId: user._id.toString()
        };
    }
};