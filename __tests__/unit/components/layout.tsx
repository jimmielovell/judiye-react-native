import React from 'react';
import Column from '../../../src/components/layout/component/column';
import Frame from '../../../src/components/layout/component/frame';
import FView from '../../../src/components/layout/component/fview';
import {render} from '@testing-library/react-native';

it('renders column layout component', () => {
  render(<Column />);
});

it('renders frame layout component', () => {
  render(<Frame />);
});

it('renders fview layout component', () => {
  render(<FView />);
});
