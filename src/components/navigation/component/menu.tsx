import {forwardRef, useCallback} from 'react';
import {
  I18nManager,
  LayoutChangeEvent,
  Platform,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';
import wrapper from 'hoc/wrapper';
import {useForwardedRef, useStyles, useTheme} from 'hooks';
import {Backdrop} from 'components/feedback';
import {BackdropHandle} from 'components/feedback/types';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import {MenuProps} from '../types';

const Menu = wrapper(
  forwardRef<BackdropHandle, MenuProps>(({children}, menuRef) => {
    const windowDimension = useWindowDimensions();
    const {isRTL} = I18nManager;
    const backdropRef = useForwardedRef(menuRef);
    const {colors, sizing, spacing} = useTheme();
    const indent = spacing.screenPaddingHorizontal;
    const position = useSharedValue({
      left: 0,
      top: 0,
    });
    const dimension = useSharedValue({
      width: 0,
      height: 0,
    });
    let anchor = useSharedValue({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });

    const onOpen = useCallback(
      anchorMeasurement => {
        anchor.value = anchorMeasurement;
      },
      [anchor],
    );

    const handleLayoutChange = useCallback(
      (e: LayoutChangeEvent) => {
        const {width, height} = e.nativeEvent.layout;
        let {x, y} = anchor.value;

        if (
          (isRTL && x + anchor.value.width - width > indent) ||
          (!isRTL && x + width > windowDimension.width - indent)
        ) {
          // x = Math.min(windowDimension.width - indent, x + width);
          x = windowDimension.width - width - indent;
        } else if (x < indent) {
          x = indent;
        }

        // Flip by Y axis if menu hits bottom screen border
        if (y + height > windowDimension.height - indent) {
          y = y - height + anchor.value.height;
          // y = Math.min(y, y + anchor.value.height);
        } else if (y < indent) {
          y = indent;
        }

        position.value = {
          left: x,
          top: y,
        };

        dimension.value = {width, height};
      },
      [
        isRTL,
        anchor.value,
        indent,
        windowDimension.width,
        windowDimension.height,
        position,
        dimension,
      ],
    );

    const backdropCompStyles = useStyles<ViewStyle>({
      backgroundColor: 'transparent',
    });
    const menuCompStyles = useStyles<ViewStyle>({
      backgroundColor: colors.surfaceContainer,
      borderRadius: sizing.surfaceBorderRadius,
      overflow: 'hidden',
      padding: 13,
      position: 'absolute',

      // Shadow
      ...Platform.select({
        ios: {
          shadowColor: colors.border,
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.14,
          shadowRadius: 2,
        },
        android: {
          elevation: 3,
        },
      }),
    });
    const animStyles = useAnimatedStyle(() => {
      return {
        top: position.value.top,
        ...(isRTL ? {right: position.value.left} : {left: position.value.left}),
      };
    });

    return (
      <Backdrop
        ref={backdropRef}
        statusBarTranslucent={false}
        onOpen={onOpen}
        style={backdropCompStyles}>
        <Animated.View
          entering={FadeIn.duration(100).delay(50)}
          exiting={FadeOut.duration(300)}
          onStartShouldSetResponder={_e => true}
          style={[menuCompStyles, animStyles]}
          onLayout={handleLayoutChange}>
          {children}
        </Animated.View>
      </Backdrop>
    );
  }),
);

export default Menu;
