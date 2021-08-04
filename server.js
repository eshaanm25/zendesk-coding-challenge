const dotenv = require('dotenv').config()
const { response } = require('express');
const express = require('express');
const fetch = require('node-fetch');


/**
 * Opens port 3000 and hosts ./public folder
 */
const app = express();
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));


/**
 * Constant that defines the method and headers for requests made to the Zendesk API. OAUTH Token is stored in .env file.
 */
const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ process.env.OAUTH
        },
    };

/**
 * API endpoint that accesses the Zendesk API to retrieve a list of tickets from a specified page. SUBDOMAIN variable is stored in .env file.
 * 
 * @param {Number} pagenumber specifies the page number to request 
 * @returns {Mixed} Returns either the list of tickets in JSON or an error code as a String
 */
app.get('/page/:pagenumber', async(request, response) => {
    try{
        const pagenumber = request.params.pagenumber;
        console.log('Getting Tickets for Page '+ pagenumber);
        const url = 'https://'+process.env.SUBDOMAIN+'.zendesk.com/api/v2/tickets.json?page='+pagenumber+'&per_page=25';
        console.log('Fetching list from Zendesk API');
        let userResponse = await fetch(url, options);
        if (userResponse.ok) {
            console.log('Parsing data');
            let ticketListData = await userResponse.json();
            console.log('Success!\n');
            response.json(ticketListData);
        } else {
            console.log('Error retrieving data. Error Code Listed On Webpage');
            response.send(HTTPError(userResponse));
        }
    }
    catch (error){
        console.log('Node Error');
        response.send(nodeCatchError(error));
    }
})

/**
 * API endpoint that accesses the Zendesk API to retrieve information from a specified ticket
 * 
 * @param {Number} ticketId specifies ID of the ticket being retrieved
 * @returns {Mixed} Returns either the the ticket information in JSON or an error code as a String
 */
app.get('/ticket/:ticketId', async(request, response) => {
    const tickedId = request.params.ticketId;
    console.log('Getting Ticket ID# '+ tickedId);
    const url = 'https://'+process.env.SUBDOMAIN+'.zendesk.com/api/v2/tickets/'+tickedId+'.json';
    console.log('Fetching ticket from Zendesk API');
    try{
        let userResponse = await fetch(url, options);
        if (userResponse.ok) {
            console.log('Parsing data');
            let ticketInfo = await userResponse.json();
            console.log('Success!\n');
            response.json(ticketInfo);
        } else {
            console.log('Error retrieving data. Error Code Listed on Webpage');
            response.send(HTTPError(userResponse));
        }
    }
    catch (error){
        console.log(error);
    }
})

/**
 * Function that adds troubleshooting information to an HTTP error created by the Ticket Information function
 * 
 * @param {Object} userResponse specified the error information returned by the Ticket Information function
 * @returns {String} Returns HTTP error code and troubleshooting tips
 */
function HTTPError(userResponse){
    switch(userResponse.status){
        case 404:
            return 'ERROR 404: The server can not find the requested resource. Please check if Zendesk Subdomain is valid.';
        case 400:
            return 'ERROR 400: The server could not understand the request due to invalid syntax. Please check if ticket number or page number is valid.';
        case 403:
            return 'ERROR 403: The client does not have access rights to the content. Please check if OAUTH token is valid.';
        case 401:
            return 'ERROR 401: The client does not have access rights to the content. Please check if OAUTH token is valid.';
        default:
            console.log(userResponse.status+' '+userResponse.statusText)
            return userResponse.status+' '+userResponse.statusText;
    }
}   

module.exports = app;