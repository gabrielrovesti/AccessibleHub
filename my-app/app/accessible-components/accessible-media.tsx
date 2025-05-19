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

  const { width: screenWidth } = Dimensions.get('window');

  const calculateImageSize = () => {
    const maxWidth = Math.min(screenWidth * 0.75, 300);

    return {
      width: maxWidth,
      height: maxWidth,
    };
  };

  const imageSize = calculateImageSize();

  const images = [
    {
      uri: require('../../assets/images/interface.png'),
      alt: "A placeholder image (first example)",
      role: "Interface example",
    },
    {
      uri: require('../../assets/images/navigation.png'),
      alt: "A placeholder image (second example)",
      role: "Navigation example",
    },
    {
      uri: require('../../assets/images/controls.png'),
      alt: "A placeholder image (third example)",
      role: "Controls example",
    },
  ];

  useEffect(() => {
    if (showAltText) {
      AccessibilityInfo.announceForAccessibility(`Showing alternative text for image ${currentImage}`);
    }
  }, [showAltText, currentImage]);

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

  const cardShadowStyle = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: isDarkMode ? 0.3 : 0.1,
    shadowRadius: 6,
    elevation: 3,
  };

  const gradientColors = isDarkMode
    ? [colors.background, '#2c2c2e']
    : ['#e2e2e2', colors.background];

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
      width: imageSize.width,
      height: imageSize.height,
      borderRadius: 8,
      marginBottom: 12,
      resizeMode: 'contain',
      alignSelf: 'center',
    },
featuresSection: {
  marginTop: 24,
  paddingHorizontal: 16,
},
featuresTitle: {
  color: colors.text,
  fontSize: textSizes.large,
  fontWeight: '600',
  marginBottom: 16,
},
featureCard: {
  backgroundColor: colors.surface,
  borderRadius: 16,
  padding: 16,
  marginBottom: 12,
  ...cardShadowStyle,
  borderWidth: isDarkMode ? 1 : 0,
  borderColor: isDarkMode ? colors.border : 'transparent',
},
featureRow: {
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: 12,
},
featureIconContainer: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: isDarkMode ? `${colors.primary}20` : '#E8F1FF',
  alignItems: 'center',
  justifyContent: 'center',
},
featureContent: {
  flex: 1,
},
featureTitle: {
  color: colors.text,
  fontSize: textSizes.medium,
  fontWeight: '600',
  marginBottom: 4,
},
featureDescription: {
  color: colors.textSecondary,
  fontSize: textSizes.small + 1,
  lineHeight: 20,
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
    sectionTitle: {
      color: colors.text,
      fontSize: textSizes.large,
      fontWeight: '600',
      marginBottom: 12,
    },

  };

  const goPrevImage = () => {
    const newIndex = Math.max(1, currentImage - 1);
    setCurrentImage(newIndex);
    AccessibilityInfo.announceForAccessibility(
      `Previous image. Now showing image ${newIndex} of ${images.length}`
    );
  };

  const goNextImage = () => {
    const newIndex = Math.min(images.length, currentImage + 1);
    setCurrentImage(newIndex);
    AccessibilityInfo.announceForAccessibility(
      `Next image. Now showing image ${newIndex} of ${images.length}`
    );
  };

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
        <View style={themedStyles.heroCard}>
          <Text style={themedStyles.heroTitle} accessibilityRole="header">
            Media Content - Interactive Example
          </Text>
          <Text style={themedStyles.heroSubtitle}>
            View images with detailed alternative text and roles. Use the controls below to navigate.
          </Text>
        </View>

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
                accessibilityLabel="Navigate to previous image in gallery"
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
                accessibilityLabel="Navigate to next image in gallery"
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

        <View style={themedStyles.featuresSection}>
          <Text style={themedStyles.featuresTitle}>Accessibility Features</Text>
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
          ].map((feature, index) => (
            <View key={index} style={themedStyles.featureCard}>
              <View style={themedStyles.featureRow}>
                <View style={themedStyles.featureIconContainer}>
                  <Ionicons
                    name={feature.icon}
                    size={24}
                    color={isDarkMode ? '#1a75ff' : colors.primary}
                    accessibilityElementsHidden={true}
                    importantForAccessibility="no-hide-descendants"
                  />
                </View>
                <View style={themedStyles.featureContent}>
                  <Text style={themedStyles.featureTitle}>
                    {feature.title}
                  </Text>
                  <Text style={themedStyles.featureDescription}>
                    {feature.description}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
