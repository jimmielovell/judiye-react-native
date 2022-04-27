import Button from './';
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
