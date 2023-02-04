import wrapper from 'hoc/wrapper';
import AppBar from '../app-bar';

const HomeHeader = wrapper(function HomeScreen() {
  return (
    <AppBar
      showAvatar
      firstPostfixButton={{name: 'Bell'}}
      secondPostfixButton={{name: 'Users'}}
    />
  );
});

export default HomeHeader;
