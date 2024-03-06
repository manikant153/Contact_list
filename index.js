const express = require('express');
const path = require('path');
const port = 2000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');
const { log } = require('console');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse urlencoded bodies
app.use(express.urlencoded({ extended: true }));

// Serving static files
app.use(express.static('assets'));

app.get('/', (req, res) => {
    Contact.find({})
        .then(contacts => {
            return res.render('home', {
                title: "My contact-list",
                contact_list: contacts
            });
        })
        .catch(err => {
            console.log('error in fetching contacts from db', err);
            return res.status(500).send('Internal Server Error');
        });
});

app.get('/practice', (req, res) => {
    return res.render('practice');
});

app.post('/create-contact', (req, res) => {
    Contact.create({
        name: req.body.firstname,
        phone: req.body.My_phone
    })
        .then(newContact => {
            console.log('*********', newContact);
            return res.redirect('back');
        })
        .catch(err => {
            console.log('error in creating a contact:', err);
            return res.status(500).send('Internal Server Error');
        });
});

app.get('/delete-contact', (req, res) => {
    let id = req.query.id;
    Contact.findByIdAndDelete(id)
        .then(() => {
            return res.redirect('back');
        })
        .catch(err => {
            console.log('error in deleting the object from database', err);
            return res.status(500).send('Internal Server Error');
        });
});

// Update operation
app.post('/update-contact', (req, res) => {
    let id = req.body.contactId; // Assuming a hidden input field named 'contactId' in the form
    let newName = req.body.newName;
    let newPhone = req.body.newPhone;

    Contact.findByIdAndUpdate(id, { name: newName, phone: newPhone }, { new: true })
        .then(updatedContact => {
            if (!updatedContact) {
                return res.status(404).send('Contact not found');
            }
            console.log('Updated contact:', updatedContact);
            return res.redirect('back');
        })
        .catch(err => {
            console.log('Error updating contact:', err);
            return res.status(500).send('Internal Server Error');
        });
});


// Running the server
app.listen(port, (err) => {
    if (err) {
        console.log("error ,Server is not running");
    }
    console.log("yup! server is running on port ",port);
});
