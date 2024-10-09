const mongoose = require('mongoose');

const mongoConnect = () => {
  const mongoURI = process.env.MONGO_URI;
  
  if (!mongoURI) {
    console.error('MongoDB URI not defined. Check .env file.');
    return;
  }

  mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });

  mongoose.connection.on('error', (err) => {
    console.log('Error while connecting to MongoDB:', err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
  });
};

module.exports = mongoConnect;
