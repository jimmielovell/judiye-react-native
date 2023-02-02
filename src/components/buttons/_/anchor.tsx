import {forwardRef, RefObject, useCallback} from 'react';
import {GestureResponderEvent, View} from 'react-native';
import {Button, ButtonProps} from 'components/buttons';
import {useForwardedRef} from 'hooks';
import {BackdropHandle} from 'components/feedback';

export type AnchorProps = ButtonProps & {
  withRef?: RefObject<BackdropHandle>;
};

const Anchor = forwardRef<View, AnchorProps>(function Anchor(props, ref) {
  const {withRef, onPress, ...rest} = props;
  const buttonRef = useForwardedRef(ref);

  const open = useCallback(
    (e: GestureResponderEvent) => {
      try {
        onPress && onPress(e);
      } catch (_e) {
        return;
      }

      if (withRef && withRef.current) {
        if (buttonRef.current) {
          buttonRef.current.measureInWindow((x, y, width, height) => {
            withRef.current!.open({x, y, width, height});
          });
        } else {
          withRef.current.open();
        }
      }
    },
    [withRef, buttonRef, onPress],
  );

  return <Button ref={buttonRef} {...rest} onPress={open} />;
});

export default Anchor;
