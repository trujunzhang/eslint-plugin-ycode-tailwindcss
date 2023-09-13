import { borderPXDict, roundedDict, textDict, colorsDict } from "./sizes_colors_dict";
import { MergeBoxModelHelper } from "./helpers/merge_box_model_helper";
import { NoZeroBoxModelHelper } from "./helpers/no_zero_box_model_helper";

export function checkColorAndSizeClassNames(classNames: string, appColorDict: Record<string, string> = colorsDict) {
  /**
    |--------------------------------------------------
    | checking 'box model'
    |--------------------------------------------------
    */
  if (new NoZeroBoxModelHelper().isBoxModelZero(classNames)) {
    return true;
  } else if (new MergeBoxModelHelper().needMergeBoxModelZero(classNames)) {
    return true;
  }

  /**
    |--------------------------------------------------
    | checking 'color'
    |--------------------------------------------------
    */
  var regexColor = /#?([a-f0-9]{6}|[a-f0-9]{3})/gim;
  const colorMatch = classNames.match(regexColor) || [];
  for (let i = 0; i < colorMatch.length; i++) {
    const element = colorMatch[i];
    // const x = appColorDict[element]
    if (appColorDict[element]) {
      return true;
    }
  }
  /**
    |--------------------------------------------------
    | checking 'size'
    |--------------------------------------------------
    */
  var regexSize = /text-\[[0-9]*\.?[0-9]px\]/gim;
  const sizeMatch = classNames.match(regexSize) || [];
  for (let i = 0; i < sizeMatch.length; i++) {
    const element = sizeMatch[i];
    // const x = textDict[element]
    if (textDict[element]) {
      return true;
    }
  }
  /**
    |--------------------------------------------------
    | checking 'rounded'
    |--------------------------------------------------
    */
  var regexRounded = /(rounded|rounded-tl|rounded-tr|rounded-br|rounded-bl)-\[[0-9]*\.?[0-9]px\]/gim;
  const roundedMatch = classNames.match(regexRounded) || [];
  for (let i = 0; i < roundedMatch.length; i++) {
    const element = roundedMatch[i];
    // const x = roundedDict[element]
    if (roundedDict[element]) {
      return true;
    }
  }
  /**
    |--------------------------------------------------
    | checking 'border px'
    |--------------------------------------------------
    */
  var regexBorderPX = /(border|border-l|border-r|border-b|border-t)-\[[0-9]*\.?[0-9]px\]/gim;
  const borderPXMatch = classNames.match(regexBorderPX) || [];
  for (let i = 0; i < borderPXMatch.length; i++) {
    const element = borderPXMatch[i];
    // const x = borderPXDict[element]
    if (borderPXDict[element]) {
      return true;
    }
  }
  return false;
}

// checkColorAndSizeClassNames('bg-[#e2e8f0] bg-[#f5f5f5]')
// checkColorAndSizeClassNames('bg-[#ff0000]')
// checkColorAndSizeClassNames('text-[48px] text-[128px] font-semibold')
// checkColorAndSizeClassNames('rounded-[9999px] border-dashed')
// checkColorAndSizeClassNames('rounded-tl-[2px] rounded-[9999px] border-dashed')
// checkColorAndSizeClassNames('border-dashed border-[4px] border-r-[8px] border-l-[1px]')

export function getOriginalTWClassNames(classNames: string, appColorDict: Record<string, string> = colorsDict) {
  let match = classNames;
  /**
    |--------------------------------------------------
    | checking 'box model'
    |--------------------------------------------------
    */
  match = new NoZeroBoxModelHelper().emptyZeroBoxModel(match);
  match = new MergeBoxModelHelper().mergeZeroBoxModel(match);

  /**
    |--------------------------------------------------
    | checking 'color'
    |--------------------------------------------------
    */
  var regexColor = /#?([a-f0-9]{6}|[a-f0-9]{3})/gim;
  const colorMatch = classNames.match(regexColor) || [];
  colorMatch.forEach(element => {
    // const x = appColorDict[element]
    if (appColorDict[element]) {
      match = match.replaceAll(`[${element}]`, appColorDict[element]);
    }
  });
  /**
    |--------------------------------------------------
    | checking 'size'
    |--------------------------------------------------
    */
  var regexSize = /text-\[[0-9]*\.?[0-9]px\]/gim;
  const sizeMatch = classNames.match(regexSize) || [];
  sizeMatch.forEach(element => {
    // const x = textDict[element]
    if (textDict[element]) {
      match = match.replaceAll(element, `text-${textDict[element]}`);
    }
  });
  /**
    |--------------------------------------------------
    | checking 'rounded'
    |--------------------------------------------------
    */
  var regexRounded = /(rounded|rounded-tl|rounded-tr|rounded-br|rounded-bl)-\[[0-9]*\.?[0-9]px\]/gim;
  const roundedMatch = classNames.match(regexRounded) || [];
  roundedMatch.forEach(element => {
    // const x = roundedDict[element]
    if (roundedDict[element]) {
      match = match.replaceAll(element, `${roundedDict[element]}`);
    }
  });
  /**
    |--------------------------------------------------
    | checking 'border px'
    |--------------------------------------------------
    */
  var regexBorderPX = /(border|border-l|border-r|border-b|border-t)-\[[0-9]*\.?[0-9]px\]/gim;
  const borderPXMatch = classNames.match(regexBorderPX) || [];
  borderPXMatch.forEach(element => {
    const x = borderPXDict[element];
    if (borderPXDict[element]) {
      match = match.replaceAll(element, `${borderPXDict[element]}`);
    }
  });
  return match;
}

// getOriginalTWClassNames("bg-[#e879f9] text-[48px] h-[50px]")
// getOriginalTWClassNames("bg-[#e879f9] text-[128px] h-[50px]")
// getOriginalTWClassNames('rounded-tl-[2px] rounded-[9999px] border-dashed')
// getOriginalTWClassNames('border-dashed border-[4px] border-r-[8px] border-l-[1px]')
