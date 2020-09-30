const Project = require('../models/project');
const validation = require('../middlewares/createProjectValidation');

module.exports = {
    createProject: async function({userInput}, req) {

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

    }
};