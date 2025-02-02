import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Clipboard, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { useTheme } from '../../context/ThemeContext';
import { AccessibilityInfo } from 'react-native';

const AccessibleButtonExample = () => {
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const { colors, textSizes, isDarkMode } = useTheme();

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

  const DemoButton = () => (
    <TouchableOpacity
      style={[styles.demoButton, { backgroundColor: colors.primary }]}
      accessibilityRole="button"
      accessibilityLabel="Submit form"
      accessibilityHint="Activates form submission"
      onPress={() => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      }}
    >
      <Text style={[styles.buttonText, { color: colors.background }]}>Submit</Text>
    </TouchableOpacity>
  );

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
    demoButton: {
      backgroundColor: colors.primary,
    },
    buttonText: {
      color: colors.background,
    },
    demoText: {
      color: colors.textSecondary,
    },
    overlay: {
      backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)',
    },
    dialog: {
      backgroundColor: colors.surface,
    },
    dialogTitle: {
      color: colors.text,
    },
    dialogContent: {
      color: colors.textPrimary,
    },
    dialogButtonText: {
      color: colors.background,
    },
    secondaryButtonText: {
      color: colors.text,
    },
    featuresContainer: {
      backgroundColor: colors.surface,
    },
    featureTitle: {
      color: colors.text,
    },
    featureDescription: {
      color: colors.textSecondary,
    },
    codeContainer: {
      backgroundColor: colors.codeBackground,
    },
    codeHeader: {
      borderBottomColor: colors.border,
    },
    codeHeaderText: {
      color: colors.textSecondary,
    },
    copyText: {
      color: colors.textSecondary,
    },
    copiedText: {
      color: '#28A745',
    },
   successModal: {
      backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)',
    },
    successContent: {
      backgroundColor: colors.surface,
    },
    successText: {
      color: colors.text,
    }
  };
  return (
    <ScrollView style={[styles.container, themedStyles.container]}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, themedStyles.sectionTitle]}>Interactive Example</Text>
        <View style={[styles.demoContainer, themedStyles.demoContainer]}>
          <DemoButton />
          <Text style={[styles.demoText, themedStyles.demoText]}>
            Try this button with VoiceOver/TalkBack enabled
          </Text>
        </View>
      </View>

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

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, themedStyles.sectionTitle]}>Accessibility Features</Text>
        <View style={[styles.featuresContainer, themedStyles.featuresContainer]}>
          <View style={styles.featureItem}>
            <Ionicons name="resize" size={24} color={colors.primary} />
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, themedStyles.featureTitle]}>Minimum Touch Target</Text>
              <Text style={[styles.featureDescription, themedStyles.featureDescription]}>
                44x44 points minimum size ensures the button is easy to tap
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="text" size={24} color={colors.primary} />
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, themedStyles.featureTitle]}>Screen Reader Label</Text>
              <Text style={[styles.featureDescription, themedStyles.featureDescription]}>
                Clear description announces the button's purpose
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="information-circle" size={24} color={colors.primary} />
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, themedStyles.featureTitle]}>Action Hint</Text>
              <Text style={[styles.featureDescription, themedStyles.featureDescription]}>
                Additional context about what happens on activation
              </Text>
            </View>
          </View>
        </View>
      </View>

       <Modal
          visible={showSuccess}
          transparent
          animationType="fade"
          onRequestClose={() => setShowSuccess(false)}
          accessibilityViewIsModal={true}
          accessibilityLiveRegion="polite"
        >
          <View style={[styles.modalOverlay, themedStyles.successModal]}>
            <View style={[styles.successContent, themedStyles.successContent]}>
              <View style={styles.successIconContainer}>
                <Ionicons name="checkmark-circle" size={48} color={colors.primary} />
              </View>
              <Text style={[styles.successText, themedStyles.successText]}>
                Button pressed successfully
              </Text>
            </View>
          </View>
        </Modal>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
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
  demoButton: {
    minHeight: 44,
    paddingHorizontal: 16,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
  modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
    successContent: {
      padding: 24,
      borderRadius: 16,
      alignItems: 'center',
      minWidth: 200,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    successIconContainer: {
      marginBottom: 16,
    },
    successText: {
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
});

export default AccessibleButtonExample;