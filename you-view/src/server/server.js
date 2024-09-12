const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const userRoutes = require('./routes/UserRoutes'); // Ensure this path is correct
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cron = require('node-cron');
const User = require('./models'); // Import User model
const path = require('path');

async function startServer() {
  const app = express();

  // CORS setup
  app.use(cors({
    origin: 'https://youview-190cb1d0e6db.herokuapp.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true
  }));

  // Session setup
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }));

  // Middleware to authenticate users
  app.use(async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Store user info in request
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
    next();
  });

  // Initialize Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // Pass token to Apollo Server context
      const token = req.headers.authorization || '';
      return { token, user: req.user }; // Include user in context
    },
    playground: process.env.NODE_ENV !== 'production', // Enable only in non-prod
    introspection: process.env.NODE_ENV !== 'production' // Enable only in non-prod
  });

  await server.start();

  // Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process if DB connection fails
  }

  // Middleware
  app.use(express.json());
  app.use(passport.initialize());

  // Route setup for API endpoints
  app.use('/api', userRoutes);

  // Apply Apollo Server middleware
  server.applyMiddleware({ app, path: '/graphql', cors: false });

  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, '../../build')));

  // Handle React routing, return the main React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  });

  // Schedule a cron job to reset daily points every day at midnight
  cron.schedule('0 0 * * *', async () => {
    try {
      // Reset daily points for all users
      await User.updateMany({}, { $set: { dailyPoints: 0 } });
      console.log('Daily points reset for all users at midnight.');
    } catch (error) {
      console.error('Error resetting daily points:', error);
    }
  });

  // Start server
  const PORT = process.env.PORT || 4000; // Use dynamic port for Heroku
  app.listen(PORT, () => {
    console.log(`Server running at https://youview-190cb1d0e6db.herokuapp.com${server.graphqlPath}`);
  });
}

startServer();
