import {dateConverter, statusConverter} from "./helpers.js"
import {ticketInfo} from "./ticketDetails.js"

/**
 * Function that makes a request to Node endpoint, parses the response to a Javascript object, and calls the populateInfoTable() function to populate the table on the webpage.
 * If there is an error, the function displays the error message provided by Node on the webpage.
 * 
 * @param {Number} pageNumber specifies the page number to request.
 */
 async function getTickets(pageNumber) {
    try{
        const api_url = '/page/'+pageNumber;
        document.getElementById('status').innerHTML='Loading: Contacting API';
        const userResponse = await fetch(api_url);
        try {
            var textResponse = await userResponse.text(); // Parses response as text
            var jsonResponse = JSON.parse(textResponse); // Attempts to parse text as JSON. If there is an error, then it's determiend that Node returned a string (error message)
            document.getElementById('status').innerHTML='';
        } catch(error) {
            document.getElementById('status').innerHTML=textResponse; // Shows error message on frontend 
            return(textResponse);
        }
        populateInfoTable(jsonResponse.tickets); // Function that populates table on webpage
        checkPages(jsonResponse); // Function that determines if a next or previous page exists
        document.getElementById('status').innerHTML='Page: '+ pageNumber; // Updates page number on frontend
    }
    catch (error) {
        console.log(error);
    }
}

/**
 * Function that increments page and runs getTickets() to load a new page of tickets on the webpage
 */
async function nextPage() {
    document.getElementById('next').disabled=true; // Disables button to prevent duplicate presses
    try{
        pageNumber++;
        await getTickets(pageNumber);
    }
     catch (error) {
        console.error(error);
    }
}

/**
 * Function that decrements page and runs getTickets() to load a new page of tickets on the webpage
 */
async function previousPage() {
    document.getElementById('previous').disabled=true; // Disables button to prevent duplicate presses
    try{
        pageNumber--;
        await getTickets(pageNumber);
    }
     catch (error) {
        console.error(error);
    }
}

/**
 * Function that uses response from Zendesk to determine if a next page or previous page exists
 * 
 * @param {Object} pageData specifies the Zendesk Response as a Javascript Object
 */
function checkPages(pageData) {
    if (pageData.next_page==null){
        document.getElementById('next').disabled=true;
        var nextstatus = 'inactive';
    }
    else {
        document.getElementById('next').disabled=false;
        var nextstatus = 'active';
    }

    if (pageData.previous_page==null){
        document.getElementById('previous').disabled=true;
        var previousstatus = 'inactive';
    }
    else {
        document.getElementById('previous').disabled=false;
        var previousstatus = 'active';
    }
    return (nextstatus+' '+previousstatus);
}


/**
 * Function that populates ticket list on webpage 
 * 
 * @param {Object} pageInformation specifies the ticket list response from Zendesk API
 */
 function populateInfoTable(pageInformation){
    var table = document.getElementById('ticketsTable');
    while(ticketsTable.rows.length > 0) {
        table.deleteRow(0);
    }
    for (var i = 0; i < pageInformation.length; i++){  
        var row = `<tr>
            <td><button id='${pageInformation[i].id}'>${pageInformation[i].id}</button></td>
            <td>${statusConverter(pageInformation[i].status)}</td>
            <td>${pageInformation[i].subject}</td>
            <td>${dateConverter(pageInformation[i].updated_at)}</td>
        </tr>`;
        table.innerHTML += row;
    }

    //adds listener for ID buttons. Used instead of the HTML tool onclick as it is bad practice
    for (var i = 0; i < pageInformation.length; i++){  
        document.getElementById(pageInformation[i].id).onclick = 
        function(event) {
            console.log();
            ticketInfo(this.id);
    }
};
return('success');
}

var text, json, pageNumber; //Initialize global variables

window.onload = function(){
    document.getElementById ("previous").addEventListener("click", previousPage, false);
    document.getElementById ("next").addEventListener ("click", nextPage, false);
    pageNumber = 1;
    getTickets(pageNumber); 
};

export { checkPages, populateInfoTable}
