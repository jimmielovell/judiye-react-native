import {FlexProps, Frame} from 'components/layout';
import wrapper from 'hoc/wrapper';
import {StyleSheet} from 'react-native';
import {useTheme} from 'hooks';
import {Text} from 'components/typography';
import {Icon} from 'components/datadisplay';

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
      <Icon name="Watfoe" size={70} style={_style.icon} />
    </Frame>
  );
});

function createStyle(theme: Judiye.Theme) {
  const {spacing} = theme;

  return StyleSheet.create({
    frame: {
      paddingHorizontal: spacing.md,
      height: '100%',
      position: 'relative',
    },
    title: {
      marginTop: theme.spacing.xlg,
      marginBottom: theme.spacing.xlg,
    },
    subTitle: {
      marginBottom: theme.spacing.lg,
    },
    icon: {
      position: 'absolute',
      bottom: 0,
    },
  });
}

export default AuthFrame;
