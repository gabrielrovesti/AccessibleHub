import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, AccessibilityInfo} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function BestPracticesScreen() {
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const router = useRouter();
  const { colors, textSizes, isDarkMode } = useTheme();

  const gradientColors = isDarkMode
    ? [colors.background, '#2c2c2e']
    : ['#e2e2e2', colors.background];

  const iconColors = {
    wcag:        { bg: '#E8F1FF',  icon: '#0055CC' },
    semantic:    { bg: '#F0F7FF',  icon: '#0070F3' },
    gesture:     { bg: '#FFF4E6',  icon: '#FF8C00' },
    screenReader:{ bg: '#E6F4FF',  icon: '#0066CC' },
    navigation:  { bg: '#E6FFE6',  icon: '#28A745' },
  };

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
      fontWeight: '700',
      marginBottom: 8,
    },
    heroSubtitle: {
      color: colors.textSecondary,
      fontSize: textSizes.medium,
      lineHeight: 24,
    },
    section: {
      paddingHorizontal: 16,
      paddingTop: 20,
    },
    card: {
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
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    iconWrapper: {
      width: 48,
      height: 48,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardContent: {
      flex: 1,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    practiceTitle: {
      fontSize: textSizes.large,
      fontWeight: '600',
      color: colors.text,
      flex: 1,
    },
    badgeContainer: {
      flexDirection: 'row',
      gap: 6,
    },
    badge: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 12,
      backgroundColor: isDarkMode
        ? `${colors.primaryLight}20`
        : colors.primaryLight,
    },
    badgeText: {
      fontSize: textSizes.small,
      fontWeight: '600',
      color: colors.primary,
    },
    practiceDescription: {
      fontSize: textSizes.small + 1,
      color: colors.textSecondary,
      lineHeight: 20,
      marginBottom: 8,
    },
    featureList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 14,
      paddingTop: 6,
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? colors.border : `${colors.primary}15`,
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    featureText: {
      fontSize: textSizes.small,
      color: colors.textSecondary,
    },
    chevron: {
      marginLeft: 'auto',
    },
  };

  /*
   * 4) Render UI
   */
  return (
    <LinearGradient
      colors={gradientColors}
      style={themedStyles.container}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        accessibilityRole="scrollview"
        accessibilityLabel="Mobile Accessibility Best Practices Screen"
      >
        {/* HERO CARD (Title + Subtitle) */}
        <View style={themedStyles.heroCard}>
          <Text style={themedStyles.heroTitle} accessibilityRole="header">
            Mobile Accessibility Best Practices
          </Text>
          <Text style={themedStyles.heroSubtitle}>
            Essential guidelines for creating accessible React Native applications
          </Text>
        </View>

        {/* MAIN SECTION: PRACTICE CARDS */}
        <View style={themedStyles.section}>
          {/* 1) WCAG Guidelines */}
          <TouchableOpacity
            style={themedStyles.card}
            onPress={() => {
              router.push('/practices-screens/guidelines');
              AccessibilityInfo.announceForAccessibility('Opening WCAG Guidelines');
            }}
            accessibilityRole="button"
            accessibilityLabel="WCAG Guidelines. Understanding and implementing WCAG 2.2 guidelines in mobile apps"
          >
            <View
              style={[
                themedStyles.iconWrapper,
                { backgroundColor: iconColors.wcag.bg },
              ]}
            >
              <Ionicons
                name="document-text-outline"
                size={24}
                color={iconColors.wcag.icon}
                accessibilityElementsHidden
              />
            </View>

            <View style={themedStyles.cardContent}>
              <View style={themedStyles.titleRow}>
                <Text style={themedStyles.practiceTitle}>WCAG Guidelines</Text>
                <View style={themedStyles.badgeContainer}>
                  <View style={themedStyles.badge}>
                    <Text style={themedStyles.badgeText}>Documentation</Text>
                  </View>
                </View>
              </View>
              <Text style={themedStyles.practiceDescription}>
                Understanding and implementing WCAG 2.2 guidelines in mobile apps
              </Text>
              <View style={themedStyles.featureList}>
                <View style={themedStyles.featureItem}>
                  <Ionicons
                    name="checkmark-circle"
                    size={16}
                    color={colors.textSecondary}
                    accessibilityElementsHidden
                    importantForAccessibility="no-hide-descendants"
                  />
                  <Text style={themedStyles.featureText}>Success Criteria</Text>
                </View>
                <View style={themedStyles.featureItem}>
                  <Ionicons
                    name="code-slash"
                    size={16}
                    color={colors.textSecondary}
                    accessibilityElementsHidden
                  />
                  <Text style={themedStyles.featureText}>Examples</Text>
                </View>
              </View>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.textSecondary}
              style={themedStyles.chevron}
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
            />
          </TouchableOpacity>

          {/* 2) Semantic Structure */}
          <TouchableOpacity
            style={themedStyles.card}
            onPress={() => {
              router.push('/practices-screens/semantics');
              AccessibilityInfo.announceForAccessibility('Opening Semantic Structure');
            }}
            accessibilityRole="button"
            accessibilityLabel="Semantic Structure. Creating meaningful and well-organized content hierarchies"
          >
            <View
              style={[
                themedStyles.iconWrapper,
                { backgroundColor: iconColors.semantic.bg },
              ]}
            >
              <Ionicons
                name="git-merge-outline"
                size={24}
                color={iconColors.semantic.icon}
                accessibilityElementsHidden
              />
            </View>

            <View style={themedStyles.cardContent}>
              <View style={themedStyles.titleRow}>
                <Text style={themedStyles.practiceTitle}>Semantic Structure</Text>
                <View style={themedStyles.badgeContainer}>
                  <View style={themedStyles.badge}>
                    <Text style={themedStyles.badgeText}>Code Examples</Text>
                  </View>
                </View>
              </View>
              <Text style={themedStyles.practiceDescription}>
                Creating meaningful and well-organized content hierarchies
              </Text>
              <View style={themedStyles.featureList}>
                <View style={themedStyles.featureItem}>
                  <Ionicons
                    name="layers-outline"
                    size={16}
                    color={colors.textSecondary}
                    accessibilityElementsHidden
                  />
                  <Text style={themedStyles.featureText}>Hierarchy</Text>
                </View>
                <View style={themedStyles.featureItem}>
                  <Ionicons
                    name="code-slash"
                    size={16}
                    color={colors.textSecondary}
                    accessibilityElementsHidden
                  />
                  <Text style={themedStyles.featureText}>Implementation</Text>
                </View>
              </View>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.textSecondary}
              style={themedStyles.chevron}
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
            />
          </TouchableOpacity>

          {/* 3) Gesture Tutorial */}
          <TouchableOpacity
            style={themedStyles.card}
            onPress={() => {
              router.push('/practices-screens/gestures');
              AccessibilityInfo.announceForAccessibility('Opening Gesture Tutorial');
            }}
            accessibilityRole="button"
            accessibilityLabel="Gesture Tutorial. Learn and test common accessibility gestures"
          >
            <View
              style={[
                themedStyles.iconWrapper,
                { backgroundColor: iconColors.gesture.bg },
              ]}
            >
              <Ionicons
                name="hand-left-outline"
                size={24}
                color={iconColors.gesture.icon}
                accessibilityElementsHidden
              />
            </View>

            <View style={themedStyles.cardContent}>
              <View style={themedStyles.titleRow}>
                <Text style={themedStyles.practiceTitle}>Gesture Tutorial</Text>
                <View style={themedStyles.badgeContainer}>
                  <View style={themedStyles.badge}>
                    <Text style={themedStyles.badgeText}>Interactive Guide</Text>
                  </View>
                </View>
              </View>
              <Text style={themedStyles.practiceDescription}>
                Learn and test common accessibility gestures
              </Text>
              <View style={themedStyles.featureList}>
                <View style={themedStyles.featureItem}>
                  <Ionicons
                    name="finger-print-outline"
                    size={16}
                    color={colors.textSecondary}
                    accessibilityElementsHidden
                  />
                  <Text style={themedStyles.featureText}>Gesture Patterns</Text>
                </View>
                <View style={themedStyles.featureItem}>
                  <Ionicons
                    name="hand-right-outline"
                    size={16}
                    color={colors.textSecondary}
                    accessibilityElementsHidden
                  />
                  <Text style={themedStyles.featureText}>Interactive Demo</Text>
                </View>
              </View>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.textSecondary}
              style={themedStyles.chevron}
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
            />
          </TouchableOpacity>

          {/* 4) Screen Reader Support */}
          <TouchableOpacity
            style={themedStyles.card}
            onPress={() => {
              router.push('/practices-screens/screen-reader');
              AccessibilityInfo.announceForAccessibility('Opening Screen Reader Support');
            }}
            accessibilityRole="button"
            accessibilityLabel="Screen Reader Support. Optimizing your app for VoiceOver and TalkBack"
          >
            <View
              style={[
                themedStyles.iconWrapper,
                { backgroundColor: iconColors.screenReader.bg },
              ]}
            >
              <Ionicons
                name="eye-outline"
                size={24}
                color={iconColors.screenReader.icon}
                accessibilityElementsHidden
              />
            </View>

            <View style={themedStyles.cardContent}>
              <View style={themedStyles.titleRow}>
                <Text style={themedStyles.practiceTitle}>Screen Reader Support</Text>
                <View style={themedStyles.badgeContainer}>
                  <View style={themedStyles.badge}>
                    <Text style={themedStyles.badgeText}>Guidelines</Text>
                  </View>
                </View>
              </View>
              <Text style={themedStyles.practiceDescription}>
                Optimizing your app for VoiceOver and TalkBack
              </Text>
              <View style={themedStyles.featureList}>
                <View style={themedStyles.featureItem}>
                  <Ionicons
                    name="phone-portrait-outline"
                    size={16}
                    color={colors.textSecondary}
                    accessibilityElementsHidden
                  />
                  <Text style={themedStyles.featureText}>Platform-specific</Text>
                </View>
                <View style={themedStyles.featureItem}>
                  <Ionicons
                    name="hand-left-outline"
                    size={16}
                    color={colors.textSecondary}
                    accessibilityElementsHidden
                  />
                  <Text style={themedStyles.featureText}>Gestures</Text>
                </View>
              </View>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.textSecondary}
              style={themedStyles.chevron}
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
            />
          </TouchableOpacity>

          {/* 5) Logical Focus Order */}
          <TouchableOpacity
            style={themedStyles.card}
            onPress={() => {
              router.push('/practices-screens/navigation');
              AccessibilityInfo.announceForAccessibility('Opening Logical Focus Order');
            }}
            accessibilityRole="button"
            accessibilityLabel="Logical Focus Order. Managing focus and keyboard navigation effectively"
          >
            <View
              style={[
                themedStyles.iconWrapper,
                { backgroundColor: iconColors.navigation.bg },
              ]}
            >
              <Ionicons
                name="navigate-outline"
                size={24}
                color={iconColors.navigation.icon}
                accessibilityElementsHidden
              />
            </View>

            <View style={themedStyles.cardContent}>
              <View style={themedStyles.titleRow}>
                <Text style={themedStyles.practiceTitle}>Logical Focus Order</Text>
                <View style={themedStyles.badgeContainer}>
                  <View style={themedStyles.badge}>
                    <Text style={themedStyles.badgeText}>Interactive Guide</Text>
                  </View>
                </View>
              </View>
              <Text style={themedStyles.practiceDescription}>
                Managing focus and keyboard navigation effectively
              </Text>
              <View style={themedStyles.featureList}>
                <View style={themedStyles.featureItem}>
                  <Ionicons
                    name="arrow-forward-circle-outline"
                    size={16}
                    color={colors.textSecondary}
                    accessibilityElementsHidden
                  />
                  <Text style={themedStyles.featureText}>Focus Flow</Text>
                </View>
                <View style={themedStyles.featureItem}>
                  <Ionicons
                    name="hand-right-outline"
                    size={16}
                    color={colors.textSecondary}
                    accessibilityElementsHidden
                  />
                  <Text style={themedStyles.featureText}>Interactive Demo</Text>
                </View>
              </View>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.textSecondary}
              style={themedStyles.chevron}
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
