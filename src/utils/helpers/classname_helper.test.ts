import { ClassNameHelper } from "./classname_helper";

describe("description", () => {
  it("test", () => {
    const className = "  max-w-[80rem]    px-[12px]      lg:mr-[24px] lg:ml-[24px] lg:mt-[24px]  lg:mb-[24px]";
    const dict= new ClassNameHelper().parse(className).end();
    expect( dict["default"].length).toBe(2);
    expect( dict["lg"].length).toBe(4);
  });
});
