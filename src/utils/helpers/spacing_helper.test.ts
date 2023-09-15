import { SpacingHelper } from "./spacing_helper";

describe("SpacingHelper", () => {
  it("check", () => {
    // false
    expect(new SpacingHelper().check("lg:max-w-[80rem] mt-[824px]")).toBe(false);
    // true
    expect(new SpacingHelper().check("lg:max-w-[80rem] mt-[24px]")).toBe(true);
    expect(new SpacingHelper().check("lg:max-w-[80rem] lg:m-[24px]")).toBe(true);
    expect(new SpacingHelper().check("lg:max-w-[80rem] xl:pt-[24px]")).toBe(true);
  });

  it("fix", () => {
    expect(new SpacingHelper().fix("lg:max-w-[80rem] lg:mt-[24px]")).toBe("lg:max-w-[80rem] lg:mt-6");
    expect(new SpacingHelper().fix("lg:max-w-[80rem] xl:mx-[24px]")).toBe("lg:max-w-[80rem] xl:mx-6");
    expect(new SpacingHelper().fix("lg:max-w-[80rem] m-[24px]")).toBe("lg:max-w-[80rem] m-6");
    expect(new SpacingHelper().fix("lg:max-w-[80rem] sm:m-[24px] m-[48px] lg:m-[48px]")).toBe(
      "lg:max-w-[80rem] sm:m-6 m-12 lg:m-12",
    );
  });
});
