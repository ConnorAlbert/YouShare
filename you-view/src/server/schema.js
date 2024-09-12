const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    getUser(username: String!): User
    getAllUsers: [User]
    getFeaturedUser: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    login(username: String!, password: String!): AuthResponse
    updatePoints(userId: ID!, action: String!): User
  }

  type User {
    id: ID!  # Include id field
    username: String!
    email: String!
    dailyPoints: Int
    totalPoints: Int
    featuredVideoId: String 
  }

  type AuthResponse {
    message: String
    token: String
  }
`;

module.exports = typeDefs;
