/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
const ticketTableJSON = fs.readFileSync(path.resolve(__dirname, '../resources/testing/sampleTicketTable.json'), 'utf-8');
import { checkPages, populateInfoTable } from "./ticketTable";

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
    const expected = fs.readFileSync(path.resolve(__dirname, '../resources/testing/tablePopulate.html'), 'utf8');
    const jsonobject = JSON.parse(ticketTableJSON); //Sample JSON of Page 1, Next button is active and Previous nutton is inactive
    expect (populateInfoTable(jsonobject.tickets)).toEqual(expected);
})








