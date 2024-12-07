import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const WCAGGuidelinesScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>WCAG 2.2 Guidelines</Text>
        <Text style={styles.headerSubtitle}>
          Essential guidelines for mobile accessibility
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.guidelineCard}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: '#E8F1FF' }]}>
              <Ionicons name="eye-outline" size={24} color="#0055CC" />
            </View>
            <Text style={styles.cardTitle}>Perceivable</Text>
          </View>
          <Text style={styles.cardDescription}>
            Information must be presentable to users in ways they can perceive.
          </Text>
          <View style={styles.checkList}>
            <Text style={styles.checkItem}>• Text alternatives for non-text content</Text>
            <Text style={styles.checkItem}>• Sufficient color contrast ratios</Text>
            <Text style={styles.checkItem}>• Clear content structure and relationships</Text>
          </View>
        </View>

        <View style={styles.guidelineCard}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: '#E8F1FF' }]}>
              <Ionicons name="hand-left-outline" size={24} color="#0055CC" />
            </View>
            <Text style={styles.cardTitle}>Operable</Text>
          </View>
          <Text style={styles.cardDescription}>
            Interface components must be operable by all users.
          </Text>
          <View style={styles.checkList}>
            <Text style={styles.checkItem}>• All functionality available via keyboard</Text>
            <Text style={styles.checkItem}>• Sufficient time to read and use content</Text>
            <Text style={styles.checkItem}>• No content that could cause seizures</Text>
          </View>
        </View>

        <View style={styles.guidelineCard}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: '#E8F1FF' }]}>
              <Ionicons name="document-text-outline" size={24} color="#0055CC" />
            </View>
            <Text style={styles.cardTitle}>Understandable</Text>
          </View>
          <Text style={styles.cardDescription}>
            Information and interface operation must be understandable.
          </Text>
          <View style={styles.checkList}>
            <Text style={styles.checkItem}>• Readable and understandable text content</Text>
            <Text style={styles.checkItem}>• Predictable functionality</Text>
            <Text style={styles.checkItem}>• Input assistance and error prevention</Text>
          </View>
        </View>

        <View style={styles.guidelineCard}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: '#E8F1FF' }]}>
              <Ionicons name="code-outline" size={24} color="#0055CC" />
            </View>
            <Text style={styles.cardTitle}>Robust</Text>
          </View>
          <Text style={styles.cardDescription}>
            Content must be robust enough to work with various assistive technologies.
          </Text>
          <View style={styles.checkList}>
            <Text style={styles.checkItem}>• Compatible with current and future tools</Text>
            <Text style={styles.checkItem}>• Proper markup and structure</Text>
            <Text style={styles.checkItem}>• Accessible custom controls</Text>
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
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  section: {
    padding: 16,
    gap: 16,
  },
  guidelineCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1c1c1e',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  checkList: {
    gap: 8,
  },
  checkItem: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    paddingLeft: 8,
  },
});

export default WCAGGuidelinesScreen;