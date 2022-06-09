import {forwardRef, useCallback} from 'react';
import {GestureResponderEvent, View} from 'react-native';
import {Button} from 'components/buttons';
import {useForwardedRef} from 'hooks';
import {AnchorProps} from '../types';

const Anchor = forwardRef<View, AnchorProps>(function Anchor(
  {withRef, onPress, ...rest},
  ref,
) {
  const buttonRef = useForwardedRef(ref);

  const open = useCallback(
    (e: GestureResponderEvent) => {
      if (withRef && withRef.current) {
        if (buttonRef.current) {
          buttonRef.current.measureInWindow((x, y, width, height) => {
            withRef.current!.open({x, y, width, height});
          });
        } else {
          withRef.current.open();
        }
      }
      onPress && onPress(e);
    },
    [withRef, buttonRef, onPress],
  );

  return <Button {...rest} onPress={open} />;
});

export default Anchor;
