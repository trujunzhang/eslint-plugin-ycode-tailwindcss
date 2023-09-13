import { ClassNameHelper, IClassNameItem } from "./classname_helper";
import { ArrayHelper } from "../array";

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
      matchArray.push({
        replace: firstObject.className,
        merge:
          ClassNameHelper.getOriginalClassNameKey(classNameKey) +
          // (classNameKey === ClassNameHelper.defaultClassNameKey ? "" : classNameKey + ":") +
          (boxModelType + key + "-" + firstSuffix),
        remove: endObject.className,
      });
    }
    return matchArray;
  }

  needMergeBoxModelZero(className: string) {
    const instance = new ClassNameHelper();
    const dict = instance.parse(className).end();
    for (let i = 0; i < Object.keys(dict).length; i++) {
      const classNameKey = Object.keys(dict)[i];
      const classNameObjects = instance.getClassNameObjects(classNameKey);
      if (this.checkBoxModelMerge(classNameKey, classNameObjects, "m").length !== 0) {
        return true;
      } else if (this.checkBoxModelMerge(classNameKey, classNameObjects, "p").length !== 0) {
        return true;
      }
    }
    return false;
  }

  private replaceZeroBoxModel(parts: string[], matchItem: MatchItem) {
    const nextParts = ArrayHelper.change(parts, matchItem.replace, matchItem.merge);
    return ArrayHelper.remove(nextParts, matchItem.remove);
  }

  mergeZeroBoxModel(className: string) {
    const instance = new ClassNameHelper();
    const parts = instance.split(className);
    const dict = instance.parse(className).end();

    let allMatchArray: MatchItem[] = [];
    for (let i = 0; i < Object.keys(dict).length; i++) {
      const classNameKey = Object.keys(dict)[i];
      const classNameObjects = instance.getClassNameObjects(classNameKey);

      // const xxx = this.checkBoxModelMerge(classNameKey, classNameObjects, "m");
      // const yyy = this.checkBoxModelMerge(classNameKey, classNameObjects, "p");

      let matchArray = ArrayHelper.merge(
        this.checkBoxModelMerge(classNameKey, classNameObjects, "m"),
        this.checkBoxModelMerge(classNameKey, classNameObjects, "p"),
      );
      allMatchArray = ArrayHelper.merge(allMatchArray, matchArray);
    }

    let mergeZeroParts = parts;
    allMatchArray.forEach((item, index) => {
      mergeZeroParts = this.replaceZeroBoxModel(mergeZeroParts, item);
    });
    return instance.toClassName(mergeZeroParts);
  }
}
