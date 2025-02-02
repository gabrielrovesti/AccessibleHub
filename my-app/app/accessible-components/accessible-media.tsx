import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Clipboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { AccessibilityInfo } from 'react-native';

const AccessibleMediaExample = () => {
  const [showAltText, setShowAltText] = useState(false);
  const [currentImage, setCurrentImage] = useState(1);
  const [copied, setCopied] = useState(false);
  const { colors, textSizes, isDarkMode } = useTheme();

  const images = [
    {
      uri: require('../../assets/images/placeholder1.png'),
      alt: "A placeholder image (first example)",
      role: "Interface example"
    },
    {
      uri: require('../../assets/images/placeholder2.png'),
      alt: "A placeholder image (second example)",
      role: "Navigation example"
    },
    {
      uri: require('../../assets/images/placeholder3.png'),
      alt: "A placeholder image (third example)",
      role: "Controls example"
    }
  ];

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
/>

{/* For network images */}
<Image
  source={{ uri: 'https://your-domain.com/image.jpg' }}
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
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
    AccessibilityInfo.announceForAccessibility('Failed to copy code');
  }
};

  const themedStyles = {
    container: {
      backgroundColor: colors.background,
    },
    sectionTitle: {
      color: colors.text,
      fontSize: textSizes.xlarge,
    },
    demoContainer: {
      backgroundColor: colors.surface,
    },
    demoText: {
      color: colors.textSecondary,
    },
    featuresContainer: {
      backgroundColor: colors.surface,
    },
    featureTitle: {
      color: colors.textSecondary,
    },
    featureDescription: {
      color: colors.textSecondary,
    },
    codeContainer: {
      backgroundColor: '#1c1c1e',
    },
    codeText: {
      color: '#fff',
    },
    codeHeader: {
      borderBottomColor: '#333',
    },
    codeHeaderText: {
      color: '#999',
    },
    copyText: {
      color: '#666',
    },
    copiedText: {
      color: '#28A745',
    },
    altTextContainer: {
      backgroundColor: isDarkMode ? colors.surface : '#f8f9fa',
    },
    altTextContent: {
      color: colors.textSecondary,
    },
    altTextRole: {
      color: colors.textSecondary,
    },
    altTextTitle: {
          color: colors.text,
          fontWeight: '600',
    },
  };

  return (
    <ScrollView style={[styles.container, themedStyles.container]}>
      {/* Interactive Example Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, themedStyles.sectionTitle]}>Interactive Example</Text>
        <View style={[styles.demoContainer, themedStyles.demoContainer]}>
          <Image
            source={images[currentImage - 1].uri}
            style={styles.demoImage}
            accessibilityLabel={images[currentImage - 1].alt}
            accessible={true}
          />
          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => setCurrentImage(prev => Math.max(1, prev - 1))}
              disabled={currentImage === 1}
              accessibilityLabel="Previous image"
              accessibilityRole="button"
              accessibilityState={{ disabled: currentImage === 1 }}
            >
              <Ionicons
                name="chevron-back"
                size={24}
                color={currentImage === 1 ? colors.textSecondary : colors.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.altTextButton, { backgroundColor: colors.primary }]}
              onPress={() => setShowAltText(!showAltText)}
              accessibilityLabel={showAltText ? "Hide alt text" : "Show alt text"}
              accessibilityRole="button"
            >
              <Text style={{ color: colors.background, fontWeight: '600' }}>
                {showAltText ? "Hide Alt Text" : "Show Alt Text"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => setCurrentImage(prev => Math.min(3, prev + 1))}
              disabled={currentImage === 3}
              accessibilityLabel="Next image"
              accessibilityRole="button"
              accessibilityState={{ disabled: currentImage === 3 }}
            >
              <Ionicons
                name="chevron-forward"
                size={24}
                color={currentImage === 3 ? colors.textSecondary : colors.primary}
              />
            </TouchableOpacity>
          </View>
          {showAltText && (
            <View style={[styles.altTextContainer, themedStyles.altTextContainer]}>
              <Text style={[styles.altTextTitle, themedStyles.altTextTitle]}>Alt Text:</Text>
              <Text style={[styles.altTextContent, themedStyles.altTextContent]}>
                {images[currentImage - 1].alt}
              </Text>
              <Text style={[styles.altTextRole, themedStyles.altTextRole]}>
                Role: {images[currentImage - 1].role}
              </Text>
            </View>
          )}
          <Text style={[styles.demoText, themedStyles.demoText]}>
            Try this image with VoiceOver/TalkBack enabled
          </Text>
        </View>
      </View>

      {/* Implementation Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, themedStyles.sectionTitle]}>Implementation</Text>
        <View style={[styles.codeContainer, themedStyles.codeContainer]}>
          <View style={[styles.codeHeader, themedStyles.codeHeader]}>
            <Text style={[styles.codeHeaderText, themedStyles.codeHeaderText]}>JSX</Text>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={handleCopy}
              accessibilityRole="button"
              accessibilityLabel={copied ? "Code copied" : "Copy code"}
              accessibilityHint="Copies the code example to your clipboard"
            >
              <Ionicons
                name={copied ? "checkmark" : "copy-outline"}
                size={20}
                color={copied ? "#28A745" : colors.textSecondary}
                accessibilityElementsHidden={true}
              />
              <Text style={[styles.copyText, copied && styles.copiedText, themedStyles.copyText]}>
                {copied ? "Copied!" : "Copy"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.codeCard}>
            <Text style={[styles.codeText, themedStyles.codeText]}>{codeExample}</Text>
          </View>
        </View>
      </View>

      {/* Accessibility Features Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, themedStyles.sectionTitle]}>Accessibility Features</Text>
        <View style={[styles.featuresContainer, themedStyles.featuresContainer]}>
          <View style={styles.featureItem}>
            <View style={[styles.iconContainer, { backgroundColor: isDarkMode ? colors.surface : '#E8F1FF' }]}>
              <Ionicons name="text-outline" size={24} color={colors.primary} />
            </View>
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, themedStyles.featureTitle]}>Alt Text</Text>
              <Text style={[styles.featureDescription, themedStyles.featureDescription]}>
                Descriptive text that conveys the content and function of the image
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={[styles.iconContainer, { backgroundColor: isDarkMode ? colors.surface : '#E8F1FF' }]}>
              <Ionicons name="megaphone-outline" size={24} color={colors.primary} />
            </View>
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, themedStyles.featureTitle]}>Role Announcement</Text>
              <Text style={[styles.featureDescription, themedStyles.featureDescription]}>
                Screen readers announce the element as an image
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={[styles.iconContainer, { backgroundColor: isDarkMode ? colors.surface : '#E8F1FF' }]}>
              <Ionicons name="hand-left-outline" size={24} color={colors.primary} />
            </View>
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, themedStyles.featureTitle]}>Touch Target</Text>
              <Text style={[styles.featureDescription, themedStyles.featureDescription]}>
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
  demoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
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
  // Code section styles
  codeContainer: {
    backgroundColor: '#1c1c1e',
    borderRadius: 8,
    overflow: 'hidden',
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
    color: '#999',
    fontSize: 14,
    fontFamily: 'monospace',
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 4,
  },
  copyText: {
    color: '#666',
    fontSize: 14,
  },
  copiedText: {
    color: '#28A745',
  },
  codeCard: {
    padding: 16,
  },
  codeText: {
    color: '#fff',
    fontFamily: 'monospace',
    fontSize: 14,
    lineHeight: 20,
  },
  // Features section styles
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
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AccessibleMediaExample;