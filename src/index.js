const express = require('express');
const {
    ApolloServer
} = require('apollo-server-express');
const typeDefs = require("./typedefs")
const resolvers = require("./resolvers")
const pool = require("./db")
const cors = require("cors")
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
app.use(cors({
    credentials: true,
    // origin: 'http://localhost:3000',  
    // preflightContinue: true,
}));

server.applyMiddleware({
    app
});

const PORT = process.env.NODE_ENV || 4000

app.listen({
        port: PORT
    }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);