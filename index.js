const express = require('express');
const {
    ApolloServer
} = require('apollo-server-express');
const typeDefs = require("./src/typedefs")
const resolvers = require("./src/resolvers")
const pool = require("./src/db")
require('dotenv').config()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({
        req,
        res
    }) => ({
        req,
        res,
        pool
    }),
});

const app = express();
app.use(express.json())

server.applyMiddleware({
    app
});

const PORT = process.env.NODE_ENV || 4000

app.listen({
        port: PORT
    }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);