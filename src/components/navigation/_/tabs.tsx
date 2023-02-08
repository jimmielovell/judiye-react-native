import {
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {FlatList, StyleSheet, useWindowDimensions, View} from 'react-native';
import {Flex} from 'components/layout';
import {useTheme} from 'hooks';
import {Button} from 'components/buttons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export interface TabsProps {
  children?: ReactNode;
  labels?: ReactNode[];
}

interface ILayout {
  x: number;
  width: number;
  index: number;
}
interface TabProps {
  active: boolean;
  onPress: (layout: ILayout) => void;
  index: number;
  children: ReactNode;
}

const Tab = function Tab(props: TabProps) {
  const {active, onPress, index, children} = props;
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
      onPress={_e => {
        ref.current?.measureInWindow((x, _y, _width) => {
          onPress({x, width: _width, index});
        });
      }}
      style={[_style.button, opacityStyle]}
      textStyle={_style.buttonText}>
      {children}
    </Button>
  );
};

const Tabs = function Tabs(props: TabsProps) {
  const {children, labels} = props;
  const theme = useTheme();
  const {width} = useWindowDimensions();
  const _style = createStyle(theme, width);
  const [activeIndex, setActiveIndex] = useState(0);
  let scrollRef: RefObject<FlatList> = useRef(null);
  const indicatorLeft = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);

  useEffect(() => {});

  const onPress = useCallback(
    (layout: ILayout) => {
      const {x, width, index} = layout;
      indicatorWidth.value = width;
      indicatorLeft.value = withTiming(x, {
        duration: 150,
      });
      scrollRef.current?.scrollToIndex({index, animated: true});
    },
    [indicatorLeft, indicatorWidth],
  );

  const _labels = useMemo(() => {
    return labels?.map((label, i) => {
      return (
        <Tab
          key={'tab-' + i}
          index={i}
          onPress={onPress}
          active={activeIndex === i}>
          {label}
        </Tab>
      );
    });
  }, [activeIndex, labels, onPress]);

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
      <Flex direction="row" justify="space-between" style={_style.buttons}>
        {_labels}
        <Animated.View style={[_style.indicator, animatedIndicatorStyle]} />
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
        decelerationRate={0.3}
        directionalLockEnabled={true}
        disableIntervalMomentum
        pagingEnabled
        onScroll={e => {
          const {contentOffset} = e.nativeEvent;
          const index = Math.round(contentOffset.x / width);
          if (index !== activeIndex) {
            setActiveIndex(index);
          }
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
      width: 'auto',
    },
    buttonText: {
      color: colors.primary,
      fontSize: fonts.size.description,
      fontWeight: 'bold',
    },
    buttons: {
      marginBottom: 13,
      borderBottomColor: colors.surface.secondary,
      borderBottomWidth: 1,
      height: sizing.height.sm,
      paddingHorizontal: spacing.md,
      position: 'relative',
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
