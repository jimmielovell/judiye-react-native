import {
  cloneElement,
  createRef,
  forwardRef,
  RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {Pressable} from 'components/buttons';
import {Flex, FlexProps} from 'components/layout';
import wrapper from 'hoc/wrapper';
import {useTheme} from 'hooks';
import {Text} from 'components/typography';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export interface ToggleButtonHandle {
  __setActive(): void;
  __setInactive(): void;
}
export interface ToggleButtonsProps extends FlexProps {
  onValueChange?(index: number): void;
}

const AnimatedFlex = Animated.createAnimatedComponent(Flex);
const AnimatedText = Animated.createAnimatedComponent(Text);

const ANIMATION_DURATION = 244;

export const ToggleButton = wrapper(
  forwardRef<ToggleButtonHandle, FlexProps>(
    ({style, children, ...rest}, ref) => {
      const theme = useTheme();
      const _style = createStyle(theme);
      const textRef = useRef(null);
      const {colors} = theme;
      const color = useSharedValue(colors.text.primary);

      const __setActive = useCallback(() => {
        color.value = withTiming(colors.primary, {
          duration: ANIMATION_DURATION,
        });
      }, [color, colors.primary]);
      const __setInactive = useCallback(() => {
        color.value = colors.text.secondary;
      }, [color, colors.text]);

      useImperativeHandle(ref, () => ({
        __setActive,
        __setInactive,
      }));

      const animTextStyle = useAnimatedStyle(() => {
        return {
          color: color.value,
        };
      });

      return (
        <Pressable style={[_style.button, style]} {...rest}>
          <AnimatedText ref={textRef} size={14} style={animTextStyle}>
            {children}
          </AnimatedText>
        </Pressable>
      );
    },
  ),
);

const Indicator = (props: {noOfTabs: number; style?: StyleProp<ViewStyle>}) => {
  const {noOfTabs, style} = props;
  const theme = useTheme();
  const _style = createStyle(theme, noOfTabs);

  return <AnimatedFlex self="flex-start" style={[_style.indicator, style]} />;
};

export const ToggleButtons = wrapper(
  ({style, children, onValueChange, ...rest}: ToggleButtonsProps) => {
    const theme = useTheme();
    const _style = createStyle(theme);
    const activeTBIndex = useRef(0);
    let refs: RefObject<ToggleButtonHandle>[] = useMemo(() => [], []);
    const indicatorPosition = useSharedValue(3);
    const indicatorPositionMultiplier = useRef(0);
    const noOfTabs = useRef(0);

    useEffect(() => {
      if (refs[activeTBIndex.current] && refs[activeTBIndex.current].current) {
        refs[activeTBIndex.current].current?.__setActive();
      }
    });

    const handleTabPress = useCallback(
      (index: number) => {
        if (index !== activeTBIndex.current) {
          if (refs[activeTBIndex.current].current) {
            refs[activeTBIndex.current].current?.__setInactive();
          }
          if (refs[index].current) {
            refs[index].current?.__setActive();
            let position = indicatorPositionMultiplier.current * index;
            if (index === 0) {
              position += 3;
            } else if (index === noOfTabs.current - 1) {
              position -= 2;
            }
            indicatorPosition.value = withTiming(position, {
              duration: ANIMATION_DURATION,
            });

            if (onValueChange) {
              onValueChange(index);
            }
          }
          activeTBIndex.current = index;
        }
      },
      [indicatorPosition, onValueChange, refs],
    );

    const setContWidthOnLayoutChange = (e: LayoutChangeEvent) => {
      indicatorPositionMultiplier.current =
        e.nativeEvent.layout.width / noOfTabs.current;
    };

    children = useMemo(() => {
      const tabs = Array.isArray(children) ? children : [children];
      return tabs.map((child, index: number) => {
        const ref: RefObject<ToggleButtonHandle> = createRef();
        noOfTabs.current = index + 1;
        // Add value using index to overwrite previous refs in the previous
        // render
        refs[index] = ref;
        return cloneElement(child, {
          ref,
          key: `tb-${index}`,
          onPress: () => handleTabPress(index),
        });
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [children, handleTabPress]);

    const indicatorAnimStyles = useAnimatedStyle(() => {
      return {
        left: indicatorPosition.value,
      };
    });

    return (
      <Flex
        direction="row"
        style={[_style.buttons, style]}
        onLayout={setContWidthOnLayoutChange}
        {...rest}>
        {noOfTabs.current > 0 && (
          <Indicator noOfTabs={noOfTabs.current} style={indicatorAnimStyles} />
        )}
        {children}
      </Flex>
    );
  },
);

function createStyle(theme: Judiye.Theme, noOfTabs?: number) {
  const {colors, sizing} = theme;

  return StyleSheet.create({
    button: {
      height: '100%',
      flex: 1,
    },
    buttons: {
      backgroundColor: colors.surface.secondary,
      borderRadius: 1000,
      marginBottom: 13,
      height: sizing.height.sm,
      padding: 3,
    },
    indicator: {
      backgroundColor: colors.primary,
      borderRadius: 1000,
      height: '100%',
      position: 'absolute',
      top: 3,
      left: 3,
      width: `${100 / noOfTabs!}%`,
    },
  });
}
