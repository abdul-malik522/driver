import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from './constraints/colors';

export default function SignUpScreen() {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [truckId, setTruckId] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !truckId.trim() || !password.trim()) {
      Alert.alert('Invalid Input', 'Please fill out all fields.');
      return;
    }
    console.log('Sign up:', { name, email, phone, truckId, password });
    router.replace({ pathname: '/tabs/home' } as any);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 60 }]}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          testID="back-button"
        >
          <ChevronLeft color={colors.dark.text} size={24} />
        </TouchableOpacity>

        <Text style={styles.title}>Sign Up</Text>

        <View style={styles.form}>
          <View>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor={colors.dark.textSecondary}
              value={name}
              onChangeText={setName}
              testID="name-input"
            />
          </View>

          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={colors.dark.textSecondary}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              testID="email-input"
            />
          </View>

          <View>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              placeholderTextColor={colors.dark.textSecondary}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              testID="phone-input"
            />
          </View>

          <View>
            <Text style={styles.label}>Truck ID / Number Plate</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your truck ID"
              placeholderTextColor={colors.dark.textSecondary}
              value={truckId}
              onChangeText={setTruckId}
              testID="truck-id-input"
            />
          </View>

          <View>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor={colors.dark.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              testID="password-input"
            />
          </View>

          <TouchableOpacity
            style={styles.signUpButton}
            onPress={handleSignUp}
            testID="sign-up-button"
          >
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push({ pathname: '/sign-in' } as any)}>
            <Text style={styles.signInText}>
              Already have an account? <Text style={styles.signInLink}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  backButton: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: colors.dark.text,
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    gap: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.dark.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.dark.inputBackground,
    borderRadius: 12,
    padding: 18,
    fontSize: 16,
    color: colors.dark.text,
    borderWidth: 1,
    borderColor: colors.dark.inputBorder,
  },
  signUpButton: {
    backgroundColor: colors.dark.primary,
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 8,
  },
  signUpButtonText: {
    color: colors.dark.text,
    fontSize: 16,
    fontWeight: '600' as const,
  },
  signInText: {
    color: colors.dark.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  signInLink: {
    color: colors.dark.text,
    textDecorationLine: 'underline',
  },
});
