const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    getUser(email: String!): User
    getAllUsers: [User]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): AuthResponse
  }

  type User {
    username: String!
    email: String!
    password: String!
  }

  type AuthResponse {
    message: String
    token: String
  }
`;

module.exports = typeDefs;