import { ClassNameHelper, IClassNameItem } from "./classname_helper";

const boxModels = {
  margin: ["mt-[0]", "mb-[0]", "ml-[0]", "mr-[0]"],
  padding: ["pt-[0]", "pb-[0]", "pl-[0]", "pr-[0]"],
};

export class NoZeroBoxModelHelper {
  checkBoxModelZero(classNameObjects: Record<string, IClassNameItem>) {

  }

  isBoxModelZero(className: string) {
    const instance = new ClassNameHelper();
    const dict = instance.parse(className).end;
    for (let i = 0; i < Object.keys(boxModels).length; i++) {
      const key = Object.keys(boxModels)[i];
      const array = dict[key];
      const classNameObjects = instance.getClassNameObjects(key);
    }
  }
}
