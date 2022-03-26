import React, {useMemo} from 'react';
import {StyleProp, TextStyle} from 'react-native';
import Avatar from './avatar';
import {FView} from '../../layout';
import {NameCardProps, TitleProps} from '../types';
import wrapper from 'hoc/wrapper';
import {PText, SText, TextLink} from 'components/typography';
import {useStyles} from 'hooks';
import {Anchor} from 'components/buttons';

const Title = wrapper(({organization, role, style}: TitleProps) => {
  const roleText = useMemo(() => {
    return Array.isArray(role) ? role.join(' | ') : role;
  }, [role]);
  const compStyles = useStyles(style, {
    lineHeight: 16,
  });

  return (
    <SText style={compStyles} size={12}>
      {roleText}
      {organization && (
        <TextLink style={compStyles} size={12}>
          @{organization.name}
        </TextLink>
      )}
    </SText>
  );
});

const TitleContainer = wrapper(
  ({
    title,
    style,
  }: {
    title: TitleProps | TitleProps[];
    style?: StyleProp<TextStyle>;
  }) => {
    const children = useMemo(() => {
      return Array.isArray(title) ? (
        <SText numberOfLines={1} style={style}>
          <>
            <Title organization={title[0].organization} role={title[0].role} />
            {title.length > 1 && <PText size={12}> ...</PText>}
          </>
        </SText>
      ) : (
        <Title
          organization={title.organization}
          role={title.role}
          style={style}
        />
      );
    }, [title, style]);

    return children;
  },
);

const NameCard = wrapper(
  ({avatar, name, title, style, button, ...rest}: NameCardProps) => {
    const nameTitleCompStyles = useStyles({
      marginLeft: 13,
      flex: 1,
    });
    const nameCompStyles = useStyles(name.style, {
      marginTop: -3,
    });
    const buttonPostfixStyles = useStyles(
      {
        borderRadius: 0,
        marginLeft: 'auto',
        paddingHorizontal: 0,
        width: 'auto',
        height: '100%',
      },
      button ? button.style : undefined,
    );

    return (
      <FView direction="row" align="center" style={style} {...rest}>
        <Avatar {...avatar} />
        <FView align="flex-start" self="center" style={nameTitleCompStyles}>
          <PText weight="600" style={nameCompStyles}>
            {name.value}
          </PText>
          <TitleContainer title={title} />
        </FView>
        {button && <Anchor {...button} style={buttonPostfixStyles} />}
      </FView>
    );
  },
);

export default NameCard;
