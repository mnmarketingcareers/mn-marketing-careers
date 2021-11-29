const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require( 'axios' );


/**
* POST route for employers to post new job openings
*/
router.post('/', async (req, res) => {
 // TO DO: CLEAR OUT MOST OF THE CONSOLE LOGS
 console.log('In employer router, POST', req.body);

 try {

   const secretKey = process.env.RECAPTCHA_SECRET_KEY;
   const token = req.body.token;
   const validate = await axios.post(`
   https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}
   `)
   console.log('validation response', validate.data.success);
   if (validate.data.success != true) {
       const error = 'Captcha not validated';
       throw error;
   }
   // validate inputs
   if (
       req.body.posting_contact_name === '' ||
       req.body.posting_contact_email === '' ||
       req.body.company === '' ||
       req.body.available_role === '' ||
       req.body.application_link === '' ||
       req.body.description === '' ||
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
               // userId,                     // $11
               'PENDING_APPROVAL'          // $12
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
