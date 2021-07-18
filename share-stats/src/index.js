const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const cookieSession = require('cookie-session');
const retrieve = require('./routes/retrieve');

const app = express();

// Middleware
app.use(json());
app.use(cors());
app.use(
  cookieSession({
    secure: false,
    signed: false,
  })
);

// Routes
app.use(retrieve);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
