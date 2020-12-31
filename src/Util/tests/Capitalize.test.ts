/**
 * Created by andreaskarantzas on 27.12.20.
 */

import { Capitalize } from "../Capitalize";

describe("Capitalize", () => {
  it("returns Test when param is test", () => {
    let string = Capitalize("test");

    expect(string).toEqual("Test");
  });

  it("returns an empty string when param is undefined", () => {
    let string = Capitalize(undefined);

    expect(string).toEqual("");
  });

  it("returns an empty truncated string when param is an empty truncated string", () => {
    let string = Capitalize("");

    expect(string).toEqual("");
  });

  it("returns an empty un-truncated string when param is an empty string un-truncated", () => {
    let string = Capitalize(" ");

    expect(string).toEqual(" ");
  });

  it("returns Test when param is Test", () => {
    let string = Capitalize("Test 123");

    expect(string).toEqual("Test 123");
  });
});
