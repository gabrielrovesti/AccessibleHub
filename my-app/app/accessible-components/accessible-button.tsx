import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Clipboard, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { AccessibilityInfo } from 'react-native';

const AccessibleButtonExample = () => {
  const [copied, setCopied] = useState(false);
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
        AccessibilityInfo.announceForAccessibility('Button pressed successfully');
        setTimeout(() => setShowSuccess(false), 2000);
      }}
    >
      <Text style={[styles.buttonText, { color: colors.background }]}>Submit</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      accessibilityRole="scrollview"
      accessibilityLabel="Button Component Example"
    >
      <View style={styles.section}>
        <Text
          style={[styles.sectionTitle, { color: colors.text }]}
          accessibilityRole="header"
        >
          Buttons & Touchables - Example
        </Text>
        <View
          style={[styles.demoContainer, { backgroundColor: colors.surface }]}
          importantForAccessibility="no"
        >
          <DemoButton />
        </View>
      </View>

      <View style={styles.section}>
        <Text
          style={[styles.sectionTitle, { color: colors.text }]}
          accessibilityRole="header"
        >
          Implementation
        </Text>
        <View style={styles.codeContainer}>
          <View style={styles.codeHeader}>
            <Text style={[styles.codeHeaderText, { color: '#999' }]}>JSX</Text>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={handleCopy}
              accessibilityRole="button"
              accessibilityLabel={copied ? "Code copied" : "Copy code example"}
              accessibilityHint="Copies the code example to your clipboard"
            >
              <Ionicons
                name={copied ? "checkmark" : "copy-outline"}
                size={20}
                color={copied ? "#28A745" : colors.textSecondary}
                accessibilityElementsHidden={true}
              />
              <Text style={[styles.copyText, copied && styles.copiedText]}>
                {copied ? "Copied!" : "Copy"}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={styles.codeCard}
            accessible={true}
            accessibilityRole="text"
            accessibilityLabel="Button component code example with accessibility features. Double-tap to copy."
            importantForAccessibility="yes"
          >
            <Text
              style={styles.codeText}
              accessibilityElementsHidden={true}
            >
              {codeExample}
            </Text>
          </View>
        </View>
      </View>

      {/* RESTORED: Accessibility Features Section */}
      <View style={styles.section}>
        <Text
          style={[styles.sectionTitle, { color: colors.text }]}
          accessibilityRole="header"
        >
          Accessibility Features
        </Text>
        <View style={[styles.featuresContainer, { backgroundColor: colors.surface }]}>
          <View style={styles.featureItem} importantForAccessibility="no">
            <Ionicons
              name="resize"
              size={24}
              color={colors.primary}
              accessibilityElementsHidden={true}
            />
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, { color: colors.text }]}>
                Minimum Touch Target
              </Text>
              <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
                44x44 points minimum size ensures the button is easy to tap
              </Text>
            </View>
          </View>

          <View style={styles.featureItem} importantForAccessibility="no">
            <Ionicons
              name="text"
              size={24}
              color={colors.primary}
              accessibilityElementsHidden={true}
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

          <View style={styles.featureItem} importantForAccessibility="no">
            <Ionicons
              name="information-circle"
              size={24}
              color={colors.primary}
              accessibilityElementsHidden={true}
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

      <Modal
        visible={showSuccess}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSuccess(false)}
        accessibilityViewIsModal={true}
        accessibilityLiveRegion="polite"
      >
        <View style={[styles.modalOverlay, {
          backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)'
        }]}>
          <View style={[styles.successContent, { backgroundColor: colors.surface }]}>
            <View style={styles.successIconContainer} importantForAccessibility="no">
              <Ionicons
                name="checkmark-circle"
                size={48}
                color={colors.primary}
                accessibilityElementsHidden={true}
              />
            </View>
            <Text style={[styles.successText, { color: colors.text }]}>
              Button pressed successfully
            </Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default AccessibleButtonExample;


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
    backgroundColor: '#F0F0F0', // Light gray background to separate it from the white
    borderWidth: 2, // Slightly thicker border for clarity
    borderColor: '#D1D1D1', // Soft gray border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3, // Adds shadow for Android
  },

  demoButton: {
    minHeight: 44,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0057D9', // Deeper blue for contrast
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF', // Ensures strong contrast on blue button
  },
  demoText: {
    fontSize: 14,
    textAlign: 'center',
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
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#F8F9FA', // Light gray background for contrast
    borderWidth: 2,
    borderColor: '#D1D1D1', // Soft gray border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },

  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Aligns icon and text properly
    gap: 12,
    marginBottom: 16,
    flexWrap: 'wrap', // Ensures wrapping of long text
  },

  iconStyle: {
    width: 28, // Larger for better visibility
    height: 28,
    textAlign: 'center',
    color: '#0057D9', // Stronger blue for visibility
  },

  featureContent: {
    flex: 1, // Ensures the text takes up remaining space
  },

  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222222', // Darker text for contrast
    flexShrink: 1, // Prevents overflow by wrapping text
  },

  featureDescription: {
    fontSize: 14,
    color: '#555555', // Slightly darker gray for readability
    lineHeight: 20,
    flexShrink: 1,
    flexWrap: 'wrap', // Ensures wrapping instead of cutting off text
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