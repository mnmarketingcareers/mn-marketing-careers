const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const client = require("@mailchimp/mailchimp_marketing");
const { default: axios } = require("axios");
// const {
//   rejectUnauthenticated,
// } = require("../modules/authentication-middleware");


//IMPORTANT - should be present on all pages using Mailchimp
client.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.DC,
  });

//GET templates
/**
 * @api {get} /template get list of all templates (hopefully lots of info)
 * @apiName Get Templates
 * @apiGroup template
 * 
 * @apiPurpose the purpose of this call is to provide a list from which
 * the user can select for patching an old template for send
 */
router.get('/', (req, res) => {
  const response = client.templates.list()
  .then((response) => {
    // console.log('inside get templates response:', response)
    res.send(response);
  })
  .catch((error) => {
    res.sendStatus(500);
    console.log('error in get all templates:', error)
  });
});

 router.get('/', (req, res) => {
  const response = client.lists.getListMembersInfo(
    process.env.TEST_LIST_ID, {count: 30}) //MNMC will likely want more - if they even need this section
  .then((response) => {
    // console.log("response from GET LIST MEMBERS INFO:", response);
    res.send(response);
  })
  .catch((error) => {
    res.sendStatus(500);
  });
}) 





//POST
/**
 * @api {post} /template create new template (name and HTML/body only)
 * @apiStatus experimental
 * @apiName Post Template
 * @apiGroup template
 * 
 * @apiSource https://mailchimp.com/help/getting-started-with-mailchimps-template-language/
 * (above source is a rough idea - might be helpful, might not)
 *
 * @apiSuccess - TBD
 * 
 */ 
 router.post("/", (req, res) => { 
  console.log('Adding new template with name', req.body.name)
  const nameChange = req.body.name; 
  const bodyChange = req.body.html;
  const response = client.templates.create({
    name: nameChange,
    html: bodyChange,
  })

  .then((response) => {
    console.log('response from TEMPLATE POST is:', response);
    res.sendStatus(200);
  })
  .catch((error) => {
    res.sendStatus(500);
    console.log('error in template POST page:', error)
  });
});





//PUT or PATCH 
/**
 * @api {put} /template modify template (name and HTML/body only)
 * @apiStatus experimental
 * @apiName Patch Template
 * @apiGroup template
 * 
 * @apiWarning - Will ONLY work with template coded from scratch - created in app
 * Previously created templates with MailChimp new editor will return 500 error
 * 
 * @apiSource https://mailchimp.com/help/getting-started-with-mailchimps-template-language/
 * (above source is a rough idea - might be helpful, might not)
 *
 * @apiSuccess - TBD
 * 
 */ 
 router.patch("/", (req, res) => {
  console.log('Modifying template including name:', req.body.name)
  const templateId = req.body.template_id; 
  const nameChange = req.body.name; 
  const bodyChange = req.body.html;

  const response = client.templates.updateTemplate(templateId, {
    name: nameChange,
    html: bodyChange,
  })
  .then((response) => {
    console.log('response from TEMPLATE PATCH is:', response);
    res.sendStatus(200);
  })
  .catch((error) => {
    res.sendStatus(500);
    console.log('error in template patch page:', error)
  });
});





  


  module.exports = router;