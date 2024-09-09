const User = require('./models'); // Ensure correct path to your User model
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'your-secret-key';

const resolvers = {
  Query: {
    getUser: async (parent, args) => {
      const { username } = args;
      return User.findOne({ username: username.toLowerCase() });
    },
    getAllUsers: async () => {
      return User.find();
    },
    getFeaturedUser: async () => {
      const featuredUser = await User.findOne({ featuredVideoId: { $exists: true } });
      return featuredUser;
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
      return newUser;
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

        // Increment daily and total points by 1 for each action
        user.dailyPoints += 1;
        user.totalPoints += 1;

        await user.save();
        return user; // Return the updated user with current points
      } catch (error) {
        throw new Error('Error updating points: ' + error.message);
      }
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
