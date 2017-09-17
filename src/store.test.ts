import store from "./store";

import req, {mock} from "./__mocks__/xhr";

describe("store", () => {
  it("Should have a name", () => {
    expect(store.state.name).toBe("Wallaby");
  });

  it("Should be able to update the store", () => {
    store.commit("update", "New name");
    expect(store.state.name).toBe("New name");
  });

  it("Should be able to update the name async", async () => {
    mock("Foo");
    await store.dispatch("updateAsync", "Async name");
    expect(req).toHaveBeenCalledWith("Async name");
    expect(store.state.name).toBe("Foo");
  });
});
