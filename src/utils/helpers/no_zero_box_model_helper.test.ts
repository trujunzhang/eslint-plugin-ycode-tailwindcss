import { NoZeroBoxModelHelper } from "./no_zero_box_model_helper";

describe("description", () => {
  it("test", () => {
    const marginEmpty =
      "mt-[0] mb-[0] ml-[0] mr-[0] flex sm:pr-[0px] sm:gap-[12px]";
    // const paddingEmpty =
      // "max-w-[80rem] pt-[0] pb-[0] md:pr-[24px] md:pl-[24px] mr-[0px] flex gap-[24px] items-center pr-[0px] pl-[0px] sm:pr-[0px] sm:gap-[12px]";
    // const paddingEmptyxxx =
      // "max-w-[80rem] pt-[0] pb-[0] md:pr-[24px] md:pl-[24px] mr-[0px] flex gap-[24px] items-center pr-[0px] pl-[0px] sm:pr-[0px] sm:gap-[12px]";

    expect(new NoZeroBoxModelHelper().isBoxModelZero(marginEmpty)).toBe(true);
  });
});
