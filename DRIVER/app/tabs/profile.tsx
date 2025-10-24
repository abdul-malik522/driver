
import { ChevronRight, Edit } from 'lucide-react-native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../constraints/colors';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const renderProfileField = (label: string, value: string, onPress?: () => void) => (
    <TouchableOpacity
      style={styles.fieldContainer}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.fieldContent}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <Text style={styles.fieldValue}>{value}</Text>
      </View>
      {onPress && <Edit color={colors.dark.textSecondary} size={20} />}
    </TouchableOpacity>
  );

  const renderMenuItem = (label: string, onPress: () => void) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Text style={styles.menuLabel}>{label}</Text>
      <ChevronRight color={colors.dark.textSecondary} size={20} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>EC</Text>
          </View>
          <Text style={styles.name}>Ethan Carter</Text>
          <Text style={styles.driverId}>Driver ID: 12345</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        {renderProfileField('Name', 'Ethan Carter', () =>
          console.log('Edit name')
        )}
        {renderProfileField('Phone', '+1 (555) 123-4567', () =>
          console.log('Edit phone')
        )}
        {renderProfileField('Truck ID', 'Truck ID: 7890', () =>
          console.log('Edit truck ID')
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        {renderMenuItem('Notifications', () => console.log('Notifications'))}
        {renderMenuItem('Currency', () => console.log('Currency'))}
        {renderMenuItem('Language', () => console.log('Language'))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        {renderMenuItem('Contact Us', () => console.log('Contact us'))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Subscription</Text>
        {renderMenuItem('Subscription', () => navigation.navigate('Subscription'))}
        {renderMenuItem('Payment Methods', () => navigation.navigate('Subscription'))}
      </View>

      <TouchableOpacity
        style={styles.upgradeButton}
        testID="upgrade-button"
        onPress={() => navigation.navigate('Subscription')}
      >
        <Text style={styles.upgradeButtonText}>Upgrade</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.dark.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '700' as const,
    color: colors.dark.text,
  },
  name: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: colors.dark.text,
    marginBottom: 4,
  },
  driverId: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: colors.dark.text,
    marginBottom: 16,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  fieldContent: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.dark.text,
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
  },
  menuLabel: {
    fontSize: 16,
    color: colors.dark.text,
  },
  upgradeButton: {
    backgroundColor: colors.dark.primary,
    borderRadius: 12,
    padding: 18,
    marginHorizontal: 24,
    marginBottom: 32,
    alignItems: 'center',
  },
  upgradeButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.dark.text,
  },
});
