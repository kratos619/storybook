const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
//passport config
require('./config/passport')(passport);
//load routes
const auth = require('./routes/auth');

const app = express();

//load keys 
const keys = require('./config/keys');

//mongoose connect
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true
}).then(() => {
    console.log('db connect');
}).catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('it works');
});

app.use('/auth', auth);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`app running on http://localhost:${port}`);

})