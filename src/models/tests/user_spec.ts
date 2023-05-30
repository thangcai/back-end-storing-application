import { app } from "../../server";
import supertest from "supertest";
import { UserStore } from "../user";

const store = new UserStore();
const request = supertest(app);

describe("User Model", () => {
  it("create method should add a user", async () => {
    const result = await store.create({
      firstName: "Nguyen",
      lastName: "Thang1",
      userName: "thangnguyen1",
      password: "aaaa",
    });
    expect(Object.values(result)).toContain("thangnguyen1");
  });

  it("index method should return a list of users", async () => {
    const result = await store.index();
    expect(result.length).toEqual(2);
  });

  it("show method should return the correct user", async () => {
    const result = await store.show("2");
    expect(Object.values(result)).toContain("Thang1");
  });

  it("authenticate method should log in account successfully", async () => {
    const result = await store.authenticate("thangnguyen1", "aaaa");
    expect(result).toBeDefined();
  });

  it("delete method should remove the user", async () => {
    store.delete("2");
    const result = await store.index();

    expect(result.length).toEqual(2);
  });
});

describe("testing user endpoints", () => {
  let token: string;

  beforeAll(async () => {
    const userRequest = await request
      .post("/users/logIn")
      .send({ userName: "thangnguyen", password: "aaaa" })
      // to get response in JSON
      .set("Accept", "application/json");

    token = userRequest.body;
  });

  it("Add new user endpoint: /users [POST] ", async () => {
    const response = await request.post("/users").send({
      firstName: "Nguyen",
      lastName: "Thang2",
      userName: "thangnguyen2",
      password: "aaaa",
    });
    expect(response.status).toBe(200);
  });

  it("get all users endpoint: /users [GET] ", async () => {
    const response = await request
      .get("/users")
      .set(`Authorization`, `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("get user by id endpoint: /users/:id [GET] ", async () => {
    const response = await request
      .get("/users/3")
      .set(`Authorization`, `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("log in user successfully endpoint: /users/logIn [GET]", async () => {
    const response = await request
      .post("/users/logIn")
      .send({ userName: "thangnguyen2", password: "aaaa" });
    expect(response.status).toBe(200);
  });

  it("delete user by id endpoint: /users/:id [DELETE] ", async () => {
    const response = await request
      .delete("/users/3")
      .set(`Authorization`, `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("fails get all users endpoint: /users [GET] ", async () => {
    const response = await request.get("/users");
    expect(response.status).toBe(401);
  });
});
