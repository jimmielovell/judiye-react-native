import {forwardRef, ReactNode, useCallback, useMemo} from 'react';
import {LayoutChangeEvent, StyleSheet, useWindowDimensions} from 'react-native';
import {useForwardedRef, useTheme} from 'hooks';
import {Button} from 'components/buttons';
import {Flex} from 'components/layout';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Text} from 'components/typography';
import Backdrop, {BackdropHandle, InWindowMeasurement} from './backdrop';
import {platform} from 'utils';
import SearchField from 'components/inputs/_/fields/search';

export interface MenuProps {
  children?: ReactNode;
  title?: ReactNode | string;
  search?: string;
  onOpen?: () => void;
  onClose?: () => void;
}

const AnimatedFlex = Animated.createAnimatedComponent(Flex);

const Menu = forwardRef<BackdropHandle, MenuProps>(function Menu(
  props,
  menuRef,
) {
  const {children, title, search, onClose, onOpen} = props;
  const theme = useTheme();
  const windowDimension = useWindowDimensions();
  const indent = theme.spacing.nm;
  const statusBarHeight = platform.getStatusBarHeight();
  const screenHeight = windowDimension.height - statusBarHeight - indent * 2;
  const _style = createStyle(theme, screenHeight);
  const backdropRef = useForwardedRef(menuRef);
  const opacity = useSharedValue(0);
  const transformY = useSharedValue(0);
  let anchor = useSharedValue({
    y: 0,
    height: 0,
  });

  const _onOpen = useCallback(
    (anchorMeasurement: Required<InWindowMeasurement>) => {
      anchor.value = anchorMeasurement;
      onOpen && onOpen();
    },
    [anchor, onOpen],
  );

  const closeMenu = useCallback(() => {
    if (backdropRef.current) {
      backdropRef.current.close();
    }
  }, [backdropRef]);

  const handleLayoutChange = useCallback(
    (e: LayoutChangeEvent) => {
      const {height} = e.nativeEvent.layout;
      let {y} = anchor.value;

      // if menu height is bigger than screen height
      if (height >= screenHeight - indent * 2) {
        y = statusBarHeight;
      }
      // Flip by Y axis if menu hits bottom screen border
      else if (y + height > windowDimension.height - indent) {
        y = y - height + anchor.value.height;
      } else if (y < indent) {
        y = indent;
      }

      transformY.value = y;
      opacity.value = withTiming(1, {duration: 150});
    },
    [
      anchor.value,
      screenHeight,
      indent,
      windowDimension.height,
      transformY,
      opacity,
      statusBarHeight,
    ],
  );

  const _Title = useMemo(() => {
    if (search) {
      return (
        <SearchField
          placeholder={search}
          style={_style.searchInput}
          prefix={{
            style: _style.searchInputPrefixButton,
          }}
          postfix={{
            style: _style.searchInputPostfixButton,
          }}
        />
      );
    }

    if (typeof title === 'string') {
      return (
        <Text size="subtitle" style={_style.title}>
          {title}
        </Text>
      );
    } else {
      return title;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, search]);

  const animStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{translateY: transformY.value}],
    };
  });

  return (
    // @ts-ignore
    <Backdrop ref={backdropRef} onOpen={_onOpen} onClose={onClose}>
      <AnimatedFlex
        align="stretch"
        onStartShouldSetResponder={_e => true}
        style={[_style.dialog, animStyles]}
        onLayout={handleLayoutChange}>
        <Flex direction="row" justify="space-between" style={_style.header}>
          <Flex
            direction="row"
            align="center"
            flex={1}
            style={_style.titleCont}>
            {_Title}
          </Flex>
          <Button
            appearance="icon"
            name="Clear"
            size={24}
            onPress={closeMenu}
            style={_style.clearIcon}
          />
        </Flex>
        {children}
      </AnimatedFlex>
    </Backdrop>
  );
});

function createStyle(theme: Judiye.Theme, screenHeight: number) {
  const {colors, spacing, shape, sizing} = theme;
  const height = sizing.height.nm - sizing.border.width * 2 - 2;

  return StyleSheet.create({
    dialog: {
      backgroundColor: colors.surface.primary,
      borderRadius: shape.radius.nm,
      left: spacing.md,
      overflow: 'hidden',
      paddingHorizontal: spacing.nm,
      paddingVertical: spacing.nm,
      position: 'absolute',
      top: 0,
      maxHeight: screenHeight,
    },
    header: {
      marginBottom: spacing.nm,
    },
    titleCont: {
      height: '100%',
    },
    title: {
      marginTop: 0,
      marginBottom: 0,
    },
    clearIcon: {
      marginLeft: spacing.nm,
    },
    searchInput: {
      backgroundColor: colors.surface.secondary,
      borderRadius: 1000,
      borderWidth: 0,
      height: sizing.height.nm,
    },
    searchInputPrefixButton: {
      borderTopLeftRadius: sizing.height.sm / 2,
      borderBottomLeftRadius: sizing.height.sm / 2,
      height,
      paddingLeft: spacing.sm - sizing.border.width,
      paddingRight: spacing.sm - sizing.border.width,
    },
    searchInputPostfixButton: {
      height,
      width: height,
    },
  });
}

export default Menu;
