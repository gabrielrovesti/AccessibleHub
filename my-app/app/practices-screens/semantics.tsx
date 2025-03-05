import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function SemanticStructureScreen() {
  const router = useRouter();
  const { colors, textSizes, isDarkMode } = useTheme();

  // 1) Subtle gradient background
  const gradientColors = isDarkMode
    ? [colors.background, '#2c2c2e']
    : ['#e2e2e2', colors.background];

  // 2) Slightly larger text than default
  const biggerMedium = textSizes.medium + 2;
  const biggerSmall = textSizes.small + 1;

  // 3) Elevated card shadow style
  const cardShadowStyle = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: isDarkMode ? 0.3 : 0.1,
    shadowRadius: 6,
    elevation: 3,
  };

  // 4) Themed + local styles
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
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isDarkMode ? 0.3 : 0.15,
      shadowRadius: 6,
      elevation: 4,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
    },
    heroTitle: {
      color: colors.text,
      fontSize: textSizes.large,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    heroSubtitle: {
      color: colors.textSecondary,
      fontSize: biggerMedium,
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
      ...cardShadowStyle,
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
      backgroundColor: isDarkMode ? colors.surface : '#FFF4E6',
    },
    cardTitle: {
      fontSize: biggerMedium,
      fontWeight: '600',
      color: colors.text,
    },
    cardDescription: {
      fontSize: biggerSmall,
      color: colors.textSecondary,
      lineHeight: 20,
      marginBottom: 12,
    },
    codeExample: {
      backgroundColor: '#1c1c1e',
      padding: 16,
      borderRadius: 8,
      marginTop: 8,
    },
    codeText: {
      color: '#fff',
      fontFamily: 'monospace',
      fontSize: textSizes.small,
      lineHeight: 20,
    },
    bulletList: {
      marginTop: 8,
      gap: 6,
    },
    bulletItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 6,
    },
    bulletText: {
      fontSize: textSizes.small,
      color: colors.textSecondary,
      lineHeight: 20,
      flexShrink: 1,
    },
    tryItButton: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 24,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 16,
    },
    tryItButtonText: {
      color: colors.background,
      fontSize: textSizes.medium,
      fontWeight: '600',
      marginRight: 8,
    },
  };

  return (
    <LinearGradient colors={gradientColors} style={themedStyles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        accessibilityRole="scrollview"
        accessibilityLabel="Semantic Structure Screen"
      >
        {/* HERO CARD */}
        <View style={themedStyles.heroCard}>
          <Text style={themedStyles.heroTitle} accessibilityRole="header">
            Semantic Structure
          </Text>
          <Text style={themedStyles.heroSubtitle}>
            Building meaningful and well-organized content hierarchies
          </Text>
        </View>

        {/* MAIN SECTION */}
        <View style={themedStyles.section}>

          {/* CARD 1: Content Hierarchy & Heading Levels */}
          <View style={themedStyles.card}>
            <View style={themedStyles.cardHeader}>
              <View style={themedStyles.iconContainer}>
                <Ionicons name="layers-outline" size={24} color={colors.primary} accessibilityElementsHidden={true} importantForAccessibility="no-hide-descendants"/>
              </View>
              <Text style={themedStyles.cardTitle}>Content Hierarchy</Text>
            </View>
            <Text style={themedStyles.cardDescription}>
              Proper headings and landmarks help users quickly parse content. Avoid styling text as a heading without providing a semantic role.
              In React Native, use <Text style={{ fontWeight: 'bold' }}>accessibilityRole="heading"</Text> for key titles.
            </Text>

            {/* Example of multiple heading levels */}
            <View
              style={themedStyles.codeExample}
              accessible
              accessibilityRole="text"
              accessibilityLabel="Source code of example of multiple heading levels"
            >
              <Text
                style={themedStyles.codeText}
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
              >
            {`// Example of multiple heading levels
            <View accessibilityRole="header">
              <Text accessibilityRole="heading" /* Level 1 equivalent */>
                Main Title (H1)
              </Text>
            </View>

            <View accessibilityRole="main">
              <Text accessibilityRole="heading" /* Level 2 equivalent */>
                Section Title (H2)
              </Text>
              <Text>
                Some descriptive content here...
              </Text>
            </View>`}
              </Text>
            </View>
          </View>

          {/* CARD 2: Navigation Order & Skip Navigation */}
          <View style={themedStyles.card}>
            <View style={themedStyles.cardHeader}>
              <View style={themedStyles.iconContainer}>
                <Ionicons name="list-outline" size={24} color={colors.primary} accessibilityElementsHidden={true} importantForAccessibility="no-hide-descendants"/>
              </View>
              <Text style={themedStyles.cardTitle}>Navigation & Skip Links</Text>
            </View>
            <Text style={themedStyles.cardDescription}>
              Logical tab order matching the visual layout improves navigation. Provide a skip link to let users jump past repetitive content.
            </Text>
            <View style={themedStyles.codeExample}>
              <Text style={themedStyles.codeText}>
{`// Example: "Skip to Main Content" button
<TouchableOpacity
  onPress={() => {
    // Focus the main content or move screen reader focus
  }}
  accessibilityRole="button"
  accessibilityLabel="Skip to Main Content"
>
  <Text>Skip Navigation</Text>
</TouchableOpacity>

// Then your main content container
<View accessibilityRole="main">
  ...
</View>`}
              </Text>
            </View>
          </View>

          {/* CARD 3: Landmarks & ARIA Roles */}
          <View style={themedStyles.card}>
            <View style={themedStyles.cardHeader}>
              <View style={themedStyles.iconContainer}>
                <Ionicons name="apps-outline" size={24} color={colors.primary} accessibilityElementsHidden={true} importantForAccessibility="no-hide-descendants"/>
              </View>
              <Text style={themedStyles.cardTitle}>Landmarks & ARIA Roles</Text>
            </View>
            <Text style={themedStyles.cardDescription}>
              Define distinct areas (e.g., navigation, complementary, contentinfo) to aid comprehension.
              In React Native, you can mimic these with <Text style={{ fontWeight: 'bold' }}>accessibilityRole</Text> or custom logic.
            </Text>
            <View style={themedStyles.bulletList}>
              <View style={themedStyles.bulletItem}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color="#28A745"
                  style={{ marginTop: 3 }}
                  accessibilityElementsHidden={true}
                  importantForAccessibility="no-hide-descendants"
                />
                <Text style={themedStyles.bulletText}>
                  Use <Text style={{ fontWeight: 'bold' }}>accessibilityRole="navigation"</Text> for top-level nav
                </Text>
              </View>
              <View style={themedStyles.bulletItem}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color="#28A745"
                  style={{ marginTop: 3 }}
                  accessibilityElementsHidden={true}
                  importantForAccessibility="no-hide-descendants"
                />
                <Text style={themedStyles.bulletText}>
                  Provide <Text style={{ fontWeight: 'bold' }}>accessibilityRole="complementary"</Text> for sidebars
                </Text>
              </View>
              <View style={themedStyles.bulletItem}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color="#28A745"
                  style={{ marginTop: 3 }}
                  accessibilityElementsHidden={true}
                  importantForAccessibility="no-hide-descendants"
                />
                <Text style={themedStyles.bulletText}>
                  Mark footers with <Text style={{ fontWeight: 'bold' }}>accessibilityRole="contentinfo"</Text>
                </Text>
              </View>
            </View>
          </View>

          {/* CARD 4: Official Docs & "Try It Out" */}
          <View style={themedStyles.card}>
            <View style={themedStyles.cardHeader}>
              <View style={themedStyles.iconContainer}>
                <Ionicons name="bookmark-outline" size={24} color={colors.primary} accessibilityElementsHidden={true} importantForAccessibility="no-hide-descendants"/>
              </View>
              <Text style={themedStyles.cardTitle}>Resources & Next Steps</Text>
            </View>
            <Text style={themedStyles.cardDescription}>
              Learn more about headings, landmarks, and ARIA roles:
            </Text>
            <View style={themedStyles.bulletList}>
              <View style={themedStyles.bulletItem}>
                <Ionicons
                  name="link-outline"
                  size={20}
                  color={colors.primary}
                  style={{ marginTop: 3 }}
                  accessibilityElementsHidden={true}
                  importantForAccessibility="no-hide-descendants"
                />
                <Text style={themedStyles.bulletText}>
                  W3C WAI: <Text style={{ textDecorationLine: 'underline' }}>https://www.w3.org/WAI/</Text>
                </Text>
              </View>
              <View style={themedStyles.bulletItem}>
                <Ionicons
                  name="link-outline"
                  size={20}
                  color={colors.primary}
                  style={{ marginTop: 3 }}
                  accessibilityElementsHidden={true}
                  importantForAccessibility="no-hide-descendants"
                />
                <Text style={themedStyles.bulletText}>
                  ARIA Roles: <Text style={{ textDecorationLine: 'underline' }}>https://www.w3.org/TR/wai-aria-1.2/</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
