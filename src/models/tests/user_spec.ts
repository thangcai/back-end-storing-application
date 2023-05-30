import { UserStore } from "../user";

const store = new UserStore();

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

    expect(result.length).toEqual(1);
  });
});
