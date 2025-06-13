import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ViziButton from '../ViziButton'; // Adjust path as necessary
import { theme } from '@/styles/theme'; // Ensure this path is correct for Jest

// Mock theme if it causes issues outside of a full app context,
// or ensure Jest can resolve it via moduleNameMapper.
// For simplicity here, assuming it resolves.

describe('ViziButton', () => {
  it('renders correctly with title', () => {
    const { getByText } = render(<ViziButton title="Test Button" onPress={() => {}} />);
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<ViziButton title="Test Button" onPress={onPressMock} />);
    fireEvent.press(getByText('Test Button'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('shows ActivityIndicator when loading', () => {
    const { queryByText } // Using queryByText to check for absence of title
      = render(
      <ViziButton title="Test Button" onPress={() => {}} loading={true} />
    );
    // React Native Testing Library doesn't directly expose ActivityIndicator by a role easily.
    // We can check that the title is not rendered, or if the ActivityIndicator has a testID.
    // For this example, let's check if the title is absent (as ActivityIndicator replaces it).
    expect(queryByText('Test Button')).toBeNull();
    // If ActivityIndicator had a testID="loading-indicator", we'd use:
    // expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('is disabled when disabled prop is true', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <ViziButton title="Test Button" onPress={onPressMock} disabled={true} />
    );
    fireEvent.press(getByText('Test Button'));
    expect(onPressMock).not.toHaveBeenCalled();
    // Check for disabled styles (opacity) could be more complex and component-dependent
    // For now, checking onPress is sufficient for behavior.
  });

  it('applies filled styles by default', () => {
    const { getByTestId } = render(<ViziButton title="Filled Button" onPress={() => {}} />);
    const button = getByTestId('vizi-button-touchable');
    // Use toHaveStyle from @testing-library/jest-native (via extend-expect)
    // or built-in if RNTL v12.4+ includes it directly.
    expect(button).toHaveStyle({ backgroundColor: theme.colors.primary });
  });

  it('applies outlined styles when variant is outlined', () => {
    const { getByTestId } = render(
      <ViziButton title="Outlined Button" onPress={() => {}} variant="outlined" />
    );
    const button = getByTestId('vizi-button-touchable');
    expect(button).toHaveStyle({ backgroundColor: theme.colors.white });
  });
});
