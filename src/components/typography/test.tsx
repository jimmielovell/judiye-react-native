import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Text from './_/text';

it('renders Text component', () => {
  renderer.create(
    <Text>This text is pressable</Text>
  );
});
