/**
 * @jest-environment jsdom
 */

 const fs = require('fs');
 const path = require('path');
 const html = fs.readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf8');
 const ticketInfoJSON = fs.readFileSync(path.resolve(__dirname, '../public/resources/testing/sampleTicketInfo.json'), 'utf-8');
 import { ticketInfoHeaders, populateTicketTable, ticketInfo } from "../public/js/ticketDetails";

test('Edit HTML Elements on Webpage', () => { 
    document.body.innerHTML = html;
    expect (ticketInfoHeaders("block")).toEqual("success");
})

test('Parse Ticket JSON and Edit HTML on Webpage', () => {
    document.body.innerHTML = html;
    const jsonobject = JSON.parse(ticketInfoJSON);
    expect (populateTicketTable(jsonobject.ticket)).toEqual("success");
})

test('populateTicketTable returns null if given invalid input (Expects Object)', () => {
    expect (populateTicketTable('Zendesk Neighbor Foundation')).toBeNull();
})