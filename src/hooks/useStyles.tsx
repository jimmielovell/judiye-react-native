import {useMemo} from 'react';
import {StyleProp, StyleSheet} from 'react-native';

export default function useStyles<T>(...stylesheet: StyleProp<T>[]) {
  return useMemo(() => {
    return StyleSheet.flatten(stylesheet);
  }, [stylesheet]);
}
