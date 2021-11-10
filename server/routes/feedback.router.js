const express = require('express');
const axios = require('axios');
const pool = require('../modules/pool');
const router = express.Router();

// Handles POST request with new job seeker feedback, responses to database
// Additional POST to post feedback to DOM?
router.post('/', (req, res) => {
    const reason = req.body.reason;
    const message = req.body.message;
    const archived = req.body.archived;
    const date_recieved = req.body.date_recieved;
    // the query that's responsible for inserting user feedback into the feedback database table
    const queryText = `INSERT INTO "feedback" (reason, message, archived, date_received)
    VALUES ($1, $2, $3, $4) RETURNING id;`;
    // this pools the query text and datafields and sends the data on to the database 
    pool
        .query(queryText, [reason, message, archived, date_recieved])
        .then(() => res.sendStatus(201))
        .catch((err) => {
            console.log('feedback POST failed: ', err);
            res.sendStatus(500);
        })
})

// Handles GET request, get feedback data from database
router.get('/', (req, res) => {
    console.log('in router.get');
    const queryText = `SELECT * FROM "feedback";`;
    //not positive on what we are actually pooling here
    pool.query(queryText, [req.body.id])
    .then( result=> {
        res.send(result.rows);
    })
    .catch(err => {
        console.log('ERROR: GET all feedback', err);
        res.sendStatus(500);
    })
});

// Handles PUT request, change feedback archived status to TRUE



module.exports = router;