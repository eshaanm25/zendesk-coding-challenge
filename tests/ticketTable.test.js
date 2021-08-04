/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf8');
const ticketTableJSON = fs.readFileSync(path.resolve(__dirname, '../public/resources/testing/sampleTicketTable.json'), 'utf-8');
import { checkPages, populateInfoTable } from "../public/js/ticketTable";

test('Check if pagination buttons work correctly', () => { 
    document.body.innerHTML = html;
    const jsonobject = JSON.parse(ticketTableJSON); //Sample JSON of Page 1, Next button is active and Previous nutton is inactive
    expect (checkPages(jsonobject)).toEqual("active inactive");
})

test('checkPages grays out both buttons if invalid input is recieved', () => { 
    document.body.innerHTML = html;
    expect (checkPages('Singapore')).toEqual("inactive inactive");
})

test('Check if table populates correctly', () => { 
    document.body.innerHTML = html;
    const jsonobject = JSON.parse(ticketTableJSON); 
    expect (populateInfoTable(jsonobject.tickets)).toEqual('success');
})












