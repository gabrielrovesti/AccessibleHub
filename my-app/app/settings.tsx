import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  AccessibilityInfo,
  ToastAndroid,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function SettingsScreen() {
  const {
    isDarkMode,
    isHighContrast,
    isLargeText,
    isLargeTouchTargets,
    isReduceMotion,
    isColorFilter,
    toggleDarkMode,
    toggleHighContrast,
    toggleLargeText,
    toggleLargeTouchTargets,
    toggleReduceMotion,
    toggleColorFilter,
    colors,
    textSizes,
  } = useTheme();

  /* -----------------------------------------
     1. Themed Styles
  ----------------------------------------- */
  const themedStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      paddingBottom: 24,
    },
    section: {
      marginHorizontal: 16,
      marginTop: 16,
    },
    sectionHeader: {
      color: colors.textSecondary,
      fontSize: textSizes.small,
      fontWeight: '1000',
      textTransform: 'uppercase',
      marginBottom: 8,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 20,
      marginTop: 8,
      paddingVertical: 24,
      paddingHorizontal: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
      borderWidth: 1,
      borderColor: colors.border,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginLeft: 68,
      marginVertical: 8,
    },
    settingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: isLargeTouchTargets ? 20 : 16,
    },
    settingIcon: {
      width: 40,
      alignItems: 'center',
    },
    settingContent: {
      flex: 1,
      marginLeft: 12,
      marginRight: 12,
    },
    settingTitle: {
      fontWeight: '600',
      marginBottom: 4,
      color: colors.text,
    },
    settingDescription: {
      flexWrap: 'wrap',
      color: colors.textSecondary,
    },
  });

  /* -----------------------------------------
     2. Reusable Setting Row
  ----------------------------------------- */
const SettingRow = ({
  icon,
  title,
  description,
  value,
  onToggle,
}: {
  icon: string;
  title: string;
  description: string;
  value: boolean;
  onToggle: () => void;
}) => (
  <View style={themedStyles.settingRow}>
    <View style={themedStyles.settingIcon}>
      <Ionicons
        name={icon}
        size={24}
        color={colors.primary}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      />
    </View>
    <View style={themedStyles.settingContent}>
      <Text style={[themedStyles.settingTitle, { fontSize: textSizes.medium }]}>
        {title}
      </Text>
      <Text
        style={[
          themedStyles.settingDescription,
          { fontSize: textSizes.small },
        ]}
      >
        {description}
      </Text>
    </View>
    <Switch
      value={value}
      onValueChange={() => {
        onToggle();
        const newValue = !value;
        const message = `${title} ${newValue ? 'enabled' : 'disabled'}`;
        AccessibilityInfo.announceForAccessibility(message);
        if (Platform.OS === 'android') {
          ToastAndroid.show(message, ToastAndroid.SHORT);
        } else {
          console.log(message);
        }
      }}
      trackColor={{ false: '#767577', true: colors.primary }}
      thumbColor={value ? '#fff' : '#f4f3f4'}
      // Combine title, description, and state in one accessibility label
      accessibilityLabel={`${title}. ${description}. Switch is ${value ? 'on' : 'off'}.`}
      accessibilityRole="switch"
    />
  </View>
);


  /* -----------------------------------------
     3. Render Screen
  ----------------------------------------- */
  return (
    <ScrollView
      style={themedStyles.container}
      contentContainerStyle={themedStyles.scrollContent}
    >
      {/* VISUAL SETTINGS */}
      <View style={themedStyles.section}>
        <Text style={themedStyles.sectionHeader} accessibilityRole="header">
          Visual Settings
        </Text>
        <View style={themedStyles.card}>
          <SettingRow
            icon="moon-outline"
            title="Dark Mode"
            description="Enable dark theme for low light conditions"
            value={isDarkMode}
            onToggle={toggleDarkMode}
          />
          <View style={themedStyles.divider} importantForAccessibility="no" accessibilityElementsHidden={true}/>
          <SettingRow
            icon="contrast-outline"
            title="High Contrast Mode"
            description="Increase contrast for improved readability"
            value={isHighContrast}
            onToggle={toggleHighContrast}
          />
        </View>
      </View>

      {/* READABILITY ENHANCEMENTS */}
      <View style={themedStyles.section}>
        <Text style={themedStyles.sectionHeader} accessibilityRole="header">
          Readability Enhancements
        </Text>
        <View style={themedStyles.card}>
          <SettingRow
            icon="text-outline"
            title="Large Text"
            description="Increase text size for improved readability"
            value={isLargeText}
            onToggle={toggleLargeText}
          />
          <View style={themedStyles.divider} importantForAccessibility="no" accessibilityElementsHidden={true}/>
          <SettingRow
            icon="pause-outline"
            title="Reduce Motion"
            description="Minimize animations for improved comfort"
            value={isReduceMotion}
            onToggle={toggleReduceMotion}
          />
        </View>
      </View>

      {/* COLOR & TOUCH SETTINGS */}
      <View style={themedStyles.section}>
        <Text style={themedStyles.sectionHeader} accessibilityRole="header">
          Color & Touch Settings
        </Text>
        <View style={themedStyles.card}>
          <SettingRow
            icon="color-filter-outline"
            title="Color Filter"
            description="Apply basic grayscale filtering"
            value={isColorFilter}
            onToggle={toggleColorFilter}
          />
          <View style={themedStyles.divider} importantForAccessibility="no" accessibilityElementsHidden={true}/>
          <SettingRow
            icon="resize-outline"
            title="Large Touch Targets"
            description="Increase the tappable area of interactive elements"
            value={isLargeTouchTargets}
            onToggle={toggleLargeTouchTargets}
          />
        </View>
      </View>
    </ScrollView>
  );
}
