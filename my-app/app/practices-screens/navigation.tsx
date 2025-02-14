import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

/**
 * Demonstrates logical focus flow and visual focus highlighting.
 * - Users can tap on "focusable" items, an input, and a button
 * - The currently focused element is highlighted visually
 * - Accessibility labels and roles help screen readers
 * - Respects theming (light/dark) for consistent UI
 */
export default function FocusOrderScreen() {
  const { colors, textSizes, isDarkMode } = useTheme();
  const [focusedElement, setFocusedElement] = useState<string | null>(null);

  /**
   * Called when the user interacts with a focusable element.
   * We store its name so we can visually highlight it.
   */
  const handleElementPress = (elementName: string) => {
    setFocusedElement(elementName);
  };

  /**
   * Themed + local styling
   */
  const themedStyles = {
    container: {
      backgroundColor: colors.background,
      flex: 1,
    },
    header: {
      backgroundColor: colors.surface,
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
      padding: 16,
    },
    title: {
      color: colors.text,
      fontSize: textSizes.xlarge,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    description: {
      color: colors.textSecondary,
      fontSize: textSizes.medium,
      lineHeight: 24,
    },
    section: {
      padding: 16,
      gap: 16,
    },
    /* Cards */
    card: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      // Stronger shadow for depth
      shadowColor: isDarkMode ? '#000' : '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.07,
      shadowRadius: 6,
      elevation: 3,
      marginBottom: 20,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 8,
    },
    cardTitle: {
      color: colors.text,
      fontSize: textSizes.large,
      fontWeight: '600',
    },
    cardDescription: {
      color: colors.textSecondary,
      fontSize: textSizes.small + 1,
      lineHeight: 20,
      marginBottom: 12,
    },
    bulletItem: {
      color: colors.textSecondary,
      fontSize: textSizes.small,
      lineHeight: 20,
      paddingLeft: 8,
    },
    bulletList: {
      gap: 8,
    },

    /* Focus simulation area */
    focusableElement: {
      padding: 16,
      borderRadius: 10,
      marginBottom: 10,
      borderWidth: 2,
      // Conditionally highlight if "focusable" is pressed
      borderColor: focusedElement === 'focusable' ? colors.primary : colors.border,
      backgroundColor: focusedElement === 'focusable' ? colors.primaryLight : colors.surface,
    },
    focusInput: {
      padding: 16,
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
      // Extra highlight if "button" is pressed
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
    <ScrollView
      style={themedStyles.container}
      accessibilityRole="scrollView"
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      {/* HEADER */}
      <View style={themedStyles.header}>
        <Text style={themedStyles.title} accessibilityRole="header">
          Logical Focus Order
        </Text>
        <Text style={themedStyles.description}>
          Learn how to manage focus navigation and improve accessibility for mobile users.
        </Text>
      </View>

      <View style={themedStyles.section}>
        {/* FOCUS FLOW CARD */}
        <View style={themedStyles.card}>
          <View style={themedStyles.cardHeader}>
            <Ionicons name="git-branch-outline" size={24} color={colors.primary} />
            <Text style={themedStyles.cardTitle}>Focus Flow</Text>
          </View>
          <Text style={themedStyles.cardDescription}>
            Managing focus and accessibility in mobile navigation.
          </Text>
          <View style={themedStyles.bulletList}>
            <Text style={themedStyles.bulletItem}>• Clear touch targets</Text>
            <Text style={themedStyles.bulletItem}>• Accessible labels for screen readers</Text>
            <Text style={themedStyles.bulletItem}>• Visual feedback on interaction</Text>
          </View>
        </View>

        {/* INTERACTIVE DEMO CARD */}
        <View style={themedStyles.card}>
          <View style={themedStyles.cardHeader}>
            <Ionicons name="scan-outline" size={24} color={colors.primary} />
            <Text style={themedStyles.cardTitle}>Try Focus Simulation</Text>
          </View>
          <Text style={themedStyles.cardDescription}>
            Tap the interactive elements below to see how focus highlighting works.
          </Text>

          {/* Focusable Items */}
          <TouchableOpacity
            style={themedStyles.focusableElement}
            onPress={() => handleElementPress('focusable')}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Focusable Item 1"
            accessibilityHint="Double tap to focus this item"
          >
            <Text style={{ color: colors.text }}>Focusable Item 1</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={themedStyles.focusableElement}
            onPress={() => handleElementPress('focusable')}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Focusable Item 2"
            accessibilityHint="Double tap to focus this item"
          >
            <Text style={{ color: colors.text }}>Focusable Item 2</Text>
          </TouchableOpacity>

          {/* Focusable TextInput */}
          <TextInput
            style={themedStyles.focusInput}
            onFocus={() => handleElementPress('input')}
            onBlur={() => setFocusedElement(null)}
            placeholder="Tap to focus me"
            placeholderTextColor={colors.textSecondary}
            accessible
            accessibilityLabel="Input Field"
            accessibilityHint="Double tap to enter text"
          />

          {/* Focusable Button */}
          <TouchableOpacity
            style={themedStyles.focusButton}
            onPress={() => handleElementPress('button')}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Focusable Button"
            accessibilityHint="Double tap to focus and activate button"
          >
            <Text style={themedStyles.focusButtonText}>Focusable Button</Text>
          </TouchableOpacity>
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

