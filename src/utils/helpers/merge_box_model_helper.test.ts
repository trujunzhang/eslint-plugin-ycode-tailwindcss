import { MergeBoxModelHelper } from "./merge_box_model_helper";

describe("MergeBoxModelHelper", () => {
  it("needMergeBoxModelZero", () => {
    /**
     * Margin
     */
    // result:[false]
    expect(
      new MergeBoxModelHelper().needMergeBoxModelZero(
        "mt-[0pxxx] mb-[0px] ml-[12px] mr-[2px] flex sm:mr-[12px] sm:gap-[12px]",
      ),
    ).toBe(false);
    expect(new MergeBoxModelHelper().needMergeBoxModelZero("sm:pr-[12px] pl-[12px]")).toBe(false);
    // result:[true]
    expect(
      new MergeBoxModelHelper().needMergeBoxModelZero(
        "mt-[0pxxx] mb-[0px] lg:ml-[12px] lg:mr-[12px] flex sm:pr-[0px] sm:gap-[12px]",
      ),
    ).toBe(true);
    expect(new MergeBoxModelHelper().needMergeBoxModelZero("ml-[24px] mr-[24px]")).toBe(true);
    expect(new MergeBoxModelHelper().needMergeBoxModelZero("ml-[24px] mr-[24px] lg:mt-[12px] lg:mr-[12px]")).toBe(true);
     /**
     * Padding
     */
    // result:[false]
    expect(
      new MergeBoxModelHelper().needMergeBoxModelZero(
        "pt-[0pxxx] pb-[0px] pl-[12px] pr-[2px] flex sp:pr-[12px] sp:gap-[12px]",
      ),
    ).toBe(false);
    expect(new MergeBoxModelHelper().needMergeBoxModelZero("sp:pr-[12px] pl-[12px]")).toBe(false);
    // result:[true]
    expect(
      new MergeBoxModelHelper().needMergeBoxModelZero(
        "pt-[0pxxx] pb-[0px] lg:pl-[12px] lg:pr-[12px] flex sp:pr-[0px] sp:gap-[12px]",
      ),
    ).toBe(true);
    expect(new MergeBoxModelHelper().needMergeBoxModelZero("pl-[24px] pr-[24px]")).toBe(true);
    expect(new MergeBoxModelHelper().needMergeBoxModelZero("lg:pl-[12px] lg:pr-[12px]")).toBe(true);
    expect(new MergeBoxModelHelper().needMergeBoxModelZero("pl-[24px] pr-[24px] lg:pt-[12px] lg:pr-[12px]")).toBe(true);
  });
  it("mergeZeroBoxModel", () => {
    /**
     * Margin
     */
    expect(new MergeBoxModelHelper().mergeZeroBoxModel("ml-[24px] sm:pr-[0px] mr-[24px] sm:gap-[12px]")).toBe(
      "mx-[24px] sm:pr-[0px] sm:gap-[12px]",
    );
    expect(
      new MergeBoxModelHelper().mergeZeroBoxModel("ml-[24px] mr-[124px] lg:mt-[12px] lg:mb-[12px] sm:gap-[12px]"),
    ).toBe("ml-[24px] mr-[124px] lg:my-[12px] sm:gap-[12px]");
    /**
     * Padding
     */
    expect(new MergeBoxModelHelper().mergeZeroBoxModel("pl-[24px] sp:pr-[0px] pr-[24px] sp:gap-[12px]")).toBe(
      "px-[24px] sp:pr-[0px] sp:gap-[12px]",
    );
    expect(
      new MergeBoxModelHelper().mergeZeroBoxModel("pl-[24px] pr-[124px] lg:pt-[12px] lg:pb-[12px] sp:gap-[12px]"),
    ).toBe("pl-[24px] pr-[124px] lg:py-[12px] sp:gap-[12px]");
  });
});
