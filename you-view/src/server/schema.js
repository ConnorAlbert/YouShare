const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    getUser(username: String!): User
    getAllUsers: [User]
    getFeaturedUser: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    login(username: String!, password: String!): AuthResponse  # Add login mutation
    updatePoints(userId: ID!, action: String!): User
  }

  type User {
    username: String!
    email: String!
    password: String!
    dailyPoints: Int
    totalPoints: Int
  }

  type AuthResponse {  # Define the AuthResponse type
    message: String
    token: String
  }
`;

module.exports = typeDefs;
