const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Project {
        _id: ID!
        title: String!
        description: String!
        techStack: [String!]!
        thumbUrl: String!
        imageUrls: [String!]!
        deployedAt: String
        githubUrls: [String!]!
        isMobile: Boolean!
    }

    type ProjectData {
        projects: [Project!]!
        totalProjects: Int!
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
        techStack: [String!]!
        thumbUrl: String!
        imageUrls: [String!]!
        deployedAt: String
        githubUrls: [String!]!
        isMobile: Boolean!
    }

    type RootQuery {
        login(email: String!, password: String!): AuthData
        projects(page: Int!): ProjectData!
    }

    type RootMutation {
        createProject(userInput: ProjectInputData): Project!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);