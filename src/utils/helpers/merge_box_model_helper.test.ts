import { MergeBoxModelHelper } from "./merge_box_model_helper";

describe("MergeBoxModelHelper", () => {
  it("needMergeBoxModelZero", () => {
    /**
     * Margin
     */
    // result:[false]
    // expect(
    //   new MergeBoxModelHelper().needMergeBoxModelZero("mt-[0pxxx] mb-[0px] ml-[12px] mr-[2px] flex sm:pr-[0px] sm:gap-[12px]"),
    // ).toBe(false);
    // expect(new NoZeroBoxModelHelper().isBoxModelZero("sm:pr-[0px] sm:gap-[12px]")).toBe(false);
    // result:[true]
    expect(
      // new MergeBoxModelHelper().needMergeBoxModelZero("mt-[0pxxx] mb-[0px] lg:ml-[12px] lg:mr-[12px] flex sm:pr-[0px] sm:gap-[12px]"),
      // new MergeBoxModelHelper().needMergeBoxModelZero("lg:ml-[12px] lg:mr-[12px]"),
      // new MergeBoxModelHelper().needMergeBoxModelZero("ml-[24px] mr-[24px] lg:mt-[12px] lg:mr-[12px]"),
      new MergeBoxModelHelper().needMergeBoxModelZero("ml-[24px] mr-[24px]"),
    ).toBe(false);
  });
});
