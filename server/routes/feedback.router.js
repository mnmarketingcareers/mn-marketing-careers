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
    //unsure if req.body.id is the correct course of action here
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
router.put('/:id', (req, res) => {
    const updatedFeedback = req.body;
    // this query updates the archive boolean status of a job seeker's feedback
    const queryText = `UPDATE "feedback" SET "archived" = $1 WHERE "id" = $5;`;
    // this variable contains the archived status to be updated 
    // also notes the id of the table column being edited
    const queryValues = [updatedFeedback.archived, updatedFeedback.id];
    // this pools the query text and values and sends the updated data back to the database
    pool.query(queryText, queryValues)
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
        console.log('Error completing UPDATE feedback query', err);
        res.sendStatus(500);
    });
});


module.exports = router;