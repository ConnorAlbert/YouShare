const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const app = express();

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || '';
      return { token };
    },
  });

  await server.start();

  await mongoose.connect('mongodb+srv://connoralbert29:6bCmOUsFSXExWcQ2@youshare.z5stuzi.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to MongoDB');

  app.use(express.json());

  server.applyMiddleware({ app, cors: true });

  app.listen({ port: 4000 }, () => {
    console.log(`Server running at http://localhost:4000${server.graphqlPath}`);
  });
}

startServer()