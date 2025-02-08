import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  AccessibilityInfo,
  ToastAndroid,
  Platform,
  Modal,
  Button
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function SettingsScreen() {
  const {
    isDarkMode,
    isHighContrast,
    isLargeText,
    reduceMotion,
    enhancedFocus,
    isLargeTouchTargets,
    isHapticFeedback,
    toggleDarkMode,
    toggleHighContrast,
    toggleLargeText,
    toggleReduceMotion,
    toggleEnhancedFocus,
    toggleLargeTouchTargets,
    toggleHapticFeedback,
    colors,
    textSizes
  } = useTheme();

  const [aboutModalVisible, setAboutModalVisible] = useState(false);

  const SettingRow = ({ icon, title, description, value, onToggle }) => (
    <View
      style={[styles.settingRow, { backgroundColor: colors.surface }]}
      accessible={true}
      accessibilityLabel={`${title}. ${description}. Switch is ${value ? 'on' : 'off'}.`}
      accessibilityRole="switch"
    >
      <View style={styles.settingIcon}>
        <Ionicons
          name={icon}
          size={24}
          color={colors.primary}
          accessibilityElementsHidden={true}
          importantForAccessibility="no"
        />
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, { color: colors.text, fontSize: textSizes.medium }]}>{title}</Text>
        <Text style={[styles.settingDescription, { color: colors.textSecondary, fontSize: textSizes.small }]}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={() => {
          onToggle();
          const newValue = !value;
          const message = `Now ${title} ${newValue ? 'enabled' : 'disabled'}`;
          AccessibilityInfo.announceForAccessibility(message);
          if (Platform.OS === 'android') {
            ToastAndroid.show(message, ToastAndroid.SHORT);
          } else {
            console.log(message);
          }
        }}
        trackColor={{ false: '#767577', true: colors.primary }}
        thumbColor={value ? '#fff' : '#f4f3f4'}
        accessibilityLabel={title}
        accessibilityRole="switch"
      />
    </View>
  );

  return (
    <>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Visual Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { color: colors.textSecondary, fontSize: textSizes.small }]} accessibilityRole="header">
            Visual Settings
          </Text>
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <SettingRow
              icon="moon-outline"
              title="Dark Mode"
              description="Enable dark theme for low light conditions"
              value={isDarkMode}
              onToggle={toggleDarkMode}
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingRow
              icon="contrast-outline"
              title="High Contrast Mode"
              description="Increase contrast for improved readability"
              value={isHighContrast}
              onToggle={toggleHighContrast}
            />
          </View>
        </View>

        {/* Accessibility Enhancements */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { color: colors.textSecondary, fontSize: textSizes.small }]} accessibilityRole="header">
            Accessibility Enhancements
          </Text>
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <SettingRow
              icon="walk-outline"
              title="Reduce Motion"
              description="Minimize animations (e.g. confirmation dialogs)"
              value={reduceMotion}
              onToggle={toggleReduceMotion}
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingRow
              icon="text-outline"
              title="Large Text"
              description="Increase text size for improved readability"
              value={isLargeText}
              onToggle={toggleLargeText}
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingRow
              icon="eye-outline"
              title="Enhanced Focus"
              description="Highlight focused elements for easier navigation"
              value={enhancedFocus}
              onToggle={toggleEnhancedFocus}
            />
          </View>
        </View>

        {/* Additional Accessibility Options */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { color: colors.textSecondary, fontSize: textSizes.small }]} accessibilityRole="header">
            Additional Accessibility Options
          </Text>
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <SettingRow
              icon="resize-outline"
              title="Large Touch Targets"
              description="Increase the tappable area of interactive elements"
              value={isLargeTouchTargets}
              onToggle={toggleLargeTouchTargets}
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingRow
              icon="happy-outline"
              title="Enable Haptic Feedback"
              description="Provide tactile feedback on interactions"
              value={isHapticFeedback}
              onToggle={toggleHapticFeedback}
            />
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { color: colors.textSecondary, fontSize: textSizes.small }]} accessibilityRole="header">
            About
          </Text>
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <TouchableOpacity
              style={styles.aboutRow}
              onPress={() => setAboutModalVisible(true)}
              accessibilityRole="button"
              accessibilityLabel="About this app"
            >
              <View style={styles.aboutContent}>
                <Ionicons
                  name="information-circle-outline"
                  size={24}
                  color={colors.primary}
                  accessibilityElementsHidden={true}
                  importantForAccessibility="no"
                />
                <Text style={[styles.aboutText, { color: colors.text, fontSize: textSizes.medium }]} accessibilityRole="text">
                  About this App
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textSecondary}
                accessibilityElementsHidden={true}
                importantForAccessibility="no"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Modal About */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={aboutModalVisible}
        onRequestClose={() => setAboutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalHeader, { color: colors.text, fontSize: textSizes.medium }]}>About This App</Text>
            <Text style={[styles.modalText, { color: colors.textSecondary, fontSize: textSizes.small }]}>
              This app was created by Gabriel Rovesti.
            </Text>
            <Text style={[styles.modalText, { color: colors.textSecondary, fontSize: textSizes.small }]}>
              It serves as a manual for accessibility best practices in React Native.
            </Text>
            <Button title="Close" onPress={() => setAboutModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
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
  },
  settingDescription: {},
  divider: {
    height: 1,
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
  },
  aboutText: {},
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  modalHeader: {
    fontWeight: '600',
    marginBottom: 12,
  },
  modalText: {
    textAlign: 'center',
    marginBottom: 12,
  },
});
