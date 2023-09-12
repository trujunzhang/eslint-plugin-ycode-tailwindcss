import { ArrayHelper } from "./array";

describe("function in the ArrayHelper", () => {
  it("merge", () => {
    expect(ArrayHelper.merge([1, 2, 3], [4, 5, 6]).length).toBe(6);
    expect(ArrayHelper.merge([1, 2, 3], [4, 5, 6])[5]).toBe(6);
  });
  it("remove", () => {
    expect(ArrayHelper.remove([1, 2, 3], 1).length).toBe(2);
    expect(ArrayHelper.remove([1, 2, 3], 1)[0]).toBe(2);
    expect(ArrayHelper.remove([1, 2, 3], 1)[1]).toBe(3);
  });
  it("change", () => {
    expect(ArrayHelper.change([1, 2, 3], 1, 12).length).toBe(3);
    expect(ArrayHelper.change([1, 2, 3], 1, 12)[0]).toBe(12);
    expect(ArrayHelper.change([1, 2, 3], 1, 12)[1]).toBe(2);
    expect(ArrayHelper.change([1, 2, 3], 1, 12)[2]).toBe(3);
  });
  it("multiple change", () => {
    expect(ArrayHelper.change([1, 2, 3, 1], 1, 12).length).toBe(4);
    expect(ArrayHelper.change([1, 2, 3, 1], 1, 12)[0]).toBe(12);
    expect(ArrayHelper.change([1, 2, 3, 1], 1, 12)[1]).toBe(2);
    expect(ArrayHelper.change([1, 2, 3, 1], 1, 12)[2]).toBe(3);
    expect(ArrayHelper.change([1, 2, 3, 1], 1, 12)[3]).toBe(12);
  });
});
