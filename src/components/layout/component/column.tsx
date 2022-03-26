import {cloneElement, useMemo} from 'react';
import {useWindowDimensions, ViewStyle} from 'react-native';
import {ColumnProps} from '../types';
import {useStyles, useTheme} from 'hooks';
import wrapper from 'hoc/wrapper';
import FView from './fview';

const Column = wrapper(
  ({
    columns = 1,
    gutter = 13,
    children,
    width,
    style,
    ...rest
  }: ColumnProps) => {
    const screenWidth = useWindowDimensions().width;
    const {screenPaddingHorizontal} = useTheme().spacing;
    columns = Number(columns);
    gutter = Number(gutter);

    const columnWidth = useMemo(() => {
      const rowWidth =
        Number(width) ||
        Number(screenWidth) - Number(screenPaddingHorizontal) * 2;
      return columns === 1
        ? rowWidth
        : rowWidth / columns - gutter + gutter / (columns - 1);
    }, [width, screenWidth, screenPaddingHorizontal, columns, gutter]);

    const contCompStyles = useStyles(style, {
      marginTop: -gutter,
    });
    const childCompStyles = useStyles<ViewStyle>({
      width: columnWidth,
      marginTop: gutter,
    });

    children = useMemo(() => {
      if (Array.isArray(children)) {
        return children.map((child: JSX.Element, index: number) =>
          cloneElement(child, {
            key: `cl-${index}`,
            style: childCompStyles,
          }),
        );
      }
    }, [children, childCompStyles]);

    return (
      <FView>
        <FView
          style={contCompStyles}
          {...rest}
          direction="row"
          justify="space-between"
          wrap="wrap">
          {children}
        </FView>
      </FView>
    );
  },
);

export default Column;
