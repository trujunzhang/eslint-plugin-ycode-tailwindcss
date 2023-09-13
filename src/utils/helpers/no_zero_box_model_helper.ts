import { ClassNameHelper, IClassNameItem } from "./classname_helper";
import { ArrayHelper } from "../array";

// const boxModels = {
//   margin: ["mt-[0]", "mb-[0]", "ml-[0]", "mr-[0]"],
//   padding: ["pt-[0]", "pb-[0]", "pl-[0]", "pr-[0]"],
// };

const boxDirections = ["t", "b", "l", "r"];

export class NoZeroBoxModelHelper {
  private checkBoxModelZero(classNameObjects: Record<string, IClassNameItem>, boxModelType: "m" | "p") {
    const matchArray: string[] = [];
    for (let i = 0; i < boxDirections.length; i++) {
      const tag = boxModelType + boxDirections[i];
      const object = classNameObjects[tag];
      if (object === undefined) {
        break;
      }
      const suffix = object.suffix;
      if (["[0px]", "[0]"].indexOf(suffix) === -1) {
        break;
      }
      matchArray.push(object.className);
    }
    if (matchArray.length === 4) {
      // debugger;
    }
    return matchArray;
  }

  isBoxModelZero(className: string) {
    const instance = new ClassNameHelper();
    const dict = instance.parse(className).end();
    for (let i = 0; i < Object.keys(dict).length; i++) {
      const classNameKey = Object.keys(dict)[i];
      const classNameObjects = instance.getClassNameObjects(classNameKey);
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
    const parts = instance.split(className);
    const dict = instance.parse(className).end();

    let allMatchDict: string[] = [];
    for (let i = 0; i < Object.keys(dict).length; i++) {
      const classNameKey = Object.keys(dict)[i];
      const classNameObjects = instance.getClassNameObjects(classNameKey);

      // const xxx = this.checkBoxModelZero(classNameObjects, "m");
      // const yyy = this.checkBoxModelZero(classNameObjects, "p");

      let matchDict = ArrayHelper.merge(
        this.checkBoxModelZero(classNameObjects, "m"),
        this.checkBoxModelZero(classNameObjects, "p"),
      );
      allMatchDict = ArrayHelper.merge(allMatchDict, matchDict);
    }
    const emptyZeroParts = ArrayHelper.removeAll(parts, allMatchDict);
    return instance.toClassName(emptyZeroParts);
  }
}
