import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ScreenReaderSupportScreen = () => {
  const [activeSection, setActiveSection] = useState(null);

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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Screen Reader Guide</Text>
        <Text style={styles.headerDescription}>
          Comprehensive guide for optimizing your app for VoiceOver and TalkBack
        </Text>
      </View>

      {/* Platform Selection */}
      <View style={styles.platformSection}>
        <TouchableOpacity
          style={[
            styles.platformButton,
            activeSection === 'ios' && styles.platformButtonActive
          ]}
          onPress={() => setActiveSection('ios')}
        >
          <Ionicons name="logo-apple" size={24} color={activeSection === 'ios' ? "#fff" : "#000"} />
          <Text style={[styles.platformButtonText, activeSection === 'ios' && styles.platformButtonTextActive]}>
            VoiceOver (iOS)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.platformButton,
            activeSection === 'android' && styles.platformButtonActive
          ]}
          onPress={() => setActiveSection('android')}
        >
          <Ionicons name="logo-android" size={24} color={activeSection === 'android' ? "#fff" : "#000"} />
          <Text style={[styles.platformButtonText, activeSection === 'android' && styles.platformButtonTextActive]}>
            TalkBack (Android)
          </Text>
        </TouchableOpacity>
      </View>

      {/* Gesture Guide */}
      {activeSection && (
        <View style={styles.gestureGuide}>
          <Text style={styles.sectionTitle}>Essential Gestures</Text>
          {platformSpecificGuides[activeSection].map((item, index) => (
            <View key={index} style={styles.gestureItem}>
              <View style={styles.gestureHeader}>
                <Ionicons name="hand-left-outline" size={24} color="#007AFF" />
                <Text style={styles.gestureName}>{item.gesture}</Text>
              </View>
              <Text style={styles.gestureDescription}>{item.action}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Best Practices */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Implementation Guide</Text>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="code-working-outline" size={24} color="#007AFF" />
            <Text style={styles.cardTitle}>Semantic Structure</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.practiceItem}>• Use proper heading hierarchy</Text>
            <Text style={styles.practiceItem}>• Implement meaningful landmarks</Text>
            <Text style={styles.practiceItem}>• Group related elements logically</Text>
            <TouchableOpacity style={styles.learnMoreButton}>
              <Text style={styles.learnMoreText}>View Code Examples</Text>
              <Ionicons name="arrow-forward" size={16} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="text-outline" size={24} color="#007AFF" />
            <Text style={styles.cardTitle}>Content Descriptions</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.practiceItem}>• Provide clear accessibilityLabels</Text>
            <Text style={styles.practiceItem}>• Include meaningful hints</Text>
            <Text style={styles.practiceItem}>• Describe state changes</Text>
            <TouchableOpacity style={styles.learnMoreButton}>
              <Text style={styles.learnMoreText}>View Guidelines</Text>
              <Ionicons name="arrow-forward" size={16} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="options-outline" size={24} color="#007AFF" />
            <Text style={styles.cardTitle}>Interactive Elements</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.practiceItem}>• Define proper roles</Text>
            <Text style={styles.practiceItem}>• Manage focus appropriately</Text>
            <Text style={styles.practiceItem}>• Handle custom actions</Text>
            <TouchableOpacity style={styles.learnMoreButton}>
              <Text style={styles.learnMoreText}>View Examples</Text>
              <Ionicons name="arrow-forward" size={16} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Testing Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Testing Checklist</Text>
        <View style={styles.checklistCard}>
          <View style={styles.checklistItem}>
            <Ionicons name="checkmark-circle" size={24} color="#28A745" />
            <Text style={styles.checklistText}>Verify all elements have proper labels</Text>
          </View>
          <View style={styles.checklistItem}>
            <Ionicons name="checkmark-circle" size={24} color="#28A745" />
            <Text style={styles.checklistText}>Test navigation flow with screen reader</Text>
          </View>
          <View style={styles.checklistItem}>
            <Ionicons name="checkmark-circle" size={24} color="#28A745" />
            <Text style={styles.checklistText}>Confirm state changes are announced</Text>
          </View>
          <View style={styles.checklistItem}>
            <Ionicons name="checkmark-circle" size={24} color="#28A745" />
            <Text style={styles.checklistText}>Validate custom actions work correctly</Text>
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