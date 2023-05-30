import { app } from "../../server";
import supertest from "supertest";
import { OrderStore } from "../order";
import { ProductStore } from "../product";
import { UserStore } from "../user";

const store = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();
const request = supertest(app);

describe("Order Model", () => {
  it("create method should add a order", async () => {
    const user = await userStore.create({
      firstName: "Nguyen",
      lastName: "Thang",
      userName: "thangnguyen",
      password: "aaaa",
    });
    expect(Object.values(user)).toContain("thangnguyen");

    const product = await productStore.create({
      name: "Bridge to Terabithia",
      price: 250,
      category: "Katherine Paterson",
    });
    expect(product).toEqual({
      id: 1,
      name: "Bridge to Terabithia",
      price: 250,
      category: "Katherine Paterson",
    });

    const result = await store.create({
      user_id: "1",
      product_id: 1,
      quantity: 25,
      orderstatus: "complete",
    });
    expect(result.id).toEqual(1);
  });

  it("currentOrderByUser method should return the correct current Order by user", async () => {
    const result = await store.currentOrderByUser("1");
    expect(result.length).toEqual(1);
  });

  it("completedOrderByUser method should return the correct Completed Orders by user", async () => {
    const result = await store.completedOrderByUser("1");
    expect(result[0].id).toEqual(1);
  });
});

describe("testing order endpoints", () => {
  let token: string;

  beforeAll(async () => {
    const userRequest = await request
      .post("/users/logIn")
      .send({ userName: "thangnguyen", password: "aaaa" })
      // to get response in JSON
      .set("Accept", "application/json");

    token = userRequest.body;
  });

  it("Add new Order endpoint: /orders [POST] ", async () => {
    const response = await request
      .post("/orders")
      .send({
        user_id: "1",
        product_id: 1,
        quantity: 25,
        orderstatus: "complete",
      })
      .set(`Authorization`, `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("ORDER by USER endpoint: /orders/:userId [GET] ", async () => {
    const response = await request
      .get("/orders/1")
      .set(`Authorization`, `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it("COMPLETED ORDER BY USER endpoint: /orders/complete/:userId [GET] ", async () => {
    const response = await request
      .get("/orders/complete/1")
      .set(`Authorization`, `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it("fails COMPLETED ORDER BY USER endpoint: /orders/complete/:userId [GET] ", async () => {
    token = token + "ghda";
    const response = await request.get("/orders/complete/2");
    expect(response.status).toBe(401);
  });
});
