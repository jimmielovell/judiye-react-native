import {StyleSheet} from 'react-native';
import {Flex} from 'components/layout';
import wrapper from 'hoc/wrapper';
import {Text} from 'components/typography';
import {Card, Counter} from 'components/datadisplay';
import FastImage from 'react-native-fast-image';
import {useTheme} from 'hooks';
import {Button, Pressable} from 'components/buttons';

const posts = [
  {
    id: '1',
    owner: {
      id: '1',
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
    description: 'In times of crisis, we must come together as a community',
    media: [
      {
        type: 'image',
        url: 'https://picsum.photos/200/300',
      },
    ],
    comments: [],
    likes: [],
    shares: [],
  },
  {
    id: '2',
    owner: {
      id: '1',
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
    description: 'In times of crisis, we must come together as a community',
    media: [
      {
        type: 'image',
        // load from unsplash
        url: 'https://unsplash.com/photos/-2_0cTAsGjE',
      },
    ],
    comments: [],
    likes: [],
    shares: [],
  },
  {
    id: '3',
    owner: {
      id: '3',
      avatar: {
        source: {
          uri: 'https://unsplash.it/200/300',
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
    description:
      'Once upon a time, there lived a beautiful princess in a big castle. The princess was very ki',
    media: [
      {
        type: 'image',
        // load from unsplash
        url: 'https://unsplash.it/200/300',
      },
    ],
    comments: [],
    likes: [],
    shares: [],
  },
];

interface PostProps {
  id: string;
}

interface MediaProps {
  type: string;
  url: string;
}

const Media = wrapper(function Media(props: MediaProps) {
  const {type, url} = props;
  const theme = useTheme();
  const _style = createStyle(theme);

  if (type === 'image') {
    return (
      <FastImage
        source={{
          uri: url,
        }}
        style={_style.media}
      />
    );
  } else {
    return null;
  }
});

const Reaction = wrapper(function Reaction(props: any) {
  const {name, color, counter, style} = props;
  const theme = useTheme();
  const _style = createStyle(theme);

  return (
    <Button
      appearance="fill"
      direction="column"
      icon={{
        name,
        color: color || theme.colors.text.secondary,
        size: 20,
        style: _style.reactionIcon,
      }}
      style={[_style.reaction, style]}>
      <Counter style={_style.counter}>{counter}</Counter>
    </Button>
  );
});

const Post = wrapper(function Post(props: PostProps) {
  const {id} = props;
  const theme = useTheme();
  const _style = createStyle(theme);
  const post = posts.find(post => post.id === id);
  const {owner, description, media} = post;

  return (
    <Pressable align="flex-start" style={_style.post}>
      <Card
        {...owner}
        button={{
          appearance: 'icon',
          name: 'MoreVertical',
          color: theme.colors.text.secondary,
        }}
      />
      <Text style={_style.postDescription}>{description}</Text>

      <Flex align="flex-start" style={_style.mediaCont}>
        <Media {...media[0]} />
      </Flex>
      <Flex direction="row" justify="space-around" style={_style.reactions}>
        <Reaction name="ThumbsUp" counter="1,200" />
        <Reaction name="Comment" counter="12" />
        <Reaction name="Share" />
        <Reaction name="Bookmark" />
      </Flex>
    </Pressable>
  );
});

function createStyle(theme: Judiye.Theme) {
  const {colors, spacing, sizing, shape} = theme;

  return StyleSheet.create({
    post: {
      width: '100%',
      marginTop: spacing.nm,
      marginBottom: spacing.sm,
    },
    postDescription: {
      marginVertical: spacing.xs,
      width: '100%',
      paddingHorizontal: spacing.sm,
      lineHeight: 24,
      letterSpacing: 0.2,
      fontWeight: '300',
    },
    mediaCont: {
      width: '100%',
      borderColor: colors.border.secondary,
      borderWidth: 0.2,
      borderRadius: shape.radius.nm,
    },
    media: {
      borderRadius: shape.radius.nm - 2,
      width: '100%',
      height: 200,
    },
    reactions: {
      width: '100%',
      height: sizing.height.lg,
    },
    reaction: {
      borderRadius: 0,
      backgroundColor: 'transparent',
      height: '100%',
      width: sizing.width.nm,
    },
    reactionIcon: {
      marginRight: 0,
    },
    counter: {
      marginTop: spacing.xxs,
    },
  });
}

export default Post;
