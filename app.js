const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");




const app = express();



app.use(cors());
app.use(express.urlencoded({limit: '30mb', extended: true}));
app.use(express.json({limit: '30mb'}));
app.use(express.static(path.join(__dirname, 'pubilc')));




app.use((req, res) => {
    console.log('this path is not found: ', req.path);
    
    return res.status(404).json({
        message: '404! path not found'
    });
});


module.exports = app;