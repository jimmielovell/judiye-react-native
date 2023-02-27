import {StyleSheet} from 'react-native';
import {Tabs} from 'components/navigation';
import wrapper from 'hoc/wrapper';
import AppBar from '../app-bar';
import {useTheme} from 'hooks';
import Post from './_/post';
import {useNavigation} from '@react-navigation/native';
import {FramedFlatList} from 'components/layout';

export const DiscoverHeader = wrapper(function DiscoverHeader() {
  const navigation = useNavigation();
  const _onPress = () => {
    navigation.navigate('NewPostScreen');
  };

  return (
    <AppBar
      showAvatar
      title="Discover"
      search="Search..."
      secondPostfixButton={{name: 'Edit', onPress: _onPress}}
    />
  );
});

const Posts = wrapper(function Posts(props: {posts: {id: string}[]}) {
  const {posts} = props;
  const theme = useTheme();
  const _style = createStyle(theme);

  return (
    <FramedFlatList
      data={posts}
      keyExtractor={item => item.id}
      renderItem={({item}) => {
        return <Post id={item.id} />;
      }}
      showsVerticalScrollIndicator={false}
    />
  );
});

const DiscoverScreen = wrapper(function DiscoverScreen() {
  return (
    <Tabs labels={['Spotlight', 'Spaces', 'Watchlist']}>
      <Posts posts={[{id: '1'}, {id: '2'}, {id: '3'}]} />
      <Posts posts={[{id: '1'}, {id: '2'}, {id: '3'}]} />
      <Posts posts={[{id: '1'}, {id: '2'}, {id: '3'}]} />
    </Tabs>
  );
});

function createStyle(_theme: Judiye.Theme) {
  return StyleSheet.create({});
}

export default DiscoverScreen;
