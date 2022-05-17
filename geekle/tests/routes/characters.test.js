const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../server");
const CharacterDao = require("../../server/data/CharacterDao");

const characters = new CharacterDao();
const request = supertest(app);

describe("Test character accessibility endpoints", () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__);
    await characters.create({
      name: "Batman",
      gender: "male",
    });
  });

  describe("Test /characters", () => {

    describe("GET /characters", () => {
      test("Return 201 with an array of characters", async () => {
        const response = await request.get("/characters");
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("name");
        expect(response.body[0]).toHaveProperty("gender");
        expect(response.statusCode).toBe(201);
      });
    });

    describe("POST /characters", () => {
      test("It responds with the newly created character", async () => {
        const newCharacter = await request
          .post("/character")
          .send({
            name: "Superman",
            gender: "male"
          });
    
        // make sure we add it correctly
        expect(newCharacter.body).toHaveProperty("id");
        expect(newCharacter.body.name).toBe("Superman");
        expect(newCharacter.body.gender).toBe("male");
        expect(newCharacter.statusCode).toBe(201);
    
        // make sure we have 3 students now
        const response = await request(app).get("/characters");
        expect(response.body.length).toBe(2);
      });
    });
    
    test("Return 400 when name is missing", async () => {
      const response = await request.post("/api/characters").send({
        gender: "male",
      });
      expect(response.status).toBe(400);
    });

    test("Return 400 when gender is missing", async () => {
      const response = await request.post("/api/characters").send({
        name: "Batman",
      });
      expect(response.status).toBe(400);
    });

    test("Return 404 when id is incorrect for update", async () => {
      const response = await request.post("/api/characters").send({
        name: "Batman",
        gender: "female",
      });
      expect(response.status).toBe(404);
    });

    test("Return 404 when id is incorrect for delete", async () => {
      const response = await request.post("/api/characters").send({
        name: "Superman",
        gender: "male",
      });
      expect(response.status).toBe(404);
    });

    test("Return 200 when authentication is sucessfull", async () => {
      const response = await request.post("/api/characters").send({
        name: "Batman",
        gender: "male",
      });
      expect(response.status).toBe(201);
    });

    test("Return a JWT when authentication is sucessfull", async () => {
      const response = await request.post("/api/characters").send({
        name: "testclient",
        gender: "testclient",
      });
      expect(response.body.token).toBeTruthy(); // exists and non empty!
    });
  });
    
    afterAll(async () => {
      await mongoose.connection.close();
    });
});