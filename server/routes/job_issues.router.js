const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Handles POST request with new job issues raised by job seekers
router.post('/', (req, res) => {
    console.log('req.body is', req.body);
    const comment = req.body.comment;
    const issue_type = req.body.issue_type;
    // the query that's responsible for inserting job issues to the database
    // this query will probably need a join with the job_postings table
    const queryText = `INSERT INTO "issues" ("comment", "issue_type")
    VALUES ($1, $2) RETURNING id;`;
    // this pools the query text and the datafields and sends the data on to the database
    pool
        .query(queryText, [comment, issue_type])
        .then(() => res.sendStatus(201))
        .catch((err) => {
            console.log('job issue POST failed: ', err);
            res.sendStatus(500);
        })
})

module.exports = router;