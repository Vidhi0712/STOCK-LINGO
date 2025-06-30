const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const app = express();

// MIDDLEWARE
app.use(express.json());
const path = require('path'); // Add at the top

app.use('/signup', express.static(path.join(__dirname, 'SIGN UP PAGE')));
app.use('/login', express.static(path.join(__dirname, 'LOG IN PAGE')));
app.use('/dashboard', express.static(path.join(__dirname, 'DASHBOARD PAGE')));

// MONGOOSE
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('DB connected!'))
  .catch((err) => console.log(err));


// SIGNUP 
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    console.log('Received signup:', req.body);
    try {
    
    const bcrypt = require('bcrypt');
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).send('User created!');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// LOGIN 
const bcrypt = require('bcrypt'); // If you want hashing — optional for now

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send('Invalid password');

    res.status(200).send('Login successful!');
  } catch (err) {
    res.status(500).send(err.message);
  }
});






// START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
