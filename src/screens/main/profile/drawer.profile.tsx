import {StyleSheet} from 'react-native';
import {Flex, Frame} from 'components/layout';
import wrapper from 'hoc/wrapper';
import {useTheme} from 'hooks';

const ProfileDrawer = wrapper(function ProfileDrawer() {
  const theme = useTheme();
  const _style = createStyle(theme);

  return (
    <Frame topBar={false} bottomTab={false} style={_style.frame}>
      <Flex style={_style.wrapper} />
    </Frame>
  );
});

function createStyle(theme: Judiye.Theme) {
  const {colors} = theme;

  return StyleSheet.create({
    frame: {
      backgroundColor: colors.background,
    },
    wrapper: {
      height: '100%',
      width: '100%',
    },
  });
}

export default ProfileDrawer;
