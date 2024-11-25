import { View, Text, StyleSheet } from 'react-native';

export default function ToolsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Testing Tools</Text>
      <Text style={styles.description}>Discover tools and methods for testing accessibility in your apps.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
});