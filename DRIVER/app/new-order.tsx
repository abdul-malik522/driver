import { router } from 'expo-router';
import { X, Camera } from 'lucide-react-native';
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '@/constants/colors';

export default function NewOrderScreen() {
  const insets = useSafeAreaInsets();
  const [clientName, setClientName] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [quantity, setQuantity] = useState('');
  const [numberOfWorkers, setNumberOfWorkers] = useState('');
  const [materialType, setMaterialType] = useState('');
  const [salesAmount, setSalesAmount] = useState('');
  const [fuel, setFuel] = useState('');
  const [maintenance, setMaintenance] = useState('');
  const [repairs, setRepairs] = useState('');
  const [blockers, setBlockers] = useState('');
  const [assistant, setAssistant] = useState('');
  const [drivers, setDrivers] = useState('');
  const [express, setExpress] = useState('');

  const totalExpenses = useMemo(() => {
    const sum =
      Number(fuel || 0) +
      Number(maintenance || 0) +
      Number(repairs || 0) +
      Number(blockers || 0) +
      Number(assistant || 0) +
      Number(drivers || 0) +
      Number(express || 0);
    return sum;
  }, [fuel, maintenance, repairs, blockers, assistant, drivers, express]);

  const profit = useMemo(() => {
    return Number(salesAmount || 0) - totalExpenses;
  }, [salesAmount, totalExpenses]);

  const handleSaveOrder = () => {
    console.log('Saving order...');
    router.back();
  };

  const handleMarkCompleted = () => {
    console.log('Marking as completed...');
    router.back();
  };

  const handleSchedule = () => {
    console.log('Scheduling...');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.closeButton}
          testID="close-button"
        >
          <X color={colors.dark.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Order</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Client Information</Text>
          <TextInput
            style={styles.input}
            placeholder="Client Name"
            placeholderTextColor={colors.dark.textSecondary}
            value={clientName}
            onChangeText={setClientName}
            testID="client-name-input"
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            placeholderTextColor={colors.dark.textSecondary}
            value={location}
            onChangeText={setLocation}
            testID="location-input"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor={colors.dark.textSecondary}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            testID="phone-input"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            placeholderTextColor={colors.dark.textSecondary}
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
            testID="quantity-input"
          />
          <TextInput
            style={styles.input}
            placeholder="Number of Workers"
            placeholderTextColor={colors.dark.textSecondary}
            value={numberOfWorkers}
            onChangeText={setNumberOfWorkers}
            keyboardType="numeric"
            testID="workers-input"
          />
          <TextInput
            style={styles.input}
            placeholder="Material Type"
            placeholderTextColor={colors.dark.textSecondary}
            value={materialType}
            onChangeText={setMaterialType}
            testID="material-input"
          />
          <TextInput
            style={styles.input}
            placeholder="Sales Amount"
            placeholderTextColor={colors.dark.textSecondary}
            value={salesAmount}
            onChangeText={setSalesAmount}
            keyboardType="numeric"
            testID="sales-input"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Expenses</Text>
          <TextInput
            style={styles.input}
            placeholder="Fuel"
            placeholderTextColor={colors.dark.textSecondary}
            value={fuel}
            onChangeText={setFuel}
            keyboardType="numeric"
            testID="fuel-input"
          />
          <TextInput
            style={styles.input}
            placeholder="Maintenance"
            placeholderTextColor={colors.dark.textSecondary}
            value={maintenance}
            onChangeText={setMaintenance}
            keyboardType="numeric"
            testID="maintenance-input"
          />
          <TextInput
            style={styles.input}
            placeholder="Repairs & Fixes"
            placeholderTextColor={colors.dark.textSecondary}
            value={repairs}
            onChangeText={setRepairs}
            keyboardType="numeric"
            testID="repairs-input"
          />
          <TextInput
            style={styles.input}
            placeholder="Blockers Amount"
            placeholderTextColor={colors.dark.textSecondary}
            value={blockers}
            onChangeText={setBlockers}
            keyboardType="numeric"
            testID="blockers-input"
          />
          <TextInput
            style={styles.input}
            placeholder="Assistant Amount"
            placeholderTextColor={colors.dark.textSecondary}
            value={assistant}
            onChangeText={setAssistant}
            keyboardType="numeric"
            testID="assistant-input"
          />
          <TextInput
            style={styles.input}
            placeholder="Drivers Amount"
            placeholderTextColor={colors.dark.textSecondary}
            value={drivers}
            onChangeText={setDrivers}
            keyboardType="numeric"
            testID="drivers-input"
          />
          <TextInput
            style={styles.input}
            placeholder="Express"
            placeholderTextColor={colors.dark.textSecondary}
            value={express}
            onChangeText={setExpress}
            keyboardType="numeric"
            testID="express-input"
          />
        </View>

        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Expenses</Text>
            <Text style={styles.summaryValue}>${totalExpenses.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Profit</Text>
            <Text
              style={[
                styles.summaryValue,
                { color: profit >= 0 ? colors.dark.success : colors.dark.error },
              ]}
            >
              ${profit.toFixed(2)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleSaveOrder}
          testID="save-button"
        >
          <Text style={styles.primaryButtonText}>Save Order</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleMarkCompleted}
          testID="complete-button"
        >
          <Text style={styles.secondaryButtonText}>Mark as Completed</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleSchedule}
          testID="schedule-button"
        >
          <Text style={styles.secondaryButtonText}>Schedule</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => console.log('Add expense item')}
          testID="add-expense-button"
        >
          <Text style={styles.secondaryButtonText}>Add Expense Item</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.photoButton}
          onPress={() => console.log('Attach photo')}
          testID="photo-button"
        >
          <Camera color={colors.dark.text} size={20} />
          <Text style={styles.photoButtonText}>Attach Photo</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.dark.border,
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: colors.dark.text,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: colors.dark.text,
    marginBottom: 12,
  },
  input: {
    backgroundColor: colors.dark.inputBackground,
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: colors.dark.text,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.dark.inputBorder,
  },
  summarySection: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: colors.dark.text,
  },
  primaryButton: {
    backgroundColor: colors.dark.primary,
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.dark.text,
  },
  secondaryButton: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.dark.text,
  },
  photoButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  photoButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.dark.text,
  },
});
