import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('should render without crash', () => {
  const wrapper = render(<App />);
  expect(wrapper).toBeDefined();
});
