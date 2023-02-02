import {
  forwardRef,
  useImperativeHandle,
  useCallback,
  useRef,
  useState,
  ReactNode,
} from 'react';
import {StyleProp, StyleSheet, Text as RNText, TextStyle} from 'react-native';
import {useForwardedRef, useTheme} from 'hooks';
import {Text} from 'components/typography';
import {Flex} from 'components/layout';

export interface LabelHandle {
  isErrored(errored: boolean): void;
}
export interface LabelProps {
  label: string;
  description?: ReactNode;
  style?: StyleProp<TextStyle>;
}

const Label = forwardRef<LabelHandle, LabelProps>(function Label(
  props: LabelProps,
  ref,
) {
  const {label, style, description} = props;
  const innerRef = useForwardedRef(ref);
  const textRef = useRef<RNText>(null);
  const [errored, setErrored] = useState(false);
  const theme = useTheme();
  const _style = createStyle(theme);

  const isErrored = useCallback(
    (_errored: boolean) => {
      if (textRef.current) {
        setErrored(_errored);
      }
    },
    [textRef],
  );
  useImperativeHandle(innerRef, () => ({isErrored}));

  return (
    <Flex style={_style.cont} justify="flex-start" align="flex-start">
      <Text
        ref={textRef}
        size="label"
        color={errored ? theme.colors.text.error : theme.colors.text.primary}
        style={style}>
        {label}
      </Text>
      {description && (
        <Text size="description" color={theme.colors.text.secondary}>
          {description}
        </Text>
      )}
    </Flex>
  );
});

function createStyle(theme: Judiye.Theme) {
  const {spacing, fonts} = theme;

  return StyleSheet.create({
    cont: {
      paddingHorizontal: spacing.nm,
      lineHeight: fonts.size.body,
    },
  });
}

export default Label;
