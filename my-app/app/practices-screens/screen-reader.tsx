import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const ScreenReaderSupportScreen = () => {
  const [activeSection, setActiveSection] = useState(null);
  const { colors, textSizes, isDarkMode } = useTheme();

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
    ]
  };

  const themedStyles = {
    container: {
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.surface,
      borderBottomColor: colors.border,
    },
    headerTitle: {
      color: colors.text,
    },
    headerDescription: {
      color: colors.textSecondary,
    },
    platformButton: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
    },
    platformButtonActive: {
      backgroundColor: colors.primary,
    },
    platformButtonText: {
      color: colors.text,
    },
    platformButtonTextActive: {
      color: colors.background,
    },
    platformIcon: {
      color: colors.text,
    },
    platformIconActive: {
      color: colors.background,
    },
    sectionTitle: {
      color: colors.text,
    },
    gestureItem: {
      backgroundColor: colors.surface,
    },
    gestureName: {
      color: colors.text,
    },
    gestureDescription: {
      color: colors.textSecondary,
    },
    card: {
      backgroundColor: colors.surface,
    },
    cardTitle: {
      color: colors.text,
    },
    practiceItem: {
      color: colors.textSecondary,
    },
    learnMoreText: {
      color: colors.primary,
    },
    checklistCard: {
      backgroundColor: colors.surface,
    },
    checklistText: {
      color: colors.textSecondary,
    }
  };

  return (
    <ScrollView style={[styles.container, themedStyles.container]}>
      <View style={[styles.header, themedStyles.header]}>
        <Text style={[styles.headerTitle, themedStyles.headerTitle]}>Screen Reader Guide</Text>
        <Text style={[styles.headerDescription, themedStyles.headerDescription]}>
          Comprehensive guide for optimizing your app for VoiceOver and TalkBack
        </Text>
      </View>

      <View style={styles.platformSection}>
        <TouchableOpacity
          style={[
            styles.platformButton,
            themedStyles.platformButton,
            activeSection === 'ios' && themedStyles.platformButtonActive
          ]}
          onPress={() => setActiveSection('ios')}
          accessibilityRole="button"
          accessibilityState={{ selected: activeSection === 'ios' }}
          accessibilityLabel="VoiceOver iOS guide"
        >
          <Ionicons
            name="logo-apple"
            size={24}
            color={activeSection === 'ios' ? themedStyles.platformIconActive.color : themedStyles.platformIcon.color}
          />
          <Text style={[
            styles.platformButtonText,
            themedStyles.platformButtonText,
            activeSection === 'ios' && themedStyles.platformButtonTextActive
          ]}>
            VoiceOver (iOS)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.platformButton,
            themedStyles.platformButton,
            activeSection === 'android' && themedStyles.platformButtonActive
          ]}
          onPress={() => setActiveSection('android')}
          accessibilityRole="button"
          accessibilityState={{ selected: activeSection === 'android' }}
          accessibilityLabel="TalkBack Android guide"
        >
          <Ionicons
            name="logo-android"
            size={24}
            color={activeSection === 'android' ? themedStyles.platformIconActive.color : themedStyles.platformIcon.color}
          />
          <Text style={[
            styles.platformButtonText,
            themedStyles.platformButtonText,
            activeSection === 'android' && themedStyles.platformButtonTextActive
          ]}>
            TalkBack (Android)
          </Text>
        </TouchableOpacity>
      </View>

      {activeSection && (
        <View style={styles.gestureGuide}>
          <Text style={[styles.sectionTitle, themedStyles.sectionTitle]}>Essential Gestures</Text>
          {platformSpecificGuides[activeSection].map((item, index) => (
            <View
              key={index}
              style={[styles.gestureItem, themedStyles.gestureItem]}
              accessibilityRole="text"
              accessibilityLabel={`${item.gesture}: ${item.action}`}
            >
              <View style={styles.gestureHeader}>
                <Ionicons name="hand-left-outline" size={24} color={colors.primary} />
                <Text style={[styles.gestureName, themedStyles.gestureName]}>{item.gesture}</Text>
              </View>
              <Text style={[styles.gestureDescription, themedStyles.gestureDescription]}>{item.action}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, themedStyles.sectionTitle]}>Implementation Guide</Text>

        <View style={[styles.card, themedStyles.card]}>
          <View style={styles.cardHeader}>
            <Ionicons name="code-working-outline" size={24} color={colors.primary} />
            <Text style={[styles.cardTitle, themedStyles.cardTitle]}>Semantic Structure</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={[styles.practiceItem, themedStyles.practiceItem]}>• Use proper heading hierarchy</Text>
            <Text style={[styles.practiceItem, themedStyles.practiceItem]}>• Implement meaningful landmarks</Text>
            <Text style={[styles.practiceItem, themedStyles.practiceItem]}>• Group related elements logically</Text>
            <TouchableOpacity
              style={styles.learnMoreButton}
              accessibilityRole="button"
              accessibilityLabel="View semantic structure code examples"
            >
              <Text style={[styles.learnMoreText, themedStyles.learnMoreText]}>View Code Examples</Text>
              <Ionicons name="arrow-forward" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.card, themedStyles.card]}>
          <View style={styles.cardHeader}>
            <Ionicons name="text-outline" size={24} color={colors.primary} />
            <Text style={[styles.cardTitle, themedStyles.cardTitle]}>Content Descriptions</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={[styles.practiceItem, themedStyles.practiceItem]}>• Provide clear accessibilityLabels</Text>
            <Text style={[styles.practiceItem, themedStyles.practiceItem]}>• Include meaningful hints</Text>
            <Text style={[styles.practiceItem, themedStyles.practiceItem]}>• Describe state changes</Text>
            <TouchableOpacity
              style={styles.learnMoreButton}
              accessibilityRole="button"
              accessibilityLabel="View content description guidelines"
            >
              <Text style={[styles.learnMoreText, themedStyles.learnMoreText]}>View Guidelines</Text>
              <Ionicons name="arrow-forward" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.card, themedStyles.card]}>
          <View style={styles.cardHeader}>
            <Ionicons name="options-outline" size={24} color={colors.primary} />
            <Text style={[styles.cardTitle, themedStyles.cardTitle]}>Interactive Elements</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={[styles.practiceItem, themedStyles.practiceItem]}>• Define proper roles</Text>
            <Text style={[styles.practiceItem, themedStyles.practiceItem]}>• Manage focus appropriately</Text>
            <Text style={[styles.practiceItem, themedStyles.practiceItem]}>• Handle custom actions</Text>
            <TouchableOpacity
              style={styles.learnMoreButton}
              accessibilityRole="button"
              accessibilityLabel="View interactive elements examples"
            >
              <Text style={[styles.learnMoreText, themedStyles.learnMoreText]}>View Examples</Text>
              <Ionicons name="arrow-forward" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, themedStyles.sectionTitle]}>Testing Checklist</Text>
        <View style={[styles.checklistCard, themedStyles.checklistCard]}>
          <View style={styles.checklistItem}>
            <Ionicons name="checkmark-circle" size={24} color="#28A745" />
            <Text style={[styles.checklistText, themedStyles.checklistText]}>
              Verify all elements have proper labels
            </Text>
          </View>
          <View style={styles.checklistItem}>
            <Ionicons name="checkmark-circle" size={24} color="#28A745" />
            <Text style={[styles.checklistText, themedStyles.checklistText]}>
              Test navigation flow with screen reader
            </Text>
          </View>
          <View style={styles.checklistItem}>
            <Ionicons name="checkmark-circle" size={24} color="#28A745" />
            <Text style={[styles.checklistText, themedStyles.checklistText]}>
              Confirm state changes are announced
            </Text>
          </View>
          <View style={styles.checklistItem}>
            <Ionicons name="checkmark-circle" size={24} color="#28A745" />
            <Text style={[styles.checklistText, themedStyles.checklistText]}>
              Validate custom actions work correctly
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginBottom: 8,
  },
  headerDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  platformSection: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  platformButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    gap: 8,
  },
  platformButtonActive: {
    backgroundColor: '#007AFF',
  },
  platformButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  platformButtonTextActive: {
    color: '#fff',
  },
  gestureGuide: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 16,
  },
  gestureItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  gestureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  gestureName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1c1e',
  },
  gestureDescription: {
    fontSize: 14,
    color: '#666',
    marginLeft: 36,
  },
  section: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1c1c1e',
  },
  cardContent: {
    gap: 8,
  },
  practiceItem: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  learnMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 4,
  },
  learnMoreText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  checklistCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  checklistText: {
    fontSize: 14,
    color: '#444',
    flex: 1,
  },
});

export default ScreenReaderSupportScreen;