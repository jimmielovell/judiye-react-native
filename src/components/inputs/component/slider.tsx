import wrapper from 'hoc/wrapper';
import {useStyles} from 'hooks';
import {LayoutChangeEvent, View, ViewStyle} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const Slider = wrapper(() => {
  const handlerIsPressed = useSharedValue(false);
  const progress = useSharedValue(0);
  const sliderWidth = useSharedValue(0);

  function handleSliderLayout(e: LayoutChangeEvent) {
    sliderWidth.value = e.nativeEvent.layout.width;
  }

  const start = useSharedValue(0);
  const panGestureHandler = Gesture.Pan()
    .onBegin(() => {
      handlerIsPressed.value = true;
    })
    .onUpdate(e => {
      let position = start.value + e.translationX;
      if (position > sliderWidth.value) {
        position = sliderWidth.value;
      } else if (position < 0) {
        position = 0;
      }
      progress.value = position;
    })
    .onEnd(() => {
      start.value = progress.value;
      handlerIsPressed.value = false;
    });

  const compStyles = useStyles({
    backgroundColor: 'grey',
    width: '100%',
    height: 3,
    borderRadius: 2,
  });
  const handleCompStyles = useStyles<ViewStyle>({
    backgroundColor: 'black',
    borderRadius: 1000,
    width: 18,
    height: 18,
    position: 'absolute',
    top: -7.5,
  });
  const handleAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: progress.value}],
    };
  });
  const activePortionCompStyle = useStyles({
    backgroundColor: 'black',
    height: '100%',
    width: 0,
  });
  const activeAnimStyle = useAnimatedStyle(() => {
    return {
      width: progress.value,
    };
  });

  return (
    <View style={compStyles} onLayout={handleSliderLayout}>
      <Animated.View style={[activePortionCompStyle, activeAnimStyle]} />
      <GestureDetector gesture={panGestureHandler}>
        <Animated.View style={[handleCompStyles, handleAnimStyle]} />
      </GestureDetector>
    </View>
  );
});

export default Slider;
