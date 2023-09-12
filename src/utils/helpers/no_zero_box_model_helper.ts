import { ClassNameHelper, IClassNameItem } from "./classname_helper";

// const boxModels = {
//   margin: ["mt-[0]", "mb-[0]", "ml-[0]", "mr-[0]"],
//   padding: ["pt-[0]", "pb-[0]", "pl-[0]", "pr-[0]"],
// };

const boxDirections = ["t", "r", "b", "l"];

export class NoZeroBoxModelHelper {
  private checkBoxModelZero(classNameObjects: Record<string, IClassNameItem>, boxModelType: "m" | "p") {
    const matchDict: string[] = [];
    for (let i = 0; i < boxDirections.length; i++) {
      const direction = boxDirections[i];
      const tag = boxModelType + direction;
      const object = classNameObjects[tag];
      if (object === undefined) {
        break;
      }
      const suffix = object.suffix;
      if (["[0px]", "[0]"].indexOf(suffix) === -1) {
        break;
      }
      matchDict.push(object.value);
    }
    if (matchDict.length === 4) {
      debugger;
    }
    return matchDict;
  }

  isBoxModelZero(className: string) {
    const instance = new ClassNameHelper();
    const dict = instance.parse(className).end();
    for (let i = 0; i < Object.keys(dict).length; i++) {
      const key = Object.keys(dict)[i];
      const array = dict[key];
      const classNameObjects = instance.getClassNameObjects(key);
      if (this.checkBoxModelZero(classNameObjects, "m").length === 4) {
        return true;
      } else if (this.checkBoxModelZero(classNameObjects, "p").length === 4) {
        return true;
      }
    }
    return false;
  }

  emptyZeroBoxModel(className: string) {
    const instance = new ClassNameHelper();
    const dict = instance.parse(className).end();
    for (let i = 0; i < Object.keys(dict).length; i++) {
      const key = Object.keys(dict)[i];
      const array = dict[key];
      const classNameObjects = instance.getClassNameObjects(key);
      if (this.checkBoxModelZero(classNameObjects, "m").length === 4) {
        return true;
      } else if (this.checkBoxModelZero(classNameObjects, "p").length === 4) {
        return true;
      }
    }
  }
}
