const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Image {
        imageName: String!
        imageUrl: String!
    }

    type Project {
        _id: ID!
        slug: String!
        title: String!
        description: String!
        techStack: [String!]!
        thumbUrl: String!
        images: [Image!]!
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

    input ImageInputData {
        imageName: String!
        imageUrl: String!
    }

    input ProjectInputData {
        title: String!
        description: String!
        techStack: [String!]!
        thumbUrl: String!
        images: [ImageInputData!]!
        deployedAt: String
        githubUrls: [String!]!
        isMobile: Boolean!
    }

    type RootQuery {
        login(email: String!, password: String!): AuthData
        projects(page: Int): ProjectData!
        project(slug: String): Project!
    }

    type RootMutation {
        createProject(userInput: ProjectInputData): Project!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);