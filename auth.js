const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const utils = require('./db/utils');
const cors = require('cors');

const accessTokenSecret = 'pnsecrettoken';

app.use(cors());

app.options('*', cors()); // Enable pre-flight requests for all routes

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log("Email:", email);
    console.log("Password:", password);
    //Authentication condition
    utils.fetchUser(email).then((result) => {
        console.log("Result:", result);
        if(password == result[0].password){
           const accessToken = jwt.sign({email: email, role: result[0].role}, accessTokenSecret);
           console.log("Access token:", accessToken);
           res.json({errorCode: 0, token: accessToken});
        } else {
            res.send({errorCode: 1, token: ''});
        }
    }).catch((err) => {
        console.log("Error:", err);
        res.status(500).json({errorCode: 1, token: ''});
    });
    // console.log("Tested");
    // const accessToken = jwt.sign({email: email, role: "Admin"}, accessTokenSecret);
    // console.log("Access token:", accessToken);
    // res.json({errorCode: 0, token: accessToken});
});

app.get('/', (req, res) => {
    res.send("Test");
});

app.listen(4200, () => {
    console.log('Auth service is running');
});