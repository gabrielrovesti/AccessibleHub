import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

const guidelineData = [
  {
    title: 'Perceivable',
    icon: 'eye-outline',
    description:
      'Information and user interface components must be presentable to users in ways they can perceive.',
    checkItems: [
      'Provide text alternatives for non-text content',
      'Provide captions and other alternatives for multimedia',
      'Create content that can be presented in different ways without losing meaning',
      'Make it easier for users to see and hear content',
    ],
  },
  {
    title: 'Operable',
    icon: 'hand-left-outline',
    description:
      'User interface components and navigation must be operable.',
    checkItems: [
      'Make all functionality available from a keyboard',
      'Give users enough time to read and use content',
      'Do not use content that causes seizures or physical reactions',
      'Help users navigate and find content',
    ],
  },
  {
    title: 'Understandable',
    icon: 'document-text-outline',
    description:
      'Information and the operation of user interface must be understandable.',
    checkItems: [
      'Make text readable and understandable',
      'Make content appear and operate in predictable ways',
      'Help users avoid and correct mistakes',
    ],
  },
  {
    title: 'Robust',
    icon: 'code-outline',
    description:
      'Content must be robust enough that it can be interpreted by a wide variety of user agents, including assistive technologies.',
    checkItems: [
      'Maximize compatibility with current and future user tools',
    ],
  },
];

export default function WCAGGuidelinesScreen() {
  const { colors, textSizes, isDarkMode } = useTheme();

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
      fontSize: textSizes.xlarge,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    heroSubtitle: {
      color: colors.textSecondary,
      fontSize: textSizes.large,
      lineHeight: 28,
    },
    section: {
      padding: 16,
      gap: 16,
    },
    guidelineCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: isDarkMode ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 2,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      gap: 12,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#E8F1FF',
    },
    cardTitle: {
      color: colors.text,
      fontSize: textSizes.large,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    cardDescription: {
      color: colors.textSecondary,
      fontSize: textSizes.medium,
      lineHeight: 24,
      marginBottom: 16,
    },
    checkList: {
      gap: 12,
    },
    checkItemRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 8,
    },
    checkItemText: {
      color: colors.text,
      fontSize: textSizes.medium,
      lineHeight: 22,
      flexShrink: 1,
    },
    checkIcon: {
      marginTop: 4,
    },
  };

  return (
    <LinearGradient colors={gradientColors} style={themedStyles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        accessibilityRole="scrollview"
        accessibilityLabel="WCAG Guidelines Screen"
      >
        <View style={themedStyles.heroCard}>
          <Text style={themedStyles.heroTitle} accessibilityRole="header">
            WCAG 2.2 Guidelines
          </Text>
          <Text style={themedStyles.heroSubtitle}>
            Essential principles for building accessible mobile apps
          </Text>
        </View>

        <View style={themedStyles.section}>
          {guidelineData.map((guideline, index) => (
            <View key={index} style={themedStyles.guidelineCard}>
              <View style={themedStyles.cardHeader}>
                <View style={themedStyles.iconContainer}>
                  <Ionicons
                    name={guideline.icon}
                    size={28}
                    color="#0055CC"
                    accessibilityElementsHidden={true}
                    importantForAccessibility="no-hide-descendants"
                  />
                </View>
                <Text style={themedStyles.cardTitle}>{guideline.title}</Text>
              </View>

              <Text style={themedStyles.cardDescription}>
                {guideline.description}
              </Text>

              <View style={themedStyles.checkList}>
                {guideline.checkItems.map((item, itemIndex) => (
                  <View key={itemIndex} style={themedStyles.checkItemRow}>
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#28A745"
                      style={themedStyles.checkIcon}
                      accessibilityElementsHidden={true}
                      importantForAccessibility="no-hide-descendants"
                    />
                    <Text style={themedStyles.checkItemText}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
