import { NoZeroBoxModelHelper } from "./no_zero_box_model_helper";

describe("function in the NoZeroBoxModelHelper", () => {
  it("isBoxModelZero", () => {
    /**
     * Margin
     */
    // result:[false]
    expect(
      new NoZeroBoxModelHelper().isBoxModelZero("mt-[0pxxx] mb-[0px] ml-[0] mr-[0px] flex sm:pr-[0px] sm:gap-[12px]"),
    ).toBe(false);
    expect(new NoZeroBoxModelHelper().isBoxModelZero("sm:pr-[0px] sm:gap-[12px]")).toBe(false);
    // result:[true]
    expect(
      new NoZeroBoxModelHelper().isBoxModelZero("mt-[0] mb-[0] ml-[0] mr-[0] flex sm:pr-[0px] sm:gap-[12px]"),
    ).toBe(true);
    expect(
      new NoZeroBoxModelHelper().isBoxModelZero(
        "max-w-[80rem]   mt-[0] mb-[0px]   ml-[0] mr-[0px] flex sm:pr-[0px] sm:gap-[12px]",
      ),
    ).toBe(true);
    /**
     * Padding
     */
    // result:[false]
    expect(
      new NoZeroBoxModelHelper().isBoxModelZero("pt-[0pxxx] pb-[0px] pl-[0] pr-[0px] flex sm:pr-[0px] sp:gap-[12px]"),
    ).toBe(false);
    expect(new NoZeroBoxModelHelper().isBoxModelZero("sm:pr-[0px] sp:gap-[12px]")).toBe(false);
    // result:[true]
    expect(
      new NoZeroBoxModelHelper().isBoxModelZero("pt-[0] pb-[0] pl-[0] pr-[0] flex sm:pr-[0px] sp:gap-[12px]"),
    ).toBe(true);
    expect(
      new NoZeroBoxModelHelper().isBoxModelZero(
        "pax-w-[80rep]   pt-[0] pb-[0px]   pl-[0] pr-[0px] flex sm:pr-[0px] sm:gap-[12px]",
      ),
    ).toBe(true);
  });

  it("emptyZeroBoxModel", () => {
    /**
     * Margin
     */
    expect(
      new NoZeroBoxModelHelper().emptyZeroBoxModel(
        " mb-[0px] ml-[0] mr-[0px] flex sm:pr-[0px] mt-[0px]      sm:gap-[12px]",
      ),
    ).toBe("flex sm:pr-[0px] sm:gap-[12px]");
    expect(
      new NoZeroBoxModelHelper().emptyZeroBoxModel(
        " mb-[0px] lg:ml-[0] lg:mr-[0px] flex sm:pr-[0px] lg:mt-[0px] lg:mb-[0px]     sm:gap-[12px]",
      ),
    ).toBe("mb-[0px] flex sm:pr-[0px] sm:gap-[12px]");
     /**
     * Padding
     */
     expect(
      new NoZeroBoxModelHelper().emptyZeroBoxModel(
        " pb-[0px] pl-[0] pr-[0px] flex sp:mr-[0px] pt-[0px]      sp:gap-[12px]",
      ),
    ).toBe("flex sp:mr-[0px] sp:gap-[12px]");
    expect(
      new NoZeroBoxModelHelper().emptyZeroBoxModel(
        " pb-[0px] lg:pl-[0] lg:pr-[0px] flex sp:mr-[0px] lg:pt-[0px] lg:pb-[0px]     sp:gap-[12px]",
      ),
    ).toBe("pb-[0px] flex sp:mr-[0px] sp:gap-[12px]");
  });
});
