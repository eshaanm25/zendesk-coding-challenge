import app from '../server.js'
const request = require("supertest");

test("Check if the public folder is accessible", async () => {
    const response = await request(app).get("/index.html")
      .expect(200)
  });

test("Check if ticket page returns proper Javascript objects", async () => {
    const response = await request(app).get("/page/1")
    .expect(200)
    .then((response) => {
        expect(response.body.tickets[0].id).toBe(1); //checks if first ticket has an ID of 1
    });
  });

test("Check if ticket details returns proper Javascript objects", async () => {
    const response = await request(app).get("/ticket/1")
    .expect(200)
    .then((response) => {
        expect(response.body.ticket.id).toBe(1);
    });
  });

  test("Check if ticket that does not exist returns a 404 Error", async () => {
    const response = await request(app).get("/ticket/10000")
    .expect(200)
    .then((response) => {
        console.log(response);
        expect(response.text).toBe("ERROR 404: The server can not find the requested resource. Please check if Zendesk Subdomain is valid.");
    });
  });


  test("Check if ticket ID with letters in the request returns a 400 error", async () => {
    const response = await request(app).get("/ticket/aws")
    .expect(200)
    .then((response) => {
        console.log(response);
        expect(response.text).toBe("ERROR 400: The server could not understand the request due to invalid syntax. Please check if ticket number or page number is valid.");
    });
  });

  test("Check if page ID with letters in the request returns a 400 error", async () => {
    const response = await request(app).get("/page/kubernetes")
    .expect(200)
    .then((response) => {
        console.log(response);
        expect(response.text).toBe("ERROR 400: The server could not understand the request due to invalid syntax. Please check if ticket number or page number is valid.");
    });
  });

