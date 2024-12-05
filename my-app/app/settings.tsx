import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = () => {
  const [fadeAnim] = useState(new Animated.Value(1));
  const [settings, setSettings] = useState({
    darkMode: false,
    highContrast: false,
    screenReaderOptimization: false,
    hapticFeedback: true
  });

  const toggleDarkMode = (value) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start();

    setSettings(prev => ({ ...prev, darkMode: value }));
  };

  const isDark = settings.darkMode;

  return (
    <Animated.View style={[
      styles.container,
      isDark && styles.containerDark,
      { opacity: fadeAnim }
    ]}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={[styles.sectionHeader, isDark && styles.textDark]}>Display</Text>

          <View style={[styles.card, isDark && styles.cardDark]}>
            <View style={styles.settingItem}>
              <View style={styles.settingContent}>
                <View style={styles.settingTitleContainer}>
                  <Ionicons
                    name={isDark ? "moon" : "sunny"}
                    size={22}
                    color={isDark ? '#fff' : '#000'}
                  />
                  <Text style={[styles.settingTitle, isDark && styles.textDark]}>
                    Dark Mode
                  </Text>
                </View>
                <Text style={[styles.settingDescription, isDark && styles.textSecondaryDark]}>
                  Enable dark theme for reduced eye strain
                </Text>
              </View>
              <Switch
                value={settings.darkMode}
                onValueChange={toggleDarkMode}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={settings.darkMode ? '#007AFF' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingContent}>
                <View style={styles.settingTitleContainer}>
                  <Ionicons
                    name="contrast"
                    size={22}
                    color={isDark ? '#fff' : '#000'}
                  />
                  <Text style={[styles.settingTitle, isDark && styles.textDark]}>
                    High Contrast
                  </Text>
                </View>
                <Text style={[styles.settingDescription, isDark && styles.textSecondaryDark]}>
                  Increase contrast for better visibility
                </Text>
              </View>
              <Switch
                value={settings.highContrast}
                onValueChange={(value) =>
                  setSettings(prev => ({ ...prev, highContrast: value }))
                }
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={settings.highContrast ? '#007AFF' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionHeader, isDark && styles.textDark]}>
            Accessibility
          </Text>

          <View style={[styles.card, isDark && styles.cardDark]}>
            <View style={styles.settingItem}>
              <View style={styles.settingContent}>
                <View style={styles.settingTitleContainer}>
                  <Ionicons
                    name="eye-outline"
                    size={22}
                    color={isDark ? '#fff' : '#000'}
                  />
                  <Text style={[styles.settingTitle, isDark && styles.textDark]}>
                    Screen Reader Support
                  </Text>
                </View>
                <Text style={[styles.settingDescription, isDark && styles.textSecondaryDark]}>
                  Enhanced content descriptions
                </Text>
              </View>
              <Switch
                value={settings.screenReaderOptimization}
                onValueChange={(value) =>
                  setSettings(prev => ({ ...prev, screenReaderOptimization: value }))
                }
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={settings.screenReaderOptimization ? '#007AFF' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingContent}>
                <View style={styles.settingTitleContainer}>
                  <Ionicons
                    name="hand-left-outline"
                    size={22}
                    color={isDark ? '#fff' : '#000'}
                  />
                  <Text style={[styles.settingTitle, isDark && styles.textDark]}>
                    Haptic Feedback
                  </Text>
                </View>
                <Text style={[styles.settingDescription, isDark && styles.textSecondaryDark]}>
                  Vibration feedback on interactions
                </Text>
              </View>
              <Switch
                value={settings.hapticFeedback}
                onValueChange={(value) =>
                  setSettings(prev => ({ ...prev, hapticFeedback: value }))
                }
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={settings.hapticFeedback ? '#007AFF' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionHeader, isDark && styles.textDark]}>About</Text>

          <View style={[styles.card, isDark && styles.cardDark]}>
            <TouchableOpacity
              style={styles.linkItem}
              accessibilityRole="button"
            >
              <View style={styles.settingTitleContainer}>
                <Ionicons
                  name="information-circle-outline"
                  size={22}
                  color={isDark ? '#fff' : '#000'}
                />
                <Text style={[styles.settingTitle, isDark && styles.textDark]}>
                  Version 1.0.0
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={isDark ? '#666' : '#999'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.linkItem, styles.lastItem]}
              accessibilityRole="button"
            >
              <View style={styles.settingTitleContainer}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={22}
                  color={isDark ? '#fff' : '#000'}
                />
                <Text style={[styles.settingTitle, isDark && styles.textDark]}>
                  Privacy Policy
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={isDark ? '#666' : '#999'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  containerDark: {
    backgroundColor: '#000',
  },
  section: {
    marginTop: 35,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    paddingHorizontal: 16,
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: '#fff',
    paddingLeft: 16,
  },
  cardDark: {
    backgroundColor: '#1C1C1E',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  settingContent: {
    flex: 1,
    marginRight: 16,
  },
  settingTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingTitle: {
    fontSize: 17,
    color: '#000',
  },
  textDark: {
    color: '#fff',
  },
  settingDescription: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
    marginLeft: 34,
  },
  textSecondaryDark: {
    color: '#999',
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
});

export default SettingsScreen;