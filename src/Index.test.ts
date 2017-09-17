import Index from ".";
import store from "./store";

describe("Index", () => {
  it("Should render Hello world without an exception", () => {
    const i = new Index({store});
    i.$mount();
    expect(i.$el).toMatchSnapshot();
  });
});
