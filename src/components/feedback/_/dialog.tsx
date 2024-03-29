import {forwardRef, ReactNode, useCallback, useMemo} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
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
import SearchField from 'components/inputs/_/fields/search';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export interface DialogProps {
  children?: ReactNode;
  title?: ReactNode | string;
  search?: string;
  onOpen?: () => void;
  onClose?: () => void;
}

const AnimatedFlex = Animated.createAnimatedComponent(Flex);

const Dialog = forwardRef<BackdropHandle, DialogProps>(function Dialog(
  props,
  dialogRef,
) {
  const {children, title, search, onClose, onOpen} = props;
  const theme = useTheme();
  const windowDimension = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const indent = theme.spacing.nm * 2 + insets.top + insets.bottom;
  const screenHeight = windowDimension.height - indent;
  const _style = createStyle(theme, screenHeight);
  const backdropRef = useForwardedRef(dialogRef);
  const opacity = useSharedValue(0);

  const _onOpen = useCallback(
    (_anchorMeasurement: Required<InWindowMeasurement>) => {
      onOpen && onOpen();
    },
    [onOpen],
  );

  const closeDialog = useCallback(() => {
    if (backdropRef.current) {
      backdropRef.current.close();
    }
  }, [backdropRef]);

  const handleLayoutChange = useCallback(() => {
    opacity.value = withTiming(1, {duration: 150});
  }, [opacity]);

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
            onPress={closeDialog}
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
      alignSelf: 'center',
      backgroundColor: colors.surface.primary,
      borderRadius: shape.radius.nm,
      overflow: 'hidden',
      paddingHorizontal: spacing.nm,
      paddingVertical: spacing.nm,
      maxHeight: screenHeight,
      height: 'auto',
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

export default Dialog;
