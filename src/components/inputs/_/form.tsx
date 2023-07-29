import {FlexProps} from 'components/layout';
import wrapper from 'hoc/wrapper';
import {
  cloneElement,
  createRef,
  ReactElement,
  ReactNode,
  RefObject,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import {InputHandle} from './fields/base';
import {useTheme} from 'hooks';
import {Pressable} from 'components/buttons';

export interface FormProps extends FlexProps {
  children: ReactNode;
  onSubmit: (values: Record<string, any>) => void;
}

function searchForInputsAndSubmitButton(
  children: ReactNode,
  inputRefsHash: RefObject<Record<string, RefObject<InputHandle>>>,
  onPress: () => void,
) {
  const __children: ReactElement[] = Array.isArray(children)
    ? children
    : [children];

  return __children.map((child, index: number) => {
    const _props = child.props;

    if (
      _props.name &&
      [
        'text',
        'phone',
        'email',
        'password',
        'name',
        'number',
        'date',
        'pin',
        'multiline',
      ].includes(_props.type)
    ) {
      // @ts-ignore
      const ref = child.ref ? child.ref : createRef<InputHandle>();
      child = cloneElement(child, {
        key: _props.name + index,
        ref,
      });

      inputRefsHash.current![_props.name] = ref;
    } else if (_props.type === 'submit') {
      // @ts-ignore
      let buttonRef = child.ref ? child.ref : createRef<View>();

      child = cloneElement(child, {
        key: 'submit-btn' + index,
        onPress,
        ref: buttonRef,
      });
      // else if is flex
    } else if (_props.direction || _props.justify || _props.align) {
      child.props.children = searchForInputsAndSubmitButton(
        child.props.children,
        inputRefsHash,
        onPress,
      );
    }

    return child;
  });
}

const Form = wrapper(function Form(props: FormProps) {
  const {children, onSubmit, style, ...rest} = props;
  const theme = useTheme();
  const _style = createStyle(theme);
  const inputRefsHash = useRef<Record<string, RefObject<InputHandle>>>({});

  const _onSubmit = useCallback(() => {
    const errors = [];
    const values: Record<string, any> = {};

    for (const name in inputRefsHash.current) {
      const ref = inputRefsHash.current[name];
      if (ref.current) {
        ref.current.validate();
        const _error = ref.current.getError();
        if (_error !== null) {
          errors.push(_error);
          values[name] = undefined;
        } else {
          values[name] = ref.current.getValue();
        }
      }
    }

    if (errors.length > 0) {
      throw errors[0];
    }

    onSubmit?.(values);
  }, [onSubmit]);

  const _children = useMemo(() => {
    inputRefsHash.current = {};
    // Search for input fields and submit button within the children or their children
    return searchForInputsAndSubmitButton(children, inputRefsHash, _onSubmit);
  }, [children, _onSubmit]);

  return (
    <Pressable
      accessibilityLabel="Form"
      onPress={Keyboard.dismiss}
      style={[_style.cont, style]}
      {...rest}>
      {_children}
    </Pressable>
  );
});

function createStyle(_theme: Judiye.Theme) {
  return StyleSheet.create({
    cont: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
  });
}

export default Form;
