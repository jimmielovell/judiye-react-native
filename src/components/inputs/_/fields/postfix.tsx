import {Anchor, AnchorProps} from 'components/buttons';
import {useForwardedRef, useTheme} from 'hooks';
import {forwardRef, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';

export type PostfixProps = AnchorProps & {
  animated?: boolean;
};

const AnimatedAnchor = Animated.createAnimatedComponent<PostfixProps>(Anchor);

const Postfix = forwardRef<View, PostfixProps>(function Postfix(props, ref) {
  const {animated, style, ...rest} = props;
  const innerRef = useForwardedRef(ref);
  const theme = useTheme();
  const _style = createStyle(theme);

  const _Postfix = useMemo(() => {
    return animated ? AnimatedAnchor : Anchor;
  }, [animated]);

  return <_Postfix ref={innerRef} style={[_style.cont, style]} {...rest} />;
});

function createStyle(theme: Judiye.Theme) {
  const {shape, sizing, spacing} = theme;

  return StyleSheet.create({
    cont: {
      backgroundColor: 'transparent',
      borderRadius: shape.radius.sm,
      height: sizing.height.lg - sizing.border.width * 2 - 2,
      position: 'absolute',
      // Padding adds to the overall width of the prefix that's used to
      // to automatically adjust the right-padding of the input
      paddingLeft: spacing.sm,
      paddingRight: spacing.nm,
      width: 'auto',
      right: sizing.border.width + 1,
      top: sizing.border.width + 1,
    },
  });
}

export default Postfix;
