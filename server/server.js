require('dotenv').config();

const express = require('express');
// const bodyParser = require('body-parser');

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const subsRouter = require('./routes/subs.router');
const feedbackRouter = require('./routes/feedback.router');
const jobIssuesRouter = require('./routes/job_issues.router');
const empRouter = require('./routes/employer.router');

const campaignRouter = require('./routes/campaign.router'); //updated by Mo - work in progress
const templateRouter = require('./routes/template.router');

// jobs routers
const jobsRouter = require('./routes/job_postings.router');
const jobTypesRouter = require('./routes/job_types.router');
const searchJobsRouter = require('./routes/search_jobs.router');
const grecaptcha = require('./routes/grecaptcha.router');
const jobsByAgeSearch = require('./routes/posting_age.router');


// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

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
app.use('/api/employer', empRouter);

app.use('/api/campaign', campaignRouter); //updated by Mo - work in progress
app.use('/api/template', templateRouter); //updated by Mo - now for mailchimp templates
app.use('/api/verify', grecaptcha);

// use the jobs routers
app.use('/api/job', jobsRouter);
app.use('/api/jobtypes', jobTypesRouter);
app.use('/api/search', searchJobsRouter);
app.use('/api/recentjob', jobsByAgeSearch);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
