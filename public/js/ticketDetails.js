import {dateConverter} from "./helpers.js"

/**
 * Function that makes a request to Node endpoint, parses the response to a Javascript object, and calls the populateTicketTable() function to populate the ticket information on the webpage.
 * If there is an error, the function displays the error message provided by Node on the webpage.
 * 
 * @param {Number} ticketId specifies the Ticket ID to request.
 */
 async function ticketInfo(ticketId) {
    ticketInfoHeaders('none') //Hides ticket information while it's being updated
    try{
        const api_url = '/ticket/'+ticketId;
        document.getElementById('ticketwelcome').innerHTML='Loading: Contacting API';
        const userResponse = await fetch(api_url);
        try {
            var textResponse = await userResponse.text(); // Parses response as text
            var jsonResponse = JSON.parse(textResponse); // Attempts to parse text as JSON. If there is an error, then it's determiend that Node returned a string (error message)
            document.getElementById('status').innerHTML='';
        } catch(err) {
            document.getElementById('ticketwelcome').innerHTML=textResponse; // Shows error message on frontend 
            return(null);
        }
        document.getElementById('ticketwelcome').innerHTML='Ticket #'+jsonResponse.ticket.id+' Information';
        ticketInfoHeaders('block'); //Shows headers
        populateTicketTable(jsonResponse.ticket); //Populates ticket info
    }
    catch (error) {
        console.log(error);;
    }
}

/**
 * Function that hides and displays ticket information headers.
 * 
 * @param {String} css specifies the value for the CSS key 'display'
 */
 function ticketInfoHeaders(css){
    document.getElementById('ticketheadersubject').style.display=css;
    document.getElementById('ticketheaderdescription').style.display=css;
    document.getElementById('ticketheaderstatus').style.display=css;
    document.getElementById('ticketheadercreationtime').style.display=css;
    document.getElementById('ticketheaderupdatetime').style.display=css;
    document.getElementById('ticketsubject').style.display=css;
    document.getElementById('ticketdescription').style.display=css;
    document.getElementById('ticketstatus').style.display=css;
    document.getElementById('ticketcreationtime').style.display=css;
    document.getElementById('ticketupdatetime').style.display=css;
    return('success');
}

/**
 * Function that populates ticket information on webpage
 * 
 * @param {Object} ticketInformation specifies the ticket information response from Zendesk API
 */
function populateTicketTable(ticketInformation){
    try{
        document.getElementById('ticketsubject').innerHTML=ticketInformation.raw_subject;
        document.getElementById('ticketdescription').innerHTML=ticketInformation.description;
        document.getElementById('ticketstatus').innerHTML=ticketInformation.status;
        document.getElementById('ticketcreationtime').innerHTML=dateConverter(ticketInformation.created_at);
        document.getElementById('ticketupdatetime').innerHTML=dateConverter(ticketInformation.updated_at);
        return('success')
    }
    catch{
        return(null);
    }
}

export { ticketInfo, ticketInfoHeaders, populateTicketTable };
