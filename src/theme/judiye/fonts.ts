import {fonts as watfoeFonts} from '../watfoe/fonts';

const {regular, bold} = watfoeFonts;

const fonts: Judiye.Theme.Fonts = {
  regularFontFamily: regular.family,
  regularFontWeight: regular.weight,

  boldFontFamily: bold.family,
  boldFontWeight: bold.weight,

  defaultSize: 16,
  lineHeight: 1.5,
};

export default fonts;
