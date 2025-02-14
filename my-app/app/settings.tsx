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
  Button,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function SettingsScreen() {
  const {
    // Toggles
    isDarkMode,
    isHighContrast,
    isLargeText,
    isLargeTouchTargets,
    isDyslexiaFont,
    isColorFilter,

    // Toggle methods
    toggleDarkMode,
    toggleHighContrast,
    toggleLargeText,
    toggleLargeTouchTargets,
    toggleDyslexiaFont,
    toggleColorFilter,

    // Theming
    colors,
    textSizes,
  } = useTheme();

  const [aboutModalVisible, setAboutModalVisible] = useState(false);

  /**
   * Reusable Setting Row
   */
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
    <View
      style={[
        styles.settingRow,
        {
          backgroundColor: colors.surface,
        },
      ]}
      accessible={true}
      accessibilityLabel={`${title}. ${description}. Switch is ${value ? 'on' : 'off'}.`}
      accessibilityRole="switch"
    >
      {/* Icon */}
      <View style={styles.settingIcon}>
        <Ionicons
          name={icon}
          size={24}
          color={colors.primary}
          accessibilityElementsHidden
        />
      </View>

      {/* Text */}
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, { color: colors.text, fontSize: textSizes.medium }]}>
          {title}
        </Text>
        <Text
          style={[
            styles.settingDescription,
            { color: colors.textSecondary, fontSize: textSizes.small },
          ]}
        >
          {description}
        </Text>
      </View>

      {/* Switch */}
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
        {/* VISUAL SETTINGS */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionHeader,
              { color: colors.textSecondary, fontSize: textSizes.small },
            ]}
            accessibilityRole="header"
          >
            Visual Settings
          </Text>
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border, // added border to card
              },
            ]}
          >
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

        {/* READABILITY ENHANCEMENTS */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionHeader,
              { color: colors.textSecondary, fontSize: textSizes.small },
            ]}
            accessibilityRole="header"
          >
            Readability Enhancements
          </Text>
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <SettingRow
              icon="text-outline"
              title="Large Text"
              description="Increase text size for improved readability"
              value={isLargeText}
              onToggle={toggleLargeText}
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingRow
              icon="book-outline"
              title="Dyslexia-Friendly Font"
              description="Use a font optimized for dyslexia"
              value={isDyslexiaFont}
              onToggle={toggleDyslexiaFont}
            />
          </View>
        </View>

        {/* COLOR & TOUCH SETTINGS */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionHeader,
              { color: colors.textSecondary, fontSize: textSizes.small },
            ]}
            accessibilityRole="header"
          >
            Color & Touch Settings
          </Text>
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <SettingRow
              icon="color-filter-outline"
              title="Color Filter"
              description="Apply basic grayscale filtering"
              value={isColorFilter}
              onToggle={toggleColorFilter}
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingRow
              icon="resize-outline"
              title="Large Touch Targets"
              description="Increase the tappable area of interactive elements"
              value={isLargeTouchTargets}
              onToggle={toggleLargeTouchTargets}
            />
          </View>
        </View>

        {/* ABOUT SECTION */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionHeader,
              { color: colors.textSecondary, fontSize: textSizes.small },
            ]}
            accessibilityRole="header"
          >
            About
          </Text>
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
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
                  accessibilityElementsHidden
                />
                <Text
                  style={[
                    styles.aboutText,
                    { color: colors.text, fontSize: textSizes.medium },
                  ]}
                  accessibilityRole="text"
                >
                  About this App
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textSecondary}
                accessibilityElementsHidden
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* ABOUT MODAL */}
      <Modal
        animationType="slide"
        transparent
        visible={aboutModalVisible}
        onRequestClose={() => setAboutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalHeader, { color: colors.text, fontSize: textSizes.medium }]}>
              About This App
            </Text>
            <Text style={[styles.modalText, { color: colors.textSecondary, fontSize: textSizes.small }]}>
              This app demonstrates an accessible Settings screen with toggles for color filters,
              dyslexia-friendly font, and more.
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
    // Add a border around the entire card
    borderWidth: 1,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    marginLeft: 68, // to align under text, so the divider is offset
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
  settingDescription: {
    flexWrap: 'wrap',
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
    gap: 8,
  },
  aboutText: {},
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
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
