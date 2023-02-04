import {StyleSheet} from 'react-native';
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
  showAvatar?: boolean;
  search?: string; // Placeholder
  firstPostfixButton?: Omit<IconButtonProps, 'appearance'>;
  secondPostfixButton?: Omit<IconButtonProps, 'appearance'>;
}

const AppBar = wrapper(function HomeScreen(props: AppBarProps) {
  const {
    title,
    showBackButton,
    showAvatar,
    search,
    firstPostfixButton,
    secondPostfixButton,
  } = props;
  const theme = useTheme();
  const _style = createStyle(theme);

  return (
    <Flex direction="row" align="center" style={_style.cont}>
      {showBackButton && (
        <Button
          appearance="icon"
          name="ArrowLeft"
          size={34}
          self="center"
          style={_style.backButton}
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
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
    },
    backButton: {
      marginRight: 5,
      backgroundColor: 'transparent',
      marginLeft: -8,
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