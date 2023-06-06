const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../server");
const CharacterDao = require("../../server/data/CharacterDao");

const characters = new CharacterDao();
const request = supertest(app);

const endpoint = "/api/characters";

describe(`Test ${endpoint} endpoints`, () => {

  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__);
  });

  describe(`Test GET ${endpoint}`, () => {
    const samples = [];

    beforeAll(async () => {
      samples[0] = await characters.create({
        name: "Batman",
        gender: "male",
      });

      samples[1] = await characters.create({
        name: "Superman",
        gender: "male",
      });

      samples[2] = await characters.create({
        name: "Skeletor",
        gender: "male",
      });
    });

    test("Return 200 and list of characters for successful request", async () => {
      const response = await request
        .get(endpoint)
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(3);
    });

    describe(`Test GET ${endpoint} with query parameter`, () => {
      //Batman name
      test("Return 200 and list of characters for successful request for batman", async () => {
        const query = samples[0].name;
        const response = await request
          .get(`${endpoint}?query=${query}`)
        expect(response.status).toBe(200);
        const expected = samples.filter((s) => s.name.includes(query)).length;
        expect(response.body.data.length).toBe(expected);
      });

      //Superman name
      test("Return 200 and list of characters for successful request for superman", async () => {
        const query = samples[1].name;
        const response = await request
          .get(`${endpoint}?query=${query}`)
        expect(response.status).toBe(200);
        const expected = samples.filter((s) => s.name.includes(query)).length;
        expect(response.body.data.length).toBe(expected);
      });

      //Skeletor name
      test("Return 200 and list of characters for successful request for skeletor", async () => {
        const query = samples[2].name;
        const response = await request
          .get(`${endpoint}?query=${query}`)
        expect(response.status).toBe(200);
        const expected = samples.filter((s) => s.name.includes(query)).length;
        expect(response.body.data.length).toBe(expected);
      });

      //gender
      test("Return 200 and list of characters for successful request for gender", async () => {
        const query = "male";
        const response = await request
          .get(`${endpoint}?query=${query}`)
        expect(response.status).toBe(200);
        const expected = samples.filter((s) => s.gender.includes(query)).length;
        expect(response.body.data.length).toBe(expected);
      });
    });

    afterAll(async () => {
      for (const sample of samples) {
        await characters.delete(sample._id);
      }
    });
  });

  describe(`Test GET ${endpoint}/:id`, () => {
    let sample;

    beforeAll(async () => {
      sample = await characters.create({
        name: "Batman",
        gender: "male",
      });
    });

    test("Return 200 and the user for a given id", async () => {
      const id = sample._id;
      const response = await request
        .get(`${endpoint}/${id}`)
      expect(response.status).toBe(200);
    });

    afterAll(async () => {
      await characters.delete(sample._id);
    });
  });

  describe(`Test POST ${endpoint}`, () => {
    let sample;

    beforeAll(async () => {
      sample = {
        name: "Batman",
        gender: "male",
      };
    });

    test("Return 400 for missing name", async () => {
      const response = await request
        .post(endpoint)
        .send({
          gender: "male",
        })
      expect(response.status).toBe(400);
    });

    test("Return 400 for missing gender", async () => {
      const response = await request
        .post(endpoint)
        .send({
          name: "Batma ",
        })
      expect(response.status).toBe(400);
    });

    test("Return 201 for successful request", async () => {
      const response = await request
        .post(endpoint)
        .send(sample)
      expect(response.status).toBe(201);
      expect(response.body.data.name).toBe(sample.name);
      expect(response.body.data.gender).toBe(sample.gender);
      sample._id = response.body.data._id;
    });

    afterAll(async () => {
      await characters.delete(sample._id);
    });
  });

  describe(`Test PUT ${endpoint}/:id`, () => {
    let sample;

    beforeAll(async () => {
      sample = await characters.create({
        name: "Batman",
        gender: "male",
      });
    });

    test("Return 404 for invalid ID", async () => {
      const id = mongoose.Types.ObjectId().toString();
      const response = await request
        .put(`${endpoint}/${id}`)
        .send({
          name: "Superman",
        })
      expect(response.status).toBe(404);
    });

    test("Return 200 and updated user for successful request", async () => {
      const response = await request
        .put(`${endpoint}/${sample._id}`)
        .send({
          name: "Superman",
        })
      expect(response.status).toBe(200);
    });

    afterAll(async () => {
      await characters.delete(sample._id);
    });
  });

  describe(`Test DELETE ${endpoint}/:id`, () => {
    let sample;

    beforeAll(async () => {
      sample = await characters.create({
        name: "Batman",
        gender: "male",
      });
    });

    test("Return 404 for invalid ID", async () => {
      const id = mongoose.Types.ObjectId().toString();
      const response = await request
        .delete(`${endpoint}/${id}`)
      expect(response.status).toBe(404);
    });

    test("Return 200 for successful request", async () => {
      const response = await request
        .delete(`${endpoint}/${sample._id}`)
      expect(response.status).toBe(200);
    });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });
});