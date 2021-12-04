const express = require('express');
const axios = require('axios');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// Handles POST request with new job seeker feedback, responses to database
// Additional POST to post feedback to DOM?
router.post('/', async (req, res) => {
    try {
        await pool.query('BEGIN');
        // console.log('req.body is', req.body);
        const reason = req.body.reason;
        const message = req.body.message;
        const unsubData = {
            status: req.body.status,
            subscriberHash: req.body.subscriberHash,
        }
        // unsubscribe with mailchimp
        const mailChimpUnsub = await axios.put('/api/subs', unsubData);
        console.log('Response from mailchimp router:', mailChimpUnsub);
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
router.get('/feedbacklist', rejectUnauthenticated, (req, res) => {
    // console.log('in router.get', req.user);
    
    if (req.user.access_level >= 1){
        const queryText = `SELECT * FROM "feedback";`;
        //not positive on what we are actually pooling here
        pool.query(queryText)
        .then(results => {
        console.log('What are the unsubscribing users feedback?', results.rows)
        res.send(results.rows);
        })
        .catch(err => {
        console.log('ERROR: GET all feedback', err);
        res.sendStatus(500);
        })
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
