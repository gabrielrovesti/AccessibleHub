import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    darkMode: false,
    highContrast: false,
    screenReader: false,
    haptics: true
  });

  const updateSetting = (key: keyof typeof settings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <ScrollView
      style={[styles.container, settings.darkMode && styles.darkContainer]}
      contentInsetAdjustmentBehavior="automatic">
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, settings.darkMode && styles.darkText]}>DISPLAY</Text>

        <View style={[styles.settingCard, settings.darkMode && styles.darkCard]}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, settings.darkMode && styles.darkText]}>
                Dark Mode
              </Text>
              <Text style={[styles.settingDescription, settings.darkMode && styles.darkSecondaryText]}>
                Enable dark theme for the app
              </Text>
            </View>
            <Switch
              value={settings.darkMode}
              onValueChange={(value) => updateSetting('darkMode', value)}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={settings.darkMode ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              accessibilityLabel="Toggle dark mode"
              accessibilityRole="switch"
            />
          </View>
        </View>

        <View style={[styles.settingCard, settings.darkMode && styles.darkCard]}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, settings.darkMode && styles.darkText]}>
                High Contrast
              </Text>
              <Text style={[styles.settingDescription, settings.darkMode && styles.darkSecondaryText]}>
                Increase contrast for better visibility
              </Text>
            </View>
            <Switch
              value={settings.highContrast}
              onValueChange={(value) => updateSetting('highContrast', value)}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={settings.highContrast ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              accessibilityLabel="Toggle high contrast mode"
              accessibilityRole="switch"
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, settings.darkMode && styles.darkText]}>ACCESSIBILITY</Text>

        <View style={[styles.settingCard, settings.darkMode && styles.darkCard]}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, settings.darkMode && styles.darkText]}>
                Screen Reader Optimization
              </Text>
              <Text style={[styles.settingDescription, settings.darkMode && styles.darkSecondaryText]}>
                Enhance screen reader descriptions
              </Text>
            </View>
            <Switch
              value={settings.screenReader}
              onValueChange={(value) => updateSetting('screenReader', value)}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={settings.screenReader ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              accessibilityLabel="Toggle screen reader optimization"
              accessibilityRole="switch"
            />
          </View>
        </View>

        <View style={[styles.settingCard, settings.darkMode && styles.darkCard]}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, settings.darkMode && styles.darkText]}>
                Haptic Feedback
              </Text>
              <Text style={[styles.settingDescription, settings.darkMode && styles.darkSecondaryText]}>
                Enable vibration on interactions
              </Text>
            </View>
            <Switch
              value={settings.haptics}
              onValueChange={(value) => updateSetting('haptics', value)}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={settings.haptics ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              accessibilityLabel="Toggle haptic feedback"
              accessibilityRole="switch"
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, settings.darkMode && styles.darkText]}>ABOUT</Text>

        <View style={[styles.settingCard, settings.darkMode && styles.darkCard]}>
          <TouchableOpacity
            style={styles.linkRow}
            accessibilityRole="button"
            accessibilityLabel="View app version information"
            accessibilityHint="Opens app version details">
            <View style={styles.linkContent}>
              <Ionicons
                name="information-circle-outline"
                size={22}
                color={settings.darkMode ? '#fff' : '#1c1c1e'}
              />
              <Text style={[styles.linkText, settings.darkMode && styles.darkText]}>
                App Version 1.0.0
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={settings.darkMode ? '#666' : '#999'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.linkRow, { borderBottomWidth: 0 }]}
            accessibilityRole="button"
            accessibilityLabel="View privacy policy"
            accessibilityHint="Opens privacy policy document">
            <View style={styles.linkContent}>
              <Ionicons
                name="lock-closed-outline"
                size={22}
                color={settings.darkMode ? '#fff' : '#1c1c1e'}
              />
              <Text style={[styles.linkText, settings.darkMode && styles.darkText]}>
                Privacy Policy
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={settings.darkMode ? '#666' : '#999'}
            />
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
  darkContainer: {
    backgroundColor: '#000',
  },
  section: {
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    paddingHorizontal: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  darkText: {
    color: '#fff',
  },
  darkSecondaryText: {
    color: '#999',
  },
  settingCard: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  darkCard: {
    backgroundColor: '#1c1c1e',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  linkContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  linkText: {
    fontSize: 16,
    color: '#000',
  },
});