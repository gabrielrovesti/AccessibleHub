import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ViewStyle, TextStyle } from 'react-native';

interface StyleSystem {
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  containers: {
    card: ViewStyle;
    codeBlock: ViewStyle;
    modal: ViewStyle;
  };
  buttons: {
    primary: ViewStyle;
    secondary: ViewStyle;
  };
  typography: {
    title: TextStyle;
    subtitle: TextStyle;
    body: TextStyle;
    code: TextStyle;
    caption: TextStyle;
  };
}

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
  styles: StyleSystem;
}

interface ColorScheme {
  background: string;
  surface: string;
  surfaceHover: string;
  text: string;
  textSecondary: string;
  primary: string;
  primaryLight: string;
  border: string;
  codeBackground: string;
  codeBorder: string;
  error: string;
  success: string;
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
    surfaceHover: '#f0f0f0',
    text: '#1c1c1e',
    textSecondary: '#666666',
    primary: '#007AFF',
    primaryLight: '#e1f0ff',
    border: '#e5e5ea',
    codeBackground: '#1c1c1e',
    codeBorder: '#333333',
    error: '#dc3545',
    success: '#28a745'
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

const createStyleSystem = (colors: ColorScheme, textSizes: TextSizes): StyleSystem => ({
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  },
  containers: {
    card: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginVertical: 8,
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2
    },
    codeBlock: {
      backgroundColor: colors.codeBackground,
      borderRadius: 8,
      padding: 16,
      marginVertical: 12,
      borderWidth: 1,
      borderColor: colors.codeBorder
    },
    modal: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 5
    }
  },
  buttons: {
    primary: {
      backgroundColor: colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      minHeight: 48,
      justifyContent: 'center',
      alignItems: 'center'
    },
    secondary: {
      backgroundColor: colors.surfaceHover,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      minHeight: 48,
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
  typography: {
    title: {
      fontSize: textSizes.xlarge,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8
    },
    subtitle: {
      fontSize: textSizes.large,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 16
    },
    body: {
      fontSize: textSizes.medium,
      color: colors.text,
      lineHeight: 24
    },
    code: {
      fontFamily: 'monospace',
      fontSize: textSizes.medium,
      color: '#fff',
      lineHeight: 20
    },
    caption: {
      fontSize: textSizes.small,
      color: colors.textSecondary,
      lineHeight: 20
    }
  }
});

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

  const colors = getColors();
  const textSizes = getTextSizes();
  const styles = createStyleSystem(colors, textSizes, settings.isLargeTouchTargets);

  const value = {
    ...settings,
    toggleDarkMode: () => toggleSetting('isDarkMode'),
    toggleHighContrast: () => toggleSetting('isHighContrast'),
    toggleLargeText: () => toggleSetting('isLargeText'),
    toggleReduceMotion: () => toggleSetting('reduceMotion'),
    toggleEnhancedFocus: () => toggleSetting('enhancedFocus'),
    toggleLargeTouchTargets: () => toggleSetting('isLargeTouchTargets'),
    toggleHapticFeedback: () => toggleSetting('isHapticFeedback'),
    colors,
    textSizes,
    styles,
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