import React, {useMemo} from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {Flex} from '../../layout';
import {Text} from 'components/typography';
import {useStyles} from 'hooks';
import {Anchor, AnchorProps} from 'components/buttons';
import Avatar, { AvatarProps } from './avatar';

export interface OrganizationProp {
  id: string;
  name: string;
}

export interface TitleProps {
  organization?: OrganizationProp;
  role: string | string[];
  // This is a bad design, find a way to pass style instead of defining it here
  style?: StyleProp<TextStyle>;
}

export interface CardProps {
  avatar: AvatarProps;
  name: {
    value: string;
    // This is a bad design, find a way to pass style instead of defining it here
    style?: StyleProp<TextStyle>;
  };
  title: TitleProps | TitleProps[];
  button?: AnchorProps;
  style?: StyleProp<ViewStyle>;
}

const Title = function Title({organization, role, style}: TitleProps) {
  const roleText = useMemo(() => {
    return Array.isArray(role) ? role.join(' | ') : role;
  }, [role]);
  const compStyles = useStyles(style, {
    lineHeight: 16,
  });

  return (
    <Text color='secondary' style={compStyles} size={12}>
      {roleText}
      {organization && (
        <Text color='link' style={compStyles} size={12}>
          @{organization.name}
        </Text>
      )}
    </Text>
  );
};

const TitleContainer = function TitleCont({
  title,
  style,
}: {
  title: TitleProps | TitleProps[];
  style?: StyleProp<TextStyle>;
}) {
  const children = useMemo(() => {
    return Array.isArray(title) ? (
      <Text color='secondary' numberOfLines={1} style={style}>
        <>
          <Title organization={title[0].organization} role={title[0].role} />
          {title.length > 1 && <Text size={12}> ...</Text>}
        </>
      </Text>
    ) : (
      <Title
        organization={title.organization}
        role={title.role}
        style={style}
      />
    );
  }, [title, style]);

  return children;
};

export default function Card({
  avatar,
  name,
  title,
  style,
  button,
  ...rest
}: CardProps) {
  const nameTitleCompStyles = useStyles({
    marginLeft: 13,
    flex: 1,
  });
  const nameCompStyles = useStyles(name.style, {
    marginBottom: 3,
  });
  const buttonPostfixStyles = useStyles(
    {
      marginLeft: 'auto',
    },
    button ? button.style : undefined,
  );

  return (
    <Flex direction="row" align="center" style={style} {...rest}>
      <Avatar {...avatar} />
      <Flex align="flex-start" self="center" style={nameTitleCompStyles}>
        <Text weight="700" style={nameCompStyles}>
          {name.value}
        </Text>
        <TitleContainer title={title} />
      </Flex>
      {button && <Anchor {...button} style={buttonPostfixStyles} />}
    </Flex>
  );
};
