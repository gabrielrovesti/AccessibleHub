import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

const platformSpecificGuides = {
  ios: [
    { gesture: 'Single tap', action: 'Select an item' },
    { gesture: 'Double tap', action: 'Activate selected item' },
    { gesture: 'Three finger swipe up/down', action: 'Scroll content' },
    { gesture: 'Three finger tap', action: 'Speak current page' },
    { gesture: 'Two finger swipe up', action: 'Read from current position' },
    { gesture: 'Two finger twist', action: 'Select rotor options' },
    { gesture: 'Four finger tap top', action: 'Read from beginning' },
  ],
  android: [
    { gesture: 'Single tap', action: 'Move focus and announce' },
    { gesture: 'Double tap', action: 'Activate focused item' },
    { gesture: 'Swipe right/left', action: 'Move to next/previous item' },
    { gesture: 'Two finger swipe up/down', action: 'Scroll content' },
    { gesture: 'Three finger swipe up', action: 'Jump to top' },
    { gesture: 'Three finger swipe down', action: 'Jump to bottom' },
    { gesture: 'Three finger tap', action: 'Additional options' },
  ],
};

export default function ScreenReaderSupportScreen() {
  const { colors, textSizes, isDarkMode } = useTheme();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // 1) Subtle gradient background
  const gradientColors = isDarkMode
    ? [colors.background, '#2c2c2e']
    : ['#e2e2e2', colors.background];

  // 2) Elevated card style
  const cardShadowStyle = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: isDarkMode ? 0.3 : 0.1,
    shadowRadius: 6,
    elevation: 3,
  };

  // 3) Themed + local styles
  const themedStyles = {
    container: {
      flex: 1,
    },
    // Hero Card for screen title/description
    heroCard: {
      backgroundColor: colors.surface,
      marginHorizontal: 16,
      marginTop: 16,
      paddingVertical: 24,
      paddingHorizontal: 16,
      borderRadius: 16,
      ...cardShadowStyle,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
    },
    heroTitle: {
      color: colors.text,
      fontSize: textSizes.xlarge,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 8,
    },
    heroSubtitle: {
      color: colors.textSecondary,
      fontSize: textSizes.medium,
      lineHeight: 24,
      textAlign: 'center',
    },
    section: {
      paddingHorizontal: 16,
      paddingTop: 20,
      gap: 16,
    },
    platformToggles: {
      flexDirection: 'row',
      gap: 12,
    },
    // Platform toggle buttons
    platformButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      backgroundColor: colors.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      ...cardShadowStyle,
    },
    platformButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    platformIcon: {
      marginRight: 8,
    },
    platformLabel: {
      fontSize: textSizes.medium,
      fontWeight: '600',
      color: colors.text,
    },
    platformLabelActive: {
      color: colors.background,
    },
    // Gesture Guide container
    gestureGuideContainer: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      ...cardShadowStyle,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
    },
    gestureTitle: {
      color: colors.text,
      fontSize: textSizes.large,
      fontWeight: '600',
      marginBottom: 12,
    },
    gestureItem: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    gestureHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 8,
    },
    gestureName: {
      fontSize: textSizes.medium,
      fontWeight: '600',
      color: colors.text,
    },
    gestureDescription: {
      fontSize: textSizes.small + 1,
      color: colors.textSecondary,
      marginLeft: 30, // extra indent
      lineHeight: 20,
    },
    // Implementation guide cards
    guideCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      ...cardShadowStyle,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
      marginBottom: 16,
    },
    guideHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 12,
    },
    guideTitle: {
      color: colors.text,
      fontSize: textSizes.large,
      fontWeight: '600',
    },
    guideItem: {
      color: colors.textSecondary,
      fontSize: textSizes.small + 1,
      lineHeight: 20,
    },
    learnMoreButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
      gap: 4,
    },
    learnMoreText: {
      fontSize: textSizes.small + 1,
      color: colors.primary,
      fontWeight: '500',
    },
    // Checklist
    checklistCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      ...cardShadowStyle,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
    },
    checklistItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 12,
    },
    checklistText: {
      fontSize: textSizes.small + 1,
      color: colors.textSecondary,
      flex: 1,
      lineHeight: 20,
    },
  };

  return (
    <LinearGradient colors={gradientColors} style={themedStyles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        accessibilityRole="scrollview"
        accessibilityLabel="Screen Reader Support Screen"
      >
        {/* HERO CARD */}
        <View style={themedStyles.heroCard}>
          <Text style={themedStyles.heroTitle} accessibilityRole="header">
            Screen Reader Support
          </Text>
          <Text style={themedStyles.heroSubtitle}>
            Comprehensive guide for optimizing your app for VoiceOver and TalkBack
          </Text>
        </View>

        {/* PLATFORM TOGGLES */}
        <View style={themedStyles.section}>
          <View style={themedStyles.platformToggles}>
            <TouchableOpacity
              style={[
                themedStyles.platformButton,
                activeSection === 'ios' && themedStyles.platformButtonActive,
              ]}
              onPress={() => setActiveSection('ios')}
              accessibilityRole="button"
              accessibilityState={{ selected: activeSection === 'ios' }}
              accessibilityLabel="VoiceOver iOS guide"
            >
              <Ionicons
                name="logo-apple"
                size={24}
                color={activeSection === 'ios' ? colors.background : colors.text}
                style={themedStyles.platformIcon}
                accessibilityElementsHidden={true}
                importantForAccessibility="no-hide-descendants"
              />
              <Text
                style={[
                  themedStyles.platformLabel,
                  activeSection === 'ios' && themedStyles.platformLabelActive,
                ]}
              >
                VoiceOver (iOS)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                themedStyles.platformButton,
                activeSection === 'android' && themedStyles.platformButtonActive,
              ]}
              onPress={() => setActiveSection('android')}
              accessibilityRole="button"
              accessibilityState={{ selected: activeSection === 'android' }}
              accessibilityLabel="TalkBack Android guide"
            >
              <Ionicons
                name="logo-android"
                size={24}
                color={activeSection === 'android' ? colors.background : colors.text}
                style={themedStyles.platformIcon}
                accessibilityElementsHidden={true}
                importantForAccessibility="no-hide-descendants"
              />
              <Text
                style={[
                  themedStyles.platformLabel,
                  activeSection === 'android' && themedStyles.platformLabelActive,
                ]}
              >
                TalkBack (Android)
              </Text>
            </TouchableOpacity>
          </View>

          {/* GESTURE GUIDE */}
          {activeSection && (
            <View style={themedStyles.gestureGuideContainer}>
              <Text style={themedStyles.gestureTitle}>Essential Gestures</Text>
              {platformSpecificGuides[activeSection].map((item, index) => (
                <View
                  key={index}
                  style={themedStyles.gestureItem}
                  accessibilityRole="text"
                  accessibilityLabel={`${item.gesture}: ${item.action}`}
                >
                  <View style={themedStyles.gestureHeader}>
                    <Ionicons
                      name="hand-left-outline"
                      size={24}
                      color={colors.primary}
                      accessibilityElementsHidden={true}
                      importantForAccessibility="no-hide-descendants"
                    />
                    <Text style={themedStyles.gestureName}>{item.gesture}</Text>
                  </View>
                  <Text style={themedStyles.gestureDescription}>{item.action}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* IMPLEMENTATION GUIDE */}
        <View style={themedStyles.section}>
          <Text style={[themedStyles.gestureTitle, { marginBottom: 8 }]}>
            Implementation Guide
          </Text>

          {/* Card 1: Semantic Structure */}
          <View style={themedStyles.guideCard}>
            <View style={themedStyles.guideHeader}>
              <Ionicons name="code-working-outline" size={24} color={colors.primary} accessibilityElementsHidden={true} importantForAccessibility="no-hide-descendants"/>
              <Text style={themedStyles.guideTitle}>Semantic Structure</Text>
            </View>
            <View>
              <Text style={themedStyles.guideItem}>• Use proper heading hierarchy</Text>
              <Text style={themedStyles.guideItem}>• Implement meaningful landmarks</Text>
              <Text style={themedStyles.guideItem}>• Group related elements logically</Text>
              <TouchableOpacity
                style={themedStyles.learnMoreButton}
                accessibilityRole="button"
                accessibilityLabel="View semantic structure code examples"
              >
                <Text style={themedStyles.learnMoreText}>View Code Examples</Text>
                <Ionicons name="arrow-forward" size={16} color={colors.primary} accessibilityElementsHidden={true} importantForAccessibility="no-hide-descendants"/>
              </TouchableOpacity>
            </View>
          </View>

          {/* Card 2: Content Descriptions */}
          <View style={themedStyles.guideCard}>
            <View style={themedStyles.guideHeader}>
              <Ionicons name="text-outline" size={24} color={colors.primary} accessibilityElementsHidden={true} importantForAccessibility="no-hide-descendants"/>
              <Text style={themedStyles.guideTitle}>Content Descriptions</Text>
            </View>
            <View>
              <Text style={themedStyles.guideItem}>• Provide clear accessibilityLabels</Text>
              <Text style={themedStyles.guideItem}>• Include meaningful hints</Text>
              <Text style={themedStyles.guideItem}>• Describe state changes</Text>
              <TouchableOpacity
                style={themedStyles.learnMoreButton}
                accessibilityRole="button"
                accessibilityLabel="View content description guidelines"
              >
                <Text style={themedStyles.learnMoreText}>View Guidelines</Text>
                <Ionicons name="arrow-forward" size={16} color={colors.primary} accessibilityElementsHidden={true} importantForAccessibility="no-hide-descendants"/>
              </TouchableOpacity>
            </View>
          </View>

          {/* Card 3: Interactive Elements */}
          <View style={themedStyles.guideCard}>
            <View style={themedStyles.guideHeader}>
              <Ionicons name="options-outline" size={24} color={colors.primary} accessibilityElementsHidden={true} importantForAccessibility="no-hide-descendants"/>
              <Text style={themedStyles.guideTitle}>Interactive Elements</Text>
            </View>
            <View>
              <Text style={themedStyles.guideItem}>• Define proper roles</Text>
              <Text style={themedStyles.guideItem}>• Manage focus appropriately</Text>
              <Text style={themedStyles.guideItem}>• Handle custom actions</Text>
              <TouchableOpacity
                style={themedStyles.learnMoreButton}
                accessibilityRole="button"
                accessibilityLabel="View interactive elements examples"
              >
                <Text style={themedStyles.learnMoreText}>View Examples</Text>
                <Ionicons name="arrow-forward" size={16} color={colors.primary} accessibilityElementsHidden={true} importantForAccessibility="no-hide-descendants"/>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* TESTING CHECKLIST */}
        <View style={themedStyles.section}>
          <Text style={[themedStyles.gestureTitle, { marginBottom: 8 }]}>
            Testing Checklist
          </Text>
          <View style={themedStyles.checklistCard}>
            {[
              'Verify all elements have proper labels',
              'Test navigation flow with screen reader',
              'Confirm state changes are announced',
              'Validate custom actions work correctly',
            ].map((checkItem, idx) => (
              <View key={idx} style={themedStyles.checklistItem}>
                <Ionicons name="checkmark-circle" size={24} color="#28A745" accessibilityElementsHidden={true} importantForAccessibility="no-hide-descendants"/>
                <Text style={themedStyles.checklistText}>{checkItem}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
