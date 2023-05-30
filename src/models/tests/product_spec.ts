import { app } from "../../server";
import supertest from "supertest";
import { ProductStore } from "../product";

const store = new ProductStore();
const request = supertest(app);

describe("Product Model", () => {
  it("create method should add a product", async () => {
    const result = await store.create({
      name: "Bridge to Terabithia 2",
      price: 250,
      category: "Katherine Paterson 2",
    });
    expect(result).toEqual({
      id: 2,
      name: "Bridge to Terabithia 2",
      price: 250,
      category: "Katherine Paterson 2",
    });
  });

  it("index method should return a list of products", async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        name: "Bridge to Terabithia",
        price: 250,
        category: "Katherine Paterson",
      },
      {
        id: 2,
        name: "Bridge to Terabithia 2",
        price: 250,
        category: "Katherine Paterson 2",
      },
    ]);
  });

  it("show method should return the correct product", async () => {
    const result = await store.show("2");
    expect(result).toEqual({
      id: 2,
      name: "Bridge to Terabithia 2",
      price: 250,
      category: "Katherine Paterson 2",
    });
  });

  it("productsByCategory method should return the correct product by category", async () => {
    const result = await store.productsByCategory("Katherine Paterson 2");
    expect(result).toEqual([
      {
        id: 2,
        name: "Bridge to Terabithia 2",
        price: 250,
        category: "Katherine Paterson 2",
      },
    ]);
  });

  it("delete method should remove the product", async () => {
    store.delete("2");
    const result = await store.index();

    expect(result.length).toEqual(1);
  });
});

describe("testing product endpoints", () => {
  let token: string;

  beforeAll(async () => {
    const userRequest = await request
      .post("/users/logIn")
      .send({ userName: "thangnguyen", password: "aaaa" })
      // to get response in JSON
      .set("Accept", "application/json");

    token = userRequest.body;
  });

  it("Add new Product endpoint: /products [POST] ", async () => {
    const response = await request
      .post("/products")
      .send({
        name: "Bridge to Terabithia 3",
        price: 250,
        category: "Katherine",
      })
      .set(`Authorization`, `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("get all products endpoint: /products [GET] ", async () => {
    const response = await request.get("/products");
    expect(response.status).toBe(200);
  });

  it("get product by id endpoint: /products/:id [GET] ", async () => {
    const response = await request.get("/products/3");
    expect(response.status).toBe(200);
  });

  it("get product by category endpoint: /products/category/:category [GET]", async () => {
    const response = await request.get("/products/category/Katherine");
    expect(response.status).toBe(200);
  });

  it("delete product by id endpoint: /products/:id [DELETE] ", async () => {
    const response = await request
      .delete("/products/3")
      .set(`Authorization`, `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("fails get product by id endpoint: /products [GET] ", async () => {
    token = token + "ghda";
    const response = await request
      .get("/products/aa")
      .set(`Authorization`, `Bearer ${token}`);
    expect(response.status).toBe(400);
  });
});
