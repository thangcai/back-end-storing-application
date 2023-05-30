import { ProductStore } from "../product";

const store = new ProductStore();

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
