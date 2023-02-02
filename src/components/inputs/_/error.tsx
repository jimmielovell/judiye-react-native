import {
  forwardRef,
  useImperativeHandle,
  useCallback,
  useRef,
  useState,
} from 'react';
import {TextStyle, Text as RNText} from 'react-native';
import {useForwardedRef, useStyles, useTheme} from 'hooks';
import {Text} from 'components/typography';
import {ValidationError} from 'utils/validators';

export interface ErrorHandle {
  addError(error: ValidationError): void;
  removeError(): void;
}
export interface ErrorProps {
  message: string;
}

const Error = forwardRef<ErrorHandle>(function Error(_, ref) {
  const [value, setValue] = useState<string | null>(null);
  const innerRef = useForwardedRef(ref);
  const textRef = useRef<RNText>(null);
  const [errored, setErrored] = useState(false);

  const {fonts, colors, spacing} = useTheme();
  const compStyles = {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xs,
    position: 'absolute',
    left: spacing.nm - spacing.xs,
    bottom: -8,
    display: errored ? 'flex' : 'none',
    lineHeight: fonts.size.description,
    zIndex: 1000,
  };

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
  useImperativeHandle(innerRef, () => ({addError, removeError}));

  return (
    <Text color="error" ref={textRef} size="description" style={compStyles}>
      {value}
    </Text>
  );
});

export default Error;
