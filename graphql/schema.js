const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type RootQuery {
        hello: String!
    }

    type Project {
        _id: ID!
        title: String!
        shortDescription: String!
        description: String!
        languages: [String!]!
        thumbUrl: String!
        imageUrls: [String!]!
    }

    input ProjectInputData {
        title: String!
        shortDescription: String!
        description: String!
        languages: [String!]!
        thumbUrl: String!
        imageUrls: [String!]!
    }

    type RootMutation {
        createProject(userInput: ProjectInputData): Project!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);