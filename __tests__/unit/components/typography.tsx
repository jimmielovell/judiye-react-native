import {
  PText,
  SText,
  TextError,
  TextLink,
  ScreenTitle,
} from '../../../src/components/typography';
import {render} from '@testing-library/react-native';

it('renders ptext typography component', () => {
  render(<PText />);
});

it('renders stext typography component', () => {
  render(<SText />);
});

it('renders texterror typography component', () => {
  render(<TextError />);
});

it('renders textlink typography component', () => {
  render(<TextLink />);
});

it('renders screentitle typography component', () => {
  render(<ScreenTitle />);
});
