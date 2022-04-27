import Anchor from '.';
import {fireEvent, render} from '@testing-library/react-native';

it('renders anchor component', () => {
  const {getByLabelText} = render(<Anchor appearance="fill">anchor</Anchor>);
  const anchor = getByLabelText('anchor');
  fireEvent.press(anchor);
});
