const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const morgan = require('morgan');

require('dotenv').config({
    path: "./config/config.env"
})

connectDB()             //Mongo DB Connection


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());        //running api in reactjs from server without any error while json transferring
app.use(morgan('dev'))  //Give Information about each request


//Load all route
const authRouter = require('./routes/auth.route');

//Use Route
app.use('/api/',authRouter)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 3001 ;
app.listen(PORT, () => {
    console.log("server starting at port ",PORT);
})