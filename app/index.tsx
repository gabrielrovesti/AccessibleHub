import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function IndexScreen() {
  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: '#ffffff' }}
      contentContainerStyle={{ padding: 16, paddingTop: 24}}
      accessible={true}
    >
      {/* Hero Section */}
      <View style={{ marginBottom: 32 }}>
        <Text style={{ 
          fontSize: 28,
          fontWeight: 'bold',
          color: '#1a1a1a',
          marginBottom: 8,
        }}
        accessible={true}
        accessibilityRole="header">
          Welcome to accessibility testing
        </Text>
        <Text style={{ 
          fontSize: 16,
          color: '#666666',
          lineHeight: 24,
        }}>
          Discover how to make React Native components accessible to all users. Through practical examples and guided testing, learn essential techniques for creating inclusive applications.
        </Text>
      </View>

      {/* Main Categories */}
      <Text style={{ 
        fontSize: 20,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 16,
      }}
      accessible={true}
      accessibilityRole="header">
        Components
      </Text>

      <View style={{ gap: 12 }}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={category.title}
            accessibilityHint={category.description}
          >
            <View style={{
              backgroundColor: '#f8f9fa',
              padding: 16,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#e9ecef',
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <Feather name={category.icon} size={24} color="#2563eb" />
                <Text style={{ 
                  marginLeft: 12,
                  fontSize: 18,
                  fontWeight: '500',
                  color: '#1a1a1a',
                }}>
                  {category.title}
                </Text>
              </View>
              <Text style={{ 
                fontSize: 14,
                color: '#666666',
                lineHeight: 20,
              }}>
                {category.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Documentation Section */}
      <View style={{ marginTop: 32 }}>
        <Text style={{ 
          fontSize: 20,
          fontWeight: '600',
          color: '#1a1a1a',
          marginBottom: 16,
        }}
        accessible={true}
        accessibilityRole="header">
          Accessibility docs
        </Text>
        
        <View style={{ gap: 16 }}>
          {features.map((feature) => (
            <TouchableOpacity
              key={feature.id}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={feature.title}
              accessibilityHint={feature.description}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  backgroundColor: '#e7f0ff',
                  padding: 10,
                  borderRadius: 8,
                }}>
                  <Feather name={feature.icon} size={20} color="#2563eb" />
                </View>
                <View style={{ marginLeft: 12 }}>
                  <Text style={{ 
                    fontSize: 16,
                    fontWeight: '500',
                    color: '#1a1a1a',
                    marginBottom: 2,
                  }}>
                    {feature.title}
                  </Text>
                  <Text style={{ 
                    fontSize: 14,
                    color: '#666666',
                  }}>
                    {feature.description}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const categories = [
  {
    id: 1,
    title: 'Text & headers',
    description: 'Test basic text components, headings, and content hierarchy',
    icon: 'type' as const,
  },
  {
    id: 2,
    title: 'Interactive elements',
    description: 'Explore buttons, links, and touch targets',
    icon: 'mouse-pointer' as const,
  },
  {
    id: 3,
    title: 'Form components',
    description: 'Test inputs, selections, and form controls',
    icon: 'edit-3' as const,
  },
  {
    id: 4,
    title: 'Complex interactions',
    description: 'Try modals, gestures, and advanced patterns',
    icon: 'layers' as const,
  }
];

const features = [
  {
    id: 1,
    title: 'Screen readers',
    description: 'Learn about TalkBack and VoiceOver support',
    icon: 'speaker' as const,
  },
  {
    id: 2,
    title: 'Touch targets',
    description: 'Size appropriately for easier interaction',
    icon: 'maximize' as const,
  },
  {
    id: 3,
    title: 'Color contrast',
    description: 'Maintain compliant contrast ratios',
    icon: 'eye' as const,
  },
  {
    id: 4,
    title: 'Text scaling',
    description: 'Support dynamic text sizing',
    icon: 'type' as const,
  }
];