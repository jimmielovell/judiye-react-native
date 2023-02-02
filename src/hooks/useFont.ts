import {ColorValue, Platform} from 'react-native';
import {
  FontAppearance,
  FontSizeName,
  FontVariant,
  FontWeight,
} from 'types/globals';
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

const WEIGHT_MAP = {
  '100': 'light',
  '200': 'light',
  '300': 'light',
  '400': 'regular',
  '500': 'medium',
  '600': 'medium',
  '700': 'bold',
  '800': 'bold',
  '900': 'bold',
  bold: 'bold',
  normal: 'regular',
};

function getFontVariant(weight: FontWeight | number) {
  if (typeof weight === 'number') {
    weight = String(weight) as FontWeight;
  }

  return WEIGHT_MAP[weight];
}

export function useFontFamily(
  styleWeight?: FontWeight,
  weight?: FontWeight,
  size?: FontVariant | number | string,
): [string | undefined, FontWeight | undefined] {
  const platform = Platform.OS as 'android' | 'ios';
  const {fonts} = useTheme();
  // First try to resolve the fontWeight
  let _weight = weight;

  if (size && fonts.size[size as FontVariant]) {
    const localWeight = fonts.weight[size as FontVariant]!;
    const variant = getFontVariant(localWeight) as FontSizeName;

    if (localWeight) {
      _weight = localWeight;
    }

    if (variant && fonts.family[platform][variant]) {
      return [fonts.family[platform][variant], localWeight];
    }
  }

  if (styleWeight) {
    _weight = styleWeight;
  }

  console.log(styleWeight, weight, size);
  console.log(fonts.family[platform].regular, _weight);
  console.log('------------------');
  return [fonts.family[platform].regular, _weight];
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
