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

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, async (req, res) => {
  // POST route code here
    // const jobQuery = 
    // const ContactQuery = 

    const rowId = '';// whatever the query returns
    for (let i = 0; i < req.body.job_types.length; i++) {
        await pool.query(`INSERT INTO "jobs_by_type" ("job_posting_id", "job_type_id") VALUES ('')`)
    }
});

module.exports = router;
