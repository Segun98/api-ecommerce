// @ts - check
const express = require('express');
const app = express();
require('dotenv').config()
const {
    ApolloServer
} = require('apollo-server-express');
const typeDefs = require("./typedefs")
const resolvers = require("./resolvers")
const pool = require("./db")
const cors = require("cors")
const {
    single,
    multiple
} = require('./helpers/dataloader')
const compression = require('compression')
const helmet = require("helmet");
// require("./helpers/auth/passport")

//endpoints & Cors
let local = ['http://localhost:3000', 'http://localhost:5000']
let prod = ['https://adminpartystore.vercel.app', 'https://partystore.vercel.app']

app.use(cors({
    origin: local,
    credentials: true
}));

//REST ROUTES
const oAuth = require("./helpers/auth/oauth")
const auth = require("./helpers/auth/auth")
const upload = require("./helpers/image-upload/upload")
const email = require("./helpers/emails")

//secure app by setting http headers
app.use(helmet())
// compress all responses
app.use(compression());
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))


// app.use(passport.initialize())

//refresh-token and logout routes
app.use("/api", auth)
//image upload route
app.use("/api", upload)
//emails
app.use("/api", email)
//oauth authentication
app.use("/api", oAuth)

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({
        req,
        res
    }) => ({
        req,
        res,
        pool,
        loaderOne: new single(),
        loaderTwo: new multiple()
    }),
});


server.applyMiddleware({
    app,
    cors: false,
    // cors: {
    //     origin: endpoints[1],
    //     credentials: true
    // }
});

const PORT = process.env.PORT || 4000

app.listen({
        port: PORT
    }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);