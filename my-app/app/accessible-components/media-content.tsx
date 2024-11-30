import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AccessibleMediaExample = () => {
  const [showAltText, setShowAltText] = useState(false);
  const [currentImage, setCurrentImage] = useState(1);

  const images = [
    {
      uri: "https://placekitten.com/300/200",
      alt: "A playful orange kitten chasing a red yarn ball",
      role: "Decorative image"
    },
    {
      uri: "https://placekitten.com/301/200",
      alt: "A sleeping grey kitten curled up on a blue blanket",
      role: "Informative image"
    },
    {
      uri: "https://placekitten.com/302/200",
      alt: "Two kittens playing with each other, showcasing interactive behavior",
      role: "Complex image"
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interactive Example</Text>
        <View style={styles.demoContainer}>
          <Image
            source={{ uri: images[currentImage - 1].uri }}
            style={styles.demoImage}
            accessibilityLabel={images[currentImage - 1].alt}
            accessible={true}
          />
          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => setCurrentImage(prev => Math.max(1, prev - 1))}
              disabled={currentImage === 1}
            >
              <Ionicons name="chevron-back" size={24} color={currentImage === 1 ? "#ccc" : "#007AFF"} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.altTextButton}
              onPress={() => setShowAltText(!showAltText)}
            >
              <Text style={styles.altTextButtonText}>
                {showAltText ? "Hide Alt Text" : "Show Alt Text"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => setCurrentImage(prev => Math.min(3, prev + 1))}
              disabled={currentImage === 3}
            >
              <Ionicons name="chevron-forward" size={24} color={currentImage === 3 ? "#ccc" : "#007AFF"} />
            </TouchableOpacity>
          </View>
          {showAltText && (
            <View style={styles.altTextContainer}>
              <Text style={styles.altTextTitle}>Alt Text:</Text>
              <Text style={styles.altTextContent}>{images[currentImage - 1].alt}</Text>
              <Text style={styles.altTextRole}>Role: {images[currentImage - 1].role}</Text>
            </View>
          )}
          <Text style={styles.demoText}>
            Try this image with VoiceOver/TalkBack enabled
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Implementation</Text>
        <View style={styles.codeCard}>
          <Text style={styles.codeText}>{`<Image
  source={{ uri: imageUrl }}
  accessibilityLabel="Detailed description of the image"
  accessible={true}
  accessibilityRole="image"
  style={{
    width: 300,
    height: 200,
    borderRadius: 8,
  }}
/>`}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accessibility Features</Text>
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <View style={[styles.iconContainer, { backgroundColor: '#E8F1FF' }]}>
              <Ionicons name="text-outline" size={24} color="#0055CC" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Alt Text</Text>
              <Text style={styles.featureDescription}>
                Descriptive text that conveys the content and function of the image
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={[styles.iconContainer, { backgroundColor: '#E8F1FF' }]}>
              <Ionicons name="megaphone-outline" size={24} color="#0055CC" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Role Announcement</Text>
              <Text style={styles.featureDescription}>
                Screen readers announce the element as an image
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={[styles.iconContainer, { backgroundColor: '#E8F1FF' }]}>
              <Ionicons name="hand-left-outline" size={24} color="#0055CC" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Touch Target</Text>
              <Text style={styles.featureDescription}>
                Interactive images should have adequate touch targets
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  section: {
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 12,
  },
  demoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  demoImage: {
    width: 300,
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  demoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  codeCard: {
    backgroundColor: '#1c1c1e',
    padding: 16,
    borderRadius: 8,
  },
  codeText: {
    color: '#fff',
    fontFamily: 'monospace',
    fontSize: 14,
    lineHeight: 20,
  },
  featuresContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
    controls: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 12,
      marginBottom: 8,
    },
    controlButton: {
      padding: 8,
    },
    altTextButton: {
      backgroundColor: '#007AFF',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
    altTextButtonText: {
      color: '#fff',
      fontWeight: '600',
    },
    altTextContainer: {
      backgroundColor: '#f8f9fa',
      padding: 12,
      borderRadius: 8,
      marginTop: 8,
      width: '100%',
    },
    altTextTitle: {
      fontWeight: '600',
      marginBottom: 4,
    },
    altTextContent: {
      color: '#666',
      marginBottom: 4,
    },
    altTextRole: {
      color: '#666',
      fontStyle: 'italic',
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default AccessibleMediaExample;