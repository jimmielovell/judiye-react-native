import {Pressable} from 'components/buttons';
import {PressableProps} from 'components/buttons/types';
import {PText} from 'components/typography';
import {useStyles, useTheme} from 'hooks';
import {cloneElement, ReactNode, useMemo} from 'react';
import {ScrollView} from 'react-native-gesture-handler';

interface OptionData {
  value: string;
  label?: string;
}

interface OptionProps extends PressableProps {
  value: string;
  label?: string;
  onSelect?(optionData: OptionData): void;
}

const Option = function Option({
  children,
  style,
  value,
  label,
  onSelect,
  ...rest
}: OptionProps) {
  const {sizing} = useTheme();
  const typeOfChildren = typeof children;
  const optionData: OptionData = {
    value,
    // @ts-ignore
    label: label || typeOfChildren === 'string' ? children : undefined,
  };

  function handlePress() {
    onSelect && onSelect(optionData);
  }

  const contStyle = useStyles(
    {
      paddingHorizontal: 5,
      minHeight: sizing.buttonHeight,
    },
    style,
  );

  return (
    <Pressable
      direction="row"
      justify="flex-start"
      style={contStyle}
      {...rest}
      onPress={handlePress}>
      {typeOfChildren === 'string' ? <PText>{children}</PText> : children}
    </Pressable>
  );
};

interface OptionsProps {
  children: ReactNode;
  multiple?: boolean;
  max?: number;
  onSelect(optionData: OptionData): void;
}

export const Options = function Options({children, onSelect}: OptionsProps) {
  children = useMemo(() => {
    const selectOption = (optionData: OptionData) => {
      onSelect && onSelect(optionData);
    };

    const options = Array.isArray(children) ? children : [children];
    return options.map((option, index) => {
      return cloneElement(option, {
        key: `opt-${index}`,
        onSelect: selectOption,
      });
    });
  }, [children, onSelect]);

  return <ScrollView>{children}</ScrollView>;
};

export default Option;
