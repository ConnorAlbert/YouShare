require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'your-secret-key';

const typeDefs = gql`
  type Query {
    getUser(email: String!): User
    getAllUsers: [User]
  }

  type Mutation {
    createUser(email: String!, password: String!): User
    login(email: String!, password: String!): AuthResponse
  }

  type User {
    email: String!
    password: String!
  }

  type AuthResponse {
    message: String
    token: String
  }
`;

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

const resolvers = {
  Query: {
    getUser: async (parent, args) => {
      const { email } = args;
      return User.findOne({ email });
    },
    getAllUsers: async () => {
      return User.find();
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const { email, password } = args;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('Email address already exists');
      }
      const newUser = new User({ email, password });
      await newUser.save();
      return newUser;
    },
    login: async (parent, args) => {
      const { email, password } = args;
      const user = await User.findOne({ email });
      if (!user) {
        return {
          message: 'User not found',
        };
      }
      if (user.password !== password) {
        return {
          message: 'Invalid password',
        };
      }
      const token = generateToken(user);
      return {
        message: 'Login successful',
        token,
      };
    },
  },
};

function generateToken(user) {
  const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
    expiresIn: '1h',
  });
  return token;
}

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    req.userId = decoded.id;
    next();
  });
}

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

  const app = express();

  await mongoose.connect('mongodb+srv://connoralbert29:6bCmOUsFSXExWcQ2@youshare.z5stuzi.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to MongoDB');

  app.use(express.json());

  server.applyMiddleware({ app, cors: true });

  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = generateToken(user);
    res.json({ token });
  });

  app.get('/protected-route', verifyToken, (req, res) => {
    const userId = req.userId;
    // Handle the protected route logic
    res.json({ userId });
  });

  app.listen({ port: 4000 }, () => {
    console.log(`Server running at http://localhost:4000${server.graphqlPath}`);
  });
}

startServer();
