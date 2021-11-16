require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const subsRouter = require('./routes/subs.router');
const feedbackRouter = require('./routes/feedback.router');
const jobIssuesRouter = require('./routes/job_issues.router');



// jobs routers
const jobsRouter = require('./routes/job_postings.router');
const jobTypesRouter = require('./routes/job_types.router');
const searchJobsRouter = require('./routes/search_jobs.router');


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/subs', subsRouter);
app.use('/api/feedback', feedbackRouter);
app.use('/api/jobissues', jobIssuesRouter);




// use the jobs routers
app.use('/api/job', jobsRouter);
app.use('/api/jobtypes', jobTypesRouter)
app.use('/api/search', searchJobsRouter)
// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
