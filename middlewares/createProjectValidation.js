const validator = require('validator').default;

module.exports = userInput => {
    const errors = [];

    if (validator.isEmpty(userInput.title)) {
        errors.push({ message: 'Title must not be empty' });
    };

    if (validator.isEmpty(userInput.description)) {
        errors.push({ message: 'Description must not be empty' });
    };

    if (!userInput.techStack.length) {
        errors.push({ message: 'Tech stack must be provided' });
    };

    if (validator.isEmpty(userInput.thumbUrl)) {
        errors.push({ message: 'Thumbnail URL must not be empty' });
    };

    if (!userInput.images.length) {
        errors.push({ message: 'Image URLs must not be empty' });
    };

    if (!userInput.githubUrls.length) {
        errors.push({ message: 'Repo URLs must not be empty' });
    };

    if (errors.length > 0) {
        const error = new Error('Invalid input');
        error.statusCode = 422;
        error.data = errors;
        throw error;
    };

    return true;
};