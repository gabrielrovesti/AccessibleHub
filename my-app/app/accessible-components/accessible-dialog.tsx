import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Clipboard, AccessibilityInfo } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function AccessibleDialogExample() {
  const [showDialog, setShowDialog] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const { colors, textSizes, isDarkMode } = useTheme();
  const dialogRef = useRef(null);
  const openButtonRef = useRef(null);

 useEffect(() => {
   if (showDialog) {
     AccessibilityInfo.announceForAccessibility(
       'Example dialog opened. This dialog contains information about accessibility features.'
     );
     setTimeout(() => {
       dialogRef.current?.focus();
     }, 100);
   } else {
     openButtonRef.current?.focus();
   }
 }, [showDialog]);

 const handleClose = () => {
   setShowDialog(false);
   AccessibilityInfo.announceForAccessibility('Dialog closed. Returned to main screen.');
 };

  const handleConfirm = () => {
    setShowDialog(false);
    setShowSuccess(true);
    AccessibilityInfo.announceForAccessibility('Action confirmed successfully');
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  const codeExample = `const AccessibleDialog = ({ visible, onClose, title, children }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      accessibility
      ViewIsModal={true}
      accessibility
      LiveRegion="polite"
    >
      <View>
        <View
          style={styles.dialog}
          accessibilityRole="alert"
          accessibility
          Label={title}
          ref={contentRef}
        >
          <View>
            <TouchableOpacity
              ref={closeRef}
              onPress={onClose}
              accessibility
              Role="button"
              accessibility
              Label="Close"
            >
            </TouchableOpacity>
          </View>
          {children}
          <View>
            <TouchableOpacity
              onPress={onClose}
              accessibility
              Role="button"
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};`;

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
    overflow: 'scroll',
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
    padding: 24,
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
    padding: 24,
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
    backgroundColor: isDarkMode ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.5)',
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
    featureIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: isDarkMode ? `${colors.primary}20` : '#E8F1FF',
      alignItems: 'center',
      justifyContent: 'center',
    },
};


  return (
    <LinearGradient colors={gradientColors} style={themedStyles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        accessibilityRole="scrollview"
        accessibilityLabel="Accessible Dialog Example Screen"
      >
        <View style={themedStyles.heroCard}>
          <Text style={themedStyles.heroTitle} accessibilityRole="header">
            Modal Dialogs - Interactive Example
          </Text>
          <Text style={themedStyles.heroSubtitle}>
            Build dialogs with focus trapping, screen reader support, and proper roles.
          </Text>
        </View>

        <View style={themedStyles.section}>
          <Text
            style={[themedStyles.sectionTitle, { color: colors.text }]}
            accessibilityRole="header"
            accessibilityLabel="Accessible Dialog Demonstration"
          >
            Dialog Demo
          </Text>
          <View style={themedStyles.demoCard}>
            <TouchableOpacity
              ref={openButtonRef}
              style={themedStyles.demoButton}
              onPress={() => setShowDialog(true)}
              accessibilityRole="button"
              accessibilityLabel="Open example dialog with dialog options"
            >
              <Text style={themedStyles.demoButtonText}>Open Dialog</Text>
            </TouchableOpacity>
          </View>
        </View>

          <Modal
            visible={showDialog}
            transparent
            animationType="fade"
            onRequestClose={handleClose}
            accessibilityViewIsModal={true}
            accessibilityLiveRegion="polite"
          >
            <View style={themedStyles.overlay}>
              <View
                style={themedStyles.dialogContainer}
                ref={dialogRef}
                onAccessibilityEscape={handleClose}
              >
                <View style={themedStyles.dialogHeader}>
                  <Text
                    style={themedStyles.dialogTitle}
                    accessibilityRole="header"
                  >
                    Example Dialog
                  </Text>
                  <TouchableOpacity
                    onPress={handleClose}
                    accessibilityLabel="Close dialog"
                    accessibilityRole="button"
                  >
                    <Ionicons
                      name="close"
                      size={24}
                      color={colors.text}
                      accessibilityElementsHidden={true}
                      importantForAccessibility="no"
                    />
                  </TouchableOpacity>
                </View>

                <Text
                  style={themedStyles.dialogContent}
                  accessibilityRole="text"
                >
                  This is an example of an accessible dialog with proper focus management,
                  keyboard interactions, and screen reader announcements.
                </Text>

                <View
                  style={themedStyles.dialogActions}
                  accessibilityRole="group"
                  accessibilityLabel="Dialog actions"
                >
                  <TouchableOpacity
                    style={[themedStyles.dialogButton, themedStyles.dialogSecondaryButton]}
                    onPress={handleClose}
                    accessibilityRole="button"
                    accessibilityLabel="Cancel"
                  >
                    <Text style={themedStyles.dialogSecondaryButtonText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[themedStyles.dialogButton, themedStyles.dialogPrimaryButton]}
                    onPress={handleConfirm}
                    accessibilityRole="button"
                    accessibilityLabel="Confirm"
                  >
                    <Text style={themedStyles.dialogButtonText}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

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

        <View style={themedStyles.section}>
          <Text style={themedStyles.sectionTitle}>Code Implementation</Text>
          <View style={themedStyles.codeCardContainer} accessible={false}>
            <View style={themedStyles.codeHeader} accessible={false}>
              <Text style={themedStyles.codeHeaderText}>JSX</Text>
              <TouchableOpacity
                style={themedStyles.copyButton}
                onPress={handleCopy}
                accessibilityRole="button"
                accessibilityLabel={copied ? 'Code copied' : 'Copy code'}
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
            <View
              style={themedStyles.codeCard}
              accessible={true}
              accessibilityRole="text"
              accessibilityLabel="Dialog implementation code example"
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