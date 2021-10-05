const { User, Goal } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .populate('goals')
                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        users: async () => {
            return User.find()
                .populate('goals');
        },
        user: async(parent, { username }) => {
            return User.findOne({ username })
                .populate('goals');
        },
        goals: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Goal.find(params).sort({ createdAt: -1 });
        },
        goal: async (parent, {_id }) => {
            return Goal.findOne({ _id });
        }
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials')
            }

            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        }
    }
};

module.exports = resolvers;