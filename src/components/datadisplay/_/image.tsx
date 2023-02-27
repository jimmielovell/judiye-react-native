import {Image as ImageRN, ImageProps, Platform} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';

export default function Image(props: FastImageProps | ImageProps) {
  return Platform.OS === 'ios' ? (
    <ImageRN {...(props as ImageProps)} />
  ) : (
    <FastImage {...(props as FastImageProps)} />
  );
}
