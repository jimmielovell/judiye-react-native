import {StyleSheet} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';
import {Flex} from 'components/layout';
import {Button} from 'components/buttons';

export default function BottomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const theme = useTheme();
  const _styles = createStyle(theme);

  return (
    <Flex
      direction="row"
      justify="space-between"
      align="center"
      style={_styles.cont}>
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
            color={theme.colors.text.primary}
            size={26}
            style={_styles.tab}
            ripple
          />
        );
      })}
    </Flex>
  );
}

function createStyle(theme: Judiye.Theme) {
  const {spacing, colors, sizing} = theme;
  return StyleSheet.create({
    cont: {
      backgroundColor: colors.background,
      paddingTop: spacing.sm,
      paddingBottom: spacing.sm,
      paddingHorizontal: spacing.sm,
    },
    tab: {
      backgroundColor: 'transparent',
      width: sizing.width.nm,
    },
  });
}
