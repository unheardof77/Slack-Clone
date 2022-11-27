import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import db from './config/connection';

import typeDefs from './schemas/typeDefs';
import resolvers from './schemas/resolvers';

import { authMiddleware } from './utils/auth';

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
});

app.use(express.urlencoded({extended: false}));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
};

app.get('/', (req, res) => {res.sendFile(path.join(__dirname, '../client/build/index.html'));});

const startApolloServer = async ()=>{
    await server.start();
    server.applyMiddleware({app});
    db.once('open', ()=>{
        app.listen(PORT, ()=>{
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        })
    })
};

startApolloServer();