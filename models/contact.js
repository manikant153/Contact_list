const mongoose = require('mongoose');

// creating the schema ot the table
const contactschema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    }
});


const Contact = mongoose.model('Contact',contactschema);

module.exports = Contact;