// require the library
const mongooes = require('mongoose');
// connect to database
mongooes.connect('mongodb://localhost/contact_list_db');

// checking if connected or not 
const db = mongooes.connection;

//error
db.on('error',console.error.bind(console,'error connecting to db'));

// up and running then print the message
db.once('open',function(){
    console.log('Successfully connected to the database');
});
