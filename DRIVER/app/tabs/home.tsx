import { useNavigation } from '@react-navigation/native';
import { Truck, Plus } from 'lucide-react-native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import colors from '../constraints/colors';
import { mockOrders } from '../mocks/orders';
import { Order } from '../types';

type FilterType = 'day' | 'week';

export default function HomeScreen() {
  const [filter, setFilter] = useState<FilterType>('day');
  const navigation = useNavigation();

  const filteredOrders = mockOrders.filter(() => true);

  const renderOrder = ({ item }: { item: Order }) => (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={() => console.log('Order clicked:', item.id)}
      testID={`order-${item.id}`}
    >
      <View style={styles.orderIcon}>
        <Truck color={colors.dark.text} size={24} />
      </View>
      <View style={styles.orderInfo}>
        <Text style={styles.orderTitle}>{item.clientName}</Text>
        <Text style={styles.orderLocation}>{item.location}</Text>
        <Text style={styles.orderTime}>
          {item.date}, {item.time}
        </Text>
      </View>
      <Text style={styles.orderAmount}>${item.salesAmount.toLocaleString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Orders</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('NewOrder')}
          testID="add-order-button"
        >
          <Plus color={colors.dark.text} size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'day' && styles.filterButtonActive]}
          onPress={() => setFilter('day')}
          testID="filter-day"
        >
          <Text
            style={[styles.filterText, filter === 'day' && styles.filterTextActive]}
          >
            Day
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'week' && styles.filterButtonActive]}
          onPress={() => setFilter('week')}
          testID="filter-week"
        >
          <Text
            style={[styles.filterText, filter === 'week' && styles.filterTextActive]}
          >
            Week
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredOrders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: colors.dark.text,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.dark.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
    backgroundColor: colors.dark.surface,
    marginHorizontal: 24,
    borderRadius: 12,
    padding: 4,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: colors.dark.background,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: colors.dark.textSecondary,
  },
  filterTextActive: {
    color: colors.dark.text,
    fontWeight: '600' as const,
  },
  list: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  orderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  orderIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: colors.dark.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  orderInfo: {
    flex: 1,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.dark.text,
    marginBottom: 4,
  },
  orderLocation: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginBottom: 2,
  },
  orderTime: {
    fontSize: 12,
    color: colors.dark.textSecondary,
  },
  orderAmount: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: colors.dark.text,
  },
});
