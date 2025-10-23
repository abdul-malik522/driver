import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../constraints/colors';
import { mockStatistics, mockLeaderboardClients } from '../mocks/statistics';

type TimeFilter = 'week' | 'month' | 'year';
type LeaderboardTab = 'places' | 'clients' | 'leaders';

export default function StatisticsScreen() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('month');
  const [leaderboardTab, setLeaderboardTab] = useState<LeaderboardTab>('clients');

  const maxWeeklyAmount = Math.max(
    ...mockStatistics.salesAndProfits.weeklyData.map((w) => w.amount)
  );
  const maxExpense = Math.max(...Object.values(mockStatistics.expenses.breakdown));

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Statistics</Text>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            timeFilter === 'week' && styles.filterButtonActive,
          ]}
          onPress={() => setTimeFilter('week')}
          testID="filter-week"
        >
          <Text
            style={[
              styles.filterText,
              timeFilter === 'week' && styles.filterTextActive,
            ]}
          >
            Week
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            timeFilter === 'month' && styles.filterButtonActive,
          ]}
          onPress={() => setTimeFilter('month')}
          testID="filter-month"
        >
          <Text
            style={[
              styles.filterText,
              timeFilter === 'month' && styles.filterTextActive,
            ]}
          >
            Month
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            timeFilter === 'year' && styles.filterButtonActive,
          ]}
          onPress={() => setTimeFilter('year')}
          testID="filter-year"
        >
          <Text
            style={[
              styles.filterText,
              timeFilter === 'year' && styles.filterTextActive,
            ]}
          >
            Year
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sales & Profits</Text>
        <Text style={styles.cardAmount}>
          ${mockStatistics.salesAndProfits.total.toLocaleString()}
        </Text>
        <Text
          style={[
            styles.changeText,
            { color: colors.dark.success },
          ]}
        >
          This Month +{mockStatistics.salesAndProfits.change}%
        </Text>

        <View style={styles.chartContainer}>
          {mockStatistics.salesAndProfits.weeklyData.map((week, index) => {
            const heightPercentage = (week.amount / maxWeeklyAmount) * 100;
            return (
              <View key={index} style={styles.barContainer}>
                <View style={styles.barWrapper}>
                  <View
                    style={[
                      styles.bar,
                      { height: `${heightPercentage}%` },
                    ]}
                  />
                </View>
                <Text style={styles.barLabel}>{week.week}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Expenses Breakdown</Text>
        <Text style={styles.cardAmount}>
          ${mockStatistics.expenses.total.toLocaleString()}
        </Text>
        <Text
          style={[
            styles.changeText,
            { color: colors.dark.success },
          ]}
        >
          This Month {mockStatistics.expenses.change}%
        </Text>

        <View style={styles.expensesContainer}>
          {Object.entries(mockStatistics.expenses.breakdown).map(
            ([key, value]) => {
              const widthPercentage = (value / maxExpense) * 100;
              return (
                <View key={key} style={styles.expenseRow}>
                  <Text style={styles.expenseLabel}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Text>
                  <View style={styles.expenseBarContainer}>
                    <View
                      style={[
                        styles.expenseBar,
                        { width: `${widthPercentage}%` },
                      ]}
                    />
                  </View>
                </View>
              );
            }
          )}
        </View>
      </View>

      <View style={styles.leaderboardSection}>
        <Text style={styles.sectionTitle}>Leaderboard</Text>

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              leaderboardTab === 'places' && styles.tabActive,
            ]}
            onPress={() => setLeaderboardTab('places')}
            testID="tab-places"
          >
            <Text
              style={[
                styles.tabText,
                leaderboardTab === 'places' && styles.tabTextActive,
              ]}
            >
              Most visited places
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              leaderboardTab === 'clients' && styles.tabActive,
            ]}
            onPress={() => setLeaderboardTab('clients')}
            testID="tab-clients"
          >
            <Text
              style={[
                styles.tabText,
                leaderboardTab === 'clients' && styles.tabTextActive,
              ]}
            >
              Clients
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              leaderboardTab === 'leaders' && styles.tabActive,
            ]}
            onPress={() => setLeaderboardTab('leaders')}
            testID="tab-leaders"
          >
            <Text
              style={[
                styles.tabText,
                leaderboardTab === 'leaders' && styles.tabTextActive,
              ]}
            >
              Sales leaders
            </Text>
          </TouchableOpacity>
        </View>

        {mockLeaderboardClients.map((client) => (
          <View key={client.id} style={styles.leaderboardItem}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {client.name.charAt(0)}
              </Text>
            </View>
            <View style={styles.leaderboardInfo}>
              <Text style={styles.leaderboardName}>{client.name}</Text>
              <Text style={styles.leaderboardAmount}>
                ${client.amount.toLocaleString()}
              </Text>
            </View>
          </View>
        ))}
      </View>
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
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: colors.dark.text,
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
  card: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 24,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.dark.text,
    marginBottom: 8,
  },
  cardAmount: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: colors.dark.text,
    marginBottom: 4,
  },
  changeText: {
    fontSize: 14,
    marginBottom: 24,
  },
  chartContainer: {
    flexDirection: 'row',
    height: 120,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 12,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
  },
  barWrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  bar: {
    backgroundColor: colors.dark.surface,
    borderRadius: 4,
    width: '100%',
  },
  barLabel: {
    fontSize: 10,
    color: colors.dark.textSecondary,
    textAlign: 'center',
  },
  expensesContainer: {
    gap: 16,
  },
  expenseRow: {
    gap: 8,
  },
  expenseLabel: {
    fontSize: 14,
    color: colors.dark.text,
    marginBottom: 4,
  },
  expenseBarContainer: {
    height: 8,
    backgroundColor: colors.dark.surface,
    borderRadius: 4,
    overflow: 'hidden',
  },
  expenseBar: {
    height: '100%',
    backgroundColor: colors.dark.textSecondary,
    borderRadius: 4,
  },
  leaderboardSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: colors.dark.text,
    marginBottom: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 8,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: colors.dark.text,
  },
  tabText: {
    fontSize: 12,
    color: colors.dark.textSecondary,
  },
  tabTextActive: {
    color: colors.dark.text,
    fontWeight: '600' as const,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.dark.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: colors.dark.text,
  },
  leaderboardInfo: {
    flex: 1,
  },
  leaderboardName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.dark.text,
    marginBottom: 2,
  },
  leaderboardAmount: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
});
