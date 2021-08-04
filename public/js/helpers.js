/**
 * Function that converts the date to a readable format
 * 
 * @param {String} date specifies the date in Zulu Time
 * @returns date in readable format
 * 
 */
 function dateConverter(date){
    if (date.length!=20){
        return null;
    }
    else{
        return(date.substring(0,10) + " at " + date.substring(11,19))
    }
}

/**
 * Function that converts ticket status to colored emoji
 * 
 * @param {String} status specifies the ticket status
 * @returns colored emoji representing ticket status
 * 
 */
 function statusConverter(status){
    if (status == "open"){
        return("&#128308"); //red circle
    }
    else if (status == "pending"){
        return("&#128309"); //blue circle
    }
    else if (status == "closed" || status == "solved"){
        return("&#128994"); //green circle
    }
    else {
        return("&#10067") //question mark
    }
}

export{dateConverter, statusConverter};