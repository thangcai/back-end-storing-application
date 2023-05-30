import { OrderStore } from "../order";
import { ProductStore } from "../product";
import { UserStore } from "../user";

const store = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

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
