import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Avatar from './_/avatar';

it('renders Avatar component', () => {
  renderer.create(<Avatar source={{
    uri: 'https://reactnative.dev/img/tiny_logo.png'
  }} />);
});

// Test for border radius

// Test for size and width and height don't affect the size

// Test for initials if image source is not supplied
