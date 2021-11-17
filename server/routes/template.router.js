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


//PUT PATCH
/**
 * @api {put} /template modify template (name and HTML/body only)
 * @apiStatus experimental
 * @apiName Patch Template
 * @apiGroup template
 * 
 * @apiSource https://mailchimp.com/help/getting-started-with-mailchimps-template-language/
 * (above source is a rough idea - might be helpful, might not)
 *
 * @apiSuccess - TBD
 * 
 */ 
 router.post("/", (req, res) => { //updated from patch
  console.log('Adding template with name', req.body.name)
  // const templateId = req.body.template_id;  //updated not needed here
  const nameChange = req.body.name; 
  const bodyChange = req.body.html;

  const response = client.templates.create({
    name: nameChange,
    html: bodyChange,
  })


  // const response = client.templates.create(/*templateId,*/ { //updated uncomment if patching
  //   name: "Party Time",
  //   // html: "html",
  // })
  .then((response) => {
    console.log('response from TEMPLATE PATCH is:', response);
    res.send(response);
  })
  .catch((error) => {
    res.sendStatus(500);
    console.log('error in template patch page:', error)
  });
});





  


  module.exports = router;