import {useMemo} from 'react';
import {Image, ImageStyle, ViewStyle} from 'react-native';
import {AvatarProps} from '../types';
import wrapper from 'hoc/wrapper';
import {Anchor} from 'components/buttons';
import {useStyles, useTheme} from 'hooks';
import {PText} from 'components/typography';

const Avatar = wrapper(
  ({source, initials, size, withRef, /*online,*/ style}: AvatarProps) => {
    const {colors, sizing} = useTheme();
    size = Number(size || sizing.avatarSize);
    const borderRadius = useMemo(() => size! / 2.2, [size]);

    const compStyles = useStyles<ViewStyle>(
      {
        borderColor: colors.primary,
        borderWidth: source ? 0 : sizing.borderWidth,
        width: size,
        height: size,
        borderRadius: borderRadius,
      },
      style,
    );
    const imgCompStyles = useStyles<ImageStyle>({
      borderRadius: borderRadius,
      height: '100%',
      width: '100%',
    });

    return (
      <Anchor
        android_ripple={{
          borderless: true,
        }}
        appearance="outline"
        withRef={withRef}
        style={compStyles}>
        {source ? (
          <Image source={source} style={imgCompStyles} />
        ) : (
          <PText weight="600" size={14}>
            {initials ?? '`ye'}
          </PText>
        )}
      </Anchor>
    );
  },
);

export default Avatar;
