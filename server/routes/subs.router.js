const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const client = require("@mailchimp/mailchimp_marketing");
const { default: axios } = require("axios");


//IMPORTANT 
//this will be replaced by MNMC API and list information
//see .env file for format
client.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.DC,
  });

  //GET
/** 
 * @api {get} /subscribe Get ADMIN info - data and stats SOME
 * @apiName GetSubs
 * @apiGroup subs
 * @apiDescription Get detailed list of subscribers and 
 * everything about them that they've provided
 *
 * @apiIssues this is TAKING A WHILE to come back (several seconds)
 *
 * @api let's fix this documentation later, huh?
 */
router.get("/", async (req, res) => {
    const response = await client.lists
      .getList(process.env.TEST_LIST_ID)
      .then((response) => {
        console.log("response is:", response);
        res.send(response);
      })
      .catch((error) => {
        res.sendStatus(500);
      });
  });


  module.exports = router;
