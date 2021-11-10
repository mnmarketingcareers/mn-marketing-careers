const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, async (req, res) => {
  // GET route code here
  const query = `SELECT "jp"."id", "available_role", "description", "application_link", "job_city", "job_state", 
                "remote", "date_posted", "hc".hiring_contact_email, "hc".hiring_contact_name, "hc".title, "hc".phone, 
                "co"."company_name" FROM "job_postings" AS "jp"
                JOIN "company" AS "co" ON "jp".company_id = "co".id
                JOIN "hiring_contact" AS "hc" ON "jp".hiring_contact_id = "hc".id
                WHERE "jp".archived = 'false' AND "jp".status = 'POSTED'
                GROUP BY "jp"."id", "available_role", "description", "application_link", "job_city", "job_state", 
                "remote", "date_posted", "hc".hiring_contact_email, "hc".hiring_contact_name, "hc".title, "hc".phone, 
                "co"."company_name"
            ;`
    pool.query(query).then((results) => {
        res.send(results.rows);
    }).catch(error => {
        console.log('ERROR in GET all job postings', error);
        res.sendStatus(500);
    })
});

router.get('/types', rejectUnauthenticated, (req, res) => {
    const query = `SELECT * FROM "job_types";`;
    pool.query(query).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log('ERROR fetching job types', error);
        res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, async (req, res) => {
  // POST route code here
  try {
    console.log('show me the monster:', req.body);
    const userId = req.user.id;

    // set queries for adding to conact and company tables, to return id's of newly generated rows
    const postingContactQuery = `INSERT INTO "posting_contact" ("posting_contact_name", "posting_contact_email")
                            VALUES ($1, $2)
                            ON CONFLICT ("posting_contact_email") DO UPDATE SET "posting_contact_name"=EXCLUDED.posting_contact_name
                            RETURNING "id";`;
    
    const hiringContactQuery = `INSERT INTO "hiring_contact" ("hiring_contact_name", "hiring_contact_email", "title", "phone") 
                            VALUES ($1, $2, $3, $4)
                            ON CONFLICT ("hiring_contact_email") DO UPDATE SET "hiring_contact_name"=EXCLUDED.hiring_contact_name
                            RETURNING "id";`;

    const companyQuery = `INSERT INTO "company" ("company_name") 
                            VALUES ($1) 
                            ON CONFLICT ("company_name") DO UPDATE SET "company_name"=EXCLUDED.company_name
                            RETURNING id;`;

    // set the query result to a new variable, for posting to the job_postings table
    const posting_contact_id = await pool.query(postingContactQuery, [req.body.posting_contact_name, req.body.posting_contact_email]);
    console.log('posting contact ID', posting_contact_id);
    
    // for hiring contact, only insert a value if we get one from the client
    let hiring_contact_id = '';
    // we'll know that we have one id share_contact is true
    if (req.body.share_contact) {
        // Insert new contact
        hiring_contact_id = await pool.query(hiringContactQuery, [req.body.name, req.body.email, req.body.title, req.body.phone]);
    }
    console.log('hiring contact ID', hiring_contact_id);

    const company_id = await pool.query(companyQuery, [req.body.company]);
    console.log('company id', company_id);
    const jobQuery = `INSERT INTO "job_postings" ("company_id", "available_role", "description", "application_link", "job_city", "job_state", "remote", "posting_contact_id", "share_contact", "hiring_contact_id", "user_id", "status") 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`;

    const rowId = await pool.query(jobQuery, []);// whatever the query returns
    
    // create an empty array to add IDs of job types
    const jobsByType = [];
    // get array of job types with IDs
    const allJobTypes = await pool.query(`SELECT * FROM "job_types";`);

    // loop over job types strings from client array, pushing their IDs to jobsByType array
    const jobTypes = req.body.job_type_name;
    
    for (let index in jobTypes) {
        if (jobTypes[index] === allJobTypes[index].type) {
            jobsByType.push(allJobTypes[index].id);
        }
    }
    // now loop over that new array of IDs and add them to the "jobs_by_type" table
    for (let i = 0; i < jobsByType.length; i++) {
        await pool.query(`INSERT INTO "jobs_by_type" ("job_posting_id", "job_type_id") VALUES (${rowId}, $1)`, jobsByType[i]);
    }
  } catch (error) {
      console.log('ERROR in POST', error);
      res.sendStatus(500);
  }
});

module.exports = router;
