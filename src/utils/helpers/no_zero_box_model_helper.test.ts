import { NoZeroBoxModelHelper } from "./no_zero_box_model_helper";

describe("function in the NoZeroBoxModelHelper", () => {
  it("isBoxModelZero", () => {
    const marginEmpty = "mt-[0] mb-[0] ml-[0] mr-[0] flex sm:pr-[0px] sm:gap-[12px]";
    // const paddingEmpty =
    // "max-w-[80rem] pt-[0] pb-[0] md:pr-[24px] md:pl-[24px] mr-[0px] flex gap-[24px] items-center pr-[0px] pl-[0px] sm:pr-[0px] sm:gap-[12px]";
    // const paddingEmptyxxx =
    // "max-w-[80rem] pt-[0] pb-[0] md:pr-[24px] md:pl-[24px] mr-[0px] flex gap-[24px] items-center pr-[0px] pl-[0px] sm:pr-[0px] sm:gap-[12px]";

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
});
