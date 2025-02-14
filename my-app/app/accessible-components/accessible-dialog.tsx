import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Clipboard,
  AccessibilityInfo,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function AccessibleDialogExample() {
  const [showDialog, setShowDialog] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const { colors, textSizes, isDarkMode } = useTheme();
  const dialogRef = useRef(null);

  // Announce dialog opening and set focus on content.
  useEffect(() => {
    if (showDialog) {
      AccessibilityInfo.announceForAccessibility('Example dialog opened');
      dialogRef.current?.focus();
    }
  }, [showDialog]);

  // Close the dialog (from Cancel or close icon).
  const handleClose = () => {
    setShowDialog(false);
    AccessibilityInfo.announceForAccessibility('Dialog closed');
  };

  // "Confirm" the dialog action, show success feedback.
  const handleConfirm = () => {
    setShowDialog(false);
    setShowSuccess(true);
    AccessibilityInfo.announceForAccessibility('Action confirmed successfully');
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  // Example code snippet
  const codeExample = `// Accessible Dialog Implementation
const AccessibleDialog = ({ visible, onClose, title, children }) => {
  const closeRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (visible) {
      // Focus first element when dialog opens
      contentRef.current?.focus();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      accessibilityViewIsModal={true}
      accessibilityLiveRegion="polite"
    >
      <View style={styles.overlay}>
        <View
          style={styles.dialog}
          accessibilityRole="alert"
          accessibilityLabel={title}
          ref={contentRef}
        >
          <View style={styles.header}>
            <Text style={styles.title} accessibilityRole="header">
              {title}
            </Text>
            <TouchableOpacity
              ref={closeRef}
              onPress={onClose}
              accessibilityLabel="Close dialog"
              accessibilityRole="button"
            >
              <Ionicons name="close" size={24} />
            </TouchableOpacity>
          </View>
          {children}
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={onClose}
              accessibilityRole="button"
              style={styles.button}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};`;

  // Copy code snippet
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

  // Gradient background based on dark/light mode
  const gradientColors = isDarkMode
    ? [colors.background, '#2c2c2e']
    : ['#e2e2e2', colors.background];

  // Themed + local style overrides
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
    demoButton: {
      backgroundColor: colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      minHeight: 44,
      alignItems: 'center',
    },
    demoButtonText: {
      color: colors.background,
      fontSize: textSizes.medium,
      fontWeight: '600',
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
      maxHeight: 400,
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
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)',
    },
    dialogContainer: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      width: '90%',
      maxWidth: 400,
      padding: 24,
      ...cardShadowStyle,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
    },
    dialogHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    dialogTitle: {
      color: colors.text,
      fontSize: textSizes.large,
      fontWeight: 'bold',
    },
    dialogContent: {
      color: colors.text,
      fontSize: textSizes.medium,
      lineHeight: 24,
      marginBottom: 24,
    },
    dialogActions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 12,
    },
    dialogButton: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8,
      minWidth: 80,
      alignItems: 'center',
    },
    dialogSecondaryButton: {
      backgroundColor: isDarkMode ? colors.surface : '#f2f2f2',
    },
    dialogSecondaryButtonText: {
      color: colors.text,
      fontSize: textSizes.medium,
      fontWeight: '600',
    },
    dialogPrimaryButton: {
      backgroundColor: colors.primary,
    },
    dialogButtonText: {
      color: colors.background,
      fontSize: textSizes.medium,
      fontWeight: '600',
    },
    // Success feedback container
    successContainer: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 24,
      alignItems: 'center',
      width: '80%',
      maxWidth: 300,
      ...cardShadowStyle,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
    },
    successTitle: {
      color: '#28A745',
      fontSize: textSizes.large,
      fontWeight: 'bold',
      marginTop: 8,
      marginBottom: 8,
    },
    successMessage: {
      color: colors.text,
      fontSize: textSizes.medium,
      textAlign: 'center',
      lineHeight: 24,
    },
  };

  return (
    <LinearGradient colors={gradientColors} style={themedStyles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        accessibilityRole="scrollview"
        accessibilityLabel="Accessible Dialog Example Screen"
      >
        {/* HERO CARD */}
        <View style={themedStyles.heroCard}>
          <Text style={themedStyles.heroTitle} accessibilityRole="header">
            Modal Dialogs - Interactive Example
          </Text>
          <Text style={themedStyles.heroSubtitle}>
            Build dialogs with focus trapping, screen reader support, and proper roles.
          </Text>
        </View>

        {/* INTERACTIVE DEMO SECTION */}
        <View style={themedStyles.section}>
          <View style={themedStyles.demoCard}>
            <TouchableOpacity
              style={themedStyles.demoButton}
              onPress={() => setShowDialog(true)}
              accessibilityRole="button"
              accessibilityLabel="Open example dialog"
              accessibilityHint="Opens an accessible modal dialog"
            >
              <Text style={themedStyles.demoButtonText}>Open Dialog</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* MODAL DIALOG */}
        <Modal
          visible={showDialog}
          transparent
          animationType="fade"
          onRequestClose={handleClose}
          accessibilityViewIsModal
          accessibilityRole="dialog"
        >
          <View style={themedStyles.overlay}>
            <View
              style={themedStyles.dialogContainer}
              ref={dialogRef}
              accessible={true}
              accessibilityLabel="Example dialog content"
              onAccessibilityEscape={handleClose}
            >
              <View style={themedStyles.dialogHeader}>
                <Text style={themedStyles.dialogTitle}>Example Dialog</Text>
                <TouchableOpacity
                  onPress={handleClose}
                  accessibilityLabel="Close dialog"
                  accessibilityRole="button"
                >
                  <Ionicons
                    name="close"
                    size={24}
                    color={colors.text}
                    accessibilityElementsHidden
                    importantForAccessibility="no"
                  />
                </TouchableOpacity>
              </View>

              <Text style={themedStyles.dialogContent}>
                This is an example of an accessible dialog with proper focus management,
                keyboard interactions, and screen reader announcements.
              </Text>

              <View style={themedStyles.dialogActions}>
                <TouchableOpacity
                  style={[themedStyles.dialogButton, themedStyles.dialogSecondaryButton]}
                  onPress={handleClose}
                  accessibilityRole="button"
                  accessibilityLabel="Cancel"
                  accessibilityHint="Closes the dialog without saving changes"
                >
                  <Text style={themedStyles.dialogSecondaryButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[themedStyles.dialogButton, themedStyles.dialogPrimaryButton]}
                  onPress={handleConfirm}
                  accessibilityRole="button"
                  accessibilityLabel="Confirm"
                  accessibilityHint="Saves changes and closes the dialog"
                >
                  <Text style={themedStyles.dialogButtonText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* SUCCESS FEEDBACK MODAL */}
        <Modal
          visible={showSuccess}
          transparent
          animationType="fade"
          accessibilityViewIsModal
          accessibilityRole="alert"
        >
          <View style={themedStyles.overlay}>
            <View style={themedStyles.successContainer}>
              <Ionicons
                name="checkmark-circle"
                size={48}
                color="#28A745"
                accessibilityElementsHidden
                importantForAccessibility="no"
              />
              <Text style={themedStyles.successTitle}>Success!</Text>
              <Text style={themedStyles.successMessage}>
                Your action has been confirmed.
              </Text>
            </View>
          </View>
        </Modal>

        {/* IMPLEMENTATION SECTION */}
        <View style={themedStyles.section}>
          <Text style={themedStyles.sectionTitle}>Implementation</Text>
          <View style={themedStyles.codeCardContainer}>
            <View style={themedStyles.codeHeader}>
              <Text style={themedStyles.codeHeaderText}>JSX</Text>
              <TouchableOpacity
                style={themedStyles.copyButton}
                onPress={handleCopy}
                accessibilityRole="button"
                accessibilityLabel={copied ? 'Code copied' : 'Copy code'}
                accessibilityHint="Copies the code example to your clipboard"
              >
                <Ionicons
                  name={copied ? 'checkmark' : 'copy-outline'}
                  size={20}
                  color={copied ? '#28A745' : '#999'}
                  accessibilityElementsHidden
                  importantForAccessibility="no-hide-descendants"
                />
                <Text style={[themedStyles.copyText, copied && themedStyles.copiedText]}>
                  {copied ? 'Copied!' : 'Copy'}
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              style={themedStyles.codeCard}
              accessible={false}
              importantForAccessibility="no"
              accessibilityElementsHidden
            >
              <Text style={themedStyles.codeText}>{codeExample}</Text>
            </ScrollView>
          </View>
        </View>

        {/* ACCESSIBILITY FEATURES SECTION */}
        <View style={themedStyles.section}>
          <Text style={themedStyles.sectionTitle}>Accessibility Features</Text>
          <View style={themedStyles.featuresCard}>
            {[
              {
                icon: 'scan-outline',
                title: 'Focus Management',
                description:
                  'Proper focus trapping and restoration when the dialog opens and closes',
              },
              {
                icon: 'keypad-outline',
                title: 'Keyboard Navigation',
                description: 'Full keyboard support including escape key to close the dialog',
              },
              {
                icon: 'megaphone-outline',
                title: 'Screen Reader Support',
                description: 'Proper ARIA roles and live region announcements',
              },
            ].map((feature, idx) => (
              <View key={idx} style={styles.featureItem} importantForAccessibility="no">
                <View style={styles.featureIconContainer}>
                  <Ionicons
                    name={feature.icon}
                    size={24}
                    color={colors.primary}
                    accessibilityElementsHidden
                    importantForAccessibility="no-hide-descendants"
                  />
                </View>
                <View style={styles.featureContent}>
                  <Text style={[styles.featureTitle, { color: colors.text }]}>
                    {feature.title}
                  </Text>
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

/* ------------------------------------------
   LOCAL STYLES
   Themed overrides exist in themedStyles above
-------------------------------------------*/
const styles = StyleSheet.create({
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F1FF',
    alignItems: 'center',
    justifyContent: 'center',
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
});
