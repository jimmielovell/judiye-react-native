import {Column, Frame, FView} from '../../../src/components/layout';
import {render} from '@testing-library/react-native';

it('renders column layout component', () => {
  render(<Column />);
});

it('renders frame layout component', () => {
  render(<Frame />);
});

it('renders fview layout component', () => {
  render(<FView />);
});
