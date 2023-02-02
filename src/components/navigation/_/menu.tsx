import {forwardRef, ReactNode, useCallback} from 'react';
import {
  I18nManager,
  LayoutChangeEvent,
  Platform,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';
import {useForwardedRef, useStyles, useTheme} from 'hooks';
import {Anchor, AnchorProps} from 'components/buttons';
import {Backdrop, BackdropHandle} from 'components/feedback';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {InWindowMeasurement} from 'components/feedback/_/backdrop';

export interface MenuProps {
  children: ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
}

export const MenuItem = function MenuItem(props: AnchorProps) {
  const compStyles = useStyles<ViewStyle>({
    borderRadius: 0,
    flex: 0,
    maxWidth: 180,
    paddingHorizontal: 13,
  });

  return <Anchor appearance="text" style={compStyles} {...props} />;
};

const Menu = forwardRef<BackdropHandle, MenuProps>(function Menu(
  props,
  menuRef,
) {
  const {children, onClose, onOpen} = props;
  const windowDimension = useWindowDimensions();
  const {isRTL} = I18nManager;
  const backdropRef = useForwardedRef(menuRef);
  const {colors, shape, spacing} = useTheme();
  const indent = spacing.nm;
  const transformX = useSharedValue(0);
  const transformY = useSharedValue(0);
  let anchor = useSharedValue({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const opacity = useSharedValue(0);

  const _onOpen = useCallback(
    (anchorMeasurement: Required<InWindowMeasurement>) => {
      anchor.value = anchorMeasurement;
      onOpen && onOpen();
    },
    [anchor, onOpen],
  );

  const _onClose = () => {
    opacity.value = 0;
    onClose && onClose();
  };

  const handleLayoutChange = useCallback(
    (e: LayoutChangeEvent) => {
      const {width, height} = e.nativeEvent.layout;
      let {x, y} = anchor.value;

      if (
        (isRTL && x + anchor.value.width - width > indent) ||
        (!isRTL && x + width > windowDimension.width - indent)
      ) {
        x = windowDimension.width - width - indent;
      } else if (x < indent) {
        x = indent;
      }

      // Flip by Y axis if menu hits bottom screen border
      if (y + height > windowDimension.height - indent) {
        y = y - height + anchor.value.height;
      } else if (y < indent) {
        y = indent;
      }

      transformX.value = x;
      transformY.value = y;
      opacity.value = withTiming(1, {duration: 250});
    },
    [
      anchor.value,
      isRTL,
      indent,
      windowDimension.width,
      windowDimension.height,
      transformX,
      transformY,
      opacity,
    ],
  );

  const backdropCompStyles = useStyles<ViewStyle>({
    backgroundColor: 'transparent',
  });
  const menuCompStyles = useStyles<ViewStyle>({
    backgroundColor: colors.surface.primary,
    borderRadius: shape.radius.nm,
    // overflow: 'hidden',
    paddingVertical: 5,
    position: 'absolute',
    top: 0,
    left: 0,

    // Shadow
    ...Platform.select({
      ios: {
        shadowColor: colors.primary,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.21,
        shadowRadius: 2,
      },
      android: {
        elevation: 1.9999,
      },
    }),
  });
  const animStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        {translateX: transformX.value},
        {translateY: transformY.value},
      ],
    };
  });

  return (
    <Backdrop
      ref={backdropRef}
      statusBarTranslucent={false}
      // @ts-ignore
      onOpen={_onOpen}
      onClose={_onClose}
      style={backdropCompStyles}>
      <Animated.View
        onStartShouldSetResponder={_e => true}
        style={[menuCompStyles, animStyles]}
        onLayout={handleLayoutChange}>
        {children}
      </Animated.View>
    </Backdrop>
  );
});

export default Menu;
