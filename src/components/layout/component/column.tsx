import {cloneElement, useCallback, useMemo} from 'react';
import {ScrollView, useWindowDimensions, ViewStyle} from 'react-native';
import {ColumnProps} from '../types';
import {useStyles, useTheme} from 'hooks';
import wrapper from 'hoc/wrapper';

const Column = wrapper(
  ({columns = 1, gutter = 16, children, width, ...rest}: ColumnProps) => {
    const screenWidth = useWindowDimensions().width;
    const {screenPaddingHorizontal} = useTheme().spacing;

    const columnWidth = useMemo(() => {
      const rowWidth =
        Number(width) ||
        Number(screenWidth) - Number(screenPaddingHorizontal) * 2;
      return columns === 1
        ? rowWidth
        : rowWidth / Number(columns) - Number(gutter / 2);
    }, [width, screenWidth, screenPaddingHorizontal, columns, gutter]);

    const childCompStyles = useStyles<ViewStyle>({
      width: columnWidth,
      marginBottom: gutter,
    });
    const compStyles = useStyles<ViewStyle>({
      justifyContent: 'space-between',
      flexDirection: 'row',
      flexWrap: 'wrap',
    });

    const cloneChildren = useCallback(() => {
      if (Array.isArray(children)) {
        return children.map((child: JSX.Element, index: number) =>
          cloneElement(child, {
            key: index,
            style: childCompStyles,
          }),
        );
      }
    }, [children, childCompStyles]);

    return (
      <ScrollView contentContainerStyle={compStyles} {...rest}>
        {cloneChildren()}
      </ScrollView>
    );
  },
);

export default Column;
