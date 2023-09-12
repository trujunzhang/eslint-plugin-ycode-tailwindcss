import { StringHelper } from "./string";

describe("checkColorAndSizeClassNames", () => {
  it("sizes", () => {
    expect(StringHelper.replaceAll("wh  123       345", "  ", " ")).toBe("wh 123 345");
  });
});
