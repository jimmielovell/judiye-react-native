import {useMemo} from 'react';
// import {PixelRatio} from 'react-native';
import useTheme from './useTheme';

// const fontScale = PixelRatio.getFontScale();
export default function useFontSize(size?: number | string) {
  const {fonts} = useTheme();
  return useMemo(() => {
    let fontSize = Number(size || fonts.defaultSize);
    let lineHeight = fonts.lineHeight;
    if (fontSize !== fonts.defaultSize) {
      lineHeight = (fontSize * lineHeight) / fonts.defaultSize;
    }
    return {
      fontSize: Math.ceil(fontSize),
      lineHeight,
    };
  }, [fonts.defaultSize, fonts.lineHeight, size]);
}
