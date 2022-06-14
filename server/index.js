const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParse = require('cookie-parser');
const authenRoute = require('../backend/routes/authen.js');

const app = express();
app.use(cookieParse());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URL,()=>{
    console.log("Connect to MongoDB")
})




const buildDir = path.join(__dirname, '../build');
console.log('Using files in ' + buildDir);

const subDir = '/';
const logRequests = false;

if (subDir === '/') {
    console.log('The server config assuming it is serving at the server root. You can control this with the `subDir` variable in index.js.');
} else {
    console.log('The server config assuming it is serving at \'' + subDir + '\'.');
}

if (logRequests) {
    console.log('The server will log all incoming request. It\'s not recommended for production use.');
}

// Serve the static files from the React app
app.use("/",authenRoute);
app.use(subDir, express.static(buildDir));
// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    if (logRequests) {
        console.log(req.method + ' ' + req.url);
    }
    res.sendFile(path.join(buildDir, 'index.html'));
});


app.listen(3000,()=>{
    console.log("Server running port 3000")
})
