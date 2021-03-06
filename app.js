require('dotenv').config();
const path = require('path');
// const multer = require('multer');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const { v4: uuidv4 } = require('uuid');

const auth = require('./middlewares/auth');

const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require('./graphql/schema.js');
const graphqlResolvers = require('./graphql/resolvers');

const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ygqkk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express();

// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'images');
//     },
//     filename: (req, file, cb) => {
//         cb(null, uuidv4() + '-' + file.originalname);
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
//         cb(null, true);
//     } else {
//         cb(null, false)
//     }
// }

app.use(bodyParser.json());
// app.use(
//     multer({ storage: fileStorage, fileFilter }).single('image')
// );
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(auth);

app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
    formatError(err) {
        console.log(err);
        if (!err.originalError) {
            return err;
        }
        const { data } = err.originalError;
        const message = err.message || 'An error occured.';
        const code = err.originalError.code || 500;
        return { message, status: code, data };
    }
}));

app.use((error, req, res, next) => {
    console.log(error);
    const statusCode = error.statusCode || 500;
    const { message, data } = error;
    return res.status(statusCode).json({ message, data });
});

mongoose.connect(MONGODB_URI).then(() => {
    app.listen(process.env.PORT || 3000);
}).catch(err => console.log('ATLAS CONNECTION ERROR: ', err));