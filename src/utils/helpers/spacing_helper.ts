import { spacing } from "../spacing_dict";
import { ClassNameHelper, IClassNameItem, ScreenBreakingTag } from "./classname_helper";
import { ArrayHelper } from "../array";

const boxDirections = [
  "mt",
  "mb",
  "ml",
  "mr", // margin
  "pt",
  "pb",
  "pl",
  "pr", // padding
  "m", // margin-all
  "p", // padding-all
  "mx",
  "my", // margin-between
  "px",
  "py", // padding-between
  "w",
  "h",
  "gap",
  "space-x",
  "space-y"
];

export class SpacingHelper {
  private checkSpacing(classNameKey: string, classNameArray: IClassNameItem[]) {
    const matchArray: IClassNameItem[] = [];
    for (let i = 0; i < classNameArray.length; i++) {
      const classNameItem = classNameArray[i];
      const prefix = classNameItem.prefix; // like "mt","px"
      const suffix = classNameItem.suffix; // like "[24px]"
      if (boxDirections.includes(prefix) && Object.keys(spacing).includes(suffix)) {
        matchArray.push(classNameItem);
      }
    }

    return matchArray;
  }

  check(className: string) {
    const instance = new ClassNameHelper();
    const dict: Record<ScreenBreakingTag, IClassNameItem[]> = instance.parse(className).end();
    for (let i = 0; i < Object.keys(dict).length; i++) {
      const classNameKey = Object.keys(dict)[i];
      const classNameArray = dict[classNameKey];
      if (this.checkSpacing(classNameKey, classNameArray).length !== 0) {
        return true;
      }
    }

    return false;
  }

  private replaceSpacing(parts: string[], classNameKey: string, item: IClassNameItem) {
    const oldItem = item.className;
    const newItem = ClassNameHelper.getOriginalClassNameKey(classNameKey) + item.prefix + "-" + spacing[item.suffix];
    // debugger;
    return ArrayHelper.change(parts, oldItem, newItem);
  }

  fix(className: string) {
    const instance = new ClassNameHelper();
    const parts = instance.split(className);
    const dict = instance.parse(className).end();

    let mergeZeroParts = parts;
    for (let i = 0; i < Object.keys(dict).length; i++) {
      const classNameKey = Object.keys(dict)[i];
      const classNameArray = dict[classNameKey];

      let matchArray = this.checkSpacing(classNameKey, classNameArray);
      matchArray.forEach((item, index) => {
        mergeZeroParts = this.replaceSpacing(mergeZeroParts, classNameKey, item);
      });
    }
    return instance.toClassName(mergeZeroParts);
  }
}
