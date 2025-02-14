import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function LogicalFocusOrderScreen() {
  const { colors, textSizes, isDarkMode } = useTheme();
  const [focusedElement, setFocusedElement] = useState<string | null>(null);

  const handleElementPress = (elementName: string) => {
    setFocusedElement(elementName);
  };

  // Define a gradient background for depth.
  const gradientColors = isDarkMode
    ? [colors.background, '#2c2c2e']
    : ['#e2e2e2', colors.background];

  // Define common shadow style for elevated cards.
  const cardShadowStyle = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: isDarkMode ? 0.3 : 0.1,
    shadowRadius: 6,
    elevation: 3,
  };

  // Themed and local styles.
  const themedStyles = {
    container: {
      flex: 1,
    },
    // Hero card for the page title and description.
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
      padding: 16,
      gap: 16,
    },
    // Instruction card for focus flow best practices.
    instructionCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      ...cardShadowStyle,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
    },
    instructionTitle: {
      color: colors.text,
      fontSize: textSizes.large,
      fontWeight: '600',
      marginBottom: 8,
    },
    instructionText: {
      color: colors.textSecondary,
      fontSize: textSizes.medium,
      lineHeight: 22,
      marginBottom: 12,
    },
    // Interactive demo card.
    demoCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      ...cardShadowStyle,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
    },
    demoTitle: {
      color: colors.text,
      fontSize: textSizes.large,
      fontWeight: '600',
      marginBottom: 12,
    },
    demoDescription: {
      color: colors.textSecondary,
      fontSize: textSizes.medium,
      marginBottom: 16,
    },
    // Focusable element styles: button, input, and generic focusable items.
    focusableElement: {
      padding: 16,
      borderRadius: 10,
      marginBottom: 10,
      borderWidth: 2,
      borderColor: focusedElement === 'item' ? colors.primary : colors.border,
      backgroundColor: focusedElement === 'item' ? colors.primaryLight : colors.surface,
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
      borderWidth: focusedElement === 'button' ? 2 : 0,
      borderColor: focusedElement === 'button' ? colors.primaryLight : colors.primary,
    },
    focusButtonText: {
      color: colors.surface,
      fontSize: textSizes.medium,
      fontWeight: '600',
    },
  };

  return (
    <LinearGradient colors={gradientColors} style={themedStyles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        accessibilityRole="scrollview"
        accessibilityLabel="Logical Focus Order Screen"
      >
        {/* HERO CARD */}
        <View style={themedStyles.heroCard}>
          <Text style={themedStyles.heroTitle} accessibilityRole="header">
            Logical Focus Order
          </Text>
          <Text style={themedStyles.heroSubtitle}>
            Master the art of focus navigation to improve user experience and screen reader interaction.
          </Text>
        </View>

        {/* INSTRUCTION CARD */}
        <View style={themedStyles.section}>
          <View style={themedStyles.instructionCard}>
            <Text style={themedStyles.instructionTitle}>Focus Flow Best Practices</Text>
            <Text style={themedStyles.instructionText}>
              Ensure that focus follows a logical order that matches your visual layout. Avoid keyboard traps, use clear labels, and provide visible focus indicators.
            </Text>
          </View>

          {/* DEMO CARD */}
          <View style={themedStyles.demoCard}>
            <Text style={themedStyles.demoTitle}>Interactive Focus Demo</Text>
            <Text style={themedStyles.demoDescription}>
              Tap the items below to see how focus is highlighted.
            </Text>

            {/* Focusable Items */}
            <TouchableOpacity
              style={themedStyles.focusableElement}
              onPress={() => handleElementPress('item')}
              accessibilityRole="button"
              accessibilityLabel="Focusable Item 1"
              accessibilityHint="Double tap to focus this item"
            >
              <Text style={{ color: colors.text }}>Focusable Item 1</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={themedStyles.focusableElement}
              onPress={() => handleElementPress('item')}
              accessibilityRole="button"
              accessibilityLabel="Focusable Item 2"
              accessibilityHint="Double tap to focus this item"
            >
              <Text style={{ color: colors.text }}>Focusable Item 2</Text>
            </TouchableOpacity>

            {/* TextInput */}
            <TextInput
              style={themedStyles.focusInput}
              onFocus={() => handleElementPress('input')}
              onBlur={() => setFocusedElement(null)}
              placeholder="Tap to focus the input"
              placeholderTextColor={colors.textSecondary}
              accessible
              accessibilityLabel="Input Field"
              accessibilityHint="Double tap to enter text"
            />

            {/* Focusable Button */}
            <TouchableOpacity
              style={themedStyles.focusButton}
              onPress={() => handleElementPress('button')}
              accessibilityRole="button"
              accessibilityLabel="Focusable Button"
              accessibilityHint="Double tap to focus and activate the button"
            >
              <Text style={themedStyles.focusButtonText}>Focusable Button</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  // Fallback styles (if needed) can be defined here.
});

export default LogicalFocusOrderScreen;
