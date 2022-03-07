import {fonts as watfoeFonts} from '../watfoe/fonts';

const {regular, bold} = watfoeFonts;

const fonts: Judiye.Theme.Fonts = {
  regularFontFamily: regular.family,
  regularFontWeight: regular.weight,

  boldFontFamily: bold.family,
  boldFontWeight: bold.weight,

  defaultSize: 16,
  inputErrorSize: 13,
  inputLabelSize: 14,

  lineHeight: 24,
};

export default fonts;
