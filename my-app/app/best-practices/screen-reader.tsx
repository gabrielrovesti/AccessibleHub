import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ScreenReaderSupport() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.description}>
          Essential guidelines for optimizing your app for VoiceOver and TalkBack
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="phone-portrait-outline" size={24} color="#0055CC" />
            <Text style={styles.cardTitle}>Platform-Specific Features</Text>
          </View>
          <Text style={styles.cardDescription}>
            Key considerations for iOS VoiceOver and Android TalkBack
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• Proper heading and landmark roles</Text>
            <Text style={styles.bulletItem}>• Custom action support</Text>
            <Text style={styles.bulletItem}>• Focus management</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="hand-left-outline" size={24} color="#0055CC" />
            <Text style={styles.cardTitle}>Essential Gestures</Text>
          </View>
          <Text style={styles.cardDescription}>
            Common screen reader gestures and interactions
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• Single tap to select</Text>
            <Text style={styles.bulletItem}>• Double tap to activate</Text>
            <Text style={styles.bulletItem}>• Three-finger scroll</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="megaphone-outline" size={24} color="#0055CC" />
            <Text style={styles.cardTitle}>Announcements</Text>
          </View>
          <Text style={styles.cardDescription}>
            Best practices for screen reader announcements
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• Clear and concise descriptions</Text>
            <Text style={styles.bulletItem}>• State changes and updates</Text>
            <Text style={styles.bulletItem}>• Error messages and alerts</Text>
          </View>
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
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  section: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1c1c1e',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  bulletList: {
    gap: 8,
  },
  bulletItem: {
    fontSize: 14,
    color: '#444',
    paddingLeft: 8,
  },
});