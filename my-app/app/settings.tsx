import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScreenReader, setIsScreenReader] = useState(false);
  const [useHighContrast, setUseHighContrast] = useState(false);
  const [enableHaptics, setEnableHaptics] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Display</Text>
        <View style={styles.setting}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Text style={styles.settingDescription}>Enable dark theme for the app</Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            accessibilityLabel="Toggle dark mode"
            accessibilityRole="switch"
            accessibilityState={{ checked: isDarkMode }}
          />
        </View>

        <View style={styles.setting}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>High Contrast</Text>
            <Text style={styles.settingDescription}>Increase contrast for better visibility</Text>
          </View>
          <Switch
            value={useHighContrast}
            onValueChange={setUseHighContrast}
            accessibilityLabel="Toggle high contrast mode"
            accessibilityRole="switch"
            accessibilityState={{ checked: useHighContrast }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accessibility</Text>
        <View style={styles.setting}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Screen Reader Optimization</Text>
            <Text style={styles.settingDescription}>Enhance screen reader descriptions</Text>
          </View>
          <Switch
            value={isScreenReader}
            onValueChange={setIsScreenReader}
            accessibilityLabel="Toggle screen reader optimization"
            accessibilityRole="switch"
            accessibilityState={{ checked: isScreenReader }}
          />
        </View>

        <View style={styles.setting}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Haptic Feedback</Text>
            <Text style={styles.settingDescription}>Enable vibration on interactions</Text>
          </View>
          <Switch
            value={enableHaptics}
            onValueChange={setEnableHaptics}
            accessibilityLabel="Toggle haptic feedback"
            accessibilityRole="switch"
            accessibilityState={{ checked: enableHaptics }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <TouchableOpacity style={styles.aboutItem} accessibilityRole="button">
          <View style={styles.aboutItemContent}>
            <Ionicons name="information-circle-outline" size={24} color="#666" />
            <Text style={styles.aboutItemText}>App Version 1.0.0</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.aboutItem} accessibilityRole="button">
          <View style={styles.aboutItemContent}>
            <Ionicons name="document-text-outline" size={24} color="#666" />
            <Text style={styles.aboutItemText}>Privacy Policy</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginTop: 24,
    backgroundColor: '#fff',
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginLeft: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
  aboutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  aboutItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  aboutItemText: {
    fontSize: 16,
    color: '#333',
  },
});