import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Home, BarChart3, Calendar, User } from 'lucide-react-native';

import HomeScreen from '../tabs/home';
import StatisticsScreen from '../tabs/statistics';
import CalendarScreen from '../tabs/calender';
import ProfileScreen from '../tabs/profile';
import SignInScreen from '../sign-in';
import SignUpScreen from '../sign-up';
import NewOrderScreen from '../new-order';
import SubscriptionScreen from '../subscription';
import PaymentSuccessScreen from '../payment-success';
import PaymentFailedScreen from '../payment-failed';
import colors from '../constraints/colors';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.dark.primary,
        tabBarInactiveTintColor: colors.dark.textSecondary,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.dark.cardBackground,
          borderTopColor: colors.dark.border,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500' as const,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <BarChart3 color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Calendar color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // This is a mock login function. In a real app, you'd have a proper auth flow.
  const handleLogin = () => setIsLoggedIn(true);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="NewOrder" component={NewOrderScreen} options={{ presentation: 'modal' }} />
            <Stack.Screen name="Subscription" component={SubscriptionScreen} />
            <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} options={{ presentation: 'modal' }} />
            <Stack.Screen name="PaymentFailed" component={PaymentFailedScreen} options={{ presentation: 'modal' }} />
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn">
              {(props) => <SignInScreen {...props} onLogin={handleLogin} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp">
              {(props) => <SignUpScreen {...props} onLogin={handleLogin} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
