import {StyleSheet} from 'react-native';
import {Flex} from 'components/layout';
import {Tabs} from 'components/navigation';
import wrapper from 'hoc/wrapper';
import AppBar from '../app-bar';
import {Text} from 'components/typography';

export const DiscoverHeader = wrapper(function DiscoverHeader() {
  return (
    <AppBar showAvatar title="Discover" secondPostfixButton={{name: 'Edit'}} />
  );
});

const DiscoverScreen = wrapper(function DiscoverScreen() {
  return (
    <Tabs labels={['Spotlight', 'Spaces', 'Watchlist']}>
      <Flex>
        <Text>Spotlight</Text>
      </Flex>
      <Flex>
        <Text>Space</Text>
      </Flex>
      <Flex>
        <Text>Watchlist</Text>
      </Flex>
    </Tabs>
  );
});

function createStyle(theme: Judiye.Theme) {
  const {colors, spacing, sizing} = theme;

  return StyleSheet.create({});
}

export default DiscoverScreen;
