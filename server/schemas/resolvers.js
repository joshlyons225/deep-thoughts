// import models
const { User, Thought } = require("../models");

// set Thought query resolver
const resolvers = {
  Query: {
    // search by Thoughts by username
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      // return results in descending order
      return Thought.find(params).sort({ createdAt: -1 });
    },
    // search Thoughts by id
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    },
    // get all users
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },
  },
};

module.exports = resolvers;
