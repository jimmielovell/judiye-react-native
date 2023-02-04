import wrapper from 'hoc/wrapper';
import AppBar from '../app-bar';

const DiscoverHeader = wrapper(function DiscoverHeader() {
  return (
    <AppBar showAvatar title="Discover" secondPostfixButton={{name: 'Edit'}} />
  );
});

export default DiscoverHeader;
