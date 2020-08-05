const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

//'mongodb://localhost/todo

    mongoose.connect('mongodb+srv://testuser:6543210@rest-10ids.mongodb.net/rest?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', (error) => console.error(error));
    db.once('open', () => console.log('Connected to Database'));
    


app.use(express.json());
app.use(cors());

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);


app.listen(5000, () => console.log('server started'));

