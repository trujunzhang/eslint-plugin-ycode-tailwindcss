export class StringHelper {
  static replaceAll = (string: string, search: string, replace: string) => {
    // return string.split(search).join(replace);
    return string.replaceAll(search, replace).replaceAll(search, replace).replaceAll(search, replace);
  };
}
