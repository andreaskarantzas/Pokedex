/**
 * Created by andreaskarantzas on 27.12.20.
 */

import { getColorValueByKey } from "../Colors";

describe("Colors", () => {
  it("returns hex value when param is a valid Color", () => {
    let string = getColorValueByKey("dragon");

    expect(string).toEqual("#027dc7");
  });

  it("returns a transparent Color when param is an invalid Color", () => {
    let string = getColorValueByKey("invalidColor");

    expect(string).toEqual("transparent");
  });
});
