import wrapper from 'hoc/wrapper';
import AppBar from '../app-bar';

const CalendarHeader = wrapper(function CalendarHeader() {
  return (
    <AppBar showAvatar title="Calendar" secondPostfixButton={{name: 'Plus'}} />
  );
});

export default CalendarHeader;
