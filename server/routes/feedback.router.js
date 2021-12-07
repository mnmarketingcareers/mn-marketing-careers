const express = require('express');
const axios = require('axios');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.DC,
  });

// Handles POST request with new job seeker feedback, responses to database
// Additional POST to post feedback to DOM?
router.post('/', async (req, res) => {
    try {
        await pool.query('BEGIN');
        // console.log('req.body is', req.body);
        const reason = req.body.reason;
        const message = req.body.message;
        
        console.log('Modifying user #', req.body.subscriberHash,'to status of', req.body.status)
        const listId = process.env.TEST_LIST_ID; 
        const statusChange = req.body.status; 
        const userHash = req.body.subscriberHash;

        const response = await client.lists.setListMember(
            listId, //name it this
            userHash, //name it this
            { status: statusChange }
        );
        console.log('Mailchimp response', response);
        // the query that's responsible for inserting user feedback into the feedback database table
        const queryText = `INSERT INTO "feedback" ("reason", "message")
        VALUES ($1, $2) RETURNING id;`;
        // this pools the query text and datafields and sends the data on to the database 
        await pool.query(queryText, [reason, message]);
        await pool.query('COMMIT');
        res.sendStatus(201);
    } catch(err) {
            await pool.query('ROLLBACK');
            console.log('feedback POST failed: ', err);
            res.sendStatus(500);
    }
})

// Handles GET request, get feedback data from database
// Access level for admin-only access
// wrap query around conditional that checks for access_level
router.get('/feedbacklist', rejectUnauthenticated, async (req, res) => {
    // console.log('in router.get', req.user);
    if (req.user.access_level >= 1){
        try {
            // queries for each count, individually
            const notRelevantQuery = `SELECT count(*) FROM "feedback" WHERE "reason" = 'Content Not Relevant To My Search';`;
            
            const foundThruMnmcQuery = `SELECT count(*) FROM "feedback" WHERE "reason" = 'Found a Job Through MNMC!'`;
            
            const foundElseQuery = `SELECT count(*) FROM "feedback" WHERE "reason" = 'Found a Job Through Other Mediums'`;

            const noSignUpQuery = `SELECT count(*) FROM "feedback" WHERE "reason" = 'I Did Not Sign Up to Receive These Emails'`;

            const otherQuery = `SELECT count(*) FROM "feedback" WHERE "reason" = 'other'`;

            const messagesQuery = `SELECT "id", "message", "date_received" FROM "feedback" WHERE "reason" = 'other' AND "archived" = false;`
            
            // make requests, and set results to variables
            const notRelevantCount = await pool.query(notRelevantQuery);
            const foundThruMnmcCount = await pool.query(foundThruMnmcQuery);
            const foundElseCount = await pool.query(foundElseQuery);
            const noSignUpCount = await pool.query(noSignUpQuery);
            const otherCount = await pool.query(otherQuery);
            const otherMessages = await pool.query(messagesQuery);
            
            console.log("messages", otherMessages.rows);
            // console.log('results from all queries', notRelevantCount.rows, foundThruMnmcCount.rows, foundElseCount.rows, noSignUpCount.rows, otherCount.rows);

            // send back results in an object
            res.send({ 
                notRelevantCount: notRelevantCount.rows[0], 
                foundThruMnmcCount: foundThruMnmcCount.rows[0], 
                foundElseCount: foundElseCount.rows[0],
                noSignUpCount: noSignUpCount.rows[0],
                otherCount: otherCount.rows[0],
                messages: otherMessages.rows,
            });
        } catch (err) {
            // oopsies, send an error message
            console.log('ERROR: GET all feedback', err);
            res.sendStatus(500);
        }  
    }
});

// Handles PUT request, change feedback archived status to TRUE
// Access level for admin-only access
router.put('/:id', rejectUnauthenticated, (req, res) => {
    
    if (req.user.access_level >= 1) {
        // this query updates the archive boolean status of a job seeker's feedback
        const queryText = `UPDATE "feedback" SET "archived" = NOT "archived" WHERE "id" = $1;`;
        const queryValues = [req.body.id];
        // this pools the query text and values and sends the updated data back to the database
        pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            console.log('Error completing UPDATE feedback query', err);
            res.sendStatus(500);
        });
    } 
});


module.exports = router;
