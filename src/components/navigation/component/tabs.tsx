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
import {TextStyle, View, ViewStyle} from 'react-native';
import {Button} from 'components/buttons';
import {FView} from 'components/layout';
import wrapper from 'hoc/wrapper';
import {useStyles, useTheme} from 'hooks';
import {
  TabHandle,
  TabPanelHandle,
  TabPanelsHandle,
  TabPanelsProps,
  TabProps,
  TabsProps,
} from '../types';

export const Tab = wrapper(
  forwardRef<TabHandle, TabProps>(({style, ...rest}, ref) => {
    const tabRef = useRef<View>(null);
    const {colors} = useTheme();
    const setActive = useCallback(() => {
      if (tabRef.current) {
        tabRef.current.setNativeProps({
          borderColor: colors.buttonSecondaryOutline,
          backgroundColor: colors.surfaceContainer,
        });
      }
    }, [colors.buttonSecondaryOutline, colors.surfaceContainer]);
    const setInactive = useCallback(() => {
      if (tabRef.current) {
        tabRef.current.setNativeProps({
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        });
      }
    }, []);

    useImperativeHandle(ref, () => ({
      setActive,
      setInactive,
    }));

    const tabCompStyles = useStyles(
      {
        borderColor: 'transparent',
        height: '100%',
        flex: 1,
      },
      style,
    );
    const textCompStyles = useStyles<TextStyle>({
      fontWeight: 'normal',
      fontSize: 14,
    });

    return (
      <Button
        ref={tabRef}
        appearance="outline"
        textStyle={textCompStyles}
        style={tabCompStyles}
        {...rest}
      />
    );
  }),
);

export const Tabs = wrapper(
  ({style, children, withRef, ...rest}: TabsProps) => {
    const {colors, sizing} = useTheme();
    const activeTabIndex = useRef(0);
    let refs: RefObject<TabHandle>[] = useMemo(() => [], []);

    useEffect(() => {
      if (
        refs[activeTabIndex.current] &&
        refs[activeTabIndex.current].current
      ) {
        refs[activeTabIndex.current].current?.setActive();
      }
    });

    const handleTabPress = useCallback(
      (index: number) => {
        if (withRef.current && index !== activeTabIndex.current) {
          if (refs[activeTabIndex.current].current) {
            refs[activeTabIndex.current].current?.setInactive();
          }
          if (refs[index].current) {
            refs[index].current?.setActive();
          }
          withRef.current.__setActiveTab(index);
          activeTabIndex.current = index;
        }
      },
      [refs, withRef],
    );

    children = useMemo(() => {
      if (Array.isArray(children)) {
        return children.map((child, index: number) => {
          const ref: RefObject<TabHandle> = createRef();
          // Add value using index to overwrite previous refs in the previous
          // render
          refs[index] = ref;
          return cloneElement(child, {
            ref,
            key: `tb-${index}`,
            onPress: () => handleTabPress(index),
          });
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [children, handleTabPress]);

    const compStyles = useStyles(
      {
        backgroundColor: colors.backgroundSecondary,
        borderRadius: 1000,
        marginBottom: 13,
        height: sizing.buttonHeight,
        padding: 3,
      },
      style,
    );

    return (
      <FView direction="row" style={compStyles} {...rest}>
        {children}
      </FView>
    );
  },
);

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
        if (refs[activeTabIndex.current].current) {
          refs[activeTabIndex.current].current?.__setInactive();
        }
        if (refs[index].current) {
          refs[index].current?.__setActive();
        }
        activeTabIndex.current = index;
      }
    }
    useImperativeHandle(ref, () => ({__setActiveTab}));

    children = useMemo(() => {
      return Array.isArray(children)
        ? children.map((child: JSX.Element, index: number) => {
            const tabPanelRef: RefObject<TabPanelHandle> = createRef();
            // Add value using index to overwrite previous refs in the previous
            // render
            refs[index] = tabPanelRef;
            return (
              <TabPanel ref={tabPanelRef} key={`tbp-${index}`}>
                {child}
              </TabPanel>
            );
          })
        : [children];
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [children]);

    return <FView>{children}</FView>;
  }),
);
