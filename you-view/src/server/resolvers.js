const User = require('./models.js'); // Adjust the path if necessary
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'your-secret-key';

const resolvers = {
  Query: {
    getUser: async (parent, args) => {
      const { username } = args;
      // Fetch user by username
      return User.findOne({ username: username.toLowerCase() });
    },
    getAllUsers: async () => {
      // Fetch all users
      return User.find();
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const { username, email, password } = args;

      // Normalize input
      const normalizedUsername = username.toLowerCase();
      const normalizedEmail = email.toLowerCase();

      // Check if the user or email already exists
      const existingUser = await User.findOne({ $or: [{ email: normalizedEmail }, { username: normalizedUsername }] });
      if (existingUser) {
        if (existingUser.email === normalizedEmail) {
          throw new Error('Email already in use');
        }
        if (existingUser.username === normalizedUsername) {
          throw new Error('Username already in use');
        }
      }

      // Create and save new user
      const newUser = new User({ username: normalizedUsername, email: normalizedEmail, password });
      await newUser.save();
      return newUser;
    },
    login: async (parent, args) => {
      const { username, password } = args;
      // Fetch user by username
      const user = await User.findOne({ username: username.toLowerCase() });
      if (!user) {
        return {
          message: 'User not found',
        };
      }
      // Check password
      if (user.password !== password) {
        return {
          message: 'Invalid password',
        };
      }
      // Generate JWT token
      const token = generateToken(user);
      return {
        message: 'Login successful',
        token,
      };
    },
  },
};

// Function to generate JWT token
function generateToken(user) {
  const token = jwt.sign({ id: user.id, username: user.username }, secretKey, {
    expiresIn: '1h',
  });
  return token;
}

module.exports = resolvers;
