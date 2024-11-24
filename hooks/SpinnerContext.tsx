import React, { createContext, useContext, ReactNode, useState } from 'react';

interface SpinnerContextProps {
  numElements: number;
  highlightedIndex: number;
  ballWidth: number;
  spinnerCircleRadius: number;
  circleContainerBorderWidth: number;
  circleContainerWidth: number;
  reset: boolean;
  locked: boolean;
  radius: number;
  setNumElements: React.Dispatch<React.SetStateAction<number>>;
  setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>;
  setBallWidth: React.Dispatch<React.SetStateAction<number>>;
  setSpinnerCircleRadius: React.Dispatch<React.SetStateAction<number>>;
  setCircleContainerBorderWidth: React.Dispatch<React.SetStateAction<number>>;
  setCircleContainerWidth: React.Dispatch<React.SetStateAction<number>>;
  setReset: React.Dispatch<React.SetStateAction<boolean>>;
  setLocked: React.Dispatch<React.SetStateAction<boolean>>;
  setRadius: React.Dispatch<React.SetStateAction<number>>;
}

const SpinnerContext = createContext<SpinnerContextProps | undefined>(undefined);

export const SpinnerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [numElements, setNumElements] = useState<number>(0);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const [ballWidth, setBallWidth] = useState<number>(0);
  const [spinnerCircleRadius, setSpinnerCircleRadius] = useState<number>(0);
  const [circleContainerBorderWidth, setCircleContainerBorderWidth] = useState<number>(0);
  const [circleContainerWidth, setCircleContainerWidth] = useState<number>(0);
  const [reset, setReset] = useState<boolean>(false);
  const [locked, setLocked] = useState<boolean>(false);
  const [radius, setRadius] = useState<number>(0);

  return (
    <SpinnerContext.Provider
      value={{
        numElements,
        highlightedIndex,
        ballWidth,
        spinnerCircleRadius,
        circleContainerBorderWidth,
        circleContainerWidth,
        reset,
        locked,
        radius,
        setNumElements,
        setHighlightedIndex,
        setBallWidth,
        setSpinnerCircleRadius,
        setCircleContainerBorderWidth,
        setCircleContainerWidth,
        setReset,
        setLocked,
        setRadius,
      }}
    >
      {children}
    </SpinnerContext.Provider>
  );
};

export const useSpinnerContext = () => {
  const context = useContext(SpinnerContext);
  if (!context) {
    throw new Error('useSpinnerContext must be used within a SpinnerProvider');
  }
  return context;
};