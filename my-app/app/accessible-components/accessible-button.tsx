import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Clipboard,
  Modal,
  AccessibilityInfo,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function AccessibleButtonExample() {
  const [copied, setCopied] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { colors, textSizes, isDarkMode } = useTheme();

  // 1) Example code snippet
  const codeExample = `<TouchableOpacity
  accessibilityRole="button"
  accessibilityLabel="Submit form"
  accessibilityHint="Activates form submission"
  style={{
    minHeight: 44,
    paddingHorizontal: 16,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
  <Text style={{ color: '#fff' }}>
    Submit
  </Text>
</TouchableOpacity>`;

  // 2) Copy code to clipboard
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

  // 3) Demo button that triggers success modal
  const DemoButton = () => (
    <TouchableOpacity
      style={[styles.demoButton, { backgroundColor: colors.primary }]}
      accessibilityRole="button"
      accessibilityLabel="Submit form"
      accessibilityHint="Activates form submission"
      onPress={() => {
        setShowSuccess(true);
        AccessibilityInfo.announceForAccessibility('Button pressed successfully');
        setTimeout(() => setShowSuccess(false), 2000);
      }}
    >
      <Text style={[styles.buttonText, { color: colors.background }]}>
        Submit
      </Text>
    </TouchableOpacity>
  );

  // 4) Elevated card style for uniform design
  const cardShadowStyle = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: isDarkMode ? 0.3 : 0.1,
    shadowRadius: 6,
    elevation: 3,
  };

  // 5) Themed + local styles
  const gradientColors = isDarkMode
    ? [colors.background, '#2c2c2e']
    : ['#e2e2e2', colors.background];

  const themedStyles = {
    container: {
      flex: 1,
    },
    // Hero card at top
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
      paddingTop: 20,
      gap: 16,
    },
    demoContainer: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 20,
      ...cardShadowStyle,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
      alignItems: 'center',
    },
    codeContainer: {
      backgroundColor: '#1c1c1e',
      borderRadius: 8,
      overflow: 'hidden',
      marginTop: 16,
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
      color: '#fff',
      fontFamily: 'monospace',
      fontSize: 14,
      lineHeight: 20,
    },
    featuresContainer: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 20,
      ...cardShadowStyle,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
      marginTop: 16,
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 12,
      marginBottom: 16,
      flexWrap: 'wrap',
    },
    featureContent: {
      flex: 1,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.5)',
    },
    successContent: {
      padding: 24,
      borderRadius: 16,
      alignItems: 'center',
      minWidth: 200,
      ...cardShadowStyle,
      backgroundColor: colors.surface,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
    },
    successIconContainer: {
      marginBottom: 16,
    },
    successText: {
      fontSize: textSizes.medium,
      fontWeight: '600',
      color: colors.text,
      textAlign: 'center',
    },
  };

  return (
    <LinearGradient colors={gradientColors} style={themedStyles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        accessibilityRole="scrollview"
        accessibilityLabel="Accessible Button Example Screen"
      >
        {/* HERO CARD */}
        <View style={themedStyles.heroCard}>
          <Text style={themedStyles.heroTitle} accessibilityRole="header">
            Accessible Button
          </Text>
          <Text style={themedStyles.heroSubtitle}>
            Learn how to implement an accessible, properly labeled button with minimal touch target and role/hint.
          </Text>
        </View>

        {/* DEMO SECTION */}
        <View style={themedStyles.section}>
          <Text
            style={[styles.sectionTitle, { color: colors.text }]}
            accessibilityRole="header"
            accessibilityLabel="Accessible Button Demonstration"
          >
            Button Demo
          </Text>
          <View style={themedStyles.demoContainer}>
            <DemoButton />
          </View>
        </View>


        {/* CODE EXAMPLE SECTION */}
        <View style={themedStyles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Code Implementation
          </Text>
          <View style={themedStyles.codeContainer} accessible={false}>
            <View style={themedStyles.codeHeader} accessible={false}>
              <Text style={themedStyles.codeHeaderText}>JSX</Text>
              <TouchableOpacity
                style={themedStyles.copyButton}
                onPress={handleCopy}
                accessibilityRole="button"
                accessibilityLabel={copied ? "Code copied" : "Copy code example"}
                accessibilityHint="Copies the code example to your clipboard"
              >
                <Ionicons
                  name={copied ? "checkmark" : "copy-outline"}
                  size={20}
                  color={copied ? "#28A745" : colors.textSecondary}
                  accessibilityElementsHidden
                />
                <Text style={[themedStyles.copyText, copied && themedStyles.copiedText]}>
                  {copied ? "Copied!" : "Copy"}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={themedStyles.codeCard}
              accessible={false}
              accessibilityElementsHidden={true}
              importantForAccessibility="no-hide-descendants"
            >
              <Text style={themedStyles.codeText}>
                {codeExample}
              </Text>
            </View>
          </View>
        </View>


        {/* ACCESSIBILITY FEATURES SECTION */}
        <View style={themedStyles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Accessibility Features
          </Text>
          <View style={themedStyles.featuresContainer}>
            {/* Feature 1 */}
            <View style={styles.featureItem} importantForAccessibility="no">
              <Ionicons
                name="resize"
                size={24}
                color={colors.primary}
                accessibilityElementsHidden
              />
              <View style={styles.featureContent}>
                <Text style={[styles.featureTitle, { color: colors.text }]}>
                  Minimum Touch Target
                </Text>
                <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
                  44x44 points ensures the button is easy to tap
                </Text>
              </View>
            </View>

            {/* Feature 2 */}
            <View style={styles.featureItem} importantForAccessibility="no">
              <Ionicons
                name="text"
                size={24}
                color={colors.primary}
                accessibilityElementsHidden
              />
              <View style={styles.featureContent}>
                <Text style={[styles.featureTitle, { color: colors.text }]}>
                  Screen Reader Label
                </Text>
                <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
                  Clear description announces the button's purpose
                </Text>
              </View>
            </View>

            {/* Feature 3 */}
            <View style={styles.featureItem} importantForAccessibility="no">
              <Ionicons
                name="information-circle"
                size={24}
                color={colors.primary}
                accessibilityElementsHidden
              />
              <View style={styles.featureContent}>
                <Text style={[styles.featureTitle, { color: colors.text }]}>
                  Action Hint
                </Text>
                <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
                  Additional context about what happens on activation
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* SUCCESS MODAL */}
        <Modal
          visible={showSuccess}
          transparent
          animationType="fade"
          onRequestClose={() => setShowSuccess(false)}
          accessibilityViewIsModal
          accessibilityLiveRegion="polite"
        >
          <View style={[themedStyles.modalOverlay]}>
            <View style={themedStyles.successContent}>
              <View style={themedStyles.successIconContainer} importantForAccessibility="no">
                <Ionicons
                  name="checkmark-circle"
                  size={48}
                  color={colors.primary}
                  accessibilityElementsHidden
                />
              </View>
              <Text style={themedStyles.successText}>
                Button pressed successfully
              </Text>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </LinearGradient>
  );
}

// LOCAL STYLES (combine with the themed overrides above)
const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  demoButton: {
    minHeight: 44,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0057D9', // fallback color
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    flexShrink: 1,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
});
