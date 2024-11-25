import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>An accessibility testing manual for developers</Text>
        <Text style={styles.description}>
          Discover how to make React Native components accessible to all users. Through practical examples
          and guided testing, learn essential techniques for creating inclusive applications.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.card}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Component Examples"
        accessibilityHint="View accessible component implementations with code samples"
        onPress={() => router.push('/components')}>
        <Ionicons name="code-outline" size={24} color="#333" />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Component Examples</Text>
          <Text style={styles.cardDescription}>
            Explore accessible component implementations with code samples
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#666" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Best Practices"
        accessibilityHint="Learn how to implement WCAG guidelines in React Native"
        onPress={() => router.push('/practices')}>
        <Ionicons name="book-outline" size={24} color="#333" />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Best Practices</Text>
          <Text style={styles.cardDescription}>
            Learn how to implement WCAG guidelines in React Native
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#666" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Testing Tools"
        accessibilityHint="Discover tools and methods for accessibility testing"
        onPress={() => router.push('/tools')}>
        <Ionicons name="build-outline" size={24} color="#333" />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Testing Tools</Text>
          <Text style={styles.cardDescription}>
            Tools and methods to verify your app's accessibility
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#666" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});