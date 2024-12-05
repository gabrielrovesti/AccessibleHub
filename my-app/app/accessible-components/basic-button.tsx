import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Clipboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

const AccessibleButtonExample = () => {
  const [copied, setCopied] = useState(false);
  const router = useRouter();

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
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    };

  const DemoButton = () => (
    <TouchableOpacity
      style={styles.demoButton}
      accessibilityRole="button"
      accessibilityLabel="Submit form"
      accessibilityHint="Activates form submission"
      onPress={() => {}}
    >
      <Text style={styles.buttonText}>Submit</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interactive Example</Text>
        <View style={styles.demoContainer}>
          <DemoButton />
          <Text style={styles.demoText}>
            Try this button with VoiceOver/TalkBack enabled
          </Text>
        </View>
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
          <View style={styles.codeCard}>
            <Text style={styles.codeText}>{codeExample}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accessibility Features</Text>
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Ionicons name="resize" size={24} color="#007AFF" />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Minimum Touch Target</Text>
              <Text style={styles.featureDescription}>
                44x44 points minimum size ensures the button is easy to tap
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="text" size={24} color="#007AFF" />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Screen Reader Label</Text>
              <Text style={styles.featureDescription}>
                Clear description announces the button's purpose
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="information-circle" size={24} color="#007AFF" />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Action Hint</Text>
              <Text style={styles.featureDescription}>
                Additional context about what happens on activation
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
});

export default AccessibleButtonExample;