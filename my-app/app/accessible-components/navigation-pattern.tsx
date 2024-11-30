import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const AccessibleNavigationExample = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interactive Example</Text>
        <View style={styles.demoContainer}>
          <View style={styles.demoNav}>
            <TouchableOpacity
              style={styles.navItem}
              accessibilityRole="tab"
              accessibilityLabel="Home tab"
              accessibilityState={{ selected: true }}
            >
              <Text style={[styles.navText, styles.navTextActive]}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navItem}
              accessibilityRole="tab"
              accessibilityLabel="Profile tab"
              accessibilityState={{ selected: false }}
            >
              <Text style={styles.navText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navItem}
              accessibilityRole="tab"
              accessibilityLabel="Settings tab"
              accessibilityState={{ selected: false }}
            >
              <Text style={styles.navText}>Settings</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.demoText}>
            Try this navigation with VoiceOver/TalkBack enabled
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Implementation</Text>
        <View style={styles.codeCard}>
          <Text style={styles.codeText}>{`<TouchableOpacity
  accessibilityRole="tab"
  accessibilityLabel="Home tab"
  accessibilityState={{ selected: true }}
  style={{
    padding: 12,
    borderRadius: 8,
  }}
>
  <Text>Home</Text>
</TouchableOpacity>`}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accessibility Features</Text>
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Semantic Role</Text>
              <Text style={styles.featureDescription}>
                Using proper roles helps users understand the navigation structure
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>State Management</Text>
              <Text style={styles.featureDescription}>
                Selected state is properly announced to screen readers
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Focus Order</Text>
              <Text style={styles.featureDescription}>
                Logical tab order follows visual layout
              </Text>
            </View>
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
  section: {
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 12,
  },
  demoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  demoNav: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 4,
    marginBottom: 12,
  },
  navItem: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
  },
  navText: {
    textAlign: 'center',
    color: '#666',
  },
  navTextActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
  demoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  codeCard: {
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
  featuresContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default AccessibleNavigationExample;