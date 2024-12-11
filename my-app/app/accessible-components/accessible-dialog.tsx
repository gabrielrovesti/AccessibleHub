import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Clipboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const AccessibleDialogExample = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [copied, setCopied] = useState(false);
  const { colors, textSizes, isDarkMode } = useTheme();

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

  const handleCopy = async () => {
    try {
      await Clipboard.setString(codeExample);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const themedStyles = {
    container: {
      backgroundColor: colors.background,
    },
    section: {
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
    dialogHeader: {
      borderBottomColor: colors.border,
    },
    dialogTitle: {
      color: colors.text,
    },
    dialogContent: {
      color: colors.text,
    },
    dialogButtonText: {
      color: colors.background,
    },
    dialogSecondaryButton: {
      backgroundColor: isDarkMode ? colors.surface : '#f2f2f2',
    },
    dialogSecondaryButtonText: {
      color: colors.text,
    },
    dialogPrimaryButton: {
      backgroundColor: colors.primary,
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
      backgroundColor: isDarkMode ? '#1c1c1e' : '#2d2d2d',
    },
    codeHeader: {
      borderBottomColor: isDarkMode ? '#333' : '#444',
    },
    codeHeaderText: {
      color: isDarkMode ? '#999' : '#bbb',
    },
    copyText: {
      color: isDarkMode ? '#666' : '#999',
    },
    copiedText: {
      color: '#28A745',
    },
    codeText: {
      color: '#fff',
    },
  };

  return (
    <ScrollView style={[styles.container, themedStyles.container]}>
      <View style={[styles.section, themedStyles.section]}>
        <Text style={[styles.sectionTitle, themedStyles.sectionTitle]}>
          Interactive Example
        </Text>
        <View style={[styles.demoContainer, themedStyles.demoContainer]}>
          <TouchableOpacity
            style={[styles.demoButton, themedStyles.demoButton]}
            onPress={() => setShowDialog(true)}
            accessibilityRole="button"
            accessibilityLabel="Open example dialog"
          >
            <Text style={[styles.buttonText, themedStyles.buttonText]}>Open Dialog</Text>
          </TouchableOpacity>
          <Text style={[styles.demoText, themedStyles.demoText]}>
            Try this dialog with VoiceOver/TalkBack enabled
          </Text>
        </View>

        <Modal
          visible={showDialog}
          transparent
          animationType="fade"
          onRequestClose={() => setShowDialog(false)}
          accessibilityViewIsModal={true}
        >
          <View style={[styles.overlay, themedStyles.overlay]}>
            <View style={[styles.dialog, themedStyles.dialog]}>
              <View style={[styles.dialogHeader, themedStyles.dialogHeader]}>
                <Text style={[styles.dialogTitle, themedStyles.dialogTitle]}>
                  Example Dialog
                </Text>
                <TouchableOpacity
                  onPress={() => setShowDialog(false)}
                  accessibilityLabel="Close dialog"
                  accessibilityRole="button"
                  style={styles.closeButton}
                >
                  <Ionicons name="close" size={24} color={colors.text} />
                </TouchableOpacity>
              </View>

              <Text style={[styles.dialogContent, themedStyles.dialogContent]}>
                This is an example of an accessible dialog with proper focus management,
                keyboard interactions, and screen reader announcements.
              </Text>

              <View style={styles.dialogActions}>
                <TouchableOpacity
                  style={[
                    styles.dialogButton,
                    styles.secondaryButton,
                    themedStyles.dialogSecondaryButton,
                  ]}
                  onPress={() => setShowDialog(false)}
                  accessibilityRole="button"
                >
                  <Text style={[styles.secondaryButtonText, themedStyles.dialogSecondaryButtonText]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.dialogButton, themedStyles.dialogPrimaryButton]}
                  onPress={() => setShowDialog(false)}
                  accessibilityRole="button"
                >
                  <Text style={[styles.dialogButtonText, themedStyles.dialogButtonText]}>
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
            >
              <Ionicons
                name={copied ? "checkmark" : "copy-outline"}
                size={20}
                color={copied ? "#28A745" : colors.textSecondary}
              />
              <Text style={[styles.copyText, copied && styles.copiedText, themedStyles.copyText]}>
                {copied ? "Copied!" : "Copy"}
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.codeCard}>
            <Text style={[styles.codeText, themedStyles.codeText]}>{codeExample}</Text>
          </ScrollView>
        </View>
      </View>

      {/* Accessibility Features Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, themedStyles.sectionTitle]}>
          Accessibility Features
        </Text>
        <View style={[styles.featuresContainer, themedStyles.featuresContainer]}>
          <View style={styles.featureItem}>
            <View style={[styles.iconContainer, { backgroundColor: isDarkMode ? colors.surface : '#E8F1FF' }]}>
              <Ionicons name="scan-outline" size={24} color={colors.primary} />
            </View>
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, themedStyles.featureTitle]}>Focus Management</Text>
              <Text style={[styles.featureDescription, themedStyles.featureDescription]}>
                Proper focus trapping and restoration when dialog opens/closes
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={[styles.iconContainer, { backgroundColor: isDarkMode ? colors.surface : '#E8F1FF' }]}>
              <Ionicons name="keypad-outline" size={24} color={colors.primary} />
            </View>
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, themedStyles.featureTitle]}>Keyboard Navigation</Text>
              <Text style={[styles.featureDescription, themedStyles.featureDescription]}>
                Full keyboard support including escape key to close
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={[styles.iconContainer, { backgroundColor: isDarkMode ? colors.surface : '#E8F1FF' }]}>
              <Ionicons name="megaphone-outline" size={24} color={colors.primary} />
            </View>
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, themedStyles.featureTitle]}>Screen Reader Support</Text>
              <Text style={[styles.featureDescription, themedStyles.featureDescription]}>
                Proper ARIA roles and live region announcements
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
  },
  section: {
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  demoContainer: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  demoButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minHeight: 44,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  demoText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 12,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  dialogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dialogTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  dialogContent: {
    fontSize: 16,
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
  secondaryButton: {
    backgroundColor: '#f2f2f2',
  },
  dialogButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  codeContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  codeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
  },
  codeHeaderText: {
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
    fontSize: 14,
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
  },
  featuresContainer: {
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
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

export default AccessibleDialogExample;