import PText, {SText} from '.';
import {render} from '@testing-library/react-native';

it('renders ptext typography component', () => {
  render(<PText />);
});

it('renders stext typography component', () => {
  render(<SText />);
});
