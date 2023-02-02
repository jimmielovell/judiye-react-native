import {Anchor, AnchorProps} from 'components/buttons';
import {useTheme} from 'hooks';
import {useMemo} from 'react';
import {Image, ImageStyle, ImageURISource, ViewStyle} from 'react-native';

export type AvatarProps = AnchorProps & {
  size?: number | string;
  source?: ImageURISource;
  imageStyle?: ImageStyle;
};

export default function Avatar(props: AvatarProps) {
  // @ts-ignore
  const {imageStyle, source, size, style, ...rest} = props;
  const _style = (style || {}) as ViewStyle;
  const {sizing} = useTheme();

  // Prevent setting width/height in style prop from affecting dimension of the avatar
  let [dimension, __style] = useMemo(() => {
    if (_style.width || _style.height) {
      const {width, height, ...rest} = _style;
      return [Number(size || width || height), rest];
    }

    return [Number(size || sizing.height.nm), _style];
  }, [_style.width, _style.height, size]);

  const borderRadius = useMemo(() => {
    return _style.borderRadius ? _style.borderRadius : 1000;
  }, [_style.borderRadius]);

  const computedStyles: ViewStyle = {
    borderRadius,
    height: dimension,
    width: dimension,
  };
  const computedImageStyle: ImageStyle = {
    borderRadius,
    height: dimension,
    width: dimension,
  }

  return (
    source
      ? <Anchor
          style={[computedStyles, _style]} {...rest}>
            <Image
              source={source}
              // accessible={accessible}
              accessibilityLabel="Avatar"
              // capInsets={capInsets}
              // defaultSource={defaultSource}
              // loadingIndicatorSource={loadingIndicatorSource}
              progressiveRenderingEnabled={true}
              resizeMethod="auto"
              resizeMode="contain"
              style={[computedImageStyle, imageStyle]} />
          </Anchor>
      : <Anchor style={[computedStyles, _style]} {...rest} />
    );
};
