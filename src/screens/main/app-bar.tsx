import {useCallback, useEffect, useState} from 'react';
import {Keyboard, Platform, StyleSheet} from 'react-native';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {Flex} from 'components/layout';
import wrapper from 'hoc/wrapper';
import {useTheme} from 'hooks';
import {Avatar} from 'components/datadisplay';
import {Button, IconButtonProps} from 'components/buttons';
import {Text} from 'components/typography';
import {Input} from 'components/inputs';

export interface AppBarProps {
  title?: string;
  showBackButton?: boolean;
  backButtonIconName?: string;
  showAvatar?: boolean;
  search?: string; // Placeholder
  firstPostfixButton?: Omit<IconButtonProps, 'appearance'>;
  secondPostfixButton?: Omit<IconButtonProps, 'appearance'>;
}

const AppBar = wrapper(function AppBar(props: AppBarProps) {
  const {
    title,
    showBackButton,
    backButtonIconName,
    showAvatar,
    search,
    firstPostfixButton,
    secondPostfixButton,
  } = props;
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const _style = createStyle(theme, insets);
  const navigation = useNavigation();
  const [showSearchInput, setShowSearchInput] = useState(false);

  const toggleSearchInput = useCallback(() => {
    setShowSearchInput(!showSearchInput);
  }, [showSearchInput]);

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', _e => toggleSearchInput);
    () => Keyboard.removeAllListeners('keyboardDidHide');
  }, [toggleSearchInput]);

  const goBack = useCallback(() => {
    if (showSearchInput) {
      setShowSearchInput(false);
    } else {
      navigation.goBack();
    }
  }, [navigation, showSearchInput]);

  return (
    <Flex
      direction="row"
      align="center"
      justify="flex-start"
      style={_style.cont}>
      {showBackButton && (
        <Button
          appearance="icon"
          name={backButtonIconName || 'ArrowLeft'}
          size="30"
          {...Platform.select({
            ios: {
              name: backButtonIconName || 'ArrowBackIos',
              size: 24,
            },
          })}
          self="center"
          style={_style.backButton}
          onPress={goBack}
          ripple
        />
      )}

      {showSearchInput ? (
        <Input
          type="search"
          placeholder={search}
          style={_style.input}
          wrapperStyle={_style.inputWrapper}
          postfix={{
            style: _style.searchPostfixButton,
          }}
          autoFocus
        />
      ) : (
        <>
          {showAvatar && (
            <Avatar self="center" style={_style.avatar} ripple>
              JL
            </Avatar>
          )}

          {title && (
            <Text size="title" style={_style.title}>
              {title}
            </Text>
          )}
          <Flex
            style={_style.postfixCont}
            direction="row"
            justify="flex-end"
            flex={1}
            align="center">
            {search && (
              <Button
                appearance="icon"
                name="Search"
                size={24}
                self="center"
                style={_style.firstPostfixButton}
                onPress={toggleSearchInput}
                ripple
              />
            )}
            {firstPostfixButton && (
              <Button
                {...firstPostfixButton}
                appearance="icon"
                size={24}
                self="center"
                style={_style.firstPostfixButton}
                ripple
              />
            )}
            {secondPostfixButton && (
              <Button
                {...secondPostfixButton}
                appearance="icon"
                size={24}
                self="center"
                style={[_style.secondPostfixButton]}
                color={theme.colors.background}
                ripple
              />
            )}
          </Flex>
        </>
      )}
    </Flex>
  );
});

function createStyle(theme: Judiye.Theme, insets: EdgeInsets) {
  const {colors, spacing, sizing} = theme;

  return StyleSheet.create({
    cont: {
      backgroundColor: colors.background,
      paddingLeft: spacing.sm + insets.left,
      paddingRight: spacing.sm + insets.right,
      paddingBottom: spacing.sm,
      ...Platform.select({
        ios: {
          paddingTop: insets.top,
        },
        android: {
          paddingTop: insets.top + spacing.sm,
        },
      }),
    },
    backButton: {
      marginRight: spacing.nm,
      backgroundColor: 'transparent',
    },
    avatar: {
      marginRight: spacing.nm,
    },
    title: {
      flex: 1,
      color: colors.text.primary,
    },
    postfixCont: {
      height: '100%',
    },
    firstPostfixButton: {
      backgroundColor: 'transparent',
      marginLeft: spacing.nm,
    },
    secondPostfixButton: {
      backgroundColor: colors.primary,
      width: sizing.width.nm,
      marginLeft: spacing.nm,
    },
    input: {
      backgroundColor: colors.surface.secondary,
      borderWidth: 0,
      height: sizing.height.sm,
    },
    searchPostfixButton: {
      height: sizing.height.sm - sizing.border.width * 2 - 2,
    },
    inputWrapper: {
      alignSelf: 'center',
      marginBottom: 0,
      marginTop: 0,
      flex: 1,
    },
  });
}

export default AppBar;
