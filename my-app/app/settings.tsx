import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function SettingsScreen() {
  const { isDarkMode,
    isHighContrast,
    isLargeText,
    reduceMotion,
    enhancedFocus,
    toggleDarkMode,
    toggleHighContrast,
    toggleLargeText,
    toggleReduceMotion,
    toggleEnhancedFocus,
    colors,
    textSizes
  } = useTheme();

  const SettingRow = ({ icon, title, description, value, onToggle }) => (
    <View style={[styles.settingRow, { backgroundColor: colors.surface }]}>
      <View style={styles.settingIcon}>
        <Ionicons name={icon} size={24} color={colors.primary} />
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
          {description}
        </Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#767577', true: colors.primary }}
        thumbColor={value ? '#fff' : '#f4f3f4'}
      />
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.section}>
        <Text style={[styles.sectionHeader, { color: colors.textSecondary }]}>
          Visual Settings
        </Text>
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <SettingRow
            icon="moon-outline"
            title="Dark Mode"
            description="Enable dark theme for better viewing in low light"
            value={isDarkMode}
            onToggle={toggleDarkMode}
          />
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <SettingRow
            icon="contrast-outline"
            title="High Contrast"
            description="Increase contrast for better readability"
            value={isHighContrast}
            onToggle={toggleHighContrast}
          />
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <SettingRow
            icon="text-outline"
            title="Large Text"
            description="Increase text size throughout the app"
            value={isLargeText}
            onToggle={toggleLargeText}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionHeader, { color: colors.textSecondary }]}>
          Accessibility Settings
        </Text>
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <SettingRow
            icon="eye-outline"
            title="Screen Reader Mode"
            description="Optimize content for screen readers"
            value={enhancedFocus}
            onToggle={toggleEnhancedFocus}
          />
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <SettingRow
            icon="pulse-outline"
            title="Reduce Motion"
            description="Minimize animations throughout the app"
            value={reduceMotion}
            onToggle={toggleReduceMotion}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionHeader, { color: colors.textSecondary }]}>
          About
        </Text>
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <TouchableOpacity style={styles.aboutRow}>
            <View style={styles.aboutContent}>
              <Ionicons name="information-circle-outline" size={24} color={colors.primary} />
              <Text style={[styles.aboutText, { color: colors.text }]}>Version 1.0.0</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  section: {
    padding: 16,
    gap: 8,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
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
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginLeft: 68,
  },
  aboutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
  },
  aboutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  aboutText: {
    fontSize: 16,
    color: '#1c1c1e',
  },
});