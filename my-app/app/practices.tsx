import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PracticesScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Best Practices</Text>
        <Text style={styles.subtitle}>
          Essential guidelines for creating accessible React Native applications
        </Text>
      </View>

      <TouchableOpacity
        style={styles.practiceCard}
        accessible={true}
        accessibilityRole="button"
        accessibilityHint="Learn about WCAG guidelines">
        <Text style={styles.cardTitle}>WCAG Guidelines</Text>
        <Text style={styles.cardDesc}>
          Understanding and implementing WCAG 2.2 guidelines in mobile apps
        </Text>
        <View style={styles.cardFooter}>
          <Ionicons name="document-text-outline" size={20} color="#666" />
          <Text style={styles.footerText}>Documentation</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.practiceCard}
        accessible={true}
        accessibilityRole="button"
        accessibilityHint="Learn about semantic structure">
        <Text style={styles.cardTitle}>Semantic Structure</Text>
        <Text style={styles.cardDesc}>
          Creating meaningful and well-organized content hierarchies
        </Text>
        <View style={styles.cardFooter}>
          <Ionicons name="code-outline" size={20} color="#666" />
          <Text style={styles.footerText}>Code Examples</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.practiceCard}
        accessible={true}
        accessibilityRole="button"
        accessibilityHint="Learn about screen reader support">
        <Text style={styles.cardTitle}>Screen Reader Support</Text>
        <Text style={styles.cardDesc}>
          Optimizing your app for VoiceOver and TalkBack
        </Text>
        <View style={styles.cardFooter}>
          <Ionicons name="eye-outline" size={20} color="#666" />
          <Text style={styles.footerText}>Guidelines</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.practiceCard}
        accessible={true}
        accessibilityRole="button"
        accessibilityHint="Learn about keyboard navigation">
        <Text style={styles.cardTitle}>Navigation & Focus</Text>
        <Text style={styles.cardDesc}>
          Managing focus and keyboard navigation effectively
        </Text>
        <View style={styles.cardFooter}>
          <Ionicons name="hand-left-outline" size={20} color="#666" />
          <Text style={styles.footerText}>Interactive Guide</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  practiceCard: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 12,
    marginHorizontal: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  footerText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
});