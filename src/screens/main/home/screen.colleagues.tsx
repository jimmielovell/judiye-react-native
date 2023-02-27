import {StyleSheet} from 'react-native';
import {Frame} from 'components/layout';
import {Card} from 'components/datadisplay';
import wrapper from 'hoc/wrapper';
import {useTheme} from 'hooks';
import AppBar from '../app-bar';
import {FlatList} from 'react-native-gesture-handler';
import {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';

export const ColleaguesHeader = wrapper(function ColleaguesHeader() {
  const navigation = useNavigation();

  const navigateToConnectScreen = useCallback(() => {
    navigation.navigate('ConnectScreen');
  }, [navigation]);

  return (
    <AppBar
      showBackButton
      title="Colleagues"
      search="Search colleagues"
      secondPostfixButton={{name: 'UserPlus', onPress: navigateToConnectScreen}}
    />
  );
});

const data = [
  {
    id: '1',
    avatar: {
      children: 'JL',
    },
    name: 'Jimmie Lovell',
    roles: [
      {
        title: ['CEO', 'Senior Software Engineer'],
        organization: {
          id: '2345',
          name: 'Watfoe',
        },
      },
    ],
    skills: [
      {
        id: '1',
        name: 'Python',
        avatar: {
          source: {
            uri: 'https://cdn.iconscout.com/icon/free/png-256/python-3521654-2945035.png',
          },
        },
      },
      {
        id: '2',
        name: 'React Native',
        avatar: {
          source: {
            uri: 'https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png',
          },
        },
      },
      {
        id: '3',
        name: 'NodeJs',
        avatar: {
          source: {
            uri: 'https://cdn.iconscout.com/icon/free/png-256/node-js-1174925.png',
          },
        },
      },
      {
        id: '4',
        name: 'MongoDB',
        avatar: {
          source: {
            uri: 'https://cdn.iconscout.com/icon/free/png-256/mongodb-3-1175138.png',
          },
        },
      },
      {
        id: '5',
        name: 'Docker',
        avatar: {
          source: {
            uri: 'https://cdn.iconscout.com/icon/free/png-256/docker-226091.png',
          },
        },
      },
      {
        id: '6',
        name: 'Kubernetes',
        avatar: {
          source: {
            uri: 'https://cdn.iconscout.com/icon/free/png-256/kubernetes-3629025-3030165.png',
          },
        },
      },
    ],
    tagline:
      'To help create a space, collaboratively, we can all share through safe innovative technologies of tomorrow, today.',
  },
  {
    id: '2',
    avatar: {
      source: {
        uri: 'https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png',
      },
    },
    name: 'John Doe',
    roles: [
      {
        title: ['Frontend Developer', 'UI/UX Designer'],
        organization: {
          id: '2345',
          name: 'Facebook Inc',
        },
      },
    ],
    skills: [
      {
        id: '1',
        name: 'Adobe XD',
        avatar: {
          source: {
            uri: 'https://cdn.iconscout.com/icon/free/png-256/adobe-xd-2-569569.png',
          },
        },
      },
      {
        id: '2',
        name: 'JavaScript',
        avatar: {
          source: {
            uri: 'https://cdn.iconscout.com/icon/free/png-256/rust-2752108-2284965.png',
          },
        },
      },
    ],
  },
];

const ColleaguesScreen = wrapper(function ColleaguesScreen() {
  const theme = useTheme();
  const _style = createStyle(theme);

  return (
    <Frame style={_style.frame}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return <Card {...item} style={_style.card} />;
        }}
        showsVerticalScrollIndicator={false}
        style={_style.cont}
      />
    </Frame>
  );
});

function createStyle(theme: Judiye.Theme) {
  const {spacing} = theme;

  return StyleSheet.create({
    frame: {
      paddingHorizontal: 0,
    },
    cont: {
      width: '100%',
    },
    card: {
      paddingVertical: spacing.nm,
      paddingHorizontal: spacing.sm,
    },
  });
}

export default ColleaguesScreen;
