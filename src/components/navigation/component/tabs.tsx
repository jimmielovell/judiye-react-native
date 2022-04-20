import {
  createRef,
  forwardRef,
  RefObject,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import {View, ViewStyle} from 'react-native';
import {FView} from 'components/layout';
import wrapper from 'hoc/wrapper';
import {useStyles} from 'hooks';
import {
  TabPanelHandle,
  TabPanelsHandle,
  TabPanelsProps,
  TabsProps,
} from '../types';
import {FViewProps} from 'components/layout/types';
import {ToggleButton, ToggleButtons} from 'components/inputs';
import {ToggleButtonHandle} from 'components/inputs/types';

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
    const tabPanelRef = useRef<View>(null);

    const __setActive = () => {
      if (tabPanelRef.current) {
        tabPanelRef.current.setNativeProps({
          transform: [{scale: 1}],
          display: 'flex',
        });
      }
    };
    const __setInactive = () => {
      if (tabPanelRef.current) {
        tabPanelRef.current.setNativeProps({
          display: 'none',
          transform: [{scale: 0}],
        });
      }
    };

    useImperativeHandle(ref, () => ({
      __setActive,
      __setInactive,
    }));

    const compStyle = useStyles<ViewStyle>({
      display: 'none',
      // There's some sort of a bug that display: none introduces
      transform: [{scale: 0}],
    });

    return <FView {...props} ref={tabPanelRef} style={compStyle} />;
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
        refs[activeTabIndex.current].current?.__setActive();
      }
    });

    function __setActiveTab(index: number) {
      if (index !== activeTabIndex.current) {
        if (
          refs[activeTabIndex.current] &&
          refs[activeTabIndex.current].current
        ) {
          refs[activeTabIndex.current].current?.__setInactive();
        }
        if (refs[index] && refs[index].current) {
          refs[index].current?.__setActive();
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

    return <FView>{children}</FView>;
  }),
);
