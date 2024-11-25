import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ComponentsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Component Examples</Text>
        <Text style={styles.subtitle}>
          Learn how to make common React Native components accessible
        </Text>
      </View>

      <TouchableOpacity
        style={styles.componentCard}
        accessible={true}
        accessibilityRole="button"
        accessibilityHint="Learn about button accessibility">
        <View style={styles.iconContainer}>
          <Ionicons name="radio-button-on-outline" size={24} color="#333" />
        </View>
        <View style={styles.componentContent}>
          <Text style={styles.componentTitle}>Buttons</Text>
          <Text style={styles.componentDesc}>
            Implement accessible buttons with proper labels and touch targets
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#666" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.componentCard}
        accessible={true}
        accessibilityRole="button"
        accessibilityHint="Learn about form input accessibility">
        <View style={styles.iconContainer}>
          <Ionicons name="create-outline" size={24} color="#333" />
        </View>
        <View style={styles.componentContent}>
          <Text style={styles.componentTitle}>Form Inputs</Text>
          <Text style={styles.componentDesc}>
            Create accessible text inputs and form controls
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#666" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.componentCard}
        accessible={true}
        accessibilityRole="button"
        accessibilityHint="Learn about image accessibility">
        <View style={styles.iconContainer}>
          <Ionicons name="image-outline" size={24} color="#333" />
        </View>
        <View style={styles.componentContent}>
          <Text style={styles.componentTitle}>Images</Text>
          <Text style={styles.componentDesc}>
            Add proper descriptions and alternative text
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#666" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.componentCard}
        accessible={true}
        accessibilityRole="button"
        accessibilityHint="Learn about navigation accessibility">
        <View style={styles.iconContainer}>
          <Ionicons name="menu-outline" size={24} color="#333" />
        </View>
        <View style={styles.componentContent}>
          <Text style={styles.componentTitle}>Navigation</Text>
          <Text style={styles.componentDesc}>
            Build accessible navigation menus and controls
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#666" />
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
  componentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
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
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  componentContent: {
    flex: 1,
  },
  componentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  componentDesc: {
    fontSize: 14,
    color: '#666',
  },
});