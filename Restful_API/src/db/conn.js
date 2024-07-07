const mongoose = require('mongoose');

// Connection URI
const uri = 'mongodb://localhost:27017/project';

// Connection Options
const options = {
    useNewUrlParser: true,
};

// Connect to MongoDB
mongoose.connect(uri, options)
    .then(() => {
        console.log('MongoDB connection is established');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });

// Export the mongoose connection (optional)
module.exports = mongoose.connection;


// const mongoose = require('mongoose');

// // Connection URI
// const uri = 'mongodb://localhost:27017/project';

// // Connection Options
// const options = {
//     useNewUrlParser: true,
// };

// // Connect to MongoDB
// mongoose.connect(uri, options)
//     .then(() => {
//         console.log('Connection is established');
//     })
//     .catch((error) => {
//         console.log('No connection', error);
//     });
