import Dialog from '.';
import {PText} from 'components/typography';
import {render} from '@testing-library/react-native';

it('renders Dialog component', () => {
  render(
    <Dialog>
      <PText>A Test</PText>
    </Dialog>,
  );
});
