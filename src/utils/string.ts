export class StringHelper {
  static replaceAll = (string, search, replace) => {
    return string.split(search).join(replace);
  };
}
