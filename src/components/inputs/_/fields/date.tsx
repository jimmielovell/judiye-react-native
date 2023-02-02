import {forwardRef, useCallback, useImperativeHandle, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from 'hooks';
import {Flex} from 'components/layout';
import NumberField from './number';
import {FieldProps, InputHandle, ValidatableField} from './base';
import {ValidationError} from 'domains';

const DateField = forwardRef<InputHandle, ValidatableField<FieldProps>>(
  function DateField(props, ref) {
    const {returnKeyType, onValidate, rules} = props;
    const theme = useTheme();
    const style = createStyle(theme);
    const dayInputRef = useRef<InputHandle>(null);
    const monthInputRef = useRef<InputHandle>(null);
    const yearInputRef = useRef<InputHandle>(null);

    const dateOnValid = useCallback(
      (value: string | ValidationError) => {
        if (typeof value === 'string') {
          const dayNumber = Number(value);
          if (value.length === 2 || dayNumber > 3) {
            if (dayInputRef.current && monthInputRef.current) {
              dayInputRef.current.blur();
              monthInputRef.current.focus();
            }
          }
        }
      },
      [dayInputRef, monthInputRef],
    );
    const monthOnValid = useCallback(
      (value: string | ValidationError) => {
        if (typeof value === 'string') {
          const monthNumber = Number(value);
          if (value.length === 2 || monthNumber > 1) {
            if (yearInputRef.current && monthInputRef.current) {
              monthInputRef.current.blur();
              yearInputRef.current.focus();
            }
          }
        }
      },
      [yearInputRef, monthInputRef],
    );

    useImperativeHandle(ref, () => ({
      setError: (error: ValidationError) => {
        dayInputRef.current?.setError(error);
        monthInputRef.current?.setError(error);
        yearInputRef.current?.setError(error);
        onValidate?.(error);
      },
      clearError: () => {
        dayInputRef.current?.clearError();
        monthInputRef.current?.clearError();
        yearInputRef.current?.clearError();
      },
      getError: () => {
        const dayError = dayInputRef.current?.getError();
        const monthError = monthInputRef.current?.getError();
        const yearError = yearInputRef.current?.getError();

        if (dayError) {
          return dayError;
        } else if (monthError) {
          return monthError;
        } else if (yearError) {
          return yearError;
        } else {
          return null;
        }
      },
      getValue: () => {
        const day = dayInputRef.current?.getValue();
        const month = monthInputRef.current?.getValue();
        const year = yearInputRef.current?.getValue();

        if (day && month && year) {
          return {
            day,
            month,
            year,
          };
        }

        return '';
      },
      setValue: (_date: string) => {
        const date = new Date(_date);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        dayInputRef.current?.setValue(day.toString());
        monthInputRef.current?.setValue(month.toString());
        yearInputRef.current?.setValue(year.toString());
      },
      validate: () => {
        dayInputRef.current?.validate();
        monthInputRef.current?.validate();
        yearInputRef.current?.validate();
      },
      focus: () => dayInputRef.current?.focus(),
      blur: () => {
        dayInputRef.current?.blur();
        monthInputRef.current?.blur();
        yearInputRef.current?.blur();
      },
      clear: () => {
        dayInputRef.current?.clear();
        monthInputRef.current?.clear();
        yearInputRef.current?.clear();
      },
    }));

    return (
      <Flex direction="row" justify="space-between">
        <NumberField
          ref={dayInputRef}
          textAlign="center"
          contStyle={style.dateInputCont}
          style={style.dateInput}
          placeholder="DD"
          masks={{max: 31}}
          rules={rules}
          maxLength={2}
          onChangeText={dateOnValid}
          returnKeyType="next"
        />
        <NumberField
          ref={monthInputRef}
          textAlign="center"
          contStyle={style.monthInputCont}
          style={style.monthInput}
          placeholder="MM"
          masks={{max: 12}}
          rules={rules}
          maxLength={2}
          onChangeText={monthOnValid}
          returnKeyType="next"
        />
        <NumberField
          ref={yearInputRef}
          textAlign="center"
          contStyle={style.yearInputCont}
          style={style.yearInput}
          placeholder="YYYY"
          rules={rules}
          maxLength={4}
          returnKeyType={returnKeyType || 'done'}
        />
      </Flex>
    );
  },
);

function createStyle(theme: Judiye.Theme) {
  const {spacing} = theme;

  return StyleSheet.create({
    dateInputCont: {
      flex: 1,
    },
    dateInput: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    monthInputCont: {
      flex: 1,
      marginHorizontal: spacing.nm,
    },
    monthInput: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    yearInputCont: {
      flex: 2,
    },
    yearInput: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  });
}

export default DateField;
