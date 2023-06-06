//send a request to the API without actually running the server
const supertest = require("supertest");

//test app
const app = require("../server");
const request = supertest(app);

//TESTS: 
//params: (test name, test action)
//compare expect and toBe
//use "describe(name, arrow fn)" to create a block-- can be nested

//test home page loading
test("Get 200 for API homepage", async () => {
  const response = await request.get("/");
  expect(response.status).toBe(200);
});

//test game page loading
test("Get 200 for API gamepage", async () => {
  const response = await request.get("/game");
  expect(response.status).toBe(200);
});