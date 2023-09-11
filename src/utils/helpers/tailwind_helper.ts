export const defaultColorDict: Record<string, string> = {
  "#ffffff": "white",
  "#000000": "black",
};

export function generateColorDict(colors: Record<string, string| object>): Record<string, string> {
  const colorNames: Record<string, string> = {};
  Object.keys(colors).map(key => {
    const color = colors[key];
    if (color && typeof color === "object") {
      Object.keys(color).map(subKey => {
        const subColor = color[subKey];
        colorNames[subColor] = key + "-" + subKey;
      });
    } else {
      colorNames[color] = key;
    }
  });
  return Object.assign({}, defaultColorDict, colorNames);
}

