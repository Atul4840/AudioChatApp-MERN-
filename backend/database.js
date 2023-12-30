const mongoose = require('mongoose');

function DbConnect() {
  // Replace 'your_database_url' with the actual MongoDB connection URL
  const databaseUrl = process.env.DB_URL // process;

  // Connect to the MongoDB database
  mongoose.connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  });

  // Get the default connection
  const db = mongoose.connection;

  // Event listeners for the database connection
  db.on('error', console.error.bind(console,"connection error:"));

  db.once('open', () => {
    console.log('Connected to MongoDB');
  });

  // If you want to close the connection when the Node.js process ends (e.g., on application exit)
//   process.on('SIGINT', () => {
//     db.close(() => {
//       console.log('MongoDB connection closed through app termination');
//       process.exit(0);
//     });
//   });
}

module.exports = DbConnect
