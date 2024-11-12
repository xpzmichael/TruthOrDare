import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SpinSpeed, TruthQuestionType, DareHardness, Theme } from '@/constants/SettingsEnums';

type Settings = {
  spinSpeed: SpinSpeed;
  truthQuestionType: TruthQuestionType;
  dareHardness: DareHardness;
  theme: Theme;
  setSpinSpeed: (speed: SpinSpeed) => void;
  setTruthQuestionType: (type: TruthQuestionType) => void;
  setDareHardness: (hardness: DareHardness) => void;
  setTheme: (theme: Theme) => void;
  resetSettings: () => void;
  players: number;
  setPlayers: (count: number) => void;
  resetPlayers: () => void;
};

const SettingsContext = createContext<Settings | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [players, setPlayers] = useState<number>(0);
  const [spinSpeed, setSpinSpeed] = useState<SpinSpeed>(SpinSpeed.Normal);
  const [truthQuestionType, setTruthQuestionType] = useState<TruthQuestionType>(TruthQuestionType.Average);
  const [dareHardness, setDareHardness] = useState<DareHardness>(DareHardness.Average);
  const [theme, setTheme] = useState<Theme>(Theme.Light);

  const resetSettings = () => {
    setSpinSpeed(SpinSpeed.Normal);
    setTruthQuestionType(TruthQuestionType.Average);
    setDareHardness(DareHardness.Average);
    setTheme(Theme.Light);
  };

  const resetPlayers = () => {
    setPlayers(0);
  };

  return (
    <SettingsContext.Provider
      value={{
        spinSpeed,
        truthQuestionType,
        dareHardness,
        theme,
        setSpinSpeed,
        setTruthQuestionType,
        setDareHardness,
        setTheme,
        resetSettings,
        players,
        setPlayers,
        resetPlayers,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): Settings => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};