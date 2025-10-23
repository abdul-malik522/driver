import { Check, Lock, ChevronRight } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { Stack, router } from 'expo-router';
import colors from '@/constants/colors';

type BillingPeriod = 'monthly' | 'yearly';

const FREE_FEATURES = [
  'Basic order tracking',
  'Up to 10 orders per month',
  'Basic statistics',
  'Email support',
];

const PAID_FEATURES = [
  'Unlimited order tracking',
  'Advanced analytics',
  'Priority support',
  'Calendar integration',
  'Export reports',
  'Custom notifications',
  'Team collaboration',
];

const PRICING = {
  monthly: 29.99,
  yearly: 299.99,
};

export default function SubscriptionScreen() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const [activePlan] = useState<'free' | 'paid'>('free');
  const [trialDaysLeft] = useState<number>(30);

  const isYearly = billingPeriod === 'yearly';
  const yearlyDiscount = Math.round(
    ((PRICING.monthly * 12 - PRICING.yearly) / (PRICING.monthly * 12)) * 100
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Subscription',
          headerStyle: {
            backgroundColor: colors.dark.background,
          },
          headerTintColor: colors.dark.text,
          headerShadowVisible: false,
        }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.billingToggle}>
          <Text
            style={[
              styles.billingLabel,
              !isYearly && styles.billingLabelActive,
            ]}
          >
            Monthly
          </Text>
          <Switch
            value={isYearly}
            onValueChange={(value) =>
              setBillingPeriod(value ? 'yearly' : 'monthly')
            }
            trackColor={{
              false: colors.dark.surface,
              true: colors.dark.primary,
            }}
            thumbColor={colors.dark.text}
            testID="billing-toggle"
          />
          <View style={styles.yearlyContainer}>
            <Text
              style={[
                styles.billingLabel,
                isYearly && styles.billingLabelActive,
              ]}
            >
              Yearly
            </Text>
            {isYearly && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>Save {yearlyDiscount}%</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.planCard}>
          <View style={styles.planHeader}>
            <View style={styles.planTitleRow}>
              <Text style={styles.planTitle}>Free Plan</Text>
              {activePlan === 'free' && (
                <View style={styles.activeBadge}>
                  <Check color={colors.dark.success} size={16} />
                  <Text style={styles.activeBadgeText}>Active</Text>
                </View>
              )}
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.price}>$0</Text>
              <Text style={styles.pricePeriod}>/month</Text>
            </View>
            <Text style={styles.trialText}>
              {trialDaysLeft} days left in trial
            </Text>
          </View>

          <View style={styles.featuresContainer}>
            {FREE_FEATURES.map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <Check color={colors.dark.primary} size={20} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.planCard}>
          <View style={styles.planHeader}>
            <View style={styles.planTitleRow}>
              <Text style={styles.planTitle}>Pro Plan</Text>
              <View style={styles.lockedBadge}>
                <Lock color={colors.dark.textSecondary} size={16} />
                <Text style={styles.lockedBadgeText}>Locked</Text>
              </View>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.price}>
                ${isYearly ? PRICING.yearly : PRICING.monthly}
              </Text>
              <Text style={styles.pricePeriod}>
                /{isYearly ? 'year' : 'month'}
              </Text>
            </View>
            {isYearly && (
              <Text style={styles.equivalentPrice}>
                ${(PRICING.yearly / 12).toFixed(2)}/month
              </Text>
            )}
          </View>

          <View style={styles.featuresContainer}>
            {PAID_FEATURES.map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <Check color={colors.dark.primary} size={20} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.upgradeButton}
            onPress={() => {
              const shouldSucceed = Math.random() > 0.5;
              console.log('Upgrade to Pro clicked, simulating:', shouldSucceed ? 'success' : 'failure');
              router.push(shouldSucceed ? '/payment-success' : '/payment-failed');
            }}
            testID="upgrade-pro-button"
          >
            <Text style={styles.upgradeButtonText}>Upgrade to Pro</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>

          <TouchableOpacity
            style={styles.paymentMethodCard}
            testID="mtn-payment-method"
          >
            <View style={styles.paymentMethodContent}>
              <View style={styles.mtnIcon}>
                <Text style={styles.mtnIconText}>MTN</Text>
              </View>
              <View style={styles.paymentMethodInfo}>
                <Text style={styles.paymentMethodName}>MTN Mobile Money</Text>
                <Text style={styles.paymentMethodDescription}>
                  Fast and secure payment
                </Text>
              </View>
            </View>
            <ChevronRight color={colors.dark.textSecondary} size={20} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addPaymentButton}
            testID="add-payment-method"
          >
            <Text style={styles.addPaymentButtonText}>
              + Add Payment Method
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Billing Information</Text>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Next billing date</Text>
              <Text style={styles.infoValue}>
                {new Date(
                  Date.now() + trialDaysLeft * 24 * 60 * 60 * 1000
                ).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Plan type</Text>
              <Text style={styles.infoValue}>Free Trial</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Auto-renewal</Text>
              <Text style={styles.infoValue}>Disabled</Text>
            </View>
          </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  billingToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  billingLabel: {
    fontSize: 16,
    color: colors.dark.textSecondary,
    fontWeight: '600' as const,
  },
  billingLabelActive: {
    color: colors.dark.text,
  },
  yearlyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  discountBadge: {
    backgroundColor: colors.dark.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  discountText: {
    fontSize: 12,
    fontWeight: '700' as const,
    color: colors.dark.text,
  },
  planCard: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.dark.border,
  },
  planHeader: {
    marginBottom: 20,
  },
  planTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  planTitle: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: colors.dark.text,
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dark.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  activeBadgeText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: colors.dark.success,
  },
  lockedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dark.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  lockedBadgeText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: colors.dark.textSecondary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  price: {
    fontSize: 36,
    fontWeight: '700' as const,
    color: colors.dark.text,
  },
  pricePeriod: {
    fontSize: 16,
    color: colors.dark.textSecondary,
    marginLeft: 4,
  },
  trialText: {
    fontSize: 14,
    color: colors.dark.primary,
    fontWeight: '600' as const,
  },
  equivalentPrice: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
  featuresContainer: {
    gap: 12,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 15,
    color: colors.dark.text,
    flex: 1,
  },
  upgradeButton: {
    backgroundColor: colors.dark.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  upgradeButtonText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: colors.dark.text,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: colors.dark.text,
    marginBottom: 16,
  },
  paymentMethodCard: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  paymentMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  mtnIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFCC00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mtnIconText: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: '#000000',
  },
  paymentMethodInfo: {
    flex: 1,
  },
  paymentMethodName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.dark.text,
    marginBottom: 2,
  },
  paymentMethodDescription: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
  addPaymentButton: {
    backgroundColor: colors.dark.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.dark.border,
    borderStyle: 'dashed',
  },
  addPaymentButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.dark.primary,
  },
  infoCard: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 15,
    color: colors.dark.textSecondary,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: colors.dark.text,
  },
});
