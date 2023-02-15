import {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Flex} from 'components/layout';
import wrapper from 'hoc/wrapper';
import {useTheme} from 'hooks';
import {Avatar} from 'components/datadisplay';
import {Button, IconButtonProps} from 'components/buttons';
import {Text} from 'components/typography';
import {HeaderSearch} from 'components/inputs';

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
  const theme = useTheme();
  const _style = createStyle(theme);
  const navigation = useNavigation();

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Flex direction="row" align="center" style={_style.cont}>
      {showBackButton && (
        <Button
          appearance="icon"
          name={backButtonIconName || 'ArrowLeft'}
          size={34}
          self="center"
          style={_style.backButton}
          onPress={goBack}
        />
      )}
      {showAvatar && (
        <Avatar self="center" style={_style.avatar}>
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
          <HeaderSearch
            placeholder={search}
            minimized
            contStyle={{alignSelf: 'center'}}
          />
        )}
        {firstPostfixButton && (
          <Button
            {...firstPostfixButton}
            appearance="icon"
            size={24}
            self="center"
            style={_style.firstPostfixButton}
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
          />
        )}
      </Flex>
    </Flex>
  );
});

function createStyle(theme: Judiye.Theme) {
  const {colors, spacing, sizing} = theme;

  return StyleSheet.create({
    cont: {
      backgroundColor: colors.background,
      paddingHorizontal: spacing.sm,
      paddingTop: spacing.sm,
      paddingBottom: spacing.nm,
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
      marginLeft: spacing.nm,
    },
    secondPostfixButton: {
      backgroundColor: colors.primary,
      width: sizing.width.nm,
      marginLeft: spacing.nm,
    },
    searchInput: {
      alignSelf: 'center',
    },
  });
}

export default AppBar;
