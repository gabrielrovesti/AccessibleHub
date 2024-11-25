import { View, Text, StyleSheet } from 'react-native';

export default function ComponentsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Component Examples</Text>
      <Text style={styles.description}>This section will contain accessibility examples for common React Native components.</Text>
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