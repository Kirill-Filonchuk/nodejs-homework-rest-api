const jwt = require("jsonwebtoken");
// const { SECRET_KEY } = process.env;
const { login } = require("../controllers/auth");
const { User } = require("../models/user");
const { HttpError } = require("../helpers");

const mockRequest = () => {
  return {
    body: {
      email: "user1@mail.com",
      password: "123456",
    },
  };
};

const mockResponse = () => {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
};

const mockUser = {
  _id: "63fbde733991de52e119b354",
  email: "user1@mail.com",
  subscription: "starter",
  avatarURL:
    "//www.gravatar.com/avatar/d019d8454a6c2ef22e95b4362db33968?size=250&d=…",
  verify: true,
  verificationToken: null,
  token: "test-jwt-token",
  password: "hashedPassword",
};

describe("SignUp Controller Test", () => {
  it("should return status and token", async () => {
    // Не заню як поступитися з HttpError - мабуть щоб він ігнорувався
    jest.mock(HttpError);

    jest.spyOn(jwt, "sign").mockResolvedValueOnce("test-jwt-token");
    jest.spyOn(User, "findByIdAndUpdate").mockResolvedValueOnce(mockUser);
    const mockReq = mockRequest();
    const mockRes = mockResponse();

    console.log(mockReq, "mockReq");
    console.log(mockRes, "mockRes");

    await login(mockReq, mockRes);
    toMatchObject({ name: "component name" });
    expect(mockRes.status).toBe(200);
    expect(mockRes.json.ResponseBody.token).toBe("test-jwt-token"); //toHavePropertyToken
    expect(mockRes.json.ResponseBody.user).toEqual({
      email: expect.any(String),
      subscription: expect.any(String),
    });
  });
});
