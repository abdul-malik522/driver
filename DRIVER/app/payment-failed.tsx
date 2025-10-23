import { XCircle, Phone, RotateCcw, ArrowLeft } from 'lucide-react-native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import colors from '@/constants/colors';

export default function PaymentFailedScreen() {
  const insets = useSafeAreaInsets();

  const handleRetryPayment = () => {
    console.log('Retry payment clicked');
    router.back();
  };

  const handleContactSupport = () => {
    console.log('Contact support clicked');
  };

  const handleReturnToOrders = () => {
    console.log('Return to orders clicked');
    router.replace('/(tabs)/home');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 60, paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconContainer}>
          <View style={styles.errorCircle}>
            <XCircle color={colors.dark.error} size={80} strokeWidth={2} />
          </View>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Payment Failed</Text>
          <Text style={styles.subtitle}>
            We couldn&apos;t process your payment of <Text style={styles.amount}>$120.00</Text>
          </Text>
          <Text style={styles.description}>
            Your transaction was declined. This could be due to insufficient funds, incorrect payment details, or network issues.
          </Text>
        </View>

        <View style={styles.errorDetails}>
          <View style={styles.errorRow}>
            <Text style={styles.errorLabel}>Error Code:</Text>
            <Text style={styles.errorValue}>PAY_ERR_4102</Text>
          </View>
          <View style={styles.errorRow}>
            <Text style={styles.errorLabel}>Transaction ID:</Text>
            <Text style={styles.errorValue}>TXN-2024-789456123</Text>
          </View>
          <View style={styles.errorRow}>
            <Text style={styles.errorLabel}>Attempted:</Text>
            <Text style={styles.errorValue}>
              {new Date().toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })}
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleRetryPayment}
            testID="retry-payment-button"
          >
            <RotateCcw color={colors.dark.text} size={20} />
            <Text style={styles.primaryButtonText}>Retry Payment</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleContactSupport}
            testID="contact-support-button"
          >
            <Phone color={colors.dark.primary} size={20} />
            <Text style={styles.secondaryButtonText}>Contact Support</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tertiaryButton}
            onPress={handleReturnToOrders}
            testID="return-to-orders-button"
          >
            <ArrowLeft color={colors.dark.textSecondary} size={20} />
            <Text style={styles.tertiaryButtonText}>Return to Orders</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.background,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  errorCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.dark.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.dark.error,
  },
  imageContainer: {
    marginBottom: 32,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.dark.border,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '800' as const,
    color: colors.dark.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: colors.dark.textSecondary,
    marginBottom: 16,
    textAlign: 'center',
  },
  amount: {
    fontWeight: '700' as const,
    color: colors.dark.error,
  },
  description: {
    fontSize: 15,
    color: colors.dark.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  errorDetails: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  errorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  errorLabel: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    fontWeight: '500' as const,
  },
  errorValue: {
    fontSize: 14,
    color: colors.dark.text,
    fontWeight: '600' as const,
  },
  actions: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: colors.dark.primary,
    borderRadius: 14,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: '700' as const,
    color: colors.dark.text,
  },
  secondaryButton: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 14,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 2,
    borderColor: colors.dark.primary,
  },
  secondaryButtonText: {
    fontSize: 17,
    fontWeight: '700' as const,
    color: colors.dark.primary,
  },
  tertiaryButton: {
    backgroundColor: colors.dark.surface,
    borderRadius: 14,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  tertiaryButtonText: {
    fontSize: 17,
    fontWeight: '600' as const,
    color: colors.dark.textSecondary,
  },
});
