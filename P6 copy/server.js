//importing required template code
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('errorhandler');
const apiRouter = require('./api/api.js');

//instance of express
const app = express();

//Port that the server will listen on
const PORT = process.env.PORT || 4001;

//middleware function for bodyparser middleware
app.use(bodyParser.json());
//middleware function for morgan middleware
app.use(morgan('dev'));
//middleware function for errorHandler middleware
app.use(errorhandler());
//middleware function for cors middleware
app.use(cors());
//middleware for apiRouter
app.use('/api', apiRouter);


//start server listening on PORT
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
//export app for use in test file
module.exports = app;
