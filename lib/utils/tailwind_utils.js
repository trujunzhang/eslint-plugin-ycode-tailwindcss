"use strict";
const tailwindConfig = require('../../../../tailwind.config');
const tailwindExtendColors = tailwindConfig.theme.extend.colors || [];
function mergeTailwindColors(colors) {
    return Object.assign(Object.assign({}, colors), tailwindExtendColors);
}
//# sourceMappingURL=tailwind_utils.js.map