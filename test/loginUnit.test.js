const jwt = require("jsonwebtoken");
// const { SECRET_KEY } = process.env;
const { login } = require("../controllers/auth");
const { User } = require("../models/user");
// const { HttpError } = require("../../helpers");

describe("Login", () => {
  describe("SignUp Controller Test", () => {
    it("should return status and token", async () => {
      // test
    });
  });
});

// test("login user", async () => {
// const req = {
//   body: {
//     email: "user1@mail.com",
//     password: "123456",
//   },
// };
//   // ??????
//   // const res = {
//   //   status: jest.fn().mockReturnThis(),
//   //   json: jest.fn((data) => data),
//   // };
//   login = jest.fn(() => {
//     return {
//       Status: 200,
//       ResponseBody: {
//         token: "test-jwt-token",
//         user: {
//           email,
//           subscription,
//         },
//       },
//     };
//   });

//   const result = await login(req, res);

//   expect(result.status).toBe(200);
//   expect(result.ResponseBody.token).toBe("test-jwt-token");
// });
