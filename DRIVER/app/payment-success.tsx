import { CheckCircle2, User, Home } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import colors from '@/constants/colors';

export default function PaymentSuccessScreen() {
  const insets = useSafeAreaInsets();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, fadeAnim]);

  const handleGoToProfile = () => {
    console.log('Go to profile clicked');
    router.replace('/(tabs)/profile');
  };

  const handleReturnToHome = () => {
    console.log('Return to home clicked');
    router.replace('/(tabs)/home');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View style={[
        styles.content,
        { paddingTop: insets.top + 80, paddingBottom: insets.bottom + 20 },
      ]}>
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.successCircle}>
            <View style={styles.successRing} />
            <CheckCircle2
              color={colors.dark.success}
              size={90}
              strokeWidth={2.5}
            />
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.textContent,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Text style={styles.title}>Payment Successful!</Text>
          <Text style={styles.subtitle}>
            Your subscription has been activated
          </Text>
          <Text style={styles.description}>
            Thank you for upgrading to Pro. You now have access to all premium features.
          </Text>

          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Plan</Text>
              <Text style={styles.detailValue}>Pro Monthly</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Amount Paid</Text>
              <Text style={styles.detailValue}>$29.99</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Next Billing</Text>
              <Text style={styles.detailValue}>
                {new Date(
                  Date.now() + 30 * 24 * 60 * 60 * 1000
                ).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Transaction ID</Text>
              <Text style={styles.detailValueSmall}>TXN-2024-123456789</Text>
            </View>
          </View>

          <View style={styles.featuresList}>
            <Text style={styles.featuresTitle}>What&apos;s included:</Text>
            <View style={styles.featureItem}>
              <View style={styles.checkmark}>
                <CheckCircle2 color={colors.dark.success} size={18} />
              </View>
              <Text style={styles.featureText}>Unlimited order tracking</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.checkmark}>
                <CheckCircle2 color={colors.dark.success} size={18} />
              </View>
              <Text style={styles.featureText}>Advanced analytics</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.checkmark}>
                <CheckCircle2 color={colors.dark.success} size={18} />
              </View>
              <Text style={styles.featureText}>Priority support</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.actions,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleGoToProfile}
            testID="go-to-profile-button"
          >
            <User color={colors.dark.text} size={20} />
            <Text style={styles.primaryButtonText}>Go to Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleReturnToHome}
            testID="return-to-home-button"
          >
            <Home color={colors.dark.textSecondary} size={20} />
            <Text style={styles.secondaryButtonText}>Return to Home</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  successCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.dark.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  successRing: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 3,
    borderColor: colors.dark.success,
    opacity: 0.2,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 34,
    fontWeight: '800' as const,
    color: colors.dark.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: colors.dark.success,
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: '600' as const,
  },
  description: {
    fontSize: 16,
    color: colors.dark.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  detailsCard: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  divider: {
    height: 1,
    backgroundColor: colors.dark.border,
    marginVertical: 4,
  },
  detailLabel: {
    fontSize: 15,
    color: colors.dark.textSecondary,
    fontWeight: '500' as const,
  },
  detailValue: {
    fontSize: 15,
    color: colors.dark.text,
    fontWeight: '700' as const,
  },
  detailValueSmall: {
    fontSize: 13,
    color: colors.dark.text,
    fontWeight: '600' as const,
  },
  featuresList: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.dark.success,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: colors.dark.text,
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  checkmark: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 15,
    color: colors.dark.text,
    flex: 1,
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
    backgroundColor: colors.dark.surface,
    borderRadius: 14,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  secondaryButtonText: {
    fontSize: 17,
    fontWeight: '600' as const,
    color: colors.dark.textSecondary,
  },
});
