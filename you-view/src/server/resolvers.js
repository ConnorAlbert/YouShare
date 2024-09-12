const User = require('./models'); // Ensure correct path to your User model
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'your-secret-key';

const resolvers = {
  Query: {
    getUser: async (parent, args) => {
      const { username } = args;
      const user = await User.findOne({ username: username.toLowerCase() });
      return user ? { ...user._doc, id: user._id.toString() } : null;
    },
    getAllUsers: async () => {
      const users = await User.find();
      return users.map(user => ({ ...user._doc, id: user._id.toString() }));
    },
    getFeaturedUser: async () => {
      const featuredUser = await User.findOne({ featuredVideoId: { $exists: true } });
      return featuredUser ? { ...featuredUser._doc, id: featuredUser._id.toString() } : null;
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const { username, email, password } = args;
      const normalizedUsername = username.toLowerCase();
      const normalizedEmail = email.toLowerCase();

      const existingUser = await User.findOne({
        $or: [{ email: normalizedEmail }, { username: normalizedUsername }],
      });
      if (existingUser) throw new Error('Email or username already in use');

      const newUser = new User({ username: normalizedUsername, email: normalizedEmail, password });
      await newUser.save();
      return { ...newUser._doc, id: newUser._id.toString() };
    },
    login: async (parent, args) => {
      const { username, password } = args;
      const user = await User.findOne({ username: username.toLowerCase() });
      if (!user || user.password !== password) {
        return { message: 'Invalid username or password' };
      }
      const token = generateToken(user);
      return { message: 'Login successful', token };
    },
    updatePoints: async (parent, { userId, action }) => {
      try {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        user.dailyPoints += 1;
        user.totalPoints += 1;

        await user.save();
        return { ...user._doc, id: user._id.toString() };
      } catch (error) {
        throw new Error('Error updating points: ' + error.message);
      }
    },
  },
};

// Function to generate JWT token
function generateToken(user) {
  const token = jwt.sign({ id: user._id.toString(), username: user.username }, secretKey, {
    expiresIn: '1h',
  });
  return token;
}

module.exports = resolvers;
