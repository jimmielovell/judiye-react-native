import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useForwardedRef, useTheme} from 'hooks';
import NumberField from './number';
import {BackdropHandle, Dialog} from 'components/feedback';
import {Text} from 'components/typography';
import {Pressable} from 'components/buttons';
import {FieldProps, InputHandle, ValidatableField} from './base';
import {Phone} from 'domains';
// @ts-ignore
import {countries} from 'constants';

export interface IPhonePrefix {
  code: string;
  iso: string;
}

interface CountriesDialogProps {
  setPhonePrefix: (prefix: IPhonePrefix) => void;
}

const CountriesDialog = forwardRef<BackdropHandle, CountriesDialogProps>(
  function CountriesDialog(props, ref) {
    const {setPhonePrefix} = props;
    const dialogRef = useForwardedRef(ref);
    const theme = useTheme();
    const _style = createStyle(theme);

    const _onPress = (item: IPhonePrefix) => {
      setPhonePrefix(item);
      dialogRef.current?.close();
    };

    return (
      <Dialog ref={dialogRef}>
        <FlatList
          data={countries}
          removeClippedSubviews={true}
          getItemLayout={(_data, index) => ({
            length: theme.sizing.height.lg,
            offset: theme.sizing.height.lg * index,
            index,
          })}
          keyExtractor={item => item.i}
          renderItem={({item}) => {
            return (
              <Pressable
                direction="row"
                justify="space-between"
                style={_style.option}
                onPress={() =>
                  _onPress({
                    code: item.p,
                    iso: item.i,
                  })
                }>
                <Text>{item.n}</Text>
                <Text>+{item.p}</Text>
              </Pressable>
            );
          }}
          scrollIndicatorInsets={{right: -10}}
        />
      </Dialog>
    );
  },
);

const PhoneField = forwardRef<InputHandle, ValidatableField<FieldProps>>(
  function PhoneField(props, ref) {
    const {prefix, rules, ...rest} = props;
    const innerRef = useForwardedRef(ref);
    const dialogRef = useRef(null);
    const [phonePrefix, setPhonePrefix] = useState<IPhonePrefix>({
      code: '254',
      iso: 'KE',
    });
    const theme = useTheme();
    const _style = createStyle(theme);

    useImperativeHandle(innerRef, () => ({
      ...(innerRef.current as InputHandle),
      getValue: () => {
        return {
          prefix: phonePrefix,
          value: innerRef.current!.getValue(),
        };
      },
      setValue: (_prefix: IPhonePrefix, value: string) => {
        setPhonePrefix(_prefix);
        return innerRef.current!.setValue(value);
      },
    }));

    return (
      <>
        <NumberField
          ref={innerRef}
          prefix={{
            // @ts-ignore
            appearance: 'fill',
            children: `${phonePrefix.iso} +${phonePrefix.code}`,
            withRef: dialogRef,
            style: _style.prefixButton,
            textStyle: _style.prefixButtonText,
            ...prefix,
          }}
          rules={{
            rule: value => {
              return new Phone(value);
            },
            ...rules,
          }}
          {...rest}
        />
        <CountriesDialog ref={dialogRef} setPhonePrefix={setPhonePrefix} />
      </>
    );
  },
);

function createStyle(theme: Judiye.Theme) {
  const {colors, sizing} = theme;

  return StyleSheet.create({
    prefixButton: {
      backgroundColor: colors.surface.secondary,
    },
    prefixButtonText: {
      color: colors.primary,
    },
    option: {
      borderRadius: 0,
      width: '100%',
      height: sizing.height.lg,
    },
  });
}

export default PhoneField;
