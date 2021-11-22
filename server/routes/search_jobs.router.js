const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GET jobs with Remote field as 'Yes' or 'Other'...
router.get('/', (req, res) => {
  // console.log('In GET for all remote and hybrid job postings');
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
                  AND "jp"."remote" = 'yes'
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

// GET jobs with the job type of 'Internship'.
router.get('/internships', (req, res) => {
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
      AND "jt"."id" = '14'
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

/**
 * PUT for individual job posting edits
 */
 router.put('/:id', rejectUnauthenticated, async (req, res) => {
  // TO DO: CLEAR OUT MOST OF THE CONSOLE LOGS
  console.log('In Admin Edit job posting, PUT route', req.params.id, req.body );

  try {

    // validate inputs
    if (
        req.body.posting_contact_name === '' ||
        req.body.posting_contact_email === '' ||
        req.body.company_name === '' ||
        req.body.available_role === '' ||
        req.body.application_link === '' ||
        // req.body.description === '' ||
        req.body.job_city === '' ||
        req.body.job_state === '' ||
        req.body.remote === '' ||
        req.body.share_contact === '' ||
        req.body.job_type.length === 0
    ) {
        // define an error to match validation failure
        const error = 'Invalid input: Form not added -  missing fields';
        // this goes to the catch
        throw error; 
    }

   
    // let status = '';
    // if (req.body.status === '') {
    //     status = null;
    // } else {
    //     status = req.body.status;
    // }

    // console.log('Status sent from client', status);

    await pool.query('BEGIN');
    // const userId = 0;

    // set queries for adding to tables, returning id's of newly generated rows
    // for adding to "posting_contact" table
    const postingContactQuery = `UPDATE "posting_contact" SET ("posting_contact_name", "posting_contact_email")
                            = ($1, $2)
                            WHERE "id" = $3
                            RETURNING "id";`;
    // for adding to "hiring_contact" table
    const hiringContactQuery = `UPDATE "hiring_contact" SET ("hiring_contact_name", "hiring_contact_email", "title", "phone") 
                            = ($1, $2, $3, $4)
                            WHERE "id" = $5
                            RETURNING "id";`;
    // for adding to "company" table
    const companyQuery = `UPDATE "company" SET "company_name" = $1 
                            WHERE "id" = $2
                            RETURNING "id";`;
    // for inserting to "job_postings" table
    const jobQuery = `UPDATE "job_postings" SET ("company_id", "available_role", "description", 
                        "application_link", "job_city", "job_state", "remote", "posting_contact_id", 
                        "share_contact", "hiring_contact_id" ) 
                        = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                        WHERE "id" = $11
                        RETURNING "id";`;

    // run the query for the posting contact table
    const postingContactQueryResult = await pool.query(postingContactQuery, 
        [req.body.posting_contact_name, req.body.posting_contact_email, req.body.posting_contact_id]
    );
    console.log('posting contact ID', postingContactQueryResult.rows[0].id);
    // set the returned ID to a new variable 
    const posting_contact_id = postingContactQueryResult.rows[0].id;

    // for hiring contact, only insert a value if we get one from the client
    let hiring_contact_id = '';
    // we'll know that we have a value to insert if share_contact is true
    if(req.body.share_contact === true){   // if true, query the database
        const checkHiringContact = await pool.query(hiringContactQuery, 
            [req.body.hiring_contact_name, 
              req.body.hiring_contact_email, 
              req.body.title, 
              req.body.phone,
              req.body.hiring_contact_id
            ]
        );
        console.log('hiring contact ID', checkHiringContact.rows[0].id);
        hiring_contact_id = checkHiringContact.rows[0].id;  // Set the returned ID to the variable
    } else {        // if false, leave the variable undefined
        hiring_contact_id = null; 
        console.log('hiring contact ID', hiring_contact_id);
    }

    // run the query for the company table
    const companyQueryResult = await pool.query(companyQuery, 
        [req.body.company_name, req.body.company_id]
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
                // status,
                req.body.id                 // $11
            ]
    );
    
    console.log('ID of updated "job_postings" row', rowId.rows[0].id);
    // set returned new row ID to variable
    const rowIdToAdd = rowId.rows[0].id;


    // create an empty array to add IDs of job types
    const jobsByType = [];
    // get array of job types with IDs
    const allJobTypes = await pool.query(`SELECT * FROM "job_types";`);
    const currentJobTypesForJob = await pool.query(`
                                                    SELECT "jobs_by_type"."job_posting_id", ARRAY_AGG("job_types"."type") FROM "jobs_by_type"
                                                    JOIN "job_types" ON "jobs_by_type"."job_type_id" = "job_types"."id"
                                                    WHERE "job_posting_id" = ${rowIdToAdd}
                                                    GROUP BY "jobs_by_type"."job_posting_id";
                                                  `);
    console.log('what do all the job types look like?', allJobTypes);
    console.log('What are the Job types for the job before the edits?', currentJobTypesForJob.rows[0].array_agg);

    const jobTypes = req.body.job_type;
    console.log('Job Types from the client', jobTypes);
    const compareJobTypes = currentJobTypesForJob.rows[0].array_agg;
    // compare the array from client with array of existing job types for job posting
    const diff = (arr, arr2) => {
      let ret = [];
      for (let i in arr) {
        if (!arr2.includes(arr[i])) {
          ret.push(arr[i]);
        }
      }
      return ret;
    };
    let ifDifferent = diff(compareJobTypes, jobTypes);
    console.log('should see an array. if no changes, it will be empty', ifDifferent);

    // If the client sent any changes, loop over job types strings from client array, 
    // pushing their IDs to jobsByType array
    if(ifDifferent.length > 0 || compareJobTypes.length != jobTypes.length) {
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
      // delete existing rows from jobs by type with job posting id to remove possible duplicates
      await pool.query(`DELETE FROM "jobs_by_type" WHERE "job_posting_id" = $1`, [rowIdToAdd])
      // now loop over that new array of IDs and add them to the "jobs_by_type" table
      for (let i = 0; i < jobsByType.length; i++) {
        let jobTypeToAdd = jobsByType[i];
        await pool.query(`
                    INSERT INTO "jobs_by_type" ("job_posting_id", "job_type_id") 
                    VALUES ($1, $2);`,
          [rowIdToAdd, jobTypeToAdd]);
      }
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