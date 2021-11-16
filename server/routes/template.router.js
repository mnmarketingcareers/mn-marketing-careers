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





  


  module.exports = router;