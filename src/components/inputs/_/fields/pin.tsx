import {
  createRef,
  forwardRef,
  useMemo,
  useRef,
  RefObject,
  useImperativeHandle,
  useCallback,
} from 'react';
import {Column} from 'components/layout';
import {FieldProps, InputHandle, ValidatableField} from './base';
import {ValidationError} from 'domains';
import NumberField from './number';
import {useTheme} from 'hooks';

export interface PinFieldProps extends FieldProps {
  length?: number;
}

const Pin = forwardRef<InputHandle, ValidatableField<FieldProps>>(
  function SinglePin(props, ref) {
    const {style, ...rest} = props;
    const {fonts} = useTheme();

    return (
      <NumberField
        ref={ref}
        textAlign="center"
        maxLength={1}
        style={[style, {fontSize: fonts.size.subtitle}]}
        {...rest}
      />
    );
  },
);

const PinField = forwardRef<InputHandle, ValidatableField<PinFieldProps>>(
  function PinField(props: ValidatableField<PinFieldProps>, ref) {
    const {
      length = 6,
      onValidate,
      autoFocus,
      rules,
      returnKeyType,
      secureTextEntry,
      style,
      contStyle,
      ...rest
    } = props;
    const inputRefs = useRef<RefObject<InputHandle>[]>([]);

    useImperativeHandle(ref, () => ({
      setError: (error: ValidationError) => {
        inputRefs.current.forEach(_ref => {
          _ref.current?.setError(error);
        });
        onValidate?.(error);
      },
      clearError: () => {
        inputRefs.current.forEach(_ref => {
          _ref.current?.clearError();
        });
      },
      getError: () => {
        const _errors = [];
        for (const _ref of inputRefs.current) {
          const _error = _ref.current?.getError();
          if (_error) {
            _errors.push(_error);
          }
        }

        if (_errors.length > 0) {
          return _errors[0];
        }

        return null;
      },
      getValue: () => {
        let _value = '';

        inputRefs.current.forEach(_ref => {
          _value += _ref.current?.getValue();
        });

        if (_value.length === length) {
          return _value;
        }

        return '';
      },
      setValue: (_pin: string) => {
        const pins = _pin.split('');

        inputRefs.current.forEach((_ref, i) => {
          _ref.current?.setValue(pins[i]);
        });
      },
      validate: () => {
        inputRefs.current.forEach(_ref => {
          _ref.current?.validate();
        });
      },
      focus: () => inputRefs.current[0].current?.focus(),
      isFocused: () => inputRefs.current[0].current?.isFocused()!,
      blur: () => {
        const _index = inputRefs.current.findIndex(_ref =>
          _ref.current?.isFocused(),
        );
        inputRefs.current[_index - 1].current?.focus();
      },
      clear: () => {
        inputRefs.current.forEach(_ref => {
          _ref.current?.clear();
        });
      },
    }));

    const onPinKeyPress = useCallback(
      (event: any, index: number) => {
        const {key} = event.nativeEvent;
        const prevValue = inputRefs.current[index].current?.getValue();

        if (key === 'Backspace' && index > 0 && !prevValue) {
          inputRefs.current[index - 1].current?.focus();
        }
        // else if key is number, replace current value
        else if (key >= '0' && key <= '9') {
          if (prevValue) {
            inputRefs.current[index].current?.setValue(key);
          }
          if (index < length - 1) {
            inputRefs.current[index + 1].current?.focus();
          } else {
            inputRefs.current[index].current?.blur();
          }
        }
      },
      [length],
    );

    const children = useMemo(() => {
      let _children = [];

      for (let i = 0; i < length; i++) {
        const _ref = createRef<InputHandle>();
        _children.push(
          <Pin
            key={'pin-' + i}
            ref={_ref}
            autoFocus={autoFocus && i === 0}
            rules={rules}
            onValidate={onValidate}
            onKeyPress={e => onPinKeyPress(e, i)}
            returnKeyType={
              i === length - 1 && returnKeyType ? returnKeyType : 'next'
            }
            secureTextEntry={secureTextEntry}
            style={style}
            contStyle={contStyle}
          />,
        );
        inputRefs.current.push(_ref);
      }

      return _children;
    }, [
      autoFocus,
      contStyle,
      length,
      onPinKeyPress,
      onValidate,
      returnKeyType,
      rules,
      secureTextEntry,
      style,
    ]);

    return (
      <Column columns={6} direction="row" justify="flex-start" {...rest}>
        {children}
      </Column>
    );
  },
);

export default PinField;
