import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NavigationFocus() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Navigation & Focus</Text>
        <Text style={styles.description}>
          Guidelines for implementing effective keyboard and focus navigation
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="git-branch-outline" size={24} color="#0055CC" />
            <Text style={styles.cardTitle}>Focus Flow</Text>
          </View>
          <Text style={styles.cardDescription}>
            Managing the order and flow of focus navigation
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• Logical tab order</Text>
            <Text style={styles.bulletItem}>• Clear focus indicators</Text>
            <Text style={styles.bulletItem}>• Skip navigation patterns</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="scan-outline" size={24} color="#0055CC" />
            <Text style={styles.cardTitle}>Focus Management</Text>
          </View>
          <Text style={styles.cardDescription}>
            Handling focus during interface changes
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• Modal and dialog focus</Text>
            <Text style={styles.bulletItem}>• Focus restoration</Text>
            <Text style={styles.bulletItem}>• Dynamic content updates</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="keypad-outline" size={24} color="#0055CC" />
            <Text style={styles.cardTitle}>Keyboard Navigation</Text>
          </View>
          <Text style={styles.cardDescription}>
            Supporting keyboard-only navigation
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• Keyboard shortcuts</Text>
            <Text style={styles.bulletItem}>• Focus trapping</Text>
            <Text style={styles.bulletItem}>• Custom key handlers</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginBottom: 8,
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