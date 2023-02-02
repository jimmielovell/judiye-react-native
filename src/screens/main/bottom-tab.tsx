import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';
import {Flex} from 'components/layout';
import {Button} from 'components/buttons';
import {useStyles} from 'hooks';

export default function BottomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const {colors} = useTheme();

  const contStyles = useStyles({height: 60});
  const tabStyles = useStyles({
    backgroundColor: 'transparent',
  });

  return (
    <Flex direction="row" justify="space-around" style={contStyles}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? (options.tabBarLabel as string)
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true, params: {}});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Button
            appearance="icon"
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            name={isFocused ? `${label}Filled` : label}
            color={colors.text}
            style={tabStyles}
          />
        );
      })}
    </Flex>
  );
}
