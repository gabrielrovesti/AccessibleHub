import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={styles.heroContent}>
          <Text style={styles.title}>An accessibility testing manual for developers</Text>
          <Text style={styles.subtitle}>
            A developer's guide to creating inclusive applications
          </Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>15+</Text>
            <Text style={styles.statLabel}>Components</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>WCAG</Text>
            <Text style={styles.statLabel}>2.2 Ready</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>100%</Text>
            <Text style={styles.statLabel}>Accessible</Text>
          </View>
        </View>
      </View>

      {/* Quick Start Section */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.quickStartCard}
          onPress={() => router.push('/accessible-components')}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Quick start with component examples">
          <View style={styles.quickStartContent}>
            <Text style={styles.quickStartTitle}>Quick Start</Text>
            <Text style={styles.quickStartDesc}>Begin with component examples</Text>
          </View>
          <Ionicons name="arrow-forward-circle" size={32} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Main Navigation Cards */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Explore topics</Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/best-practices')}
          accessible={true}
          accessibilityRole="button"
          accessibilityHint="Learn about WCAG guidelines implementation">
          <View style={[styles.cardIconContainer, { backgroundColor: '#E8F1FF' }]}>
            <Ionicons name="book-outline" size={24} color="#0055CC" />
          </View>
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Best Practices</Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </View>
            <Text style={styles.cardDescription}>
              Learn how to implement WCAG guidelines in React Native
            </Text>
            <View style={styles.tagContainer}>
              <View style={[styles.tag, { backgroundColor: '#E8F1FF' }]}>
                <Text style={[styles.tagText, { color: '#0055CC' }]}>WCAG 2.2</Text>
              </View>
              <View style={[styles.tag, { backgroundColor: '#E8F1FF' }]}>
                <Text style={[styles.tagText, { color: '#0055CC' }]}>Guidelines</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/tools')}
          accessible={true}
          accessibilityRole="button"
          accessibilityHint="Access testing tools and methods">
          <View style={[styles.cardIconContainer, { backgroundColor: '#F0F0F0' }]}>
            <Ionicons name="build-outline" size={24} color="#333" />
          </View>
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Testing Tools</Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </View>
            <Text style={styles.cardDescription}>
              Tools and methods to verify your app's accessibility
            </Text>
            <View style={styles.tagContainer}>
              <View style={[styles.tag, { backgroundColor: '#F0F0F0' }]}>
                <Text style={[styles.tagText, { color: '#333' }]}>TalkBack</Text>
              </View>
              <View style={[styles.tag, { backgroundColor: '#F0F0F0' }]}>
                <Text style={[styles.tagText, { color: '#333' }]}>VoiceOver</Text>
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
  hero: {
    backgroundColor: '#fff',
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  heroContent: {
    marginBottom: 24,
  },
  smallTitle: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 8,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#eee',
  },
  section: {
    padding: 20,
  },
  quickStartCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickStartContent: {
    flex: 1,
  },
  quickStartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginBottom: 4,
  },
  quickStartDesc: {
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    lineHeight: 20,
    marginBottom: 12,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#F0F8FF',
  },
  tagText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
});