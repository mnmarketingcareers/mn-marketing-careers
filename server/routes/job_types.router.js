const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
 router.get('/', (req, res) => {
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
router.post('/', rejectUnauthenticated, (req, res) => {
  // POST route code here
});

/**
 * PUT route template
 */
router.put('/:id', rejectUnauthenticated, (req, res) => {
    // PUT route code here
});

module.exports = router;
