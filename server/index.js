const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const cookieParse = require('cookie-parser');
const authenRoute = require('../backend/routes/user.js');
const categoryRoute = require('../backend/routes/category.js');
const colorRoute = require('../backend/routes/color.js')
const sizeRoute = require('../backend/routes/size.js')
const { notFound, errorHandler } = require('../backend/middleware/errorMiddleware')
const cors = require('cors')

const app = express();
app.use(cors())
app.use(cookieParse());
app.use(express.json());


// const buildDir = path.join(__dirname, '../build');
// console.log('Using files in ' + buildDir);

// const subDir = '/';
// const logRequests = false;

// if (subDir === '/') {
//     console.log('The server config assuming it is serving at the server root. You can control this with the `subDir` variable in index.js.');
// } else {
//     console.log('The server config assuming it is serving at \'' + subDir + '\'.');
// }

// if (logRequests) {
//     console.log('The server will log all incoming request. It\'s not recommended for production use.');
// }

// Serve the static files from the React app
app.use("/api/user",authenRoute);
app.use("/api/categories", categoryRoute)
app.use("/api/colors", colorRoute)
app.use("/api/sizes", sizeRoute)
// app.use(subDir, express.static(buildDir));
// Handles any requests that don't match the ones above
// app.get('*', (req, res) => {
//     if (logRequests) {
//         console.log(req.method + ' ' + req.url);
//     }
//     res.sendFile(path.join(buildDir, 'index.html'));
// });

const PORT  = process.env.PORT || 8080

app.use(notFound)
app.use(errorHandler)
app.listen(PORT,()=>{
    console.log("Server running port 8080")
})
