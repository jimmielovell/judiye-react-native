import {FlexProps, Frame} from 'components/layout';
import wrapper from 'hoc/wrapper';
import {StyleSheet} from 'react-native';
import {useTheme} from 'hooks';
import {Text} from 'components/typography';

interface AuthFrameProps extends FlexProps {
  subTitle: string;
}

const AuthFrame = wrapper(function AuthFrame(props: AuthFrameProps) {
  const {children, subTitle} = props;
  const theme = useTheme();
  const _style = createStyle(theme);

  return (
    <Frame bottomTab={false} topBar={false} style={_style.frame}>
      <Text align="center" size="title" style={_style.title}>
        Judiye
      </Text>
      <Text align="center" size="subtitle" style={_style.subTitle}>
        {subTitle}
      </Text>
      {children}
    </Frame>
  );
});

function createStyle(theme: Judiye.Theme) {
  const {spacing} = theme;

  return StyleSheet.create({
    frame: {
      paddingHorizontal: spacing.md,
      height: '100%',
    },
    title: {
      marginVertical: theme.spacing.lg,
    },
    subTitle: {
      marginBottom: theme.spacing.lg,
    },
  });
}

export default AuthFrame;
