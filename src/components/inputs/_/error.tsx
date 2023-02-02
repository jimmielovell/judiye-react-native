import {
  forwardRef,
  useImperativeHandle,
  useCallback,
  useRef,
  useState,
} from 'react';
import {StyleSheet, Text as RNText} from 'react-native';
import {useTheme} from 'hooks';
import {Text} from 'components/typography';
import {ValidationError} from 'domains';

export interface ErrorHandle {
  addError(error: ValidationError): void;
  removeError(): void;
}
export interface ErrorProps {
  message: string;
}

const Error = forwardRef<ErrorHandle>(function Error(_, ref) {
  const textRef = useRef<RNText>(null);
  const [value, setValue] = useState<string | null>(null);
  const [errored, setErrored] = useState(false);
  const theme = useTheme();
  const _style = createStyle(theme);

  const addError = useCallback(
    (error: ValidationError) => {
      if (textRef.current) {
        setErrored(true);
        setValue(error.message);
      }
    },
    [textRef],
  );
  const removeError = useCallback(() => {
    if (value !== null && textRef.current) {
      setErrored(false);
      setValue(null);
    }
  }, [value]);
  useImperativeHandle(ref, () => ({addError, removeError}));

  return (
    <Text
      color="error"
      ref={textRef}
      size="description"
      // eslint-disable-next-line react-native/no-inline-styles
      style={[_style.container, {display: errored ? 'flex' : 'none'}]}>
      {value}
    </Text>
  );
});

function createStyle(theme: Judiye.Theme) {
  const {spacing, colors} = theme;
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      paddingHorizontal: spacing.xxs,
      position: 'absolute',
      left: spacing.nm - spacing.xxs,
      bottom: -8,
      zIndex: 1000,
    },
  });
}

export default Error;
