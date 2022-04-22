import {
  createRef,
  forwardRef,
  RefObject,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import {AnimatedFView, FView} from 'components/layout';
import wrapper from 'hoc/wrapper';
import {
  TabPanelHandle,
  TabPanelsHandle,
  TabPanelsProps,
  TabsProps,
} from '../types';
import {FViewProps} from 'components/layout/types';
import {ToggleButton, ToggleButtons} from 'components/inputs';
import {ToggleButtonHandle} from 'components/inputs/types';
import {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import {LayoutChangeEvent, ViewStyle} from 'react-native';
import {useStyles} from 'hooks';

export const Tab = wrapper(
  forwardRef<ToggleButtonHandle, FViewProps>((props, ref) => {
    return <ToggleButton ref={ref} {...props} />;
  }),
);

export const Tabs = wrapper(({withRef, ...rest}: TabsProps) => {
  function handleOnValueChange(index: number) {
    if (withRef.current) {
      withRef.current.__setActiveTab(index);
    }
  }

  return <ToggleButtons onValueChange={handleOnValueChange} {...rest} />;
});

const TabPanel = wrapper(
  forwardRef<TabPanelHandle, TabPanelsProps>((props, ref) => {
    const display = useSharedValue('none');
    // const translateX = useSharedValue(0);
    const panelWidth = useRef(0);

    const __setActive = (_thisIndex: number, _prevIndex?: number) => {
      display.value = 'flex';
    };
    const __setInactive = (_thisIndex: number, _nextIndex: number) => {
      display.value = 'none';
    };
    useImperativeHandle(ref, () => ({
      __setActive,
      __setInactive,
    }));

    function setPanelWidth(e: LayoutChangeEvent) {
      panelWidth.current = e.nativeEvent.layout.width;
    }

    const animCompStyle = useAnimatedStyle(() => {
      return {
        display: display.value as 'flex' | 'none',
        // transform: [{translateX: translateX.value}],
      };
    });

    return (
      // @ts-expect-error
      <AnimatedFView
        {...props}
        onLayout={setPanelWidth}
        style={animCompStyle}
      />
    );
  }),
);

export const TabPanels = wrapper(
  forwardRef<TabPanelsHandle, TabPanelsProps>(({children}, ref) => {
    const activeTabIndex = useRef(0);
    let refs: RefObject<TabPanelHandle>[] = useMemo(() => [], []);

    useEffect(() => {
      if (
        refs[activeTabIndex.current] &&
        refs[activeTabIndex.current].current
      ) {
        refs[activeTabIndex.current].current?.__setActive(
          activeTabIndex.current,
        );
      }
    });

    function __setActiveTab(index: number) {
      if (index !== activeTabIndex.current) {
        if (
          refs[activeTabIndex.current] &&
          refs[activeTabIndex.current].current
        ) {
          refs[activeTabIndex.current].current?.__setInactive(
            index,
            activeTabIndex.current,
          );
        }
        if (refs[index] && refs[index].current) {
          refs[index].current?.__setActive(activeTabIndex.current, index);
        }
        activeTabIndex.current = index;
      }
    }
    useImperativeHandle(ref, () => ({__setActiveTab}));

    children = useMemo(() => {
      const tabPanels = Array.isArray(children) ? children : [children];
      return tabPanels.map((child: JSX.Element, index: number) => {
        const tabPanelRef: RefObject<TabPanelHandle> = createRef();
        // Add value using index to overwrite previous refs in the previous
        // render
        refs[index] = tabPanelRef;
        return (
          <TabPanel ref={tabPanelRef} key={`tbp-${index}`}>
            {child}
          </TabPanel>
        );
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [children]);

    const compStyle = useStyles<ViewStyle>({
      overflow: 'hidden',
    });

    return (
      <FView direction="row" style={compStyle}>
        {children}
      </FView>
    );
  }),
);
