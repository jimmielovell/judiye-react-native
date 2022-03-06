import {Button, Touchable} from '../../../src/components/buttons';
import {fireEvent, render} from '@testing-library/react-native';

it('renders button component', () => {
  const {getByLabelText} = render(<Button>button</Button>);
  const filledButton = getByLabelText('button');
  fireEvent.press(filledButton);
});

it('renders touchable component', () => {
  const {getByLabelText} = render(<Touchable>button</Touchable>);
  const touchable = getByLabelText('button');
  fireEvent.press(touchable);
});
