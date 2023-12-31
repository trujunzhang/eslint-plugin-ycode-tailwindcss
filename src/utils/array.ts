export class ArrayHelper {
  static merge(arr1: any[], arr2: any[]) {
    return arr1.concat(arr2);
  }
  static remove(arr: any[], item: any) {
    return arr.filter(i => i !== item);
  }
  static removeAll(arr: any[], items: any[]) {
    let nextArray = arr;
    items.forEach(item => {
      nextArray = ArrayHelper.remove(nextArray, item);
    });
    return nextArray;
  }

  static change(arr: any[], item: any, newItem: any) {
    return arr.map(i => (i === item ? newItem : i));
  }
}
