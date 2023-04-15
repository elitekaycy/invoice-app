import React, { createContext, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

type ThemeContextType = {
  theme: string;
  onSwitchMode: () => void;
};

export const ThemeContextDefault = createContext<ThemeContextType | null>(null);

export const ThemeContext: React.FC<Props> = ({
  children,
}: Props): JSX.Element => {
  const [theme, setTheme] = useState<string>('light');

  const onSwitchMode = (): void =>
    theme === 'light' ? setTheme('dark') : setTheme('light');

  return (
    <ThemeContextDefault.Provider value={{ theme, onSwitchMode }}>
      {children}
    </ThemeContextDefault.Provider>
  );
};
