const express = require('express');

const app = express();
const admin = express();

// Set the view engine for rendering templates
app.set('view engine', 'ejs');

// Mount the admin router
app.use('/admin', admin);

// Log when the admin router is mounted
admin.on('mount', (parent) => {
    console.log('Admin Mounted');
    console.log('Parent app:', parent);
});


// Define a route in the admin router
admin.get('/dashboard', (req, res) => {
    res.send('Welcome to admin dashboard.');
});

// Define routes for the main app
app.get('/', (req, res) => {
    res.send('Welcome to home page.');
});

// All methods for the /login route
app.all('/login', (req, res) => {
    res.send('Login operation with GET, POST, PUT etc.');
});

// Route to get all users
app.get('/users', (req, res) => {
    res.send('All users.');
});

// Parameter middleware for user ID
app.param('id', (req, res, next, id) => {
    const user = {
        userId: id,
        name: 'Sunny',
    };
    req.userDetails = user;
    next();
});

// Route to get a single user by ID
app.get('/users/:id', (req, res) => {
    console.log(req.userDetails); // { userId: '5', name: 'Sunny' }
    res.send('Single user.');
});

// Route for services
app.route('/services/service')
    .get((req, res) => {
        res.send('Your service GET.');
    })
    .post((req, res) => {
        res.send('Your service POST.');
    })
    .put((req, res) => {
        res.send('Your service PUT.');
    });

//Render method ,  Route for abouts page
app.route('/abouts')
    .get((req, res) => {
        res.render('pages/about');
    });

// Start the server
app.listen(3000, () => {
    console.log('Listening on port 3000');
});
