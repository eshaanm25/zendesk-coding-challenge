# Zendesk 2021 Coding Challenge 


The following project was created as a challenge for Zendesk's Co-op program. The application is able to use the Zendesk API to list and view Zendesk tickets. The project utilizes a front-end written in Javascript, HTML, and CSS as well as a back-end written in NodeJS.

# Quick Look

Fow a quick look at the application, here is a webserver hosted on AWS at [zendesk.eshaanm.com](http://zendesk.eshaanm.com)

# Installation Instructions

1. Make sure [Node.js](https://nodejs.org/en/) is installed
2.  Clone the repository on your local machine

	    https://github.com/eshaanm25/zendesk-coding-challenge
3. Navigate to the installation directory and fill in the .env file with the local variables supplied in the submission.

|       Variable         |Description                          |Example                         |
|----------------|-------------------------------|-----------------------------|
|SUBDOMAIN|The subdomain of the Zendesk account being accessed            |zcceshaanm           |
|OATH          | OAUTH token used to authenticate with Zendesk API            |Provided in submission details            


5. Run the following code to install the necessary npm packages

	   npm install

6. Start the program

	   npm start

8. By default, the project will be hosted on port 3000, so you can visit the webpage at [localhost:3000](http://localhost:3000)

## Testing

The testing framework for this application were made using Jest. Endpoint testing was also done using [SuperTest](https://www.npmjs.com/package/supertest). To test the application, run the following code. 

    npm test

# Project Structure
- `./index.js` is the entry point for the application. However, it only includes the port that the server configuration
- `./server.js` includes API endpoints, Zendesk authentication information, and API error-handling
- `./public/index.html` is the entry point for the the front-end
- `./public/js/ticketTable.js` is the Javascript involved with populating and paginating the ticket table
-  `./public/js/ticketInfo.js` is the Javascript involved with populating the ticket information panel
- `./public/js/helpers.js` include helper functions that convert Zulu time provided from the API to GMT and map ticket statuses to emojis
- `./public/css/style.css` includes basic CSS for fonts, table colors, etc.
- `./test` includes files involved with unit testing code
