import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import {LayoutChangeEvent, ViewProps, ViewStyle} from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {AnimatedFView, FView} from 'components/layout';
import {
  TabPanelHandle,
  TabPanelsHandle,
  TabPanelsProps,
  TabsProps,
} from '../types';
import {FViewProps} from 'components/layout/types';
import {ToggleButton, ToggleButtons} from 'components/inputs';
import {ToggleButtonHandle} from 'components/inputs/types';
import {useStyles} from 'hooks';

export const Tab = forwardRef<ToggleButtonHandle, FViewProps>(function Tab(
  props,
  ref,
) {
  return <ToggleButton ref={ref} {...props} />;
});

export const Tabs = function Tabs({withRef, ...rest}: TabsProps) {
  function handleOnValueChange(index: number) {
    if (withRef && withRef.current) {
      withRef.current.__setActiveTab(index);
    }
  }

  return <ToggleButtons onValueChange={handleOnValueChange} {...rest} />;
};

const TabPanel = forwardRef<TabPanelHandle, ViewProps>((props, ref) => {
  const translateX = useSharedValue(0);
  const panelWidth = useRef(0);

  const __setActive = (steps: number) => {
    const spanX = steps * -1 * panelWidth.current + translateX.value;
    translateX.value = withTiming(spanX, {duration: 244});
  };
  useImperativeHandle(ref, () => ({
    __setActive,
  }));

  function setPanelWidth(e: LayoutChangeEvent) {
    panelWidth.current = e.nativeEvent.layout.width;
  }

  const animCompStyle = useAnimatedStyle(() => {
    return {
      marginLeft: translateX.value,
    };
  });

  return (
    <AnimatedFView {...props} onLayout={setPanelWidth} style={animCompStyle} />
  );
});

export const TabPanels = forwardRef<TabPanelsHandle, TabPanelsProps>(
  function TabPanels({children}, ref) {
    const activeTabIndex = useRef(0);
    const animatableTabRef = useRef<TabPanelHandle>(null);

    useEffect(() => {
      if (activeTabIndex.current !== 0) {
        animatableTabRef.current?.__setActive(activeTabIndex.current);
      }
    });

    function __setActiveTab(index: number) {
      if (index !== activeTabIndex.current) {
        animatableTabRef.current?.__setActive(index - activeTabIndex.current);
        activeTabIndex.current = index;
      }
    }
    useImperativeHandle(ref, () => ({__setActiveTab}));

    children = useMemo(() => {
      const tabPanels = Array.isArray(children) ? children : [children];
      return tabPanels.map((child: JSX.Element, index: number) => {
        return (
          <TabPanel
            ref={index === 0 ? animatableTabRef : undefined}
            key={`tbp-${index}`}>
            {child}
          </TabPanel>
        );
      });
    }, [children]);

    const compStyle = useStyles<ViewStyle>({
      overflow: 'hidden',
    });

    return (
      <FView direction="row" style={compStyle}>
        {children}
      </FView>
    );
  },
);
