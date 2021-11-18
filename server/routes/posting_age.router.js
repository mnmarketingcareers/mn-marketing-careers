const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const client = require("@mailchimp/mailchimp_marketing");



//IMPORTANT - should be present on all pages
client.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.DC,
});

/**
 * GET route template
 */
 router.get('/:age', (req, res) => {
    console.log('In GET for job postings, by time since post date');
    console.log('params', req.params);
    const query = `
                  SELECT "jp"."id", "available_role", "description", "application_link", 
                  "job_city", "job_state", "remote", "date_posted", "hc".hiring_contact_email, 
                  "hc".hiring_contact_name, "hc".title, "hc".phone, "co"."company_name", 
                  ARRAY_AGG("jt"."type") AS "job type"
                  FROM "job_postings" AS "jp"
                  JOIN "company" AS "co" ON "jp".company_id = "co".id
                  LEFT JOIN "hiring_contact" AS "hc" ON "jp".hiring_contact_id = "hc".id
                  LEFT JOIN "jobs_by_type" AS "jbt" ON "jp".id = "jbt".job_posting_id
                  LEFT JOIN "job_types" AS "jt" ON "jbt".job_type_id = "jt".id
                  WHERE "jp".archived = 'false' AND "jp".status = 'POSTED'
                  AND "jp".remote != 'yes'
                  AND "jp"."date_posted" > (current_date - interval '${req.params.age}' day)
                  GROUP BY "jp"."id", "available_role", "description", "application_link", 
                  "job_city", "job_state", "remote", "date_posted", "hc".hiring_contact_email, 
                  "hc".hiring_contact_name, "hc".title, "hc".phone, "co"."company_name";
              ;`
      pool.query(query).then((results) => {
          console.log('Resulting Rows to send', results.rows);
          res.send(results.rows);
      }).catch(error => {
          console.log('ERROR in GET all job postings', error);
          res.sendStatus(500);
      });
  });

  router.get('/remote/:age', (req, res) => {
    console.log('In GET for job postings, by time since post date');
    console.log('params', req.params);
    const query = `
                  SELECT "jp"."id", "available_role", "description", "application_link", 
                  "job_city", "job_state", "remote", "date_posted", "hc".hiring_contact_email, 
                  "hc".hiring_contact_name, "hc".title, "hc".phone, "co"."company_name", 
                  ARRAY_AGG("jt"."type") AS "job type"
                  FROM "job_postings" AS "jp"
                  JOIN "company" AS "co" ON "jp".company_id = "co".id
                  LEFT JOIN "hiring_contact" AS "hc" ON "jp".hiring_contact_id = "hc".id
                  LEFT JOIN "jobs_by_type" AS "jbt" ON "jp".id = "jbt".job_posting_id
                  LEFT JOIN "job_types" AS "jt" ON "jbt".job_type_id = "jt".id
                  WHERE "jp".archived = 'false' AND "jp".status = 'POSTED'
                  AND "jp".remote = 'yes'
                  AND "jp"."date_posted" > (current_date - interval '${req.params.age}' day)
                  GROUP BY "jp"."id", "available_role", "description", "application_link", 
                  "job_city", "job_state", "remote", "date_posted", "hc".hiring_contact_email, 
                  "hc".hiring_contact_name, "hc".title, "hc".phone, "co"."company_name";
              ;`
      pool.query(query).then((results) => {
          console.log('Resulting Rows to send', results.rows);
          res.send(results.rows);
      }).catch(error => {
          console.log('ERROR in GET all job postings', error);
          res.sendStatus(500);
      });
  });

  router.get('/internships/:age', (req, res) => {
    console.log('In GET for job postings, by time since post date');
    console.log('params', req.params);
    const query = `
                  SELECT "jp"."id", "available_role", "description", "application_link", 
                  "job_city", "job_state", "remote", "date_posted", "hc".hiring_contact_email, 
                  "hc".hiring_contact_name, "hc".title, "hc".phone, "co"."company_name", 
                  ARRAY_AGG("jt"."type") AS "job type"
                  FROM "job_postings" AS "jp"
                  JOIN "company" AS "co" ON "jp".company_id = "co".id
                  LEFT JOIN "hiring_contact" AS "hc" ON "jp".hiring_contact_id = "hc".id
                  LEFT JOIN "jobs_by_type" AS "jbt" ON "jp".id = "jbt".job_posting_id
                  LEFT JOIN "job_types" AS "jt" ON "jbt".job_type_id = "jt".id
                  WHERE "jp".archived = 'false' AND "jp".status = 'POSTED'
                  AND "jt"."id" = '14'
                  AND "jp"."date_posted" > (current_date - interval '${req.params.age}' day)
                  GROUP BY "jp"."id", "available_role", "description", "application_link", 
                  "job_city", "job_state", "remote", "date_posted", "hc".hiring_contact_email, 
                  "hc".hiring_contact_name, "hc".title, "hc".phone, "co"."company_name";
              ;`
      pool.query(query).then((results) => {
          console.log('Resulting Rows to send', results.rows);
          res.send(results.rows);
      }).catch(error => {
          console.log('ERROR in GET all job postings', error);
          res.sendStatus(500);
      });
  });




  


  module.exports = router;