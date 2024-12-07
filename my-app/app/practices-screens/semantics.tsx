import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SemanticStructureScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Semantic Structure</Text>
        <Text style={styles.headerSubtitle}>
          Building meaningful and well-organized content hierarchies
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: '#FFF4E6' }]}>
              <Ionicons name="layers-outline" size={24} color="#FF8C00" />
            </View>
            <Text style={styles.cardTitle}>Content Hierarchy</Text>
          </View>
          <Text style={styles.cardDescription}>
            Proper headings and landmarks help users understand content organization.
          </Text>
          <View style={styles.codeExample}>
            <Text style={styles.codeText}>{`// Good Example
<View accessibilityRole="header">
  <Text accessibilityRole="heading">
    Main Title
  </Text>
</View>

<View accessibilityRole="main">
  <Text accessibilityRole="heading">
    Section Title
  </Text>
</View>`}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: '#FFF4E6' }]}>
              <Ionicons name="list-outline" size={24} color="#FF8C00" />
            </View>
            <Text style={styles.cardTitle}>Navigation Order</Text>
          </View>
          <Text style={styles.cardDescription}>
            Logical tab order that matches visual layout improves navigation.
          </Text>
          <View style={styles.keyPoints}>
            <Text style={styles.keyPoint}>• Use natural reading order</Text>
            <Text style={styles.keyPoint}>• Group related elements</Text>
            <Text style={styles.keyPoint}>• Maintain consistent structure</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: '#FFF4E6' }]}>
              <Ionicons name="apps-outline" size={24} color="#FF8C00" />
            </View>
            <Text style={styles.cardTitle}>Landmarks & Regions</Text>
          </View>
          <Text style={styles.cardDescription}>
            Define distinct areas of content to aid navigation and comprehension.
          </Text>
          <View style={styles.keyPoints}>
            <Text style={styles.keyPoint}>• Mark main content areas</Text>
            <Text style={styles.keyPoint}>• Identify navigation sections</Text>
            <Text style={styles.keyPoint}>• Label complementary content</Text>
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
  card: {
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
  codeExample: {
    backgroundColor: '#1c1c1e',
    padding: 16,
    borderRadius: 8,
  },
  codeText: {
    color: '#fff',
    fontFamily: 'monospace',
    fontSize: 14,
    lineHeight: 20,
  },
  keyPoints: {
    gap: 8,
  },
  keyPoint: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    paddingLeft: 8,
  },
});

export default SemanticStructureScreen;