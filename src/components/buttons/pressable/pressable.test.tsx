import Pressable from '.';
import {fireEvent, render} from '@testing-library/react-native';

it('renders pressable component', () => {
  const {getByLabelText} = render(<Pressable>button</Pressable>);
  const pressable = getByLabelText('button');
  fireEvent.press(pressable);
});
