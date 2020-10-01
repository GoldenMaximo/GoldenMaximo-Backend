const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Project {
        _id: ID!
        title: String!
        description: String!
        languages: [String!]!
        thumbUrl: String!
        imageUrls: [String!]!
    }

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String!
    }

    type AuthData {
        token: String!
        userId: String!
    }

    input ProjectInputData {
        title: String!
        description: String!
        languages: [String!]!
        thumbUrl: String!
        imageUrls: [String!]!
    }

    type RootQuery {
        login(email: String!, password: String!): AuthData
    }

    type RootMutation {
        createProject(userInput: ProjectInputData): Project!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);