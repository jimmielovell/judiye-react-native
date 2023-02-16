import {StyleSheet} from 'react-native';
import {Tabs} from 'components/navigation';
import wrapper from 'hoc/wrapper';
import AppBar from '../app-bar';
import {FlatList} from 'react-native-gesture-handler';
import {useTheme} from 'hooks';
import Post from './_/post';
import {useNavigation} from '@react-navigation/native';

export const DiscoverHeader = wrapper(function DiscoverHeader() {
  const navigation = useNavigation();
  const _onPress = () => {
    navigation.navigate('NewPostScreen');
  };

  return (
    <AppBar
      showAvatar
      title="Discover"
      secondPostfixButton={{name: 'Edit', onPress: _onPress}}
    />
  );
});

const Posts = wrapper(function Posts(props: {posts: {id: string}[]}) {
  const {posts} = props;
  const theme = useTheme();
  const _style = createStyle(theme);

  return (
    <FlatList
      data={posts}
      keyExtractor={item => item.id}
      renderItem={({item}) => {
        return <Post id={item.id} />;
      }}
      showsVerticalScrollIndicator={false}
      style={_style.postsCont}
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

function createStyle(theme: Judiye.Theme) {
  const {spacing} = theme;

  return StyleSheet.create({
    postsCont: {
      width: '100%',
      height: '100%',
      marginBottom: spacing.lg,
    },
  });
}

export default DiscoverScreen;
