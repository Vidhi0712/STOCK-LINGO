const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const bcrypt = require('bcrypt');
const User = require('./models/User');
const app = express();
const cors = require('cors');
app.use(cors());

// MIDDLEWARE
app.use(express.json());
const path = require('path'); // Add at the top

app.use(express.static(path.join(__dirname, 'public')));


// MONGOOSE
  mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('DB connected!'))
  .catch((err) => console.log(err));


// SIGNUP 
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    console.log('Received signup:', req.body);
    try {
    
    
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).send('User created!');
  } catch (err) {
    console.log('Signup error:', err.message);
    res.status(400).send(err.message);
  }
});

// LOGIN 
 // If you want hashing — optional for now

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Trying to login with username:', username);

    const user = await User.findOne({ username });
    console.log('User found?', user);

    if (!user) return res.status(404).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send('Invalid password');

    res.status(200).json({ username: user.username });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
