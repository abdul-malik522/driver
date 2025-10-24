import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignUpScreen from '../sign-up';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
    }),
  };
});

jest.spyOn(Alert, 'alert');

describe('SignUpScreen', () => {
  it('should show an alert if sign-up is attempted with empty fields', async () => {
    const onLogin = jest.fn();
    const { getByTestId } = render(
      <SafeAreaProvider
        initialMetrics={{
          frame: { x: 0, y: 0, width: 0, height: 0 },
          insets: { top: 0, left: 0, right: 0, bottom: 0 },
        }}
      >
        <NavigationContainer>
          <SignUpScreen onLogin={onLogin} />
        </NavigationContainer>
      </SafeAreaProvider>
    );

    fireEvent.press(getByTestId('sign-up-button'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Invalid Input', 'Please fill out all fields.');
      expect(onLogin).not.toHaveBeenCalled();
    });
  });
});
