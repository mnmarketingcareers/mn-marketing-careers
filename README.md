# MN Marketing Careers Application

## Description

_Duration: 2 Week Sprint_

This application provides improved and expanded functionality for the curators of the MN Marketing Careers joblist sharing service and increased accessibility to the the subscribers to that list, and employers looking to include new job openings. It aims to gather all current methods inuse by the client in one place. With that in mind, it was designed to continue to utilize MailChimp functionalty for the client to incorporate existing practices and subscriber contact data conveneintly and effectively into the application. The app was then customized for more interaction between employers looking to post jobs, job-seekers, and the joblist curators. The joblist now lives on a page where job seekers can see all previous postings up to 30 days after initiation, and can sort and filter results by a few predetermined categories. The joblist curator can also manage listings with more control. 


To see the fully functional site, please visit: [DEPLOYED VERSION OF APP](www.heroku.com)

## Screen Shot

First, lets get in the right frame of mind:

![Classic Lasagna](public/images/classic_lasagna.png)

That's better!

To gain a working understading of the data pathways, one might reference the following chart.

![Expensive Lucid Chart](public/images/lucid_chart.png)

Additionally, an example of the site administrators form to add new job openings to the list.

![Admin Add Job Form](public/images/mnmc_admin-add-jobs.png)

## Important Codestuff

Check out this amazing code, that will be so helpful for you when spinning up the project:

```
function ReturnLasagna(hunger) {
  const lasagna = '';

  const { dinner } = useSelector(store => store);

  useEffect( () => {
    dispatch({ type: 'FETCH_DINNER' });
  }, []);

  lasagna = dinner.map(food => <li key={food.id}>{food.item}</li>);

  return (
    <div>
      <h2>It's what's for dinner!</h2>
      <ul>
        {lasagna}
      </ul>
    </div>

  )
}

export default ReturnLasagna;
```

### Prerequisites

Link to software that is required to install the app (e.g. node).

- MailChimp account (with API_KEY)
- [Node.js](https://nodejs.org/en/)
- List other prerequisites here

## Installation

*this section requres further edits by 11/20/2021*

- Before spinning up the project, make sure you have an active MailChimp account, to which to link the project. 
- Create a .env file at the root of the project and paste this line into the file:
  SERVER_SESSION_SECRET=superDuperSecret 
  While you're in your new .env file, take the time to replace superDuperSecret with some long random string like 25POUbVtx6RKVNWszd9ERB9Bb6 to keep your application secure. Here's a site that can help you: https://passwordsgenerator.net/. If you don't do this step, create a secret with less than eight characters, or leave it as superDuperSecret, you will get a warning.
- You will need to generate/locate your MailChimp api key (basic instructions here [mailchimp_gettingstarted](https://mailchimp.com/developer/marketing/guides/quick-start/#generate-your-api-key)). Use this to replace the text immediately after `MAILCHIMP_API_KEY=` in the lines below.
- Your server prefix is found in the url of your MailChimp dashboard when logged in. It immediately follows the `https://` and precedes the first `.` Use this to replace the text immediately after `DC=` in the lines below.
- Find you Audience Id in your Audience settings on your MailChimp account. Use this to replace the text immediately after `TEST_LIST_ID=` in the lines below.
- Replace sample text in each of the following 3 lines as mentioned above, and include in your .env file:

DC=your_server_prefix
MAILCHIMP_API_KEY=your_maichimp_api_key
TEST_LIST_ID=your_account_id_number

- Make sure your .env is in your .gitignore!

Next:

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