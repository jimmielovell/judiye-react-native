import {Anchor, AnchorProps} from 'components/buttons';
import {useTheme} from 'hooks';
import {useMemo} from 'react';
import {ViewStyle} from 'react-native';
import FastImage, {ImageStyle, Source} from 'react-native-fast-image';
import Image from './image';

export type AvatarProps = AnchorProps & {
  size?: number | string;
  source?: Source;
  imageStyle?: ImageStyle;
  style?: ViewStyle;
};

export default function Avatar(props: AvatarProps) {
  // @ts-ignore
  let {imageStyle, source, size, style, ...rest} = props;
  const {sizing, colors} = useTheme();

  // Prevent setting width/height in style prop from affecting dimension of the avatar
  let [dimension, __style] = useMemo(() => {
    if (style?.width || style?.height) {
      // @ts-ignore
      const {width, height, ..._rest} = style;
      return [Number(size || width || height), _rest];
    }

    return [Number(size || sizing.height.nm), style];
  }, [style, size, sizing.height.nm]);

  const borderRadius = useMemo(() => {
    return style?.borderRadius ? style.borderRadius : 1000;
  }, [style?.borderRadius]);

  const onFetchError = () => {};

  const onLoadEnd = () => {};

  const _bgStyle: ViewStyle = {
    backgroundColor: 'transparent',
  };

  const _style: ViewStyle = {
    borderColor: colors.border.secondary,
    borderWidth: 0.2,
    borderRadius,
    height: dimension,
    width: dimension,
  };
  const _imageStyle: ImageStyle = {
    borderRadius,
    height: dimension,
    width: dimension,
  };

  return source ? (
    <Anchor style={[_style, _bgStyle, style]} {...rest}>
      <Image
        source={source}
        accessible
        accessibilityLabel="Avatar"
        resizeMode={FastImage.resizeMode.contain}
        style={[_imageStyle, imageStyle]}
        onError={onFetchError}
        onLoadEnd={onLoadEnd}
      />
    </Anchor>
  ) : (
    <Anchor style={[_style, style]} {...rest} />
  );
}
