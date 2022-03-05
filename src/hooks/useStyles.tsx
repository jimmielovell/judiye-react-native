import {StyleProp} from 'react-native';
import {useDeepCompareMemoize} from './useDeepCompareEffect';

export default function useStyles<T>(stylesheet: StyleProp<T>) {
  // return useMemo(() => {
  //   return StyleSheet.create(stylesheet);
  // }, [stylesheet]);
  return useDeepCompareMemoize(stylesheet);
}
