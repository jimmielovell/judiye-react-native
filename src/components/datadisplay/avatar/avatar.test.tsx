import Avatar from '.';
import {render} from '@testing-library/react-native';

it('renders Avatar component', () => {
  render(<Avatar initials="TST" />);
});
