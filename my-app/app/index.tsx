import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

// Accessibility metrics calculation utilities
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

export default function HomeScreen() {
  const router = useRouter();
  const { colors, textSizes, isDarkMode } = useTheme();
  const accessibilityMetrics = calculateAccessibilityScore();

  const themedStyles = {
    container: {
      backgroundColor: colors.background,
    },
    hero: {
      backgroundColor: colors.surface,
      borderBottomColor: colors.border,
      borderBottomWidth: 2,
      paddingVertical: 32,
      paddingHorizontal: 20,
    },
    title: {
      color: colors.text,
      fontSize: textSizes.xlarge,
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: 16,
    },
    subtitle: {
      color: colors.textSecondary,
      fontSize: textSizes.medium,
      lineHeight: 24,
      textAlign: 'center',
      marginBottom: 24,
    },
    statsContainer: {
      borderTopColor: colors.border,
      borderTopWidth: 1,
      paddingTop: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
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
    quickStartCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      marginHorizontal: 20,
      marginTop: -20,
      marginBottom: 24,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
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
    mainContent: {
      padding: 20,
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
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
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
  };

  return (
    <ScrollView
      style={[styles.container, themedStyles.container]}
      accessibilityRole="scrollview"
      accessibilityLabel="AccessibleHub Home Screen"
    >
      <View style={themedStyles.hero}>
        <Text
          style={themedStyles.title}
          accessibilityRole="header"
        >
        The ultimate accessibility-driven toolkit for developers
        </Text>
        <Text style={themedStyles.subtitle}>
          A comprehensive resource for building inclusive React Native applications with verified accessibility standards - explore for more!
        </Text>

        <View style={themedStyles.statsContainer}>
          <View style={styles.statItem} accessibilityRole="text">
            <Text style={themedStyles.statNumber}>{accessibilityMetrics.componentCount}</Text>
            <Text style={themedStyles.statLabel}>Components</Text>
            <Text style={themedStyles.statDescription}>Ready to Use</Text>
          </View>

          <View style={themedStyles.statDivider} importantForAccessibility="no" />

          <View style={styles.statItem} accessibilityRole="text">
            <Text style={themedStyles.statNumber}>{accessibilityMetrics.wcagCompliance}%</Text>
            <Text style={themedStyles.statLabel}>WCAG 2.2</Text>
            <Text style={themedStyles.statDescription}>Level AA</Text>
          </View>

          <View style={themedStyles.statDivider} importantForAccessibility="no" />

          <View style={styles.statItem} accessibilityRole="text">
            <Text style={themedStyles.statNumber}>{accessibilityMetrics.testingScore}%</Text>
            <Text style={themedStyles.statLabel}>Screen Reader</Text>
            <Text style={themedStyles.statDescription}>Test Coverage</Text>
          </View>
        </View>
      </View>

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
          accessibilityElementsHidden={true}
        />
      </TouchableOpacity>

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
                accessibilityElementsHidden={true}
              />
            </View>
            <Text style={themedStyles.featureTitle}>{feature.title}</Text>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  dividerContainer: {
    height: 40,
    justifyContent: 'center',
  },
  cardBase: {
    overflow: 'hidden',
    borderRadius: 16,
  },
  contentPadding: {
    padding: 20,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});