export const mockStatistics = {
  salesAndProfits: {
    weeklyData: [
      { day: 'Mon', amount: 1200 },
      { day: 'Tue', amount: 1800 },
      { day: 'Wed', amount: 1500 },
      { day: 'Thu', amount: 2200 },
      { day: 'Fri', amount: 2500 },
      { day: 'Sat', amount: 1900 },
      { day: 'Sun', amount: 1300 },
    ],
    monthlyData: [
      { week: 'Week 1', amount: 8500 },
      { week: 'Week 2', amount: 9200 },
      { week: 'Week 3', amount: 7800 },
      { week: 'Week 4', amount: 10500 },
    ],
    yearlyData: [
      { month: 'Jan', amount: 35000 },
      { month: 'Feb', amount: 32000 },
      { month: 'Mar', amount: 38000 },
      { month: 'Apr', amount: 42000 },
      { month: 'May', amount: 45000 },
      { month: 'Jun', amount: 48000 },
      { month: 'Jul', amount: 52000 },
      { month: 'Aug', amount: 49000 },
      { month: 'Sep', amount: 47000 },
      { month: 'Oct', amount: 51000 },
      { month: 'Nov', amount: 54000 },
      { month: 'Dec', amount: 58000 },
    ],
    totalSales: 499500,
    totalProfit: 175000,
    profitPercentage: 35,
  },
  expenses: {
    total: 324500,
    breakdown: {
      fuel: 85000,
      maintenance: 45000,
      repairs: 35000,
      blockers: 60000,
      assistants: 55000,
      drivers: 40000,
      express: 4500,
    },
  },
};

export const mockLeaderboardClients = [
  { id: '1', name: 'ABC Construction', orders: 45, amount: 125000 },
  { id: '2', name: 'XYZ Builders', orders: 38, amount: 98000 },
  { id: '3', name: 'City Development', orders: 32, amount: 87500 },
  { id: '4', name: 'Modern Homes', orders: 29, amount: 76000 },
  { id: '5', name: 'Premier Projects', orders: 25, amount: 68000 },
];

export const mockLeaderboardPlaces = [
  { id: '1', name: 'Downtown', orders: 120, amount: 320000 },
  { id: '2', name: 'North District', orders: 95, amount: 245000 },
  { id: '3', name: 'West Side', orders: 85, amount: 210000 },
  { id: '4', name: 'East End', orders: 75, amount: 185000 },
  { id: '5', name: 'South Park', orders: 65, amount: 160000 },
];

export const mockLeaderboardDrivers = [
  { id: '1', name: 'John Smith', orders: 85, amount: 210000 },
  { id: '2', name: 'Mike Johnson', orders: 78, amount: 195000 },
  { id: '3', name: 'David Williams', orders: 72, amount: 180000 },
  { id: '4', name: 'Robert Brown', orders: 68, amount: 170000 },
  { id: '5', name: 'James Davis', orders: 62, amount: 155000 },
];