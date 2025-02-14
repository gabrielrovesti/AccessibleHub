import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

/* -----------------------------------------
   1. Accessibility metrics calculation
----------------------------------------- */
const calculateAccessibilityScore = () => {
  const metrics = {
    components: {
      total: 18,
      fullyAccessible: 16,
      partiallyAccessible: 2,
    },
    wcag: {
      totalCriteria: 50,
      criteriaMetLevelA: 42,
      criteriaMetLevelAA: 38,
    },
    testing: {
      talkbackScore: 4.5,
      voiceoverScore: 4.3,
      automatedTestsPassed: 95,
    }
  };

  return {
    componentScore: Math.round((metrics.components.fullyAccessible / metrics.components.total) * 100),
    wcagCompliance: Math.round((metrics.wcag.criteriaMetLevelAA / metrics.wcag.totalCriteria) * 100),
    testingScore: Math.round(((metrics.testing.talkbackScore + metrics.testing.voiceoverScore) / 2) * 20),
    componentCount: metrics.components.total
  };
};

/* -----------------------------------------
   2. HomeScreen Component
----------------------------------------- */
export default function HomeScreen() {
  const router = useRouter();
  const { colors, textSizes, isDarkMode } = useTheme();
  const accessibilityMetrics = calculateAccessibilityScore();

  /**
   * 1) Use an inverted gradient:
   *    - Light mode: darker background gradient
   *    - Dark mode: lighter background gradient
   */
  const backgroundGradientColors = isDarkMode
    ? [colors.background, '#2c2c2e']  // subtle gradient in dark mode
    : ['#e2e2e2', colors.background]; // light mode → slightly darker to lighter

  /* -----------------------------------------
     Themed styles
  ----------------------------------------- */
  const themedStyles = {
    container: {
      flex: 1,
    },
    /**
     * 2) "Hero" area: place it inside a raised card
     *    with bigger shadow and optional shape background
     */
    heroCard: {
      backgroundColor: colors.surface,
      borderRadius: 20,
      marginHorizontal: 16,
      marginTop: 16,
      paddingVertical: 24,
      paddingHorizontal: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
      borderWidth: 1,
      borderColor: colors.border,
    },
    heroTitle: {
      color: colors.text,
      fontSize: textSizes.xlarge,
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: 12,
    },
    heroSubtitle: {
      color: colors.textSecondary,
      fontSize: textSizes.medium,
      lineHeight: 24,
      textAlign: 'center',
      marginBottom: 20,
    },
    /**
     * 3) Stats area as smaller cards
     */
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 12,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: 16,
    },
    statCard: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
    },
    statNumber: {
      color: colors.primary,
      fontSize: textSizes.xlarge,
      fontWeight: '700',
      textAlign: 'center',
    },
    statLabel: {
      color: colors.text,
      fontSize: textSizes.small,
      fontWeight: '600',
      textAlign: 'center',
      marginTop: 4,
    },
    statDescription: {
      color: colors.textSecondary,
      fontSize: textSizes.small * 0.85,
      textAlign: 'center',
      marginTop: 2,
    },
    statDivider: {
      backgroundColor: colors.border,
      width: 1,
      height: 48,
      marginHorizontal: 16,
    },
    /**
     * 4) Quick Start Card
     */
    quickStartCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      marginHorizontal: 16,
      marginTop: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    cardText: {
      flex: 1,
      marginRight: 16,
    },
    cardTitle: {
      color: colors.text,
      fontSize: textSizes.large,
      fontWeight: '700',
      marginBottom: 4,
    },
    cardDescription: {
      color: colors.textSecondary,
      fontSize: textSizes.medium,
    },
    /**
     * 5) Main Content
     */
    mainContent: {
      paddingHorizontal: 16,
      paddingTop: 20,
    },
    sectionTitle: {
      color: colors.text,
      fontSize: textSizes.large,
      fontWeight: '700',
      marginBottom: 16,
    },
    featureCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
      borderWidth: 1,
      borderColor: colors.border,
    },
    featureIconContainer: {
      backgroundColor: colors.primaryLight,
      width: 48,
      height: 48,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
    },
    featureTitle: {
      color: colors.text,
      fontSize: textSizes.medium,
      fontWeight: '700',
      marginBottom: 8,
    },
    featureDescription: {
      color: colors.textSecondary,
      fontSize: textSizes.medium,
      lineHeight: 22,
      marginBottom: 12,
    },
    tagContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    tag: {
      backgroundColor: colors.primaryLight,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
    },
    tagText: {
      color: colors.primary,
      fontSize: textSizes.small,
      fontWeight: '600',
    },
    /**
     * 6) Community Section
     */
    communitySection: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      marginTop: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
      borderWidth: 1,
      borderColor: colors.border,
    },
    communitySectionTitle: {
      color: colors.text,
      fontSize: textSizes.large,
      fontWeight: 'bold',
      marginBottom: 12,
    },
    communitySectionDescription: {
      color: colors.textSecondary,
      fontSize: textSizes.medium,
      lineHeight: 24,
      marginBottom: 20,
    },
    achievementsButton: {
      backgroundColor: colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    achievementsButtonText: {
      color: colors.background,
      fontSize: textSizes.medium,
      fontWeight: 'bold',
      marginRight: 8,
    },
  };

  return (
    <LinearGradient
      colors={backgroundGradientColors}
      style={themedStyles.container}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        accessibilityRole="scrollview"
        accessibilityLabel="AccessibleHub Home Screen"
      >
        {/* HERO CARD */}
        <View style={themedStyles.heroCard}>
          <Text style={themedStyles.heroTitle} accessibilityRole="header">
            The ultimate accessibility-driven toolkit for developers
          </Text>
          <Text style={themedStyles.heroSubtitle}>
            A comprehensive resource for building inclusive React Native applications with verified accessibility standards – explore for more!
          </Text>

          {/* STATS */}
          <View style={themedStyles.statsContainer}>
            <View style={themedStyles.statCard} accessibilityRole="text">
              <Text style={themedStyles.statNumber}>
                {accessibilityMetrics.componentCount}
              </Text>
              <Text style={themedStyles.statLabel}>Components</Text>
              <Text style={themedStyles.statDescription}>Ready to Use</Text>
            </View>

            <View
              style={themedStyles.statDivider}
              importantForAccessibility="no"
            />

            <View style={themedStyles.statCard} accessibilityRole="text">
              <Text style={themedStyles.statNumber}>
                {accessibilityMetrics.wcagCompliance}%
              </Text>
              <Text style={themedStyles.statLabel}>WCAG 2.2</Text>
              <Text style={themedStyles.statDescription}>Level AA</Text>
            </View>

            <View
              style={themedStyles.statDivider}
              importantForAccessibility="no"
            />

            <View style={themedStyles.statCard} accessibilityRole="text">
              <Text style={themedStyles.statNumber}>
                {accessibilityMetrics.testingScore}%
              </Text>
              <Text style={themedStyles.statLabel}>Screen Reader</Text>
              <Text style={themedStyles.statDescription}>Test Coverage</Text>
            </View>
          </View>
        </View>

        {/* QUICK START */}
        <TouchableOpacity
          style={themedStyles.quickStartCard}
          onPress={() => router.push('/components')}
          accessibilityRole="button"
          accessibilityLabel="Quick start with component examples"
          accessibilityHint="Navigate to components section"
        >
          <View style={themedStyles.cardText}>
            <Text style={themedStyles.cardTitle}>Quick Start</Text>
            <Text style={themedStyles.cardDescription}>
              Explore accessible component examples
            </Text>
          </View>
          <Ionicons
            name="arrow-forward-circle"
            size={32}
            color={colors.primary}
            accessibilityElementsHidden
          />
        </TouchableOpacity>

        {/* DEVELOPMENT RESOURCES */}
        <View style={themedStyles.mainContent}>
          <Text style={themedStyles.sectionTitle}>
            Development Resources
          </Text>

          {[
            {
              title: 'Best Practices',
              description: 'Comprehensive WCAG 2.2 implementation guidelines for React Native',
              icon: 'book-outline',
              route: '/practices',
              tags: ['WCAG 2.2', 'Guidelines'],
              hint: 'Access WCAG implementation guidelines'
            },
            {
              title: 'Testing Tools',
              description: 'Essential tools and methods for accessibility verification',
              icon: 'build-outline',
              route: '/tools',
              tags: ['TalkBack', 'VoiceOver'],
              hint: 'Access accessibility testing tools'
            },
            {
              title: 'Framework Comparison',
              description: 'Detailed analysis of accessibility support across mobile frameworks',
              icon: 'git-compare',
              route: '/frameworks-comparison',
              tags: ['React Native', 'Flutter'],
              hint: 'Compare framework accessibility features'
            }
          ].map((feature, index) => (
            <TouchableOpacity
              key={index}
              style={themedStyles.featureCard}
              onPress={() => router.push(feature.route)}
              accessibilityRole="button"
              accessibilityLabel={feature.title}
              accessibilityHint={feature.hint}
            >
              <View style={themedStyles.featureIconContainer}>
                <Ionicons
                  name={feature.icon}
                  size={28}
                  color={colors.primary}
                  accessibilityElementsHidden
                />
              </View>
              <Text style={themedStyles.featureTitle}>
                {feature.title}
              </Text>
              <Text style={themedStyles.featureDescription}>
                {feature.description}
              </Text>
              <View style={themedStyles.tagContainer}>
                {feature.tags.map((tag, tagIndex) => (
                  <View
                    key={tagIndex}
                    style={themedStyles.tag}
                    importantForAccessibility="no"
                  >
                    <Text style={themedStyles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* COMMUNITY SECTION */}
        <View style={themedStyles.mainContent}>
          <View style={themedStyles.communitySection}>
            <Text style={themedStyles.communitySectionTitle}>
              Developer Community
            </Text>
            <Text style={themedStyles.communitySectionDescription}>
              Join our accessibility community to connect with experts, discuss best practices, and level up your skills. Earn badges as you progress on your accessibility journey!
            </Text>

            <TouchableOpacity
              style={themedStyles.achievementsButton}
              onPress={() => router.push('/achievements')}
              accessibilityRole="button"
              accessibilityLabel="View accessibility achievements"
              accessibilityHint="Navigate to the achievements screen to track your progress"
            >
              <Text style={themedStyles.achievementsButtonText}>
                View Achievements
              </Text>
              <Ionicons
                name="trophy-outline"
                size={20}
                color={colors.background}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
