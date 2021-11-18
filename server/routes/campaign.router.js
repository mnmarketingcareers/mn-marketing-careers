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


  //GET 
/** 
 * @api {get} /campaign/getinfo
 * @apiName Get Campaigns
 * @apiGroup Campaigns
 * 
 * @apiDescription get ALL campaigns' info!
 * this is experimental as of 11/16 - seeing what we can get back!
 */
 router.get('/getinfo', (req, res) => {
     console.log('in get campaign ROUTER parteeeeeee')
     const response = client.campaigns.list()
     .then((response) => {
      // console.log("response from GET CAMPAIGNS INFO:", response);
      res.send(response);
    })
    .catch((error) => {
      res.sendStatus(500);
    });
  }) 




//POST
/**
 * @api {post} /campaign Create new campaign from scratch
 * @apiName Create New Campaign
 * @apiGroup Campaign
 * @apiDescription Creates new campaign to send to Mailchimp
 *
 * @apiBody {string} email - required
 * @apiBody {string} status - subscribe or unsubscribe //fix more of these
 *
 *
 *
 * dc=us5 (this is the "data center" for your account)
 * @apiKey access: {process.env.apikey}
 *
 * TEST_LIST_ID=7dcef6c713
 * REGULAR_TEMPLATE_ID=10043609
 * PLAIN_TEXT_TEMPLATE_ID=10043709
 *
 */
router.post("/", (req, res) => {
  console.log("At router, info is showing up as:", req.body);
  const listId = process.env.TEST_LIST_ID; //standard - same always for her/us
  const template_id = parseInt(req.body.template_id); //now bringing this in from client - NEED TO WIRE THIS U P
  const campaignDetails = req.body;
  console.log("campaign details:", req.body);
  console.log("TEMPLATE ID IS:", template_id);

  const response = client.campaigns
    .create({
      type: "regular", //also try "plaintext"
      recipients: {
        list_id: listId,
      },
      settings: {
        subject_line: campaignDetails.subject_line,
        preview_text: campaignDetails.preview_text,
        title: campaignDetails.title, //working
        template_id: template_id, //working - currently REGULAR (hee hee)
        from_name: campaignDetails.from_name,
        reply_to: campaignDetails.reply_to,
        // to_name: "*|FNAME|*", //fix
        // auto_footer: campaignDetails.footer,
        // inline_css: true, //research
      },
      tracking: {
        opens: true,
        html_click: true,
        //   google_analytics: true, //fix
      },
    })
    .then((response) => {
      console.log("response from CAMPAIGN POST is:", response);
      res.send(response);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log("error in CAMPAIGN POST on router page:", error);
    });
});

//POST - EMAIL FINAL SEND
/**
 * @api {post} /campaign/send SEND / EMAIL OUT a campaign by ID
 * @apiName Send Campaign By ID
 * @apiGroup Campaign
 * @apiDescription Sends a campaign that has already been created
 *
 * @apiBody {string} email - required
 * @apiBody {string} status - subscribe or unsubscribe //fix more of these
 *
 *
 *
 * @apiKey access: {process.env.apikey}
 * dc=us5 (this is the "data center" for your account)
 *
 */
router.post("/send", (req, res) => {
  const campaign_id = req.body.campaign_id; 
  console.log("Campaign ID:", campaign_id);

  const response = client.campaigns.send(campaign_id)
    .then((response) => {
      console.log("response from CAMPAIGN POST is:", response);
      res.send(response);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log("error in CAMPAIGN POST on router page:", error);
    });
});

module.exports = router;

// trial email:
// fc3d6332b5
