const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema(
    {
        slug: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        techStack: {
            type: Schema.Types.Array,
            required: true
        },
        thumbUrl: {
            type: String,
            required: true
        },
        images: {
            type: Schema.Types.Array,
            required: true
        },
        deployedAt: String,
        githubUrls: {
            type: Schema.Types.Array,
            required: true
        },
        isMobile: {
            type: Schema.Types.Boolean,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);