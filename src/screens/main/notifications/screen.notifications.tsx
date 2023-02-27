import {Frame} from 'components/layout';
import {Tabs} from 'components/navigation';
import wrapper from 'hoc/wrapper';
import AppBar from '../app-bar';

export const NotificationsHeader = wrapper(function NotificationsHeader() {
  return <AppBar showAvatar title="Notifications" />;
});

const NotificationsScreen = wrapper(function NotificationsScreen() {
  return (
    <Tabs labels={['Priority', 'Updates', 'Promotions']}>
      <Frame />
      <Frame />
      <Frame />
    </Tabs>
  );
});

export default NotificationsScreen;
