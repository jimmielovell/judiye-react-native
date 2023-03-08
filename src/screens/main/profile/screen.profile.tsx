import {Frame} from 'components/layout';
import {Tabs} from 'components/navigation';
import wrapper from 'hoc/wrapper';
import AppBar from '../app-bar';

export const ProfileHeader = wrapper(function ProfileHeader() {
  return <AppBar showBackButton showAvatar title="Jimmie Lovell" />;
});

const ProfileScreen = wrapper(function ProfileScreen() {
  return (
    <Tabs labels={['Work', 'Highlights', 'Spaces']}>
      <Frame />
      <Frame />
      <Frame />
    </Tabs>
  );
});

export default ProfileScreen;
