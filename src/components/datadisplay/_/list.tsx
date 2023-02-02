import {Flex} from 'components/layout';
import React, {
  cloneElement,
  forwardRef,
  ReactElement,
  useId,
  useMemo,
} from 'react';
import {StyleProp, ViewStyle, VirtualizedList, VirtualizedListProps} from 'react-native';

type ValueT = {
  value: any;
};

export interface ValueData {
  value: string;
}

export interface ListProps<DataT>
  extends Omit<
    VirtualizedListProps<typeof Value>,
    'data' | 'keyExtractor' | 'renderItem' | 'getItem' | 'getItemCount'
  > {
  children: ReactElement;
  data?: DataT[];
  onSelect?(data: ValueData): void;
  numColumns?: number;
  columnWrapperStyle?: StyleProp<ViewStyle>;
}

// Add search functionality
// Searching through the provided List
const List = forwardRef<VirtualizedList<ValueData>, ListProps<ValueT>>(
  function List(props, ref) {
    let {
      children,
      numColumns = 1,
      data,
      columnWrapperStyle,
      style,
      ...rest
    } = props;
    const uniqId = useId();

    const valueNodes = useMemo(
      () => (Array.isArray(children) ? children : [children]),
      [children],
    );

    const _renderer = useMemo(() => {
      const render = (props): React.Node => {
        // invariant(
        //   children,
        //   'Expected a List Item Component as a child prop',
        // );
        return children;
      };

      const renderProp = info => {
        if (numColumns > 1) {
          const {item, index} = info;
          // invariant(
          //   Array.isArray(item),
          //   'Expected array of items with numColumns > 1',
          // );
          return (
            <Flex style={columnWrapperStyle}>
              {item.map((it, kk) => {
                const element = render({
                  item: it,
                  index: index * numColumns + kk,
                  separators: info.separators,
                });
                return element != null ? (
                  <React.Fragment key={kk}>{element}</React.Fragment>
                ) : null;
              })}
            </Flex>
          );
        } else {
          return cloneElement(valueNodes[index], {onPress});
        }
      };

      return renderProp;
    }, [columnWrapperStyle, numColumns, valueNodes]);

    const _keyExtractor = (_items: any, index: number): string => {
      return `${uniqId}-${index}`;
    };

    const _getItem = (data: ReactElement[], index: number) => {
      if (numColumns > 1) {
        const ret = [];
        for (let kk = 0; kk < numColumns; kk++) {
          const itemIndex = index * numColumns + kk;
          if (itemIndex < data.length) {
            const item = data[itemIndex];
            ret.push(item);
          }
        }
        return ret;
      } else {
        const {value} = data[index].props;
        return {value};
      }
    };

    const _getItemCount = (data?: ValueData | ValueData[]): number => {
      if (Array.isArray(data)) {
        return numColumns > 1
          ? Math.ceil(valueNodes.length / numColumns)
          : valueNodes.length;
      } else {
        return 0;
      }
    };

    const computedStyle: ViewStyle = {
      width: '100%',
    };

    return (
      <VirtualizedList
        {...rest}
        ref={ref}
        style={[computedStyle, style]}
        data={data || children}
        keyExtractor={_keyExtractor}
        renderItem={_renderer}
        getItemCount={_getItemCount}
        getItem={_getItem}
      />
    );
  },
);

export default List;
