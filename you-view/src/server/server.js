require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/UserRoutes');
const featuredUserRoutes = require('./routes/UserRoutes'); // Import the new route
const passport = require('passport');
const session = require('express-session');
const cors = require('cors'); // Import cors

require('./strategies/google');

async function startServer() {
  const app = express();

  app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Add CORS middleware
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || '';
      return { token };
    },
  });

  await server.start();

  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to MongoDB');

  app.use(express.json());

  app.use(passport.initialize());

  app.use('/api/auth', authRoutes);
  app.use('/api', userRoutes);
  app.use('/api', featuredUserRoutes); // Register the new route

  server.applyMiddleware({ app, cors: false }); // Disable Apollo's CORS handling

  app.listen({ port: 4000 }, () => {
    console.log(`Server running at http://localhost:4000${server.graphqlPath}`);
  });
}

startServer();
