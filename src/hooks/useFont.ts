import {ColorValue} from 'react-native';
import {FontAppearance, FontVariant, FontWeight} from 'types/globals';
import useTheme from './useTheme';

export function useFontColor(
  styleColor?: string | ColorValue,
  color?: FontAppearance | ColorValue,
) {
  const {colors} = useTheme();
  // First determine if an explicit color has been defined in style
  // property
  if (styleColor) {
    return styleColor;
  }

  if (colors.text[color as FontAppearance]) {
    return colors.text[color as FontAppearance];
  }

  if (typeof color === 'string') {
    return color;
  }
}

export function useFontFamily(
  styleWeight?: FontWeight,
  weight?: FontWeight,
  size?: FontVariant | number | string,
): [string | undefined, FontWeight | undefined] {
  const {fonts} = useTheme();
  // First try to resolve the fontWeight
  let _weight = weight;

  if (size && fonts.size[size as FontVariant]) {
    const localWeight = fonts.weight[size as FontVariant]!;

    if (localWeight) {
      _weight = localWeight;
    }
  }

  if (styleWeight) {
    _weight = styleWeight;
  }

  return [fonts.family, _weight];
}

export function useFontSize(
  styleSize?: number,
  size?: FontVariant | number | string,
): number | undefined {
  const {fonts} = useTheme();
  if (!isNaN(Number(size))) {
    return Number(size);
  }

  if (fonts.size[size as FontVariant] && size !== 'body') {
    return fonts.size[size as FontVariant];
  }

  if (styleSize) {
    return styleSize;
  }

  return fonts.size.body;
}
