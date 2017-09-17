/**
 * Root view
 *
 * (c) 2017, CUBE Team
 * All rights reserved.
 */

import jsxHelper from "./jsx-helper";

declare type AnyFunction = (...args: any[]) => any;

const mockCreateElement = (x: string | AnyFunction, y: any, ...z: any[]) => y;

const h = jsxHelper(mockCreateElement as any);

describe("jsxHelper", () => {
  it("Will handle the usual HTML attributes as HTML attributes", () => {
    expect(h("div", {"data-index": 12, "contenteditable": true})).toEqual({
      attrs: {
        "contenteditable": true,
        "data-index": 12,
      },
    });
  });

  it("Will ignore invalid attributes", () => {
    expect(h("div", {href: "#foo"})).toEqual({});
    expect(h("blockquote", {href: "#foo"})).toEqual({});
    expect(h("a", {href: "#foo"})).toEqual({attrs: {href: "#foo"}});
  });

  it("Will pass simple options through as is", () => {
    // HTML
    expect(h("b", {class: "foo"})).toEqual({class: "foo"});
    expect(h("b", {key: "foo"})).toEqual({key: "foo"});
    expect(h("b", {ref: "foo"})).toEqual({ref: "foo"});
    expect(h("b", {slot: "foo"})).toEqual({slot: "foo"});
    expect(h("b", {directives: [1, 2]})).toEqual({directives: [1, 2]});
    expect(h("b", {style: {background: "blue"}})).toEqual({style: {background: "blue"}});

    // Components
    const comp = jest.fn();
    expect(h(comp, {key: "foo"})).toEqual({key: "foo"});
    expect(h(comp, {ref: "foo"})).toEqual({ref: "foo"});
    expect(h(comp, {slot: "foo"})).toEqual({slot: "foo"});
    expect(h(comp, {directives: [1, 2]})).toEqual({directives: [1, 2]});
    expect(h(comp, {props: {foo: "bar"}})).toEqual({props: {foo: "bar"}});
  });

  it("Will treat any attributes that being with 'on' as event handler", () => {
    const handler = () => false;
    expect(h("b", {onload: handler})).toEqual({
      on: {load: handler},
    });
  });

  it("Will treat any attrbute that begins with 'n-on' as native event handler", () => {
    const handler = jest.fn();
    expect(h("b", {"n-onload": handler})).toEqual({
      nativeOn: {load: handler},
    });
  });

  it("Will treat any non-passthrough attrib as a prop if component is passed", () => {
    const comp = jest.fn();
    expect(h(comp, {foo: 12})).toEqual({props: {foo: 12}});
  });

  it("Will treat attributes that start with 'slot-' as a scoped slot", () => {
    const slotFn = jest.fn();
    const comp = jest.fn();
    expect(h("b", {"slot-foo": slotFn})).toEqual({
      scopedSlots: {foo: slotFn},
    });
    expect(h(comp, {"slot-foo": slotFn})).toEqual({
      scopedSlots: {foo: slotFn},
    });
  });

  it("Will treat any unmatched attributes as DOM properties", () => {
    expect(h("b", {bogus: 12, innerHTML: "abc"})).toEqual({
      domProps: {
        bogus: 12,
        innerHTML: "abc",
      },
    });
  });

  it("Will return an empty options object if no attributes are supplied", () => {
    expect(h("b", null)).toEqual({});
  });

  it("Will catch any arguments following the second one, and pass it as children", () => {
    const altMockCE = (x: string, y: any, z: any[]) => z;
    const h1 = jsxHelper(altMockCE as any);
    expect(h1("b", null, "Foo", "bar", "baz")).toEqual(["Foo", "bar", "baz"]);
  });
});
