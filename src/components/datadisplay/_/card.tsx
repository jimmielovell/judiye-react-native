import React from 'react';
import {FlatList, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {Flex} from '../../layout';
import {Text} from 'components/typography';
import {Anchor, AnchorProps} from 'components/buttons';
import Avatar, {AvatarProps} from './avatar';
import wrapper from 'hoc/wrapper';
import {useTheme} from 'hooks';
import Chip from './chip';

export interface OrganizationProp {
  id: string;
  name: string;
}

export interface RoleProps {
  organization?: OrganizationProp;
  title: string | string[];
}

interface SkillProps {
  id: string;
  name: string;
  avatar?: AvatarProps;
}

export interface CardProps {
  avatar: AvatarProps;
  name: string;
  roles?: RoleProps[];
  skills?: SkillProps[];
  tagline?: string;
  button?: AnchorProps;
  style?: StyleProp<ViewStyle>;
}

const Role = function Role({organization, title}: RoleProps) {
  const theme = useTheme();
  const _style = createStyle(theme);

  return (
    <Text color="secondary" size="description" style={_style.title}>
      {Array.isArray(title) ? title.join(' | ') : title}
      {organization && (
        <Text color="link" size="description">
          {' '}
          @{organization.name}
        </Text>
      )}
    </Text>
  );
};

const Roles = wrapper(function Roles({data}: {data: RoleProps[]}) {
  const theme = useTheme();
  const _style = createStyle(theme);

  return (
    <FlatList
      data={data}
      keyExtractor={item =>
        Array.isArray(item.title) ? item.title[0] : item.title
      }
      renderItem={({item}) => <Role {...item} />}
      showsHorizontalScrollIndicator={false}
      horizontal
      style={_style.titles}
    />
  );
});

const Skills = wrapper(function Skills(props: {data: SkillProps[]}) {
  const {data} = props;
  const theme = useTheme();
  const _style = createStyle(theme);

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <Chip avatar={item.avatar} style={_style.skill}>
          {item.name}
        </Chip>
      )}
      showsHorizontalScrollIndicator={false}
      horizontal
      style={_style.skills}
    />
  );
});

const Card = wrapper(function Card(props: CardProps) {
  const {avatar, name, roles, skills, tagline, style, button, ...rest} = props;
  const theme = useTheme();
  const _style = createStyle(theme);

  return (
    <Flex direction="row" align="center" style={style} {...rest}>
      <Avatar {...avatar} />
      <Flex align="flex-start" self="center" style={_style.nameTitle}>
        <Text size="subtitle">{name}</Text>
        <Roles data={roles!} />
        <Skills data={skills!} />
        {tagline && (
          <Text size="body" style={_style.tagline}>
            {tagline}
          </Text>
        )}
      </Flex>
      {button && (
        <Anchor {...button} style={[_style.postfixButton, button.style]} />
      )}
    </Flex>
  );
});

function createStyle(theme: Judiye.Theme) {
  const {spacing} = theme;

  return StyleSheet.create({
    nameTitle: {
      marginLeft: spacing.nm,
      flex: 1,
      height: 'auto',
    },
    titles: {
      paddingBottom: 0,
    },
    title: {
      height: 14,
    },
    skills: {
      marginTop: spacing.xs,
    },
    skill: {
      marginRight: spacing.xs,
    },
    tagline: {
      marginTop: spacing.xs,
    },
    postfixButton: {
      marginLeft: 'auto',
    },
  });
}

export default Card;
