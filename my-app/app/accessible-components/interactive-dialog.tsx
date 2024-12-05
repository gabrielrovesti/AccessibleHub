import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Clipboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AccessibleDialogExample = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [copied, setCopied] = useState(false);

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
            <Text
              style={styles.title}
              accessibilityRole="header"
            >
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interactive Example</Text>
        <View style={styles.demoContainer}>
          <TouchableOpacity
            style={styles.demoButton}
            onPress={() => setShowDialog(true)}
            accessibilityRole="button"
            accessibilityLabel="Open example dialog"
          >
            <Text style={styles.buttonText}>Open Dialog</Text>
          </TouchableOpacity>
          <Text style={styles.demoText}>
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
          <View style={styles.overlay}>
            <View
              style={styles.dialog}
              accessibilityRole="alert"  // Changed from "dialog" to "alert"
              accessibilityLabel="Example Dialog"
            >
              <View style={styles.dialogHeader}>
                <Text style={styles.dialogTitle}>Example Dialog</Text>
                <TouchableOpacity
                  onPress={() => setShowDialog(false)}
                  accessibilityLabel="Close dialog"
                  accessibilityRole="button"
                  style={styles.closeButton}
                >
                  <Ionicons name="close" size={24} color="#1c1c1e" />
                </TouchableOpacity>
              </View>

              <Text style={styles.dialogContent}>
                This is an example of an accessible dialog with proper focus management,
                keyboard interactions, and screen reader announcements.
              </Text>

              <View style={styles.dialogActions}>
                <TouchableOpacity
                  style={[styles.dialogButton, styles.secondaryButton]}
                  onPress={() => setShowDialog(false)}
                  accessibilityRole="button"
                >
                  <Text style={styles.secondaryButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dialogButton}
                  onPress={() => setShowDialog(false)}
                  accessibilityRole="button"
                >
                  <Text style={styles.dialogButtonText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Implementation</Text>
        <View style={styles.codeContainer}>
          <View style={styles.codeHeader}>
            <Text style={styles.codeHeaderText}>JSX</Text>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={handleCopy}
              accessibilityRole="button"
              accessibilityLabel={copied ? "Code copied" : "Copy code"}
            >
              <Ionicons
                name={copied ? "checkmark" : "copy-outline"}
                size={20}
                color={copied ? "#28A745" : "#666"}
              />
              <Text style={[styles.copyText, copied && styles.copiedText]}>
                {copied ? "Copied!" : "Copy"}
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.codeCard}>
            <Text style={styles.codeText}>{codeExample}</Text>
          </ScrollView>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accessibility Features</Text>
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <View style={[styles.iconContainer, { backgroundColor: '#E8F1FF' }]}>
              <Ionicons name="scan-outline" size={24} color="#0055CC" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Focus Management</Text>
              <Text style={styles.featureDescription}>
                Proper focus trapping and restoration when dialog opens/closes
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={[styles.iconContainer, { backgroundColor: '#E8F1FF' }]}>
              <Ionicons name="keypad-outline" size={24} color="#0055CC" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Keyboard Navigation</Text>
              <Text style={styles.featureDescription}>
                Full keyboard support including escape key to close
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={[styles.iconContainer, { backgroundColor: '#E8F1FF' }]}>
              <Ionicons name="megaphone-outline" size={24} color="#0055CC" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Screen Reader Support</Text>
              <Text style={styles.featureDescription}>
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
  demoButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minHeight: 44,
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
    marginTop: 12,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: '#fff',
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
    color: '#1c1c1e',
  },
  closeButton: {
    padding: 4,
  },
  dialogContent: {
    fontSize: 16,
    color: '#333',
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
    backgroundColor: '#007AFF',
    minWidth: 80,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#f2f2f2',
  },
  dialogButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#1c1c1e',
    fontSize: 16,
    fontWeight: '600',
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
    maxHeight: 400,
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
    color: '#1c1c1e',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default AccessibleDialogExample;