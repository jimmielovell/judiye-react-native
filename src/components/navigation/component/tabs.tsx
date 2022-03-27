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
  useState,
} from 'react';
import {TextStyle, View} from 'react-native';
import Animated, {SlideInRight} from 'react-native-reanimated';
import {Button} from 'components/buttons';
import {FView} from 'components/layout';
import wrapper from 'hoc/wrapper';
import {useStyles, useTheme} from 'hooks';
import {
  TabHandle,
  TabPanelHandle,
  TabPanelsProps,
  TabProps,
  TabsProps,
} from '../types';

export const Tab = wrapper(
  forwardRef<TabHandle, TabProps>(({style, ...rest}, ref) => {
    const tabRef = useRef<View>(null);
    const {colors, sizing} = useTheme();
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
        height: sizing.tabHeight,
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
    const {colors} = useTheme();
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

const AnimatedFView = Animated.createAnimatedComponent(FView);

export const TabPanels = wrapper(
  forwardRef<TabPanelHandle, TabPanelsProps>(({children}, ref) => {
    const prevActiveIndex = useRef(0);
    const [activeIndex, setActiveTab] = useState(prevActiveIndex.current);

    function __setActiveTab(i: number) {
      if (i !== activeIndex) {
        prevActiveIndex.current = activeIndex;
        setActiveTab(i);
      }
    }
    useImperativeHandle(ref, () => ({__setActiveTab}));

    children = useMemo(() => {
      return Array.isArray(children)
        ? children.map((child: JSX.Element, index: number) => (
            <AnimatedFView
              key={`tbp-${index}`}
              entering={SlideInRight.duration(200)}>
              {child}
            </AnimatedFView>
          ))
        : [children];
    }, [children]);

    // @ts-ignore
    return <AnimatedFView>{children[activeIndex]}</AnimatedFView>;
  }),
);
