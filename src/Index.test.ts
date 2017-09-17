import Index from ".";

describe("Index", () => {
  it("Should render Hello world without an exception", () => {
    const i = new Index();
    i.$mount();
    expect(i.$el).toMatchSnapshot();
  });
});
