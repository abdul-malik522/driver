export interface Order {
    id: string;
    clientName: string;
    location: string;
    phoneNumber: string;
    quantity: string;
    numberOfWorkers: string;
    materialType: string;
    salesAmount: number;
    expenses: {
      fuel: number;
      maintenance: number;
      repairsAndFixes: number;
      blockersAmount: number;
      assistantAmount: number;
      driversAmount: number;
      express: number;
    };
    date: string;
    time: string;
    status: 'pending' | 'completed' | 'scheduled';
  }
  
  export interface Driver {
    id: string;
    name: string;
    email: string;
    phone: string;
    truckId: string;
    avatar?: string;
  }
  
  export interface LeaderboardClient {
    id: string;
    name: string;
    amount: number;
    avatar?: string;
  }
  
  export interface Statistics {
    salesAndProfits: {
      total: number;
      change: number;
      weeklyData: {
        week: string;
        amount: number;
      }[];
    };
    expenses: {
      total: number;
      change: number;
      breakdown: {
        fuel: number;
        maintenance: number;
        tolls: number;
        other: number;
      };
    };
  }
  