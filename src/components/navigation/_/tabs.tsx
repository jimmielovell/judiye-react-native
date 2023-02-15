import {ReactNode, RefObject, useMemo, useRef, useState} from 'react';
import {
  GestureResponderEvent,
  LayoutChangeEvent,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import {Flex} from 'components/layout';
import {useTheme} from 'hooks';
import {Button} from 'components/buttons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {FlatList} from 'react-native-gesture-handler';

export interface TabsProps {
  children?: ReactNode;
  labels?: ReactNode[];
}

interface ILayout {
  width: number;
  left: number;
}
interface TabProps {
  active: boolean;
  children: ReactNode;
  onPress: (e: GestureResponderEvent) => void;
  onLayout: (e: LayoutChangeEvent) => void;
}

const Tab = function Tab(props: TabProps) {
  const {active, onPress, onLayout, children} = props;
  const theme = useTheme();
  const _style = createStyle(theme);
  // @ts-ignore
  const ref: RefObject<View> = useRef();

  const opacityStyle = {
    opacity: active ? 1 : 0.5,
  };

  return (
    <Button
      ref={ref}
      onPress={onPress}
      onLayout={onLayout}
      style={[_style.button, opacityStyle]}
      textStyle={_style.buttonText}>
      {children}
    </Button>
  );
};

const Tabs = function Tabs(props: TabsProps) {
  const {children, labels} = props;
  const theme = useTheme();
  const screenWidth = useWindowDimensions().width;
  const _style = createStyle(theme, screenWidth);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef: RefObject<FlatList> = useRef(null);
  const indicatorLeft = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);
  const tabLayoutRefs = useRef<ILayout[]>([]);

  const prevContentOffsetX = useRef(0);
  const tabSpacingRef = useRef(0);

  const _labels = useMemo(() => {
    return labels?.map((label, i) => {
      return (
        <Tab
          key={'tab-' + i}
          onPress={_e =>
            scrollRef.current?.scrollToIndex({index: i, animated: true})
          }
          onLayout={e => {
            const {x, width} = e.nativeEvent.layout;
            tabLayoutRefs.current[i] = {left: x, width};

            if (i === 0) {
              indicatorWidth.value = withSpring(width, {
                damping: 50,
                stiffness: 50,
                // Increase the animation speed
                velocity: 1,
                restSpeedThreshold: 0.1,
              });
            } else if (i === 1) {
              tabSpacingRef.current =
                x -
                tabLayoutRefs.current[0].left -
                tabLayoutRefs.current[0].width;
            }
          }}
          active={activeIndex === i}>
          {label}
        </Tab>
      );
    });
  }, [activeIndex, indicatorWidth, labels]);

  const [_children, data] = useMemo(() => {
    const __children = Array.isArray(children) ? children : [children];
    return [
      __children,
      Array.from({length: __children.length}, (_, i) => i).map(i => ({
        key: `tbp-${i}`,
        index: i,
      })),
    ];
  }, [children]);

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      left: indicatorLeft.value,
      width: indicatorWidth.value,
    };
  });

  return (
    <Flex>
      <Flex style={_style.outerWrapper}>
        <Flex
          direction="row"
          justify="space-between"
          style={_style.innerWrapper}>
          {_labels}
          <Animated.View style={[_style.indicator, animatedIndicatorStyle]} />
        </Flex>
      </Flex>

      <FlatList
        ref={scrollRef}
        data={data}
        renderItem={({item}) => (
          <Flex style={_style.panel}>{_children[item.index]}</Flex>
        )}
        horizontal
        initialNumToRender={1}
        style={_style.cont}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        directionalLockEnabled={true}
        disableIntervalMomentum
        snapToInterval={screenWidth}
        onScroll={e => {
          const {contentOffset} = e.nativeEvent;
          if (
            contentOffset.x === prevContentOffsetX.current ||
            contentOffset.x < 0
          ) {
            return;
          }

          const multiplier = contentOffset.x / (screenWidth * 2);
          console.log(tabSpacingRef.current * multiplier);

          if (contentOffset.x > prevContentOffsetX.current) {
            indicatorWidth.value = withSpring(
              tabLayoutRefs.current[activeIndex].width +
                tabSpacingRef.current * multiplier,
              {
                damping: 50,
                stiffness: 50,
              },
            );
          } else {
            indicatorWidth.value = withTiming(indicatorWidth.value + 1, {
              duration: 30,
            });
          }

          const index = Math.round(contentOffset.x / screenWidth);
          if (index !== activeIndex) {
            setActiveIndex(index);
            // indicatorWidth.value = tabLayoutRefs.current[index].width;
          }

          prevContentOffsetX.current = contentOffset.x;
        }}
      />
    </Flex>
  );
};

function createStyle(_theme: Judiye.Theme, screenWidth?: number) {
  const {colors, sizing, spacing, fonts} = _theme;
  return StyleSheet.create({
    cont: {
      width: '100%',
      height: '100%',
    },
    panel: {
      height: '100%',
      width: screenWidth,
    },
    button: {
      backgroundColor: 'transparent',
      borderRadius: 0,
      height: '100%',
    },
    buttonText: {
      color: colors.primary,
      fontSize: fonts.size.description,
      fontWeight: 'bold',
    },
    outerWrapper: {
      borderBottomColor: colors.surface.secondary,
      borderBottomWidth: 1,
      height: sizing.height.nm,
      paddingHorizontal: spacing.md,
    },
    innerWrapper: {
      position: 'relative',
      height: '100%',
    },
    indicator: {
      backgroundColor: colors.primary,
      borderRadius: 2,
      height: 3,
      left: 0,
      bottom: 0,
      position: 'absolute',
    },
  });
}

export default Tabs;
