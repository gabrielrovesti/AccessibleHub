import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

export default function NavigationFocus() {
  const { colors, textSizes } = useTheme();
  const [focusedElement, setFocusedElement] = useState(null);

  // Handle touch/focus events
  const handleElementPress = (elementName) => {
    setFocusedElement(elementName);
  };

  const themedStyles = {
    container: {
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.surface,
      borderBottomColor: colors.border,
    },
    title: {
      color: colors.text,
      fontSize: textSizes.xlarge,
    },
    description: {
      color: colors.textSecondary,
      fontSize: textSizes.medium,
    },
    section: {
      gap: textSizes.medium,
    },
    card: {
      backgroundColor: colors.surface,
      shadowColor: colors.shadow,
      shadowOpacity: 0.1,
      borderRadius: 12,
      marginBottom: 20,
    },
    cardHeader: {
      gap: textSizes.medium,
      flexDirection: 'row',
      alignItems: 'center',
    },
    cardTitle: {
      color: colors.text,
      fontSize: textSizes.medium,
    },
    cardDescription: {
      color: colors.textSecondary,
      fontSize: textSizes.small,
    },
    bulletItem: {
      color: colors.textSecondary,
      fontSize: textSizes.small,
    },
    focusableElement: {
      padding: 16,
      backgroundColor: colors.surface,
      borderRadius: 10,
      marginBottom: 10,
      borderWidth: 2,
      borderColor: focusedElement === 'focusable' ? colors.primary : colors.border,
      backgroundColor: focusedElement === 'focusable' ? colors.primaryLight : colors.surface,
    },
    focusInput: {
      padding: 16,
      backgroundColor: colors.surface,
      borderRadius: 10,
      marginBottom: 10,
      borderWidth: 2,
      borderColor: focusedElement === 'input' ? colors.primary : colors.border,
      backgroundColor: focusedElement === 'input' ? colors.primaryLight : colors.surface,
    },
    focusButton: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      backgroundColor: colors.primary,
      borderRadius: 8,
      marginBottom: 10,
      alignItems: 'center',
      borderColor: focusedElement === 'button' ? colors.primaryLight : colors.primary,
      borderWidth: focusedElement === 'button' ? 2 : 0,
    },
    focusButtonText: {
      color: colors.surface,
      fontSize: textSizes.medium,
      fontWeight: '600',
    },
  };

  return (
    <ScrollView style={[styles.container, themedStyles.container]}>
      <View style={[styles.header, themedStyles.header]}>
        <Text style={[styles.title, themedStyles.title]}>Logical Focus Order</Text>
        <Text style={[styles.description, themedStyles.description]}>
          Learn how to manage focus navigation and improve accessibility for mobile users.
        </Text>
      </View>

      <View style={[styles.section, themedStyles.section]}>
        <View style={[styles.card, themedStyles.card]}>
          <View style={[styles.cardHeader, themedStyles.cardHeader]}>
            <Ionicons name="git-branch-outline" size={24} color={colors.primary} />
            <Text style={[styles.cardTitle, themedStyles.cardTitle]}>Focus Flow</Text>
          </View>
          <Text style={[styles.cardDescription, themedStyles.cardDescription]}>
            Managing focus and accessibility in mobile navigation.
          </Text>
          <View style={styles.bulletList}>
            <Text style={[styles.bulletItem, themedStyles.bulletItem]}>• Clear touch targets</Text>
            <Text style={[styles.bulletItem, themedStyles.bulletItem]}>• Accessible labels for screen readers</Text>
            <Text style={[styles.bulletItem, themedStyles.bulletItem]}>• Visual feedback on interaction</Text>
          </View>
        </View>

        {/* Focus Simulation Area */}
        <View style={[styles.card, themedStyles.card]}>
          <View style={[styles.cardHeader, themedStyles.cardHeader]}>
            <Ionicons name="scan-outline" size={24} color={colors.primary} />
            <Text style={[styles.cardTitle, themedStyles.cardTitle]}>Try Focus Simulation</Text>
          </View>
          <Text style={[styles.cardDescription, themedStyles.cardDescription]}>
            Tap or swipe through the interactive elements to see how focus works.
          </Text>

          <View style={styles.bulletList}>
            <TouchableOpacity
              style={[themedStyles.focusableElement]}
              onPress={() => handleElementPress('focusable')}
              accessible
              accessibilityLabel="Focusable Item 1"
            >
              <Text>Focusable Item 1</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[themedStyles.focusableElement]}
              onPress={() => handleElementPress('focusable')}
              accessible
              accessibilityLabel="Focusable Item 2"
            >
              <Text>Focusable Item 2</Text>
            </TouchableOpacity>

            <TextInput
              style={[themedStyles.focusInput]}
              onFocus={() => handleElementPress('input')}
              onBlur={() => setFocusedElement(null)}
              placeholder="Tap to focus me"
              accessible
              accessibilityLabel="Input Field"
            />

            <TouchableOpacity
              style={[themedStyles.focusButton]}
              onPress={() => handleElementPress('button')}
              accessible
              accessibilityLabel="Focusable Button"
            >
              <Text style={themedStyles.focusButtonText}>Focusable Button</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  section: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: 14,
    marginBottom: 12,
  },
  bulletList: {
    gap: 8,
  },
  bulletItem: {
    fontSize: 14,
    paddingLeft: 8,
  },
});

