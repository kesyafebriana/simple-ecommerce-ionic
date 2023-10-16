import React from 'react';

export interface HistoryItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  transactionId: string;
  date: Date;
}

interface HistoryContext {
  history: HistoryItem[];
  addToHistory: (historyItems: HistoryItem[]) => void; 
}

const HistoryContext = React.createContext<HistoryContext>({
  history: [],
  addToHistory: () => {},
});

export default HistoryContext;
