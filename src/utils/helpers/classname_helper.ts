import { StringHelper } from "../string";

export const screenBreakingTags: Record<string, string> = {
  default: "",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  "2xl": "2xl",
};

type ScreenBreakingTag = "default" | "sm" | "md" | "lg" | "xl" | "2xl";

export type IClassNameItem = {
  className: string;
  value: string;
  prefix: string;
  suffix: string;
};

export class ClassNameHelper {
  dict: Record<ScreenBreakingTag, IClassNameItem[]> = {
    default: [],
    sm: [],
    md: [],
    lg: [],
    xl: [],
    "2xl": [],
  };

  parse(className: string) {
    const parts = StringHelper.replaceAll(className, "  ", " ").split(" ");

    parts.forEach((part: string) => {
      if (part === "") return;
      const split = part.split(":");
      const tag = split.length == 1 ? "default" : split[0];
      // split value
      const value = split.length > 1 ? split[1] : part;
      const valueSplit = value.split("-");
      const prefix = valueSplit.length === 3 ? [valueSplit[0], valueSplit[1]].join("-") : valueSplit[0];
      const suffix = valueSplit.length > 0 ? valueSplit[valueSplit.length - 1] : "empty";
      const array = this.dict[tag];
      if (array !== undefined) {
        array.push({
          className: part,
          value,
          prefix,
          suffix,
        });
      }
    });

    return this;
  }

  getClassNameObjects(tag: string): Record<string, IClassNameItem> {
    const array: IClassNameItem[] = this.dict[tag];
    const object: Record<string, IClassNameItem> = {};
    array.forEach(item => {
      object[item.prefix] = item;
    });

    return object;
  }

  end() {
    return this.dict;
  }
}
