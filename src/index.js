const express = require('express');
const {
    ApolloServer
} = require('apollo-server-express');
const typeDefs = require("./typedefs")
const resolvers = require("./resolvers")
const pool = require("./db")
const cors = require("cors")
const {
    router
} = require("./helpers/auth/create-tokens")
require('dotenv').config()

const app = express();
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));



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


//refresh-token and logout routes

app.use("/api", router)

server.applyMiddleware({
    app,
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});

const PORT = process.env.NODE_ENV || 4000

app.listen({
        port: PORT
    }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);