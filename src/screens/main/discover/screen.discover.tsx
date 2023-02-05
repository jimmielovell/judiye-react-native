import {Flex} from 'components/layout';
import wrapper from 'hoc/wrapper';

import AppBar from '../app-bar';

export const DiscoverHeader = wrapper(function DiscoverHeader() {
  return (
    <AppBar showAvatar title="Discover" secondPostfixButton={{name: 'Edit'}} />
  );
});

const DiscoverScreen = wrapper(function DiscoverScreen() {
  return <Flex />;
});

export default DiscoverScreen;
