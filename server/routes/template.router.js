const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const client = require("@mailchimp/mailchimp_marketing");
const { default: axios } = require("axios");

// this is our email body
let emailTemplate = require('../modules/emailTemplate');

console.log('template is:', emailTemplate);



  


// let stuff = {
//   html: finalBody,
// };








// send to mailchimp

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
 router.post("/", async (req, res) => {   
 try {console.log('Adding new template with name', req.body.name)


 const query = `
                SELECT "jp"."id", "available_role", "description", "application_link", 
                "job_city", "job_state", "remote", "share_contact", "date_posted", "hc".hiring_contact_email, 
                "hc".hiring_contact_name, "hc".title, "hc".phone, "co"."company_name", 
                ARRAY_AGG("jt"."type") AS "job type" 
                FROM "job_postings" AS "jp"
                JOIN "company" AS "co" ON "jp".company_id = "co".id
                LEFT JOIN "hiring_contact" AS "hc" ON "jp".hiring_contact_id = "hc".id
                LEFT JOIN "jobs_by_type" AS "jbt" ON "jp".id = "jbt".job_posting_id
                LEFT JOIN "job_types" AS "jt" ON "jbt".job_type_id = "jt".id
                WHERE "jp".archived = 'false' AND "jp".status = 'APPROVED'
                AND "jp"."date_posted" > (current_date - interval '30' day)
                GROUP BY "jp"."id", "available_role", "description", "application_link", 
                "job_city", "job_state", "remote", "date_posted", "hc".hiring_contact_email, 
                "hc".hiring_contact_name, "hc".title, "hc".phone, "co"."company_name";`;

const jobs = await pool.query(query)
console.log('jobs is:', jobs.rows)

let jobsList = '<ul>';

// create HTML for each job from the DB
for(let job of jobs.rows) {
  jobsList += `<li><a href=${job.application_link} target="_blank">${job.company_name}</a> - ${job.available_role}</li>`
} 
jobsList += '</ul>';







// actually replace text in the big string
let finalBody = emailTemplate.replace('LASAGNA1', jobsList);
finalBody = finalBody.replace('LASAGNA2', 'hello');
finalBody = finalBody.replace('LASAGNA3', 'FINAL HELLOOOOOO');


console.log('final body', finalBody);



  const nameChange = req.body.name; 
  const bodyChange = req.body.html;
  const response = await client.templates.create({
    name: nameChange,
    html: finalBody    
  })}
  catch(error){
    res.sendStatus(500)
  }
  })



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



//---------FROM ORIGINAL TEMPLATE--------//

/**
 * GET route template
 */
 router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});


  


  module.exports = router;