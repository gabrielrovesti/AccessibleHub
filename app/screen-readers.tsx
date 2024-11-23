import { View, Text, ScrollView } from 'react-native';

export default function ScreenReaders() {
  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: '#ffffff' }}
      contentContainerStyle={{ 
        padding: 16,
        paddingTop: 16
      }}
    >
      <View style={{ marginBottom: 24 }}>
        <Text style={{ 
          fontSize: 24,
          fontWeight: 'bold',
          color: '#1a1a1a',
          marginBottom: 8,
        }}>
          Screen Readers
        </Text>
        <Text style={{ 
          fontSize: 16,
          color: '#666666',
          lineHeight: 24,
        }}>
          Learn how to implement screen reader support in your React Native applications.
        </Text>
      </View>
    </ScrollView>
  );
}