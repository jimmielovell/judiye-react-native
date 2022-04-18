import {StyleProp} from 'react-native';

export default function useStyles<T>(...stylesheet: StyleProp<T>[]) {
  // // useMemo consumes a lot of memory
  // return useMemo(() => {
  //   // Flattening causes a bug with styles from useAnimatedStyle from react-
  //   // native-reanimated from overriding all other styles
  //   return StyleSheet.flatten(stylesheet);
  // }, [stylesheet]);

  // Look for a better workaround for flattening the styles and consuming less
  // memory
  return stylesheet;
}
