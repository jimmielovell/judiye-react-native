import {
  createRef,
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  RefObject,
  useImperativeHandle,
} from 'react';
import {Column} from 'components/layout';
import Field, {FieldProps, InputHandle, ValidatableField} from './base';
// import {ValidationError} from 'components/domains';

export interface PinFieldProps extends FieldProps {
  length?: number;
}

const Pin = forwardRef<InputHandle, ValidatableField<FieldProps>>(
  function SinglePin({style, ...rest}, ref) {
    return (
      <Field
        ref={ref}
        keyboardType="number-pad"
        returnKeyType="next"
        textAlign="center"
        secureTextEntry={false}
        masks={{
          numOnly: true,
        }}
        maxLength={1}
        contStyle={style}
        {...rest}
      />
    );
  },
);

const PinField = forwardRef<InputHandle, ValidatableField<PinFieldProps>>(
  function PinField(
    {length = 6, ...rest}: ValidatableField<PinFieldProps>,
    ref,
  ) {
    const inputRefs = useRef<RefObject<InputHandle>[]>([]);

    const setPin = useCallback((index: number, value?: string) => {
      if (value) {
        if (inputRefs.current[index]) {
          console.log(inputRefs.current[index].current?.getValue());
          console.log(inputRefs.current[index].current?.blur);
        }
        // if (index < length - 1) {
        //   inputRefs.current[index + 1].current?.focus();
        // } else {
        //   inputRefs.current[index].current?.blur();
        // }
      }
    }, []);

    useImperativeHandle(ref, () => ({
      // setError: setError,
      // clearError: clearError,
      // getError: () => errorRef.current,
      // getValue: () => inputValue,
      // setValue: (_value: string) => {
      //   setInputValue(_value);
      // },
      // validate: () => _validateField(inputValue),
      // focus: () => inputRef.current?.focus(),
      // blur: () => inputRef.current?.blur(),
      // clear: () => setInputValue(''),
    }));

    const children = useMemo(() => {
      let _children = [];

      for (let i = 0; i < length; i++) {
        const _ref = createRef<InputHandle>();
        _children.push(
          <Pin
            key={'pin' + i}
            ref={_ref}
            onChangeText={(value?: string) => setPin(i, value)}
            autoFocus={i === 0}
          />,
        );
        inputRefs.current.push(_ref);
      }

      return _children;
    }, [length, setPin]);

    return (
      <Column columns={6} direction="row" justify="flex-start" {...rest}>
        {children}
      </Column>
    );
  },
);

export default PinField;
