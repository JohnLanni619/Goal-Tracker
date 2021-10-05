const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    goals: [Goal]
}

type Goal {
    _id: ID
    goalTitle: String
    targetDate: String
    createdAt: String
    username: String
    habits: [Habit]
}

type Habit {
    _id: ID
    habitTitle: String
    frequency: String
    completed: Boolean
    username: String
    createdAt: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
    users: [User]
    user(username: String!): User
    goals(username: String): [Goal]
    goal(_id: ID!): Goal
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addGoal(goalTitle: String!, targetDate: String!): Goal
    addHabit(goalId: ID!, habitTitle: String!, frequency: String!): Goal
}
`;

module.exports = typeDefs;