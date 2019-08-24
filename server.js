// Require our dependencies
const express = require('express');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');

// Set port to host designated port or 8080
const PORT = process.env.PORT || 8080;

// Instantiate our express app
const app = express();

// Require routes
require('./config/routes')(app);

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static(__dirname + '/public'));

// Connect handlebars to our express app
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Select which database
const db = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';

// Connect Mongoose to our database
mongoose.connect(db, error => {
    if (error) {
        console.log(error);
    }
    else {
        console.log('mongoose connection is successful');
    }
});

// Listen on Port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});