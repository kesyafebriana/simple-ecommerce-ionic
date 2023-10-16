import React, { useState } from "react";
import HistoryContext, { HistoryItem } from "./history-context";

interface HistoryContextProviderProps {
  children: React.ReactNode;
}

const HistoryContextProvider: React.FC<HistoryContextProviderProps> = (props) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const addToHistory = (historyItems: HistoryItem[]) => {
    setHistory((prevHistory) => [...prevHistory, ...historyItems]);
  };

  return (
    <HistoryContext.Provider value={{
      history,
      addToHistory,
    }}>
      {props.children}
    </HistoryContext.Provider>
  );
};

export default HistoryContextProvider;
