import React, {useMemo} from 'react';
import {useWindowDimensions, ViewStyle} from 'react-native';
import {useTheme} from 'hooks';
import {Flex, FlexProps} from 'components/layout';

export interface ColumnProps extends FlexProps {
  columns?: number;
  gutter?: number;
  width?: string | number;
}

const Column = function Column(props: ColumnProps) {
  const {spacing} = useTheme();
  let {
    columns = 1,
    gutter = spacing.nm,
    children,
    width,
    style,
    ...rest
  } = props;
  const screenWidth = useWindowDimensions().width;
  columns = Number(columns);
  gutter = Number(gutter);

  const columnWidth = useMemo(() => {
    const rowWidth =
      Number(width) || Number(screenWidth) - Number(spacing.md) * 2;

    if (columns === 1) {
      return rowWidth;
    } else {
      return (rowWidth - gutter * (columns - 1)) / columns;
    }
  }, [width, screenWidth, spacing.md, columns, gutter]);

  const wrapperStyle = {
    width: '100%',
  };
  const computedStyle: ViewStyle = {
    marginTop: -gutter,
  };

  children = useMemo(() => {
    const childCompStyle = {
      width: columnWidth,
      marginTop: gutter,
    };
    const marginRightStyle = {
      marginRight: gutter,
    };

    if (Array.isArray(children)) {
      const len = children.length;
      return children.map((child: JSX.Element, index: number) => (
        <Flex
          key={index}
          style={[
            childCompStyle,
            index < len - 1 ? marginRightStyle : undefined,
          ]}>
          {child}
        </Flex>
      ));
    }
  }, [children, columnWidth, gutter]);

  return (
    <Flex style={wrapperStyle}>
      <Flex
        style={[style, computedStyle]}
        {...rest}
        direction="row"
        wrap="wrap">
        {children}
      </Flex>
    </Flex>
  );
};

export default Column;
