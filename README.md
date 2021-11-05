# MN Marketing Careers Application

## Description

_Duration: 2 Week Sprint_

This is an application to make life easier for the curators and subcribers to the MN Marketing Careers joblist sharing service. Our application will include MailChimp functionalty to allow the client to incorporate existing practices and subscriber contact data conveneintly and effectively into the application.


To see the fully functional site, please visit: [DEPLOYED VERSION OF APP](www.heroku.com)

## Screen Shot

Some things to consider...

So classic

![Classic Lasagna](public/images/classic_lasagna.png)

Wow, pretty!

![Expensive Lucid Chart](public/images/lucid_chart.png)


### Prerequisites

Link to software that is required to install the app (e.g. node).

- MailChimp account (with API_KEY)
- [Node.js](https://nodejs.org/en/)
- List other prerequisites here

## Installation

_This will be important for our client to spin this up on their own. Let's make sure to write it as clearly, simply, and exact as possible, being aware of possible assumptions we might make from our perspective._

*this section is un-edited, as of 11/05/2021*

How do you get your application up and running? This is a step by step list for how another developer could get this project up and running. The good target audience in terms of knowledge, would be a fellow Primer from another cohort being able to spin up this project. Note that you do not need a paragraph here to intro Installation. It should be step-by-step.

If your application has secret keys (for example --  Twilio), make sure you tell them how to set that up, both in getting the key and then what to call it in the `.env` file.

1. Create a database named `mn_marketing_careers`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!

## Usage
How does someone use this application? Tell a user story here.

1. Go to the main page, linked from email
2. See the jobs - Click around
3. use the search bar to filter results
4. Apply!
5. Select a column header to sort by given column
6. If you have a job to post, follow the link to send it to the admin
7. If you are aware of an issue with a job post, follow the link to inform the admin
8. You may unsubscribe at the link at the bottom - we'll have a couple questions for you
9. The site also includes functionality for page administrators ('admins')
10. Admins need to login at a private url to access these features
11. Logged in admins will see a list of notifications
12. Notifications include pending job posts added by potential empoloyers, and any issues sent from users on the main page
13. Admins will also be able to view all active listings, with options to edit, delete, or deactivate job listings
14. Admins may approve or deny pending job posts
15. Admins may address issues and mark them complete, or delete them
16. Admins may draft new job postings and save them to a queue to post live at a later time
17. Admins may draft a weekly email which will feature new job listings and, on send, will post new job listings to the main webpage
18. Admins may choose to post new job listings in the queue to the main webpage without sending the email
19. Admins may log out when finished

## Built With

1. JavaScript
2. React
3. Redux
4. AWS S3/aws-sdk
5. Material-UI
6. Express
7. Postgres
8. Node.js
9. HTML/css


## License
[MIT](https://choosealicense.com/licenses/mit/)

_Note, include this only if you have a license file. GitHub will generate one for you if you want!_

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality. Thanks to lasagna, for being the world of inspiration that you are.

## Support
If you have suggestions or issues, please email me at [coolcoolcool@killer-beans.com](www.google.com)