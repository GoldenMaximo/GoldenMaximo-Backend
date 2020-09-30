const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        shortDescription: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        languages: {
            type: Schema.Types.Array,
            required: true
        },
        thumbUrl: {
            type: String,
            required: true
        },
        imageUrls: {
            type: Schema.Types.Array,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);