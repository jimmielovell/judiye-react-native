import NameCard from '.';
import {render} from '@testing-library/react-native';

it('renders NameCard component', () => {
  const tester = {
    avatar: {
      initials: 'TST',
    },
    name: {
      value: 'Tester 1',
    },
    title: {
      organization: {
        id: '010030303',
        name: 'Watfoe Ltd.',
      },
      role: 'Tester',
    },
  };

  render(
    <NameCard avatar={tester.avatar} name={tester.name} title={tester.title} />,
  );
});
