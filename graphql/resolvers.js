require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Project = require('../models/project');
const validation = require('../middlewares/createProjectValidation');

module.exports = {
    createProject: async function ({ userInput }, req) {
        if (!req.isAuth) {
            const error = new Error('User is not authenticated');
            error.code = 401;
            throw error;
        }

        validation(userInput);

        const project = new Project({
            title: userInput.title,
            description: userInput.description,
            techStack: userInput.techStack,
            thumbUrl: userInput.thumbUrl,
            imageUrls: userInput.imageUrls,
            deployedAt: userInput.deployedAt ? userInput.deployedAt : '',
            githubUrls: userInput.githubUrls
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
    },

    projects: async function({ page }, req) {
        if (!page) {
            page = 1;
        }

        const perPage = 2;

        const totalProjects = await Project.find().countDocuments();

        const projects = await Project
            .find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * perPage)
            .limit(2)
            .populate('creator');

        return {
            projects: projects.map(e => {
                return {
                    ...e._doc,
                    id: e._id.toString(),
                    createdAt: e.createdAt.toISOString(),
                    updatedAt: e.updatedAt.toISOString()
                }
            }),
            totalProjects
        }
    }
};