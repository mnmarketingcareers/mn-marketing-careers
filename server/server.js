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
const campaignRouter = require('./routes/campaign.router'); //updated by Mo - work in progress
const templateRouter = require('./routes/template.router');

// jobs routers
const jobsRouter = require('./routes/job_postings.router');
const jobTypesRouter = require('./routes/job_types.router');


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
app.use('/api/campaign', campaignRouter); //updated by Mo - work in progress
app.use('/api/template', templateRouter); //updated by Mo - now for mailchimp templates


// use the jobs routers
app.use('/api/job', jobsRouter);
app.use('/api/jobtypes', jobTypesRouter)

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
