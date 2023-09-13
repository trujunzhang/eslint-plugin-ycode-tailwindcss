"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateColorDict = exports.defaultColorDict = void 0;
exports.defaultColorDict = {
    "#ffffff": "white",
    "#000000": "black",
};
function generateColorDict(colors) {
    const colorNames = {};
    Object.keys(colors).map(key => {
        const color = colors[key];
        if (color && typeof color === "object") {
            Object.keys(color).map(subKey => {
                const subColor = color[subKey];
                colorNames[subColor] = key + "-" + subKey;
            });
        }
        else {
            colorNames[color] = key;
        }
    });
    return Object.assign({}, exports.defaultColorDict, colorNames);
}
exports.generateColorDict = generateColorDict;
//# sourceMappingURL=tailwind_helper.js.map