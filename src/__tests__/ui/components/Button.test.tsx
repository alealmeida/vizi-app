// src/__tests__/ui/components/Button.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { DSProvider } from '@ui/theme/provider';
import Button from '@ui/components/atoms/Button';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <DSProvider>{children}</DSProvider>
);

describe('Button Component', () => {
  it('should render correctly with default props', () => {
    const { getByText } = render(
      <TestWrapper>
        <Button>Test Button</Button>
      </TestWrapper>
    );
    
    expect(getByText('Test Button')).toBeTruthy();
  });
  
  it('should handle press events', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <TestWrapper>
        <Button onPress={onPress}>Press Me</Button>
      </TestWrapper>
    );
    
    fireEvent.press(getByText('Press Me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
  
  it('should show loading state', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <Button loading testID="loading-button">Loading</Button>
      </TestWrapper>
    );
    
    expect(getByTestId('loading-button')).toBeTruthy();
  });
  
  it('should be disabled when loading', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <TestWrapper>
        <Button loading onPress={onPress}>Loading Button</Button>
      </TestWrapper>
    );
    
    fireEvent.press(getByText('Loading Button'));
    expect(onPress).not.toHaveBeenCalled();
  });
  
  it('should apply different variants correctly', () => {
    const { getByText } = render(
      <TestWrapper>
        <Button variant="outline">Outline Button</Button>
      </TestWrapper>
    );
    
    expect(getByText('Outline Button')).toBeTruthy();
  });
});
