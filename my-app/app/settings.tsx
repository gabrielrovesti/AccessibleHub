import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const [visualSettings, setVisualSettings] = useState({
    darkMode: false,
    highContrast: false,
    largeText: false
  });

  const [accessibilitySettings, setAccessibilitySettings] = useState({
    announceElements: false,
    reduceMotion: false,
    enhancedFocus: false
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedVisualSettings = await AsyncStorage.getItem('visualSettings');
      const savedAccessibilitySettings = await AsyncStorage.getItem('accessibilitySettings');

      if (savedVisualSettings) {
        setVisualSettings(JSON.parse(savedVisualSettings));
      }
      if (savedAccessibilitySettings) {
        setAccessibilitySettings(JSON.parse(savedAccessibilitySettings));
      }
    } catch (error) {
      console.log('Error loading settings:', error);
    }
  };

  const updateVisualSetting = async (key, value) => {
    try {
      const newSettings = { ...visualSettings, [key]: value };
      setVisualSettings(newSettings);
      await AsyncStorage.setItem('visualSettings', JSON.stringify(newSettings));
    } catch (error) {
      console.log('Error saving visual setting:', error);
    }
  };

  const updateAccessibilitySetting = async (key, value) => {
    try {
      const newSettings = { ...accessibilitySettings, [key]: value };
      setAccessibilitySettings(newSettings);
      await AsyncStorage.setItem('accessibilitySettings', JSON.stringify(newSettings));
    } catch (error) {
      console.log('Error saving accessibility setting:', error);
    }
  };

  const SettingRow = ({ icon, title, description, value, onToggle }) => (
    <View style={styles.settingRow}>
      <View style={styles.settingIcon}>
        <Ionicons name={icon} size={24} color="#007AFF" />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#767577', true: '#007AFF' }}
        thumbColor={value ? '#fff' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Visual Settings</Text>
        <View style={styles.card}>
          <SettingRow
            icon="moon-outline"
            title="Dark Mode"
            description="Enable dark theme for better viewing in low light"
            value={visualSettings.darkMode}
            onToggle={(value) => updateVisualSetting('darkMode', value)}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="contrast-outline"
            title="High Contrast"
            description="Increase contrast for better readability"
            value={visualSettings.highContrast}
            onToggle={(value) => updateVisualSetting('highContrast', value)}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="text-outline"
            title="Large Text"
            description="Increase text size throughout the app"
            value={visualSettings.largeText}
            onToggle={(value) => updateVisualSetting('largeText', value)}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Accessibility Settings</Text>
        <View style={styles.card}>
          <SettingRow
            icon="megaphone-outline"
            title="Screen Reader Mode"
            description="Optimize content for screen readers"
            value={accessibilitySettings.announceElements}
            onToggle={(value) => updateAccessibilitySetting('announceElements', value)}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="pulse-outline"
            title="Reduce Motion"
            description="Minimize animations throughout the app"
            value={accessibilitySettings.reduceMotion}
            onToggle={(value) => updateAccessibilitySetting('reduceMotion', value)}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="scan-outline"
            title="Focus Indicators"
            description="Show clear focus outlines for navigation"
            value={accessibilitySettings.enhancedFocus}
            onToggle={(value) => updateAccessibilitySetting('enhancedFocus', value)}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>About</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.aboutRow}>
            <View style={styles.aboutContent}>
              <Ionicons name="information-circle-outline" size={24} color="#007AFF" />
              <Text style={styles.aboutText}>Version 1.0.0</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.aboutRow}>
            <View style={styles.aboutContent}>
              <Ionicons name="shield-checkmark-outline" size={24} color="#007AFF" />
              <Text style={styles.aboutText}>Accessibility Statement</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
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