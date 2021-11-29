const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require( 'axios' );
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', async (req, res) => {
//   console.log('In GET for all non-remote and hybrid job postings');
  const query = `
                SELECT "jp"."id", "available_role", "description", "application_link", 
                "job_city", "job_state", "remote", "date_posted", "hc".hiring_contact_email, 
                "hc".hiring_contact_name, "hc".title, "hc".phone, "co"."company_name", 
                ARRAY_AGG("jt"."type") AS "job_type"
                FROM "job_postings" AS "jp"
                JOIN "company" AS "co" ON "jp".company_id = "co".id
                LEFT JOIN "hiring_contact" AS "hc" ON "jp".hiring_contact_id = "hc".id
                LEFT JOIN "jobs_by_type" AS "jbt" ON "jp".id = "jbt".job_posting_id
                LEFT JOIN "job_types" AS "jt" ON "jbt".job_type_id = "jt".id
                WHERE "jp".archived = 'false' AND "jp".status = 'POSTED'
                AND "jp".remote != 'yes'
                AND "jt"."id" != '14'
                AND "jp"."date_posted" > (current_date - interval '30' day)
                GROUP BY "jp"."id", "available_role", "description", "application_link", 
                "job_city", "job_state", "remote", "date_posted", "hc".hiring_contact_email, 
                "hc".hiring_contact_name, "hc".title, "hc".phone, "co"."company_name";
            ;`
    pool.query(query).then((results) => {
        console.log('Resulting Rows to send', results.rowCount);
        res.send(results.rows);
    }).catch(error => {
        console.log('ERROR in GET all job postings', error);
        res.sendStatus(500);
    });
});

// TO DO: check if this is used here
router.get('/pending', rejectUnauthenticated, (req, res) => {
    // console.log('In GET pending job posts', req.user);
    if (req.user.access_level < 1) {
            res.status(500).send('You do not have the correct access level for this content');
            return;
        }
    const query = `
                SELECT "jp"."id", "available_role", "description", "application_link", 
                "job_city", "job_state", "remote", "share_contact", "date_posted", "hc".hiring_contact_email, 
                "hc".hiring_contact_name, "hc".title, "hc".phone, "co"."company_name", 
                ARRAY_AGG("jt"."type") AS "job_type"
                FROM "job_postings" AS "jp"
                JOIN "company" AS "co" ON "jp".company_id = "co".id
                LEFT JOIN "hiring_contact" AS "hc" ON "jp".hiring_contact_id = "hc".id
                LEFT JOIN "jobs_by_type" AS "jbt" ON "jp".id = "jbt".job_posting_id
                LEFT JOIN "job_types" AS "jt" ON "jbt".job_type_id = "jt".id
                WHERE "jp".archived = 'false' AND "jp".status = 'PENDING_APPROVAL'
                AND "jp"."date_posted" > (current_date - interval '30' day)
                GROUP BY "jp"."id", "available_role", "description", "application_link", 
                "job_city", "job_state", "remote", "date_posted", "hc".hiring_contact_email, 
                "hc".hiring_contact_name, "hc".title, "hc".phone, "co"."company_name";`;
    pool.query(query).then(result => {
        console.log('Sending rows to Admin for approval', result.rows);
        res.send(result.rows);
    }).catch(error => {
        console.log('ERROR fetching job types', error);
        res.sendStatus(500);
    });
});

/**
 * GET Approved postings here
 */
 router.get('/approved', rejectUnauthenticated, (req, res) => {
    console.log('In GET approved job posts', req.user);
    if (req.user.access_level < 1) {
            res.status(500).send('You do not have the correct access level for this content');
            return;
        }
    const query = `
                SELECT "jp"."id", "available_role", "description", "application_link", 
                "job_city", "job_state", "remote", "share_contact", "date_posted", 
                "pc"."posting_contact_name", "pc"."posting_contact_email", "hc".hiring_contact_email, 
                "hc".hiring_contact_name, "hc".title, "hc".phone, "co"."company_name", 
                ARRAY_AGG("jt"."type") AS "job_type" 
                FROM "job_postings" AS "jp"
                JOIN "company" AS "co" ON "jp".company_id = "co".id
                JOIN "posting_contact" AS "pc" ON "jp"."posting_contact_id" = "pc"."id"
                LEFT JOIN "hiring_contact" AS "hc" ON "jp".hiring_contact_id = "hc".id
                LEFT JOIN "jobs_by_type" AS "jbt" ON "jp".id = "jbt".job_posting_id
                LEFT JOIN "job_types" AS "jt" ON "jbt".job_type_id = "jt".id
                WHERE "jp".archived = 'false' AND "jp".status = 'APPROVED'
                AND "jp"."date_posted" > (current_date - interval '30' day)
                GROUP BY "jp"."id", "available_role", "description", "application_link", 
                "job_city", "job_state", "remote", "date_posted", "pc"."posting_contact_name", 
                "pc"."posting_contact_email", "hc".hiring_contact_email, 
                "hc".hiring_contact_name, "hc".title, "hc".phone, "co"."company_name";`;
    pool.query(query).then(result => {
        console.log('Sending rows to Admin to post to list', result.rowCount);
        res.send(result.rows);
    }).catch(error => {
        console.log('ERROR fetching job types', error);
        res.sendStatus(500);
    });
});


/**
 * GET by id here
 */
router.get('/:id', (req, res) => {
    console.log('In GET by id', req.params.id);
    // if requiring access level check, uncomment the next 4 lines
    // if (req.user.access_level < 1) {
    //     res.status(500).send('You do not have the correct access level for this content');
    //     return;
    // }
    const query = `
                SELECT "jp"."id", "available_role", "description", "application_link", 
                "job_city", "job_state", "remote", "date_posted", "posting_contact_id", 
                "company_id", "hiring_contact_id", "pc"."posting_contact_name", 
                "pc"."posting_contact_email", "share_contact", "hc".hiring_contact_email, 
                "hc".hiring_contact_name, "hc".title, "hc".phone, "co"."company_name", 
                ARRAY_AGG("jt"."type") AS "job_type" 
                FROM "job_postings" AS "jp"
                JOIN "company" AS "co" ON "jp".company_id = "co".id
                JOIN "posting_contact" AS "pc" ON "jp"."posting_contact_id" = "pc"."id"
                LEFT JOIN "hiring_contact" AS "hc" ON "jp".hiring_contact_id = "hc".id
                LEFT JOIN "jobs_by_type" AS "jbt" ON "jp".id = "jbt".job_posting_id
                LEFT JOIN "job_types" AS "jt" ON "jbt".job_type_id = "jt".id
                WHERE "jp"."id" = $1
                GROUP BY "jp"."id", "available_role", "description", "application_link", 
                "job_city", "job_state", "remote", "date_posted", "pc"."posting_contact_name", 
                "pc"."posting_contact_email", "hc".hiring_contact_email, 
                "hc".hiring_contact_name, "hc".title, "hc".phone, "co"."company_name";
    `;
    pool.query(query, [req.params.id]).then((results) => {
        console.log('results', results.rows);
        res.send(results.rows);
    }).catch(error => {
        console.log('ERROR in GET all job postings', error);
        res.sendStatus(500);
    })
});

/**
 * PUT route to set all APPROVED jobs to POSTED
 */
 router.put('/tolist', rejectUnauthenticated, async (req, res) => {
    // if requiring access level check, uncomment the next 4 lines
    if (req.user.access_level < 1) {
        res.status(500).send('You do not have the correct access level for this content');
        return;
    }
    try {
        console.log('In Job Postings PUT, updating status');
        const query = `UPDATE "job_postings" SET "status" = 'POSTED' WHERE "status" = 'APPROVED';`;
        
        const results = await pool.query(query)
        console.log('Rows updated', results.rowCount);
        console.log('end of PUT');
        res.sendStatus(201);
        
        
    } catch (error) {
        console.log('ERROR in PUT',error);
        res.sendStatus(500);
    }
});

/**
 * GET QUERY HERE
 */

/**
 * PUT Route for changing STATUS here
 */
router.put('/:id', rejectUnauthenticated, async (req, res) => {
    // if requiring access level check, uncomment the next 4 lines
    if (req.user.access_level < 1) {
        res.status(500).send('You do not have the correct access level for this content');
        return;
    }
    try {
        console.log('In Job Postings PUT, updating ID', req.params.id, req.body.status);
        const query = `UPDATE "job_postings" SET "status" = $1 WHERE "id" = $2;`;
        
        const results = await pool.query(query, [req.body.status, req.params.id])
        // on success we should see a rowCount of 1
        console.log('Rows updated', results.rowCount);
        res.sendStatus(201);
        
        console.log('end of PUT');
    } catch (error) {
        console.log('ERROR in PUT',error);
        res.sendStatus(500);
    }
});



/**
 * DELETE route here
 */
router.delete('/:id', rejectUnauthenticated, async (req, res) =>{
    // code here
    // if requiring access level check, uncomment the next 4 lines
    if (req.user.access_level < 1) {
        res.status(500).send('You do not have the correct access level to delete this content');
        return;
    }
    try {
        console.log('In DELETE', req.params.id);
        const query = `DELETE FROM "job_postings" WHERE "id" = $1`;
        const result = await pool.query(query, [req.params.id]);
        console.log('Rows updated', result.rowCount);
        res.sendStatus(201);
        
    } catch (error) {
        console.log('ERROR in DELETE', error);
        res.sendStatus(500);
    }
});

/**
 * POST route for new job postings
 */
router.post('/', rejectUnauthenticated, async (req, res) => {
  // TO DO: CLEAR OUT MOST OF THE CONSOLE LOGS
  console.log('In Admin job_postings router, POST', req.body);

  try {

    // const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    // const token = req.body.token;
    // const validate = await axios.post(`
    // https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}
    // `)
    // console.log('validation response', validate.data.success);
    // if (validate.data.success != true) {
    //     const error = 'Captcha not validated';
    //     throw error;
    // }
    // validate inputs
    if (
        req.body.posting_contact_name === '' ||
        req.body.posting_contact_email === '' ||
        req.body.company === '' ||
        req.body.available_role === '' ||
        req.body.application_link === '' ||
        // req.body.description === '' ||
        req.body.job_city === '' ||
        req.body.job_state === '' ||
        req.body.remote === '' ||
        req.body.share_contact === '' ||
        req.body.job_types.length === 0
    ) {
        // define an error to match validation failure
        const error = 'Invalid input: Form not added -  missing fields';
        // this goes to the catch
        throw error; 
    }

   
    let status = '';
    if (req.body.status === '') {
        status = null;
    } else {
        status = req.body.status;
    }

    console.log('Status sent from client', status);

    await pool.query('BEGIN');
    // const userId = 0;

    // set queries for adding to tables, returning id's of newly generated rows
    // for adding to "posting_contact" table
    const postingContactQuery = `INSERT INTO "posting_contact" ("posting_contact_name", "posting_contact_email")
                            VALUES ($1, $2)
                            ON CONFLICT ("posting_contact_email") DO UPDATE SET "posting_contact_name"=EXCLUDED.posting_contact_name
                            RETURNING "id";`;
    // for adding to "hiring_contact" table
    const hiringContactQuery = `INSERT INTO "hiring_contact" ("hiring_contact_name", "hiring_contact_email", "title", "phone") 
                            VALUES ($1, $2, $3, $4)
                            ON CONFLICT ("hiring_contact_email") DO UPDATE SET "hiring_contact_name"=EXCLUDED.hiring_contact_name
                            RETURNING "id";`;
    // for adding to "company" table
    const companyQuery = `INSERT INTO "company" ("company_name") 
                            VALUES ($1) 
                            ON CONFLICT ("company_name") DO UPDATE SET "company_name"=EXCLUDED.company_name
                            RETURNING id;`;
    // for inserting to "job_postings" table
    const jobQuery = `INSERT INTO "job_postings" ("company_id", "available_role", "description", 
                        "application_link", "job_city", "job_state", "remote", "posting_contact_id", 
                        "share_contact", "hiring_contact_id", "status") 
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                        RETURNING "id";`;

    // run the query for the posting contact table
    const postingContactQueryResult = await pool.query(postingContactQuery, 
        [req.body.posting_contact_name, req.body.posting_contact_email]
    );
    console.log('posting contact ID', postingContactQueryResult.rows[0].id);
    // set the returned ID to a new variable 
    const posting_contact_id = postingContactQueryResult.rows[0].id;

    // for hiring contact, only insert a value if we get one from the client
    let hiring_contact_id = '';
    // we'll know that we have a value to insert if share_contact is true
    if(req.body.share_contact === true){   // if true, query the database
        const checkHiringContact = await pool.query(hiringContactQuery, 
            [req.body.name, req.body.email, req.body.title, req.body.phone]
        );
        console.log('hiring contact ID', checkHiringContact.rows[0].id);
        hiring_contact_id = checkHiringContact.rows[0].id;  // Set the returned ID to the variable
    } else {        // if false, leave the variable undefined
        hiring_contact_id = null; 
        console.log('hiring contact ID', hiring_contact_id);
    }

    // run the query for the company table
    const companyQueryResult = await pool.query(companyQuery, 
        [req.body.company]
    );
    console.log('company id', companyQueryResult.rows[0].id);
    // set the returned ID to a new variable 
    const company_id = companyQueryResult.rows[0].id;
 
    
    // Insert the new Job posting, setting the returned ID to a variable
    const rowId = await pool.query(jobQuery, 
            [
                company_id,                 // $1 
                req.body.available_role,    // $2
                req.body.description,       // $3
                req.body.application_link,  // $4
                req.body.job_city,          // $5
                req.body.job_state,         // $6
                req.body.remote,            // $7
                posting_contact_id,         // $8
                req.body.share_contact,     // $9
                hiring_contact_id,          // $10
                // userId,                     
                status          // $11
            ]
    );
    
    console.log('ID of new "job_postings" row', rowId.rows[0].id);
    // set returned new row ID to variable
    const rowIdToAdd = rowId.rows[0].id;


    // create an empty array to add IDs of job types
    const jobsByType = [];
    // get array of job types with IDs
    const allJobTypes = await pool.query(`SELECT * FROM "job_types";`);
    console.log('what do all the job types look like?', allJobTypes);

    // loop over job types strings from client array, pushing their IDs to jobsByType array
    const jobTypes = req.body.job_types;
    console.log('Job types from the client', jobTypes);
    for (let index in jobTypes) {
        console.log('looping through job Types from client');
        console.log('index', index, 'job type here', jobTypes[index], 'value in allJobtypes here', allJobTypes.rows[index].type);
        for (let item in allJobTypes.rows) {
            console.log('checking all job types at item', item);
            if (jobTypes[index] == allJobTypes.rows[item].type) {
                console.log('found a match at index', index, 'item', item);
                jobsByType.push(allJobTypes.rows[item].id);
            }
        }
    }
    console.log('Jobs by type, as IDs', jobsByType);
    // now loop over that new array of IDs and add them to the "jobs_by_type" table
    for (let i = 0; i < jobsByType.length; i++) {
        let jobTypeToAdd = jobsByType[i];
        await pool.query(`
                    INSERT INTO "jobs_by_type" ("job_posting_id", "job_type_id") 
                    VALUES ($1, $2);`, 
                    [rowIdToAdd, jobTypeToAdd]);
    }
    console.log('POST SUCCESS');
    await pool.query('COMMIT');
    res.sendStatus(201);
  } catch (error) {
      console.log('ERROR in POST; ROLLBACK', error);
      await pool.query('ROLLBACK');
    //   throw error;
      res.sendStatus(500);
  }
});

module.exports = router;
