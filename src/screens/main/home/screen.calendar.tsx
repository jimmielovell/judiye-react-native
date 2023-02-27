import {Flex} from 'components/layout';
import wrapper from 'hoc/wrapper';
import AppBar from '../app-bar';

export const CalendarHeader = wrapper(function CalendarHeader() {
  return (
    <AppBar
      showBackButton
      title="Calendar"
      secondPostfixButton={{name: 'Plus'}}
    />
  );
});

const CalendarScreen = wrapper(function CalendarScreen() {
  return <Flex />;
});

export default CalendarScreen;
