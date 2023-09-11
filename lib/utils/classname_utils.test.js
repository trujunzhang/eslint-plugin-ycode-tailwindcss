"use strict";
const { checkColorAndSizeClassNames, getOriginalTWClassNames } = require('./classname_utils');
describe('checkColorAndSizeClassNames', () => {
    it('sizes', () => {
        expect(checkColorAndSizeClassNames('text-base font-semibold')).toBe(false);
        // "48px": "5xl",
        expect(checkColorAndSizeClassNames('text-[48px] font-semibold')).toBe(true);
    });
    it('colors', () => {
        expect(checkColorAndSizeClassNames('bg-[#ff0000] h-[50px]')).toBe(false);
        // "#e879f9": "fuchsia-400",
        expect(checkColorAndSizeClassNames('bg-[#e879f9] h-[50px]')).toBe(true);
    });
    it('rounded', () => {
        expect(checkColorAndSizeClassNames('rounded-[9999px] border-dashed')).toBe(true);
        expect(checkColorAndSizeClassNames('rounded-tl-[2px] rounded-[9999px] border-dashed')).toBe(true);
        expect(checkColorAndSizeClassNames('rounded-tr-[2px] rounded-[9999px] border-dashed')).toBe(true);
        expect(checkColorAndSizeClassNames('rounded-br-[2px] rounded-[9999px] border-dashed')).toBe(true);
        expect(checkColorAndSizeClassNames('rounded-bl-[2px] rounded-[9999px] border-dashed')).toBe(true);
    });
    it('border', () => {
        expect(checkColorAndSizeClassNames('border-[4px] border-dashed')).toBe(true);
        expect(checkColorAndSizeClassNames('border-t-[2px] border-[1px] border-dashed')).toBe(true);
        expect(checkColorAndSizeClassNames('border-r-[2px] border-[2px] border-dashed')).toBe(true);
        expect(checkColorAndSizeClassNames('border-b-[2px] border-[4px] border-dashed')).toBe(true);
        expect(checkColorAndSizeClassNames('border-l-[2px] border-[8px] border-dashed')).toBe(true);
    });
});
describe('getOriginalTWClassNames', () => {
    it('sizes', () => {
        // "#e879f9": "fuchsia-400",
        expect(getOriginalTWClassNames('bg-[#e879f9] h-[50px]')).toBe('bg-fuchsia-400 h-[50px]');
        expect(getOriginalTWClassNames('bg-[#e2e8f0] bg-[#f5f5f5] h-[50px]')).toBe('bg-slate-200 bg-neutral-100 h-[50px]');
    });
    it('colors', () => {
        // "48px": "5xl",
        expect(getOriginalTWClassNames('text-[48px] font-semibold')).toBe('text-5xl font-semibold');
        // "128px": "9xl",
        expect(getOriginalTWClassNames('text-[128px] font-semibold')).toBe('text-9xl font-semibold');
        expect(getOriginalTWClassNames('text-[48px] text-[128px] font-semibold')).toBe('text-5xl text-9xl font-semibold');
    });
    it('sizes and colors', () => {
        // all
        expect(getOriginalTWClassNames('bg-[#e879f9] text-[48px] h-[50px]')).toBe('bg-fuchsia-400 text-5xl h-[50px]');
        expect(getOriginalTWClassNames('bg-[#e879f9] h-[50px] text-[48px]')).toBe('bg-fuchsia-400 h-[50px] text-5xl');
        expect(getOriginalTWClassNames('bg-[#e879f9] text-[128px] h-[50px]')).toBe('bg-fuchsia-400 text-9xl h-[50px]');
    });
    it('rounded', () => {
        expect(getOriginalTWClassNames('rounded-tl-[2px] rounded-[9999px] border-dashed')).toBe('rounded-tl-sm rounded-full border-dashed');
        expect(getOriginalTWClassNames('rounded-tl-[2px] rounded-tr-[2px] rounded-bl-[2px] rounded-br-[2px] rounded-[9999px] border-dashed'))
            .toBe('rounded-tl-sm rounded-tr-sm rounded-bl-sm rounded-br-sm rounded-full border-dashed');
    });
    it('border', () => {
        expect(getOriginalTWClassNames('border-t-[2px] border-[4px] border-[0px] border-[1px] border-dashed'))
            .toBe('border-t-2 border-4 border-0 border border-dashed');
        expect(getOriginalTWClassNames('border-t-[2px] border-r-[1px] border-b-[8px] border-l-[0px] border-[8px] border-dashed'))
            .toBe('border-t-2 border-r border-b-8 border-l-0 border-8 border-dashed');
    });
});
{ /* <div class="bg-[#ef4444]
// h-[50px] w-[200px] rounded-[9999px]
// border-dashed border-[#b91c1c]
// rounded-tl-[2px] rounded-tr-[6px] rounded-br-[8px] rounded-bl-[12px]
// border-[4px] border-r-[8px] border-l-[1px]"></div> */
}
//# sourceMappingURL=classname_utils.test.js.map