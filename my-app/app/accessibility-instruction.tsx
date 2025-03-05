import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, AccessibilityInfo } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

// Instructional and community modules data
const InstructionData = [
  {
    id: 'module1',
    title: 'Understanding WCAG Guidelines',
    description: 'Learn the fundamentals of WCAG and why they are critical for accessible apps. Discover common pitfalls and success strategies.',
    link: 'https://www.w3.org/WAI/standards-guidelines/wcag/',
    badge: 'Essential',
    icon: 'book-outline',
    category: 'wcag',
  },
  {
    id: 'module2',
    title: 'Designing Accessible Interfaces',
    description: 'Get practical tips on designing interfaces that cater to users with disabilities. See real-world examples and guidelines.',
    link: 'https://www.a11yproject.com/',
    badge: 'Best Practices',
    icon: 'color-palette-outline',
    category: 'design',
  },
  {
    id: 'module3',
    title: 'Focus Management Techniques',
    description: 'Understand how to manage focus effectively in your applications to improve navigation and usability.',
    link: 'https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html',
    badge: 'Interactive',
    icon: 'navigate-outline',
    category: 'navigation',
  },
  {
    id: 'module4',
    title: 'Community Success Stories',
    description: 'Read inspiring case studies and share your own accessibility achievements with our community.',
    link: 'https://www.w3.org/WAI/teach-advocate/',
    badge: 'Community',
    icon: 'people-outline',
    category: 'community',
  },
];

export default function AccessibilityInstructionScreen() {
  const router = useRouter();
  const { colors, textSizes, isDarkMode } = useTheme();

  // Define a gradient background to increase contrast and depth:
  const gradientColors = isDarkMode
    ? [colors.background, '#2c2c2e']
    : ['#e2e2e2', colors.background];

  // Handle module press: open external link and announce the action
  const handleModulePress = async (module) => {
    if (module.link && (await Linking.canOpenURL(module.link))) {
      try {
        await Linking.openURL(module.link);
        AccessibilityInfo.announceForAccessibility(`Opening module: ${module.title}`);
      } catch (error) {
        AccessibilityInfo.announceForAccessibility(`Failed to open module: ${module.title}`);
      }
    }
  };

  /* -----------------------------------------------------
     Themed Styles – Unified with other screens
  ----------------------------------------------------- */
  const themedStyles = {
    container: {
      flex: 1,
    },
    // Hero Card for page title and subtitle
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
      paddingHorizontal: 16,
      paddingVertical: 12,
      gap: 16,
    },
    // Module Card styles for each instructional module
    moduleCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: isDarkMode ? 0.3 : 0.1,
      shadowRadius: 6,
      elevation: 3,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    iconWrapper: {
      width: 48,
      height: 48,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
      backgroundColor: isDarkMode
        ? `${colors.primaryLight}33`
        : `${colors.primaryLight}99`,
    },
    cardContent: {
      flex: 1,
    },
    cardTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    moduleTitle: {
      flex: 1,
      fontSize: textSizes.large,
      fontWeight: '600',
      color: colors.text,
    },
    badge: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 12,
      backgroundColor: isDarkMode ? `${colors.primaryLight}44` : colors.primaryLight,
    },
    badgeText: {
      fontSize: textSizes.small,
      fontWeight: '600',
      color: colors.primary,
    },
    moduleDescription: {
      fontSize: textSizes.medium,
      color: colors.textSecondary,
      lineHeight: 24,
      marginBottom: 12,
    },
    moduleFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    readMoreText: {
      fontSize: textSizes.small,
      fontWeight: '600',
      color: colors.primary,
    },
  };

  // Render each module card
  const renderModuleCard = (module) => (
    <TouchableOpacity
      key={module.id}
      style={themedStyles.moduleCard}
      onPress={() => handleModulePress(module)}
      accessibilityRole="button"
      accessibilityLabel={`${module.title}. ${module.description}`}
      accessibilityHint="Double tap to view more details"
    >
      <View style={themedStyles.cardHeader}>
        <View style={themedStyles.iconWrapper}>
          <Ionicons
            name={module.icon}
            size={24}
            color={colors.primary}
            accessibilityElementsHidden={true}
          />
        </View>
        <View style={themedStyles.cardContent}>
          <View style={themedStyles.cardTitleRow}>
            <Text style={themedStyles.moduleTitle}>{module.title}</Text>
            {module.badge && (
              <View style={themedStyles.badge} importantForAccessibility="no">
                <Text style={themedStyles.badgeText}>{module.badge}</Text>
              </View>
            )}
          </View>
          <Text style={themedStyles.moduleDescription}>{module.description}</Text>
          <View style={themedStyles.moduleFooter}>
            <Text style={themedStyles.readMoreText}>Read More</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.primary}
              accessibilityElementsHidden={true}
              importantForAccessibility="no-hide-descendants"
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={gradientColors} style={themedStyles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        accessibilityRole="scrollview"
        accessibilityLabel="Accessibility Instruction and Community Screen"
      >
        {/* HERO CARD */}
        <View style={themedStyles.heroCard}>
          <Text style={themedStyles.heroTitle} accessibilityRole="header">
            Accessibility Instruction & Community
          </Text>
          <Text style={themedStyles.heroSubtitle}>
            Explore in-depth articles, best practices, and community success stories to master accessibility in mobile development.
          </Text>
        </View>

        {/* MODULE CARDS */}
        <View style={themedStyles.section}>
          {InstructionData.map((module) => renderModuleCard(module))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});