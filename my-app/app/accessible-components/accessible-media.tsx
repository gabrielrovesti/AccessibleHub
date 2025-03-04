import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Clipboard, AccessibilityInfo, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function AccessibleMediaExample() {
  const [showAltText, setShowAltText] = useState(false);
  const [currentImage, setCurrentImage] = useState(1);
  const [copied, setCopied] = useState(false);
  const { colors, textSizes, isDarkMode } = useTheme();

  // Ottieni le dimensioni dello schermo
  const { width: screenWidth } = Dimensions.get('window');

  // Calcola dimensioni responsive dell'immagine
  const imageWidth = screenWidth * 0.85; // 85% della larghezza schermo
  const imageHeight = imageWidth * 0.67; // Mantiene aspect ratio 3:2

  const images = [
    {
      uri: require('../../assets/images/placeholder1.png'),
      alt: "A placeholder image (first example)",
      role: "Interface example",
    },
    {
      uri: require('../../assets/images/placeholder2.png'),
      alt: "A placeholder image (second example)",
      role: "Navigation example",
    },
    {
      uri: require('../../assets/images/placeholder3.png'),
      alt: "A placeholder image (third example)",
      role: "Controls example",
    },
  ];

  // Announce alt text toggle changes
  useEffect(() => {
    if (showAltText) {
      AccessibilityInfo.announceForAccessibility(`Showing alternative text for image ${currentImage}`);
    }
  }, [showAltText, currentImage]);

  // Example code snippet
  const codeExample = `<Image
  source={require('./path/to/image.png')}
  accessibilityLabel="Detailed description of the image content"
  accessible={true}
  accessibilityRole="image"
  style={{
    width: 300,
    height: 200,
    borderRadius: 8,
  }}
/>`;

  // Copy code to clipboard
  const handleCopy = async () => {
    try {
      await Clipboard.setString(codeExample);
      setCopied(true);
      AccessibilityInfo.announceForAccessibility('Code copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      AccessibilityInfo.announceForAccessibility('Failed to copy code');
    }
  };

  // Common elevated card shadow style
  const cardShadowStyle = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: isDarkMode ? 0.3 : 0.1,
    shadowRadius: 6,
    elevation: 3,
  };

  // Background gradient based on dark/light mode
  const gradientColors = isDarkMode
    ? [colors.background, '#2c2c2e']
    : ['#e2e2e2', colors.background];

  // Themed + local styles
  const themedStyles = {
    container: {
      flex: 1,
    },
    heroCard: {
      backgroundColor: colors.surface,
      marginHorizontal: 16,
      marginTop: 16,
      paddingVertical: 24,
      paddingHorizontal: 16,
      borderRadius: 16,
      ...cardShadowStyle,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
    },
    heroTitle: {
      color: colors.text,
      fontSize: textSizes.xlarge,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 8,
    },
    heroSubtitle: {
      color: colors.textSecondary,
      fontSize: textSizes.medium,
      lineHeight: 24,
      textAlign: 'center',
    },
    section: {
      paddingHorizontal: 16,
      marginTop: 16,
    },
    demoCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      ...cardShadowStyle,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
      marginHorizontal: 16,
    },
    demoImage: {
      width: 300,
      height: 200,
      borderRadius: 8,
      marginBottom: 12,
      resizeMode: 'cover', // Assicura che l'immagine si adatti correttamente
      alignSelf: 'center', // Centra l'immagine orizzontalmente
    },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: isDarkMode ? `${colors.primary}20` : '#E8F1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
    controls: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginVertical: 12,
    },
    controlButton: {
      padding: 8,
    },
    altTextButton: {
      backgroundColor: colors.primary,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginVertical: 8,
    },
    altTextContainer: {
      backgroundColor: isDarkMode ? colors.surface : '#f8f9fa',
      borderRadius: 8,
      padding: 12,
      marginTop: 8,
    },
    altTextTitle: {
      fontWeight: '600',
      marginBottom: 4,
      color: colors.text,
    },
    altTextContent: {
      color: colors.textSecondary,
      fontSize: textSizes.medium,
    },
    altTextRole: {
      color: colors.textSecondary,
      fontSize: textSizes.small,
      marginTop: 4,
    },
    codeCardContainer: {
      backgroundColor: '#1c1c1e',
      borderRadius: 8,
      overflow: 'hidden',
      marginTop: 16,
      ...cardShadowStyle,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? '#333' : 'transparent',
      marginHorizontal: 16,
    },
    codeHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#333',
    },
    codeHeaderText: {
      fontSize: 14,
      fontFamily: 'monospace',
      color: '#999',
    },
    copyButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      padding: 4,
    },
    copyText: {
      fontSize: 14,
      color: '#666',
    },
    copiedText: {
      color: '#28A745',
    },
    codeCard: {
      padding: 16,
    },
    codeText: {
      fontFamily: 'monospace',
      fontSize: 14,
      lineHeight: 20,
      color: '#fff',
    },
    featuresCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      marginTop: 16,
      ...cardShadowStyle,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
      marginHorizontal: 16,
    },
    sectionTitle: {
      color: colors.text,
      fontSize: textSizes.large,
      fontWeight: '600',
      marginBottom: 12,
    },

  };

  // Navigate to the previous image
  const goPrevImage = () => {
    const newIndex = Math.max(1, currentImage - 1);
    setCurrentImage(newIndex);
    AccessibilityInfo.announceForAccessibility(
      `Previous image. Now showing image ${newIndex} of ${images.length}`
    );
  };

  // Navigate to the next image
  const goNextImage = () => {
    const newIndex = Math.min(images.length, currentImage + 1);
    setCurrentImage(newIndex);
    AccessibilityInfo.announceForAccessibility(
      `Next image. Now showing image ${newIndex} of ${images.length}`
    );
  };

  // Toggle alt text
  const toggleAltText = () => {
    setShowAltText(!showAltText);
    AccessibilityInfo.announceForAccessibility(
      `${showAltText ? 'Hiding' : 'Showing'} alternative text`
    );
  };

  return (
    <LinearGradient colors={gradientColors} style={themedStyles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        accessibilityRole="scrollview"
        accessibilityLabel="Accessible Media Example Screen"
      >
        {/* HERO CARD */}
        <View style={themedStyles.heroCard}>
          <Text style={themedStyles.heroTitle} accessibilityRole="header">
            Media Content - Interactive Example
          </Text>
          <Text style={themedStyles.heroSubtitle}>
            View images with detailed alternative text and roles. Use the controls below to navigate.
          </Text>
        </View>

        {/* INTERACTIVE DEMO SECTION */}
        <View style={themedStyles.section}>
         <Text style={themedStyles.sectionTitle}
         accessibilityRole="header"
         accessibilityLabel="Accessible Media Demonstration"
         >
         Media Demo
         </Text>

          <View style={themedStyles.demoCard}>
            <Image
              source={images[currentImage - 1].uri}
              style={themedStyles.demoImage}
              accessibilityLabel={images[currentImage - 1].alt}
              accessible={true}
              accessibilityRole="image"
            />
            <View style={themedStyles.controls}>
              <TouchableOpacity
                style={themedStyles.controlButton}
                onPress={goPrevImage}
                disabled={currentImage === 1}
                accessibilityRole="button"
                accessibilityLabel="Previous image"
                accessibilityHint="Changes to the previous image in the gallery"
                accessibilityState={{ disabled: currentImage === 1 }}
              >
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color={currentImage === 1 ? colors.textSecondary : colors.primary}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={themedStyles.altTextButton}
                onPress={toggleAltText}
                accessibilityRole="button"
                accessibilityLabel={showAltText ? "Hide alternative text" : "Show alternative text"}
                accessibilityHint="Toggles the alternative text description for the current image"
              >
                <Text style={{ color: colors.background, fontWeight: '600' }}>
                  {showAltText ? "Hide Alt Text" : "Show Alt Text"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={themedStyles.controlButton}
                onPress={goNextImage}
                disabled={currentImage === images.length}
                accessibilityRole="button"
                accessibilityLabel="Next image"
                accessibilityHint="Changes to the next image in the gallery"
                accessibilityState={{ disabled: currentImage === images.length }}
              >
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={currentImage === images.length ? colors.textSecondary : colors.primary}
                />
              </TouchableOpacity>
            </View>

            {showAltText && (
              <View style={themedStyles.altTextContainer}>
                <Text style={themedStyles.altTextTitle}>Alternative Text:</Text>
                <Text style={themedStyles.altTextContent}>
                  {images[currentImage - 1].alt}
                </Text>
                <Text style={themedStyles.altTextRole}>
                  Role: {images[currentImage - 1].role}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* MEDIA IMPLEMENTATION SECTION */}
        <View style={themedStyles.section}>
          <Text style={themedStyles.sectionTitle}>Code Implementation</Text>
          <View style={themedStyles.codeCardContainer} accessible={true} accessibilityRole="text">
            <View style={themedStyles.codeHeader}>
              <Text style={themedStyles.codeHeaderText}>JSX</Text>
              <TouchableOpacity
                style={themedStyles.copyButton}
                onPress={handleCopy}
                accessibilityRole="button"
                accessibilityLabel={copied ? "Code copied" : "Copy code"}
                accessibilityHint="Copies the media code example to your clipboard"
              >
                <Ionicons
                  name={copied ? "checkmark" : "copy-outline"}
                  size={20}
                  color={copied ? "#28A745" : colors.textSecondary}
                  accessibilityElementsHidden={true}
                />
                <Text style={[themedStyles.copyText, copied && themedStyles.copiedText]}>
                  {copied ? "Copied!" : "Copy"}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={themedStyles.codeCard}
              accessible={true}
              accessibilityRole="text"
              accessibilityLabel="Image implementation code"
            >
              <Text style={themedStyles.codeText}>
                {codeExample}
              </Text>
            </View>
          </View>
        </View>


        {/* ACCESSIBILITY FEATURES SECTION */}
        <View style={themedStyles.section}>
          <Text style={themedStyles.sectionTitle}>Accessibility Features</Text>
          <View style={themedStyles.featuresCard}>
            {[
              {
                icon: 'text-outline',
                title: 'Alternative Text',
                description: 'Descriptive text that conveys the content and function of the image',
              },
              {
                icon: 'megaphone-outline',
                title: 'Role Announcement',
                description: 'Screen readers announce the element as an image',
              },
              {
                icon: 'hand-left-outline',
                title: 'Touch Target',
                description: 'Interactive images should have adequate touch targets',
              },
            ].map((feature, idx) => (
              <View key={idx} style={styles.featureItem} importantForAccessibility="no">
                <View style={themedStyles.featureIconContainer}>
                  <Ionicons
                    name={feature.icon}
                    size={24}
                    color={isDarkMode ? '#1a75ff' : colors.primary}
                    accessibilityElementsHidden
                    importantForAccessibility="no-hide-descendants"
                  />
                </View>
                <View style={styles.featureContent}>
                  <Text style={[styles.featureTitle, { color: colors.text }]}>{feature.title}</Text>
                  <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
                    {feature.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

// Local styling for container sections, feature items, etc.
const styles = StyleSheet.create({
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  controlButton: {
    padding: 8,
  },
  altTextButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});
