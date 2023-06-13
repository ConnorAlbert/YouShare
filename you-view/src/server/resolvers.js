const User = require('./models');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'your-secret-key';

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
      const { username, email, password } = args;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('Email address already exists');
      }
      const newUser = new User({ username, email, password });
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

module.exports = resolvers;