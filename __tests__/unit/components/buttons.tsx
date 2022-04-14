import {
  Anchor,
  AnimatedPressable,
  Button,
  Pressable,
} from '../../../src/components/buttons';
import {fireEvent, render} from '@testing-library/react-native';

it('renders fill-type button component', () => {
  const {getByLabelText} = render(<Button appearance="fill">button</Button>);
  const filledButton = getByLabelText('button');
  fireEvent.press(filledButton);
});

it('renders outline-type button component', () => {
  const {getByLabelText} = render(<Button appearance="outline">button</Button>);
  const outlineButton = getByLabelText('button');
  fireEvent.press(outlineButton);
});

it('renders icon-type button component', () => {
  const {getByLabelText} = render(
    <Button appearance="icon" name="Search">
      button
    </Button>,
  );
  const iconButton = getByLabelText('button');
  fireEvent.press(iconButton);
});

it('renders pressable component', () => {
  const {getByLabelText} = render(<Pressable>button</Pressable>);
  const pressable = getByLabelText('button');
  fireEvent.press(pressable);
});

it('renders animated-pressable component', () => {
  const {getByLabelText} = render(
    <AnimatedPressable>button</AnimatedPressable>,
  );
  const animatedPressable = getByLabelText('button');
  fireEvent.press(animatedPressable);
});

it('renders anchor component', () => {
  const {getByLabelText} = render(<Anchor appearance="fill">anchor</Anchor>);
  const anchor = getByLabelText('anchor');
  fireEvent.press(anchor);
});
