const Project = require('../models/project');
const validator = require('validator').default;

module.exports = {
    createProject: async function({userInput}, req) {

        const project = new Project({
            title: userInput.title,
            shortDescription: userInput.shortDescription,
            description: userInput.description,
            languages: userInput.languages,
            thumbUrl: userInput.thumbUrl,
            imageUrls: userInput.imageUrls
        });

        const result = project.save();

        return result;

        // const errors = [];

        // if (!validator.isEmpty(userInput.title)) {
        // }

    }
};