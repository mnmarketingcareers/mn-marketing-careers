const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// Handles POST request with new job issues raised by job seekers
router.post('/', (req, res) => {
    console.log('req.body is', req.body);
    const job_posting_id = req.body.job_posting_id;
    const comment = req.body.comment;
    const issue_type = req.body.issue_type;
    const is_resolved = req.body.is_resolved;
    const issues_email = req.body.issues_email;
    // the query that's responsible for inserting job issues to the database
    // this query will probably need a join with the job_postings table
    const queryText = `INSERT INTO "issues" ("job_posting_id", "comment", "issue_type", "is_resolved", "issues_email")
    VALUES ($1, $2, $3, $4, $5) RETURNING id;`;
    // this pools the query text and the datafields and sends the data on to the database
    pool
        .query(queryText, [job_posting_id, comment, issue_type, is_resolved, issues_email])
        .then(() => res.sendStatus(201))
        .catch((err) => {
            console.log('job issue POST failed: ', err);
            res.sendStatus(500);
        })
})

// Handles GET request which fetches data in the issues table, which involves a JOIN with the job_postings table
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('In GET for all job issues');

    if (req.user.access_level === 1) {
        const queryText = `SELECT "i"."id", "comment", "issue_type", "is_resolved", 
        "issues_email", "jp"."available_role", "jp"."application_link", "c"."company_name", "jp"."job_city",
        "jp"."job_state", "jp"."date_posted"     
        FROM "issues" AS "i"
        JOIN "job_postings" AS "jp" ON "jp"."id" = "i"."job_posting_id"
        JOIN "company" AS "c" ON "c"."id" = "jp"."company_id"
        GROUP BY "i"."id", "comment", "issue_type", "is_resolved", 
        "issues_email", "jp"."available_role", "jp"."application_link", "c"."company_name", "jp"."job_city",
        "jp"."job_state", "jp"."date_posted";
        `;
        pool.query(queryText).then((results) => {
            console.log('Job issues to send', results.rows);
            res.send(results.rows);
        }).catch(error => {
            console.log('ERROR in GET all job issues', error);
            res.sendStatus(500);
        })
    }
})

// Handles PUT request which changes is_resolved from 'false' to 'true'
router.put('/:id', rejectUnauthenticated, (req, res) => {
    if (req.user.access_level === 1) {
        // set is_resolved value to TRUE from its default value of FALSE
        const queryText = `UPDATE "issues" SET "is_resolved" = 'TRUE' WHERE "id" = $1;`;
        const queryValues = [req.body.id];
        pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            console.log('Error completing UPDATE issues', err);
            res.sendStatus(500);
        })
    }
})

module.exports = router;