// Work without  email confirm
require("dotenv").config();
const mongoose = require("mongoose");
const supertest = require("supertest");

const { DB_HOST_TEST } = process.env;
const app = require("../app");
const { User } = require("../models/user");

// eslint-disable-next-line no-undef
describe("login", () => {
  beforeAll(async () => {
    mongoose.set("strictQuery", true);
    await mongoose.connect(DB_HOST_TEST);
  });

  afterAll(async () => {
    await User.deleteMany();
    await mongoose.disconnect();
  });

  it("should register NewUser", async () => {
    const response = await supertest(app).post("/api/users/signup").send({
      email: "afa3@ukr.net",
      password: "123456",
    });

    expect(response.status).toEqual(201);
  });

  it("should login user, that present in DB - /login", async () => {
    const response = await supertest(app).post("/api/users/login").send({
      email: "afa3@ukr.net",
      password: "123456",
    });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      Status: 200,
      ResponseBody: {
        token: expect.any(String),

        user: {
          email: "afa3@ukr.net",
          subscription: expect.any(String),
        },
      },
    });
  });
});

// res.json({
//   Status: 200,
//   ResponseBody: {
//     token: token,
//     user: {
//       email: user.email,
//       subscription: user.subscription,
//     },
//   },
// });
