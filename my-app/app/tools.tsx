import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TestingToolsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Testing Tools</Text>
        <Text style={styles.description}>
          Discover tools and methods for testing accessibility in your apps.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Screen Readers</Text>

        <View style={styles.toolCard}>
          <View style={styles.toolHeader}>
            <View style={[styles.iconContainer, { backgroundColor: '#E8F1FF' }]}>
              <Ionicons name="phone-portrait-outline" size={24} color="#0055CC" />
            </View>
            <View style={styles.toolTitleContainer}>
              <Text style={styles.toolTitle}>TalkBack (Android)</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Built-in</Text>
              </View>
            </View>
          </View>
          <Text style={styles.toolDescription}>
            Android's built-in screen reader. Essential gestures:
          </Text>
          <View style={styles.gestureList}>
            <View style={styles.gestureItem}>
              <Ionicons name="finger-print-outline" size={20} color="#666" />
              <Text style={styles.gestureText}>Single tap: Select item</Text>
            </View>
            <View style={styles.gestureItem}>
              <Ionicons name="finger-print-outline" size={20} color="#666" />
              <Text style={styles.gestureText}>Double tap: Activate selected item</Text>
            </View>
            <View style={styles.gestureItem}>
              <Ionicons name="finger-print-outline" size={20} color="#666" />
              <Text style={styles.gestureText}>Swipe right/left: Next/previous item</Text>
            </View>
          </View>
        </View>

        <View style={styles.toolCard}>
          <View style={styles.toolHeader}>
            <View style={[styles.iconContainer, { backgroundColor: '#F0F0F0' }]}>
              <Ionicons name="logo-apple" size={24} color="#333" />
            </View>
            <View style={styles.toolTitleContainer}>
              <Text style={styles.toolTitle}>VoiceOver (iOS)</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Built-in</Text>
              </View>
            </View>
          </View>
          <Text style={styles.toolDescription}>
            iOS's integrated screen reader. Key gestures:
          </Text>
          <View style={styles.gestureList}>
            <View style={styles.gestureItem}>
              <Ionicons name="finger-print-outline" size={20} color="#666" />
              <Text style={styles.gestureText}>Single tap: Select and speak</Text>
            </View>
            <View style={styles.gestureItem}>
              <Ionicons name="finger-print-outline" size={20} color="#666" />
              <Text style={styles.gestureText}>Double tap: Activate item</Text>
            </View>
            <View style={styles.gestureItem}>
              <Ionicons name="finger-print-outline" size={20} color="#666" />
              <Text style={styles.gestureText}>Three finger swipe: Scroll</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Development Tools</Text>

        <TouchableOpacity style={styles.toolCard} accessibilityRole="button">
          <View style={styles.toolHeader}>
            <View style={[styles.iconContainer, { backgroundColor: '#FFF4E6' }]}>
              <Ionicons name="code-working-outline" size={24} color="#FF8C00" />
            </View>
            <Text style={styles.toolTitle}>Accessibility Inspector</Text>
          </View>
          <Text style={styles.toolDescription}>
            Built-in tool to inspect accessibility properties:
          </Text>
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>• Verify accessibility labels and hints</Text>
            <Text style={styles.featureItem}>• Check navigation order</Text>
            <Text style={styles.featureItem}>• Test screen reader announcements</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.toolCard} accessibilityRole="button">
          <View style={styles.toolHeader}>
            <View style={[styles.iconContainer, { backgroundColor: '#E6F4FF' }]}>
              <Ionicons name="color-palette-outline" size={24} color="#0066CC" />
            </View>
            <Text style={styles.toolTitle}>Contrast Analyzer</Text>
          </View>
          <Text style={styles.toolDescription}>
            Verify color contrast ratios meet WCAG guidelines:
          </Text>
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>• Check text contrast ratios</Text>
            <Text style={styles.featureItem}>• Verify UI component contrast</Text>
            <Text style={styles.featureItem}>• Support for WCAG 2.2 standards</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Testing Checklist</Text>
        <View style={styles.checklistCard}>
          <View style={styles.checklistHeader}>
            <Ionicons name="checkbox-outline" size={24} color="#28A745" />
            <Text style={styles.checklistTitle}>Automated Testing</Text>
          </View>
          <View style={styles.checklist}>
            <Text style={styles.checklistItem}>✓ Run accessibility linter</Text>
            <Text style={styles.checklistItem}>✓ Verify accessibility props</Text>
            <Text style={styles.checklistItem}>✓ Check navigation order</Text>
            <Text style={styles.checklistItem}>✓ Test color contrast</Text>
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
    padding: 20,
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
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 16,
  },
  toolCard: {
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
  toolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  toolTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1c1c1e',
    marginRight: 8,
  },
  badge: {
    backgroundColor: '#E8F1FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    color: '#0055CC',
    fontWeight: '500',
  },
  toolDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  gestureList: {
    gap: 8,
  },
  gestureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  gestureText: {
    fontSize: 14,
    color: '#444',
  },
  featureList: {
    gap: 4,
  },
  featureItem: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  checklistCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
  },
  checklistHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  checklistTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1c1c1e',
  },
  checklist: {
    gap: 8,
  },
  checklistItem: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
});