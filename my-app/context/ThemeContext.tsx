// context/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ViewStyle, TextStyle } from 'react-native';

/* --------------------------------------------
   INTERFACES
-------------------------------------------- */
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
  // Toggles
  isDarkMode: boolean;
  isHighContrast: boolean;
  isLargeText: boolean;
  isLargeTouchTargets: boolean;
  isDyslexiaFont: boolean;
  isColorFilter: boolean;

  toggleDarkMode: () => void;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  toggleLargeTouchTargets: () => void;
  toggleDyslexiaFont: () => void;
  toggleColorFilter: () => void;

  // Theme values
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

/* --------------------------------------------
   DEFAULT COLOR DEFINITIONS
-------------------------------------------- */
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
    success: '#28a745',
  },
  dark: {
    background: '#000000',
    surface: '#1c1c1e',
    text: '#ffffff',
    textSecondary: '#ebebf5',
    primary: '#0a84ff',
    border: '#38383a',
    // You could define surfaceHover, codeBackground, etc. if needed
  },
  highContrastLight: {
    background: '#ffffff',
    surface: '#ffffff',
    text: '#000000',
    textSecondary: '#1c1c1e',
    primary: '#0055cc',
    border: '#000000',
    codeBackground: '#000000',
    codeBorder: '#ffffff',
    error: '#dc3545',
    success: '#28a745',
    surfaceHover: '#f0f0f0',
    primaryLight: '#e1f0ff',
  },
  highContrastDark: {
    background: '#000000',
    surface: '#000000',
    text: '#ffffff',
    textSecondary: '#ffffff',
    primary: '#409cff',
    border: '#ffffff',
    codeBackground: '#000000',
    codeBorder: '#ffffff',
    error: '#dc3545',
    success: '#28a745',
    surfaceHover: '#111111',
    primaryLight: '#666666',
  },
};

/* --------------------------------------------
   DEFAULT TEXT SIZE DEFINITIONS
-------------------------------------------- */
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

/* --------------------------------------------
   STYLE SYSTEM CREATOR
-------------------------------------------- */
const createStyleSystem = (
  colors: ColorScheme,
  textSizes: TextSizes,
  isLargeTouchTargets: boolean,
  isDyslexiaFont: boolean
): StyleSystem => ({
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
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
      elevation: 2,
    },
    codeBlock: {
      backgroundColor: colors.codeBackground,
      borderRadius: 8,
      padding: 16,
      marginVertical: 12,
      borderWidth: 1,
      borderColor: colors.codeBorder,
    },
    modal: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 5,
    },
  },
  buttons: {
    primary: {
      backgroundColor: colors.primary,
      paddingVertical: isLargeTouchTargets ? 16 : 12,
      paddingHorizontal: isLargeTouchTargets ? 28 : 24,
      borderRadius: 8,
      minHeight: isLargeTouchTargets ? 56 : 48,
      justifyContent: 'center',
      alignItems: 'center',
    },
    secondary: {
      backgroundColor: colors.surfaceHover,
      paddingVertical: isLargeTouchTargets ? 16 : 12,
      paddingHorizontal: isLargeTouchTargets ? 28 : 24,
      borderRadius: 8,
      minHeight: isLargeTouchTargets ? 56 : 48,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  typography: {
    title: {
      fontSize: textSizes.xlarge,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
      fontFamily: isDyslexiaFont ? 'OpenDyslexic-Regular' : 'System',
    },
    subtitle: {
      fontSize: textSizes.large,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 16,
      fontFamily: isDyslexiaFont ? 'OpenDyslexic-Regular' : 'System',
    },
    body: {
      fontSize: textSizes.medium,
      color: colors.text,
      lineHeight: 24,
      fontFamily: isDyslexiaFont ? 'OpenDyslexic-Regular' : 'System',
    },
    code: {
      fontFamily: 'monospace',
      fontSize: textSizes.medium,
      color: '#fff',
      lineHeight: 20,
    },
    caption: {
      fontSize: textSizes.small,
      color: colors.textSecondary,
      lineHeight: 20,
      fontFamily: isDyslexiaFont ? 'OpenDyslexic-Regular' : 'System',
    },
  },
});

/* --------------------------------------------
   THEME CONTEXT
-------------------------------------------- */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState({
    isDarkMode: false,
    isHighContrast: false,
    isLargeText: false,
    isLargeTouchTargets: false,
    // New toggles
    isDyslexiaFont: false,
    isColorFilter: false,
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

  /* 
   * 1) Determine base color scheme 
   *    from dark mode / high contrast
   */
  const getBaseScheme = (): ColorScheme => {
    if (settings.isDarkMode) {
      return settings.isHighContrast
        ? defaultColors.highContrastDark
        : defaultColors.dark;
    }
    return settings.isHighContrast
      ? defaultColors.highContrastLight
      : defaultColors.light;
  };

  /* 
   * 2) If colorFilter is enabled, override 
   *    certain colors to create a basic 
   *    grayscale effect
   */
  const applyColorFilter = (scheme: ColorScheme): ColorScheme => {
    if (!settings.isColorFilter) return scheme;
    // Approximate grayscale
    return {
      ...scheme,
      background: '#e0e0e0',
      surface: '#f2f2f2',
      text: '#333333',
      textSecondary: '#666666',
      border: '#999999',
      primary: '#555555',
      primaryLight: '#bdbdbd',
    };
  };

  /* 
   * 3) Build final color scheme 
   */
  const getColors = (): ColorScheme => {
    const baseScheme = getBaseScheme();
    return applyColorFilter(baseScheme);
  };

  /* 
   * 4) Determine text sizes 
   */
  const getTextSizes = (): TextSizes => {
    return settings.isLargeText ? defaultTextSizes.large : defaultTextSizes.regular;
  };

  const colors = getColors();
  const textSizes = getTextSizes();

  /* 
   * 5) Create style system 
   */
  const styles = createStyleSystem(
    colors,
    textSizes,
    settings.isLargeTouchTargets,
    settings.isDyslexiaFont
  );

  /* 
   * 6) Expose toggles + theme 
   */
  const value = {
    ...settings,
    toggleDarkMode: () => toggleSetting('isDarkMode'),
    toggleHighContrast: () => toggleSetting('isHighContrast'),
    toggleLargeText: () => toggleSetting('isLargeText'),
    toggleLargeTouchTargets: () => toggleSetting('isLargeTouchTargets'),
    toggleDyslexiaFont: () => toggleSetting('isDyslexiaFont'),
    toggleColorFilter: () => toggleSetting('isColorFilter'),
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
