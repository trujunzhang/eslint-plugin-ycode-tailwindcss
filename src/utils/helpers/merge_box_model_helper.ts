import { ClassNameHelper, IClassNameItem } from "./classname_helper";
import { ArrayHelper } from "../array";
import { type } from "os";

const boxDirections = {
  y: ["t", "b"],
  x: ["l", "r"],
};

type MatchItem = {
  replace: string;
  merge: string;
  remove: string;
};

export class MergeBoxModelHelper {
  private checkBoxModelMerge(
    classNameKey: string,
    classNameObjects: Record<string, IClassNameItem>,
    boxModelType: "m" | "p",
  ) {
    const matchArray: MatchItem[] = [];
    const keys = Object.keys(boxDirections);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      const firstTag = boxModelType + boxDirections[key][0];
      const endTag = boxModelType + boxDirections[key][1];
      const firstObject = classNameObjects[firstTag];
      const endObject = classNameObjects[endTag];
      if (firstObject === undefined || endObject === undefined) {
        continue;
      }
      const firstSuffix = firstObject.suffix;
      const endSuffix = endObject.suffix;
      if (firstSuffix !== endSuffix) {
        continue;
      }
      //   debugger;
      matchArray.push({
        replace: firstObject.className,
        merge:
          (classNameKey === ClassNameHelper.defaultClassNameKey ? "" : classNameKey + ":") +
          boxModelType +
          key +
          "-" +
          firstSuffix,
        remove: endObject.className,
      });
    }
    // debugger;
    return matchArray;
  }

  needMergeBoxModelZero(className: string) {
    const instance = new ClassNameHelper();
    const dict = instance.parse(className).end();
    for (let i = 0; i < Object.keys(dict).length; i++) {
      const classNameKey = Object.keys(dict)[i];
      const classNameObjects = instance.getClassNameObjects(classNameKey);
      if (this.checkBoxModelMerge(classNameKey, classNameObjects, "m").length === 4) {
        return true;
      }
      //    else if (this.checkBoxModelMerge(classNameObjects, "p").length === 4) {
      // return true;
      //   }
    }
    return false;
  }
}
