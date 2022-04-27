import Menu, {MenuItem} from '.';
import {render} from '@testing-library/react-native';

it('renders MenuItem component', () => {
  render(<MenuItem />);
});

it('renders Menu component', () => {
  render(
    <Menu>
      <MenuItem />
    </Menu>,
  );
});
