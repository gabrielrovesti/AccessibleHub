import { View, Text, StyleSheet } from 'react-native';

export default function PracticesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Best Practices</Text>
      <Text style={styles.description}>Learn about WCAG guidelines implementation in React Native.</Text>
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