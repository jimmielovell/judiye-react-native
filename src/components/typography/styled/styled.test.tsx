import {TextError, TextLink, ScreenTitle} from '.';
import {render} from '@testing-library/react-native';

it('renders texterror typography component', () => {
  render(<TextError />);
});

it('renders textlink typography component', () => {
  render(<TextLink />);
});

it('renders screentitle typography component', () => {
  render(<ScreenTitle />);
});
