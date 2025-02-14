import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

export default function SemanticStructureScreen() {
  const { colors, textSizes, isDarkMode } = useTheme();

  /*
   * 1) Tinted background in light mode,
   *    normal background in dark mode
   */
  const containerBackgroundColor = isDarkMode
    ? colors.background
    : '#f2f2f2'; // subtle tint for light mode

  /*
   * 2) Themed + local overrides for text sizes
   *    (e.g., slightly bigger than your default)
   */
  const biggerMedium = textSizes.medium + 2; // for main text
  const biggerSmall = textSizes.small + 1;  // for smaller text

  /*
   * 3) Stronger shadows for cards
   *    to add more depth
   */
  const cardShadowStyle = {
    shadowColor: '#000', // uniform black for better contrast
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  };

  /*
   * 4) Full set of local + theme styles
   *    with all changes applied
   */
  const themedStyles = {
    container: {
      backgroundColor: containerBackgroundColor,
      flex: 1,
    },
    header: {
      backgroundColor: colors.surface,
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
      padding: 20,
    },
    headerTitle: {
      color: colors.text,
      fontSize: textSizes.large,  // xlarge is also fine
      fontWeight: 'bold',
      marginBottom: 8,
    },
    headerSubtitle: {
      color: colors.textSecondary,
      fontSize: biggerMedium,     // slightly bigger than default
      lineHeight: 26,
    },
    section: {
      padding: 16,
      gap: 16,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      ...cardShadowStyle,        // apply stronger shadow
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      gap: 12,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      // Light highlight color in light mode
      backgroundColor: isDarkMode ? colors.surface : '#FFF4E6',
    },
    cardTitle: {
      fontSize: biggerMedium, // was textSizes.medium, now bigger
      fontWeight: '600',
      color: colors.text,
    },
    cardDescription: {
      fontSize: biggerSmall,  // was textSizes.small, now bigger
      color: colors.textSecondary,
      lineHeight: 20,
      marginBottom: 12,
    },
    codeExample: {
      backgroundColor: '#1c1c1e', // consistent dark code block
      padding: 16,
      borderRadius: 8,
    },
    codeText: {
      color: '#fff',
      fontFamily: 'monospace',
      fontSize: textSizes.small,  // or biggerSmall if you want
      lineHeight: 20,
    },
    keyPoints: {
      gap: 8,
    },
    keyPoint: {
      fontSize: textSizes.small,
      color: colors.textSecondary,
      lineHeight: 20,
      paddingLeft: 8,
    },
  };

  return (
    <ScrollView
      style={themedStyles.container}
      accessibilityRole="scrollview"
      accessibilityLabel="Semantic Structure Screen"
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      {/* HEADER */}
      <View style={themedStyles.header}>
        <Text style={themedStyles.headerTitle} accessibilityRole="header">
          Semantic Structure
        </Text>
        <Text style={themedStyles.headerSubtitle}>
          Building meaningful and well-organized content hierarchies
        </Text>
      </View>

      {/* SECTION */}
      <View style={themedStyles.section}>
        {/* CARD 1 */}
        <View style={themedStyles.card}>
          <View style={themedStyles.cardHeader}>
            <View style={themedStyles.iconContainer}>
              <Ionicons name="layers-outline" size={24} color={colors.primary} />
            </View>
            <Text style={themedStyles.cardTitle}>Content Hierarchy</Text>
          </View>
          <Text style={themedStyles.cardDescription}>
            Proper headings and landmarks help users understand content organization.
          </Text>
          <View style={themedStyles.codeExample}>
            <Text style={themedStyles.codeText}>
              {`// Good Example
<View accessibilityRole="header">
  <Text accessibilityRole="heading">
    Main Title
  </Text>
</View>

<View accessibilityRole="main">
  <Text accessibilityRole="heading">
    Section Title
  </Text>
</View>`}
            </Text>
          </View>
        </View>

        {/* CARD 2 */}
        <View style={themedStyles.card}>
          <View style={themedStyles.cardHeader}>
            <View style={themedStyles.iconContainer}>
              <Ionicons name="list-outline" size={24} color={colors.primary} />
            </View>
            <Text style={themedStyles.cardTitle}>Navigation Order</Text>
          </View>
          <Text style={themedStyles.cardDescription}>
            Logical tab order that matches visual layout improves navigation.
          </Text>
          <View style={themedStyles.keyPoints}>
            <Text style={themedStyles.keyPoint}>• Use natural reading order</Text>
            <Text style={themedStyles.keyPoint}>• Group related elements</Text>
            <Text style={themedStyles.keyPoint}>• Maintain consistent structure</Text>
          </View>
        </View>

        {/* CARD 3 */}
        <View style={themedStyles.card}>
          <View style={themedStyles.cardHeader}>
            <View style={themedStyles.iconContainer}>
              <Ionicons name="apps-outline" size={24} color={colors.primary} />
            </View>
            <Text style={themedStyles.cardTitle}>Landmarks & Regions</Text>
          </View>
          <Text style={themedStyles.cardDescription}>
            Define distinct areas of content to aid navigation and comprehension.
          </Text>
          <View style={themedStyles.keyPoints}>
            <Text style={themedStyles.keyPoint}>• Mark main content areas</Text>
            <Text style={themedStyles.keyPoint}>• Identify navigation sections</Text>
            <Text style={themedStyles.keyPoint}>• Label complementary content</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
