import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function BestPracticesScreen() {
  const [selectedGuide, setSelectedGuide] = useState(null);
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mobile Accessibility Best Practices</Text>
        <Text style={styles.description}>
          Essential guidelines for creating accessible React Native applications
        </Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.guideCard}
          onPress={() => router.push('/practices-screens/guidelines')}
          accessibilityRole="button">
          <View style={[styles.iconContainer, { backgroundColor: '#E8F1FF' }]}>
            <Ionicons name="document-text-outline" size={24} color="#0055CC" />
          </View>
          <View style={styles.guideContent}>
            <View style={styles.guideHeader}>
              <Text style={styles.guideTitle}>WCAG Guidelines</Text>
              <View style={styles.badgeContainer}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>2.2</Text>
                </View>
                <View style={[styles.badge, { backgroundColor: '#E6F4FF' }]}>
                  <Text style={[styles.badgeText, { color: '#0066CC' }]}>Documentation</Text>
                </View>
              </View>
            </View>
            <Text style={styles.guideDescription}>
              Understanding and implementing WCAG 2.2 guidelines in mobile apps
            </Text>
            <View style={styles.guideFooter}>
              <View style={styles.footerItem}>
                <Ionicons name="checkmark-circle" size={16} color="#28A745" />
                <Text style={styles.footerText}>Success Criteria</Text>
              </View>
              <View style={styles.footerItem}>
                <Ionicons name="code-slash" size={16} color="#666" />
                <Text style={styles.footerText}>Examples</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.guideCard}
          onPress={() => router.push('/practices-screens/semantics')}
          accessibilityRole="button">
          <View style={[styles.iconContainer, { backgroundColor: '#F0F8FF' }]}>
            <Ionicons name="git-merge-outline" size={24} color="#0070F3" />
          </View>
          <View style={styles.guideContent}>
            <View style={styles.guideHeader}>
              <Text style={styles.guideTitle}>Semantic Structure</Text>
              <View style={[styles.badge, { backgroundColor: '#FFF4E6' }]}>
                <Text style={[styles.badgeText, { color: '#FF8C00' }]}>Code Examples</Text>
              </View>
            </View>
            <Text style={styles.guideDescription}>
              Creating meaningful and well-organized content hierarchies
            </Text>
            <View style={styles.guideFooter}>
              <View style={styles.footerItem}>
                <Ionicons name="layers-outline" size={16} color="#666" />
                <Text style={styles.footerText}>Hierarchy</Text>
              </View>
              <View style={styles.footerItem}>
                <Ionicons name="code-slash" size={16} color="#666" />
                <Text style={styles.footerText}>Implementation</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.guideCard}
          onPress={() => router.push('/practices-screens/gestures')}
          accessibilityRole="button">
          <View style={[styles.iconContainer, { backgroundColor: '#E6F4FF' }]}>
            <Ionicons name="hand-left-outline" size={24} color="#0066CC" />
          </View>
          <View style={styles.guideContent}>
            <View style={styles.guideHeader}>
              <Text style={styles.guideTitle}>Gesture Tutorial</Text>
              <View style={[styles.badge, { backgroundColor: '#FFE6E6' }]}>
                <Text style={[styles.badgeText, { color: '#DC3545' }]}>Interactive Guide</Text>
              </View>
            </View>
            <Text style={styles.guideDescription}>
              Learn and test common accessibility gestures
            </Text>
            <View style={styles.guideFooter}>
              <View style={styles.footerItem}>
                <Ionicons name="finger-print-outline" size={16} color="#666" />
                <Text style={styles.footerText}>Gesture Patterns</Text>
              </View>
              <View style={styles.footerItem}>
                <Ionicons name="hand-right-outline" size={16} color="#666" />
                <Text style={styles.footerText}>Interactive Demo</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.guideCard}
          onPress={() => router.push('/practices-screens/screen-reader')}
          accessibilityRole="button">
          <View style={[styles.iconContainer, { backgroundColor: '#E6F4FF' }]}>
            <Ionicons name="eye-outline" size={24} color="#0066CC" />
          </View>
          <View style={styles.guideContent}>
            <View style={styles.guideHeader}>
              <Text style={styles.guideTitle}>Screen Reader Support</Text>
              <View style={[styles.badge, { backgroundColor: '#E6FFE6' }]}>
                <Text style={[styles.badgeText, { color: '#28A745' }]}>Guidelines</Text>
              </View>
            </View>
            <Text style={styles.guideDescription}>
              Optimizing your app for VoiceOver and TalkBack
            </Text>
            <View style={styles.guideFooter}>
              <View style={styles.footerItem}>
                <Ionicons name="phone-portrait-outline" size={16} color="#666" />
                <Text style={styles.footerText}>Platform-specific</Text>
              </View>
              <View style={styles.footerItem}>
                <Ionicons name="hand-left-outline" size={16} color="#666" />
                <Text style={styles.footerText}>Gestures</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.guideCard}
          onPress={() => router.push('/practices-screens/navigation')}
          accessibilityRole="button">
          <View style={[styles.iconContainer, { backgroundColor: '#FFF4E6' }]}>
            <Ionicons name="navigate-outline" size={24} color="#FF8C00" />
          </View>
          <View style={styles.guideContent}>
            <View style={styles.guideHeader}>
              <Text style={styles.guideTitle}>Navigation & Focus</Text>
              <View style={[styles.badge, { backgroundColor: '#FFE6E6' }]}>
                <Text style={[styles.badgeText, { color: '#DC3545' }]}>Interactive Guide</Text>
              </View>
            </View>
            <Text style={styles.guideDescription}>
              Managing focus and keyboard navigation effectively
            </Text>
            <View style={styles.guideFooter}>
              <View style={styles.footerItem}>
                <Ionicons name="arrow-forward-circle-outline" size={16} color="#666" />
                <Text style={styles.footerText}>Focus Flow</Text>
              </View>
              <View style={styles.footerItem}>
                <Ionicons name="hand-right-outline" size={16} color="#666" />
                <Text style={styles.footerText}>Interactive Demo</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
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
    padding: 16,
    gap: 16,
  },
  guideCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    gap: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guideContent: {
    flex: 1,
  },
  guideHeader: {
    marginBottom: 8,
  },
  guideTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 4,
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
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
  guideDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  guideFooter: {
    flexDirection: 'row',
    gap: 16,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerText: {
    fontSize: 13,
    color: '#666',
  },
});