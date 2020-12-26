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
const host = require("./bin/environment")

app.use(cors({
    origin: host,
    credentials: true
}));

//REST ROUTES
const oAuth = require("./routes/oauth")
const auth = require("./routes/auth")
const email = require("./routes/emails")
const upload = require("./helpers/image-upload/upload")

//secure app by setting http headers
app.use(helmet())
// compress all responses
app.use(compression());
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))


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
    cors: false
});

const PORT = process.env.PORT || 4000

app.listen({
        port: PORT
    }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);