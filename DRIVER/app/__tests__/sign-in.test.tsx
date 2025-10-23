import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignInScreen from '../sign-in';
import { Alert } from 'react-native';
import { router } from 'expo-router';

jest.mock('expo-router', () => ({
  router: {
    replace: jest.fn(),
  },
}));

jest.spyOn(Alert, 'alert');

import { SafeAreaProvider } from 'react-native-safe-area-context';

describe('SignInScreen', () => {
  it('should show an alert if sign-in is attempted with empty fields', async () => {
    const { getByTestId } = render(
      <SafeAreaProvider
        initialMetrics={{
          frame: { x: 0, y: 0, width: 0, height: 0 },
          insets: { top: 0, left: 0, right: 0, bottom: 0 },
        }}
      >
        <SignInScreen />
      </SafeAreaProvider>
    );

    fireEvent.press(getByTestId('sign-in-button'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Invalid Input', 'Please enter both email and password.');
      expect(router.replace).not.toHaveBeenCalled();
    });
  });
});
