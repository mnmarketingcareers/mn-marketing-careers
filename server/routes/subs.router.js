const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const client = require("@mailchimp/mailchimp_marketing");
const { default: axios } = require("axios");
// const {
//   rejectUnauthenticated,
// } = require("../modules/authentication-middleware");


//IMPORTANT 

client.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.DC,
  });


  //GET
/** 
 * @api {get} /subscribe Get LIST info 
 * @apiName GetList
 * @apiGroup Subs
 * https://mailchimp.com/developer/marketing/api/lists/get-lists-info/
 */
 router.get('/', async (req, res) => {
  const response = await client.lists.getListMembersInfo(
    process.env.TEST_LIST_ID, {count: 30}) //MNMC will likely want more - if they even need this section
  .then((response) => {
    // console.log("response from GET LIST MEMBERS INFO:", response);
    res.send(response);
  })
  .catch((error) => {
    console.log('Error unsubscribing from Mailchimp', error);
    res.sendStatus(500);
  });
});


//POST
/**
 * @api {post} /subscribe Send new subscriber email to mailing list
 * @apiName PostSubscriber
 * @apiGroup Subs
 * @apiDescription Sends the new subscriber email and status to MailChimp
 *
 * @apiBody {string} email - required
 * @apiBody {string} status - subscribe or unsubscribe
 * third option is 'pending' (must have quotes) - this will
 * trigger double-opt-in and send a confirmation email.
 * Once they respond to that, it will switch them to "subscribe"
 * -------------------------------
 * REF: (internal only) - https://www.youtube.com/watch?v=JLKzr83xZGo&t=25s
 * FFW to appx 24:00
 *
 * apikey as a param is CASE SENSITIVE ...must be listed as that: apikey
 * dc=us5 (this is the "data center" for your account)
 *
 * @apiKey access: {process.env.apikey}
 *
 * Mo's 'Audience ID' = 7dcef6c713
 *
 */
router.post("/", (req, res) => {
  console.log('At router, info is showing up as:', req.body )
  const listId = process.env.TEST_LIST_ID; 
  const subscribingUser = req.body; 

  const response = client.lists.addListMember(listId, {
    email_address: subscribingUser.email,
    status: "subscribed",
    merge_fields: {
      FNAME: subscribingUser.firstName,
      LNAME: subscribingUser.lastName,
      ADDRESS: subscribingUser.address,

    },
  }).then((response) => {
    console.log('response from POST is:', response);
    res.send(response);
  })
  .catch((error) => {
    res.sendStatus(500);
    console.log('error in POST on router page:', error)
  });
});


//PUT
/**
 * @api {put} /subscribe modify subscription status
 * @apiName ModifyStatus
 * @apiGroup subscribe
 * 
 * @apiSource https://mailchimp.com/developer/marketing/api/list-members/add-or-update-list-member/
 *
 */
 router.put("/", (req, res) => {
  console.log('Modifying user #', req.body.subscriberHash,'to status of', req.body.status)
  const listId = process.env.TEST_LIST_ID; 
  const statusChange = req.body.status; 
  const userHash = req.body.subscriberHash;

   const response = client.lists.setListMember(
    listId, //name it this
    userHash, //name it this
    { status: statusChange }
  ).then((response) => {
    console.log('response from PUT is:', response);
    res.send(response);
  })
  .catch((error) => {
    res.sendStatus(500);
    console.log('error in PUT on router page:', error)
  });
});


module.exports = router;