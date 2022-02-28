import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <StatusBar
          backgroundColor="#fff"
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
