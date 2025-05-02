import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, AccessibilityInfo } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function ComponentsScreen() {
  const router = useRouter();
  const { colors, textSizes, isDarkMode } = useTheme();

  const handleComponentPress = (route: string, title: string) => {
    router.push(route);
    AccessibilityInfo.announceForAccessibility(`Opening ${title} component details`);
  };

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
      fontWeight: '700',
      marginBottom: 8,
    },
    heroSubtitle: {
      color: colors.textSecondary,
      fontSize: textSizes.medium,
      lineHeight: 24,
    },
    section: {
      padding: 16,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
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
      gap: 4,
    },
    cardTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    titleArea: {
      flex: 1,
      marginRight: 8,
    },
    cardTitle: {
      fontSize: textSizes.large,
      fontWeight: '600',
      color: colors.text,
    },
    badge: {
      backgroundColor: isDarkMode
        ? `${colors.primaryLight}44`
        : colors.primaryLight,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 12,
    },
    badgeText: {
      color: colors.primary,
      fontSize: textSizes.small,
      fontWeight: '600',
    },
    cardDescription: {
      fontSize: textSizes.small + 1,
      color: colors.textSecondary,
      lineHeight: 20,
      marginBottom: 6,
    },
    features: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      marginTop: 6,
      paddingTop: 6,
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? colors.border : `${colors.primaryLight}66`,
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

  return (
    <LinearGradient
      colors={gradientColors}
      style={themedStyles.container}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        accessibilityRole="scrollview"
        accessibilityLabel="Accessibility Components Screen"
      >
        <View style={themedStyles.heroCard}>
          <Text style={themedStyles.heroTitle} accessibilityRole="header">
            Accessibility Components
          </Text>
          <Text style={themedStyles.heroSubtitle}>
            Interactive examples of accessible React Native components with code samples and best practices
          </Text>
        </View>

        <View style={themedStyles.section}>

          <TouchableOpacity
            style={themedStyles.card}
            onPress={() => handleComponentPress('/accessible-components/accessible-button', 'Buttons & Touchables')}
            accessibilityRole="button"
            accessibilityLabel="Buttons and Touchables component. Create accessible touch targets with proper sizing and feedback. Essential component type."
          >
            <View style={themedStyles.cardHeader}>
              <View style={themedStyles.iconWrapper}>
                <Ionicons
                  name="radio-button-on-outline"
                  size={24}
                  color={colors.primary}
                  accessibilityElementsHidden
                />
              </View>
              <View style={themedStyles.cardContent}>
                <View style={themedStyles.cardTitleRow}>
                  <View style={themedStyles.titleArea}>
                    <Text style={themedStyles.cardTitle}>Buttons &amp; Touchables</Text>
                  </View>
                  <View style={themedStyles.badge}>
                    <Text style={themedStyles.badgeText}>Essential</Text>
                  </View>
                </View>
                <Text style={themedStyles.cardDescription}>
                  Create accessible touch targets with proper sizing and feedback
                </Text>
                <View style={themedStyles.features}>
                  <View style={themedStyles.featureItem}>
                    <Ionicons
                      name="resize-outline"
                      size={16}
                      color={colors.textSecondary}
                      accessibilityElementsHidden
                    />
                    <Text style={themedStyles.featureText}>Touch target sizing</Text>
                  </View>
                  <View style={themedStyles.featureItem}>
                    <Ionicons
                      name="hand-left-outline"
                      size={16}
                      color={colors.textSecondary}
                      accessibilityElementsHidden
                    />
                    <Text style={themedStyles.featureText}>Haptic feedback</Text>
                  </View>
                </View>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textSecondary}
                style={themedStyles.chevron}
                accessibilityElementsHidden
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={themedStyles.card}
            onPress={() => handleComponentPress('/accessible-components/accessible-form', 'Form Controls')}
            accessibilityRole="button"
            accessibilityLabel="Form Controls component. Implement accessible form inputs and controls. Complex component type."
          >
            <View style={themedStyles.cardHeader}>
              <View style={themedStyles.iconWrapper}>
                <Ionicons
                  name="create-outline"
                  size={24}
                  color={colors.primary}
                  accessibilityElementsHidden
                />
              </View>
              <View style={themedStyles.cardContent}>
                <View style={themedStyles.cardTitleRow}>
                  <View style={themedStyles.titleArea}>
                    <Text style={themedStyles.cardTitle}>Form Controls</Text>
                  </View>
                  <View style={themedStyles.badge}>
                    <Text style={themedStyles.badgeText}>Complex</Text>
                  </View>
                </View>
                <Text style={themedStyles.cardDescription}>
                  Implement accessible form inputs and controls
                </Text>
                <View style={themedStyles.features}>
                  <View style={themedStyles.featureItem}>
                    <Ionicons
                      name="alert-circle-outline"
                      size={16}
                      color={colors.textSecondary}
                      accessibilityElementsHidden
                    />
                    <Text style={themedStyles.featureText}>Error states</Text>
                  </View>
                  <View style={themedStyles.featureItem}>
                    <Ionicons
                      name="help-circle-outline"
                      size={16}
                      color={colors.textSecondary}
                      accessibilityElementsHidden
                    />
                    <Text style={themedStyles.featureText}>Helper text</Text>
                  </View>
                </View>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textSecondary}
                style={themedStyles.chevron}
                accessibilityElementsHidden
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={themedStyles.card}
            onPress={() => handleComponentPress('/accessible-components/accessible-media', 'Media Content')}
            accessibilityRole="button"
            accessibilityLabel="Media Content component. Make images and media content accessible. Advanced component type."
          >
            <View style={themedStyles.cardHeader}>
              <View style={themedStyles.iconWrapper}>
                <Ionicons
                  name="image-outline"
                  size={24}
                  color={colors.primary}
                  accessibilityElementsHidden
                />
              </View>
              <View style={themedStyles.cardContent}>
                <View style={themedStyles.cardTitleRow}>
                  <View style={themedStyles.titleArea}>
                    <Text style={themedStyles.cardTitle}>Media Content</Text>
                  </View>
                  <View style={themedStyles.badge}>
                    <Text style={themedStyles.badgeText}>Advanced</Text>
                  </View>
                </View>
                <Text style={themedStyles.cardDescription}>
                  Make images and media content accessible
                </Text>
                <View style={themedStyles.features}>
                  <View style={themedStyles.featureItem}>
                    <Ionicons
                      name="text-outline"
                      size={16}
                      color={colors.textSecondary}
                      accessibilityElementsHidden
                    />
                    <Text style={themedStyles.featureText}>Alt text</Text>
                  </View>
                  <View style={themedStyles.featureItem}>
                    <Ionicons
                      name="play-outline"
                      size={16}
                      color={colors.textSecondary}
                      accessibilityElementsHidden
                    />
                    <Text style={themedStyles.featureText}>Media controls</Text>
                  </View>
                </View>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textSecondary}
                style={themedStyles.chevron}
                accessibilityElementsHidden
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={themedStyles.card}
            onPress={() => handleComponentPress('/accessible-components/accessible-dialog', 'Modal Dialogs')}
            accessibilityRole="button"
            accessibilityLabel="Modal Dialogs component. Implement accessible modal dialogs with proper focus management and screen reader support. Advanced component type."
          >
            <View style={themedStyles.cardHeader}>
              <View style={themedStyles.iconWrapper}>
                <Ionicons
                  name="browsers-outline"
                  size={24}
                  color={colors.primary}
                  accessibilityElementsHidden
                />
              </View>
              <View style={themedStyles.cardContent}>
                <View style={themedStyles.cardTitleRow}>
                  <View style={themedStyles.titleArea}>
                    <Text style={themedStyles.cardTitle}>Modal Dialogs</Text>
                  </View>
                  <View style={themedStyles.badge}>
                    <Text style={themedStyles.badgeText}>Advanced</Text>
                  </View>
                </View>
                <Text style={themedStyles.cardDescription}>
                  Implement accessible modal dialogs with proper focus management and screen reader support
                </Text>
                <View style={themedStyles.features}>
                  <View style={themedStyles.featureItem}>
                    <Ionicons
                      name="scan-outline"
                      size={16}
                      color={colors.textSecondary}
                      accessibilityElementsHidden
                    />
                    <Text style={themedStyles.featureText}>Focus trapping</Text>
                  </View>
                  <View style={themedStyles.featureItem}>
                    <Ionicons
                      name="megaphone-outline"
                      size={16}
                      color={colors.textSecondary}
                      accessibilityElementsHidden
                    />
                    <Text style={themedStyles.featureText}>Screen reader alerts</Text>
                  </View>
                </View>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textSecondary}
                style={themedStyles.chevron}
                accessibilityElementsHidden
              />
            </View>
          </TouchableOpacity>

        <TouchableOpacity
          style={themedStyles.card}
          onPress={() => handleComponentPress('/accessible-components/accessible-advanced', 'Loading and Navigation')}
          accessibilityRole="button"
          accessibilityLabel="Advanced Accessible Components. Includes Tabs, Progress, Alerts, and Sliders. Beta component type."
        >
          <View style={themedStyles.cardHeader}>
            <View style={themedStyles.iconWrapper}>
              <Ionicons
                name="apps-outline"
                size={24}
                color={colors.primary}
                accessibilityElementsHidden
              />
            </View>
            <View style={themedStyles.cardContent}>
              <View style={themedStyles.cardTitleRow}>
                <View style={themedStyles.titleArea}>
                  <Text style={themedStyles.cardTitle}>Loading & Navigation</Text>
                </View>
                <View style={themedStyles.badge}>
                  <Text style={themedStyles.badgeText}>Beta</Text>
                </View>
              </View>
              <Text style={themedStyles.cardDescription}>
                Explore advanced patterns such as Tabs/Carousels, Progress Indicators, Alerts/Toasts, and Sliders.
              </Text>
              <View style={themedStyles.features}>
                <View style={themedStyles.featureItem}>
                  <Ionicons
                    name="albums-outline"
                    size={16}
                    color={colors.textSecondary}
                    accessibilityElementsHidden
                  />
                  <Text style={themedStyles.featureText}>Tabs &amp; Carousels</Text>
                </View>
                <View style={themedStyles.featureItem}>
                  <Ionicons
                    name="hourglass-outline"
                    size={16}
                    color={colors.textSecondary}
                    accessibilityElementsHidden
                  />
                  <Text style={themedStyles.featureText}>Progress Indicators</Text>
                </View>
                <View style={themedStyles.featureItem}>
                  <Ionicons
                    name="notifications-outline"
                    size={16}
                    color={colors.textSecondary}
                    accessibilityElementsHidden
                  />
                  <Text style={themedStyles.featureText}>Alerts &amp; Toasts</Text>
                </View>
                <View style={themedStyles.featureItem}>
                  <Ionicons
                    name="options-outline"
                    size={16}
                    color={colors.textSecondary}
                    accessibilityElementsHidden
                  />
                  <Text style={themedStyles.featureText}>Sliders &amp; Range</Text>
                </View>
              </View>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.textSecondary}
              style={themedStyles.chevron}
              accessibilityElementsHidden
            />
          </View>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
