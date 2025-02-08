import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeContextType {
  isDarkMode: boolean;
  isHighContrast: boolean;
  isLargeText: boolean;
  reduceMotion: boolean;
  enhancedFocus: boolean;
  isLargeTouchTargets: boolean;
  isHapticFeedback: boolean;
  toggleDarkMode: () => void;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  toggleReduceMotion: () => void;
  toggleEnhancedFocus: () => void;
  toggleLargeTouchTargets: () => void;
  toggleHapticFeedback: () => void;
  colors: ColorScheme;
  textSizes: TextSizes;
}

interface ColorScheme {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  primary: string;
  border: string;
}

interface TextSizes {
  small: number;
  medium: number;
  large: number;
  xlarge: number;
}

const defaultColors = {
  light: {
    background: '#f8f9fa',
    surface: '#ffffff',
    text: '#1c1c1e',
    textSecondary: '#666666',
    primary: '#007AFF',
    border: '#e5e5ea',
  },
  dark: {
    background: '#000000',
    surface: '#1c1c1e',
    text: '#ffffff',
    textSecondary: '#ebebf5',
    primary: '#0a84ff',
    border: '#38383a',
  },
  highContrastLight: {
    background: '#ffffff',
    surface: '#ffffff',
    text: '#000000',
    textSecondary: '#1c1c1e',
    primary: '#0055cc',
    border: '#000000',
  },
  highContrastDark: {
    background: '#000000',
    surface: '#000000',
    text: '#ffffff',
    textSecondary: '#ffffff',
    primary: '#409cff',
    border: '#ffffff',
  },
};

const defaultTextSizes = {
  regular: {
    small: 13,
    medium: 16,
    large: 20,
    xlarge: 24,
  },
  large: {
    small: 16,
    medium: 19,
    large: 24,
    xlarge: 28,
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState({
    isDarkMode: false,
    isHighContrast: false,
    isLargeText: false,
    reduceMotion: false,
    enhancedFocus: false,
    isLargeTouchTargets: false,
    isHapticFeedback: false,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem('themeSettings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Error loading theme settings:', error);
    }
  };

  const saveSettings = async (newSettings: typeof settings) => {
    try {
      await AsyncStorage.setItem('themeSettings', JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.error('Error saving theme settings:', error);
    }
  };

  const toggleSetting = (key: keyof typeof settings) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key],
    };
    saveSettings(newSettings);
  };

  const getColors = (): ColorScheme => {
    if (settings.isDarkMode) {
      return settings.isHighContrast ? defaultColors.highContrastDark : defaultColors.dark;
    }
    return settings.isHighContrast ? defaultColors.highContrastLight : defaultColors.light;
  };

  const getTextSizes = (): TextSizes => {
    return settings.isLargeText ? defaultTextSizes.large : defaultTextSizes.regular;
  };

  const value = {
    ...settings,
    toggleDarkMode: () => toggleSetting('isDarkMode'),
    toggleHighContrast: () => toggleSetting('isHighContrast'),
    toggleLargeText: () => toggleSetting('isLargeText'),
    toggleReduceMotion: () => toggleSetting('reduceMotion'),
    toggleEnhancedFocus: () => toggleSetting('enhancedFocus'),
    toggleLargeTouchTargets: () => toggleSetting('isLargeTouchTargets'),
    toggleHapticFeedback: () => toggleSetting('isHapticFeedback'),
    colors: getColors(),
    textSizes: getTextSizes(),
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
