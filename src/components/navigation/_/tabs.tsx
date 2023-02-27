import {
  ReactNode,
  RefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  GestureResponderEvent,
  LayoutChangeEvent,
  Platform,
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
  const multiplier = useRef(0);

  const prevContentOffsetX = useRef(0);

  const setIndicatorWidth = useCallback(
    (width: number) => {
      indicatorWidth.value = withTiming(width);
    },
    [indicatorWidth],
  );

  const animateIndicator = useCallback(
    (index: number) => {
      const {left, width} = tabLayoutRefs.current[index];
      const spacing =
        left - (tabLayoutRefs.current[0].left + tabLayoutRefs.current[0].width);
      const offset = spacing / screenWidth;
      const indicatorOffset = offset * screenWidth;

      indicatorLeft.value = withTiming(indicatorOffset);
    },
    [indicatorLeft, screenWidth],
  );

  const _labels = useMemo(() => {
    return labels?.map((label, i) => {
      return (
        <Tab
          key={'tab-' + i}
          onPress={_e => {
            scrollRef.current?.scrollToIndex({index: i, animated: true});
            animateIndicator(i);
          }}
          onLayout={e => {
            const {x, width} = e.nativeEvent.layout;
            tabLayoutRefs.current[i] = {left: x, width};

            if (i === 0) {
              setIndicatorWidth(width);
            } else if (i === 1) {
              const spacing =
                x -
                (tabLayoutRefs.current[0].left +
                  tabLayoutRefs.current[0].width);
              multiplier.current = spacing / screenWidth;
            }
          }}
          active={activeIndex === i}>
          {label}
        </Tab>
      );
    });
  }, [activeIndex, animateIndicator, labels, screenWidth, setIndicatorWidth]);

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
        disableIntervalMomentum={true}
        snapToAlignment="start"
        snapToInterval={screenWidth}
        onScroll={e => {
          const {contentOffset} = e.nativeEvent;
          // if (
          //   contentOffset.x === prevContentOffsetX.current ||
          //   contentOffset.x < 0
          // ) {
          //   return;
          // }

          // let delta =
          //   (contentOffset.x - prevContentOffsetX.current) * multiplier.current;

          // if (delta < 0) {
          //   delta = 0;
          // }

          // setIndicatorWidth(delta);

          const index = Math.round(contentOffset.x / screenWidth);
          if (index !== activeIndex) {
            setActiveIndex(index);
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
      fontWeight: Platform.OS === 'ios' ? '500' : '700',
    },
    outerWrapper: {
      borderBottomColor: colors.surface.secondary,
      borderBottomWidth: 1,
      height: sizing.height.nm,
      paddingHorizontal: spacing.xlg + spacing.sm,
    },
    innerWrapper: {
      position: 'relative',
      height: '100%',
    },
    indicator: {
      backgroundColor: colors.primary,
      borderRadius: 2,
      height: 2,
      left: 0,
      bottom: 0,
      position: 'absolute',
    },
  });
}

export default Tabs;
