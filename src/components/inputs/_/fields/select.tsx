import {List, Value} from 'components/datadisplay';
import {Flex} from 'components/layout';
import {FlexProps} from 'components/layout';
import {useTheme} from 'hooks';
import {ReactElement, useCallback, useState} from 'react';
import {FlatList, ViewStyle} from 'react-native';
import Input from '../input/input';

interface SelectProps extends FlexProps {
  children: ReactElement[];
  // multiple?: boolean;
  // max?: number;
  onSelect?(data: any): void;
  multiple?: boolean;
}

// Add search functionality
// Searching through the provided options
export default function Select(props: SelectProps) {
  const {children, onSelect} = props;
  const [selectValue, setSelectValue] = useState();
  const {shape} = useTheme();

  const onValueSelect = useCallback((value: string) => {
    onSelect && onSelect(value);
  }, []);

  const computedContStyle: ViewStyle = {
    position: 'relative',
  };

  const computedListStyle: ViewStyle = {
    backgroundColor: 'grey',
    borderRadius: shape.radius.nm,
    // position: 'absolute',
    height: 200,
  };

  return (
    <Flex style={computedContStyle}>
      <Input
        type="text"
        disabled
        postfix={{
          icon: {
            name: 'Clear',
          },
        }}
      />
      <FlatList
        numColumns={2}
        data={[20, 30, 40, 50, 60]}
        renderItem={props => {
          const {item} = props;
          return <Value appearance="text">{item}</Value>;
        }}
      />
    </Flex>
  );
}
