const express = require('express');
const axios = require('axios');
const pool = require('../modules/pool');
const router = express.Router();

// Handles POST request with new job seeker feedback
router.post('/api/feedback', (req, res) => {
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


module.exports = router;