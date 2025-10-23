import { Statistics, LeaderboardClient } from '@/types';

export const mockStatistics: Statistics = {
  salesAndProfits: {
    total: 12500,
    change: 15,
    weeklyData: [
      { week: 'Week 1', amount: 2800 },
      { week: 'Week 2', amount: 3500 },
      { week: 'Week 3', amount: 2300 },
      { week: 'Week 4', amount: 3900 },
    ],
  },
  expenses: {
    total: 3200,
    change: -5,
    breakdown: {
      fuel: 800,
      maintenance: 1200,
      tolls: 200,
      other: 1000,
    },
  },
};

export const mockLeaderboardClients: LeaderboardClient[] = [
  {
    id: '1',
    name: 'Acme Corp',
    amount: 5200,
  },
  {
    id: '2',
    name: 'Global Logistics',
    amount: 4800,
  },
  {
    id: '3',
    name: 'Trans-America',
    amount: 2500,
  },
];
