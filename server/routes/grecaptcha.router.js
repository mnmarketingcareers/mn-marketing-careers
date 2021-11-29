const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const client = require("@mailchimp/mailchimp_marketing");
const { default: axios } = require("axios");
// const {
//   rejectUnauthenticated,
// } = require("../modules/authentication-middleware");


//IMPORTANT - should be present on all pages
client.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.DC,
  });



 router.post('/', (req, res) => { 
    console.log('In reCaptcha verification', req.body.token);
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const token = req.body.token;


    axios.post(`
        https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}
    `).then(result => {
        console.log('verification response', result.data);
        res.send(result.data);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });
});


  module.exports = router;