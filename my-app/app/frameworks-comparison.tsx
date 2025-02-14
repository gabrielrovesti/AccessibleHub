import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  AccessibilityInfo,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

/* --------------------------------------------
   1) FRAMEWORK DATA
-------------------------------------------- */
const frameworkData = {
  'react-native': {
    name: 'React Native',
    company: 'Meta (Facebook)',
    version: '0.73',
    description: 'A framework for building native applications using React',
    accessibility: {
      overview: 'Comprehensive accessibility support with native integration',
      screenReaders: {
        ios: 'Full VoiceOver support with native bridge',
        android: 'Complete TalkBack integration',
        rating: 4.5
      },
      semantics: {
        support: 'Extensive semantic property support',
        features: [
          'accessibilityLabel',
          'accessibilityHint',
          'accessibilityRole',
          'accessibilityState',
          'accessibilityValue'
        ],
        rating: 4.5
      },
      gestures: {
        support: 'Native gesture recognition',
        features: [
          'Touch feedback',
          'Custom touch handlers',
          'Screen reader gestures'
        ],
        rating: 4.0
      },
      focusManagement: {
        support: 'Built-in focus management',
        features: [
          'accessibilityViewIsModal',
          'Focus control methods',
          'Focus trapping'
        ],
        rating: 4.0
      }
    },
    performance: {
      startupTime: '1.2s',
      memoryUsage: 'Medium',
      bundleSize: '7-12MB',
      rating: 4.0
    },
    development: {
      language: 'JavaScript/TypeScript',
      learning: 'Moderate',
      tooling: 'Extensive',
      hot: true,
      testing: 'Jest, React Native Testing Library',
      debugging: 'Chrome DevTools, React DevTools'
    }
  },
  'flutter': {
    name: 'Flutter',
    company: 'Google',
    version: '3.16',
    description: 'A framework for building multi-platform apps using Dart',
    accessibility: {
      overview: 'Built-in accessibility features with strong platform integration',
      screenReaders: {
        ios: 'Native VoiceOver support',
        android: 'Full TalkBack integration',
        rating: 4.5
      },
      semantics: {
        support: 'Rich semantic node system',
        features: [
          'Semantic properties',
          'Custom semantic actions',
          'Label annotations',
          'Live region support'
        ],
        rating: 5.0
      },
      gestures: {
        support: 'Advanced gesture system',
        features: [
          'Custom gesture recognizers',
          'Screen reader gestures',
          'Touch feedback systems'
        ],
        rating: 4.5
      },
      focusManagement: {
        support: 'Comprehensive focus control',
        features: [
          'Focus traversal',
          'Focus nodes',
          'Modal barriers'
        ],
        rating: 4.5
      }
    },
    performance: {
      startupTime: '0.8s',
      memoryUsage: 'Low-Medium',
      bundleSize: '4-8MB',
      rating: 4.5
    },
    development: {
      language: 'Dart',
      learning: 'Steep',
      tooling: 'Comprehensive',
      hot: true,
      testing: 'Built-in testing framework',
      debugging: 'Dart DevTools'
    }
  },
  'ionic': {
    name: 'Ionic',
    company: 'Ionic',
    version: '7.5',
    description: 'A framework for building cross-platform apps using web technologies',
    accessibility: {
      overview: 'Web-based accessibility support with ARIA integration',
      screenReaders: {
        ios: 'VoiceOver support through WebView',
        android: 'TalkBack support through WebView',
        rating: 3.5
      },
      semantics: {
        support: 'ARIA-based semantics',
        features: [
          'ARIA attributes',
          'Role support',
          'State management',
          'Live regions'
        ],
        rating: 4.0
      },
      gestures: {
        support: 'Web-based gesture handling',
        features: [
          'Touch events',
          'Gesture recognition',
          'Screen reader interaction'
        ],
        rating: 3.5
      },
      focusManagement: {
        support: 'DOM-based focus management',
        features: [
          'Focus control',
          'Tab order',
          'Focus trapping'
        ],
        rating: 4.0
      }
    },
    performance: {
      startupTime: '1.5s',
      memoryUsage: 'Medium-High',
      bundleSize: '15-20MB',
      rating: 3.5
    },
    development: {
      language: 'JavaScript/TypeScript',
      learning: 'Easy',
      tooling: 'Good',
      hot: true,
      testing: 'Any web testing framework',
      debugging: 'Chrome DevTools'
    }
  }
};

/* --------------------------------------------
   2) Score Calculation
-------------------------------------------- */
function calculateMetrics(framework) {
  if (!framework) return { accessibility: 0, performance: 0 };

  // Accessibility Score
  const a11y = framework.accessibility;
  const screenReaders = a11y.screenReaders?.rating ?? 0;
  const semantics = a11y.semantics?.rating ?? 0;
  const gestures = a11y.gestures?.rating ?? 0;
  const focus = a11y.focusManagement?.rating ?? 0;

  const accessibilityScore = Number(
    (
      screenReaders * 0.3 +
      semantics * 0.3 +
      gestures * 0.2 +
      focus * 0.2
    ).toFixed(1)
  );

  // Performance Score
  const perf = framework.performance;
  const startupTimeNum = parseFloat(perf.startupTime) || 0; // e.g. "1.2s" → 1.2
  const memoryScore =
    perf.memoryUsage === 'Low' ? 5 :
    perf.memoryUsage === 'Low-Medium' ? 4 :
    perf.memoryUsage === 'Medium' ? 3 :
    perf.memoryUsage === 'Medium-High' ? 2.5 : 2;
  const bundleSizeNum = parseFloat(perf.bundleSize) || 0;  // e.g. "7-12MB" → 7

  const performanceScore = Number(
    (
      -0.3 * startupTimeNum +
      0.3 * memoryScore +
      -0.4 * bundleSizeNum +
      5
    ).toFixed(1)
  );

  // Clamp to [0, 5]
  return {
    accessibility: Math.max(0, Math.min(5, accessibilityScore)),
    performance: Math.max(0, Math.min(5, performanceScore))
  };
}

/* --------------------------------------------
   3) FrameworkComparisonScreen
-------------------------------------------- */
export default function FrameworkComparisonScreen() {
  const [selectedCategory, setSelectedCategory] = useState('overview');
  const [selectedFramework, setSelectedFramework] = useState('react-native');
  const { colors, textSizes, isDarkMode } = useTheme();

  // Categories
  const categories = [
    { id: 'overview', label: 'Overview', icon: 'information-circle' },
    { id: 'accessibility', label: 'Accessibility', icon: 'eye' },
    { id: 'performance', label: 'Performance', icon: 'speedometer' },
    { id: 'development', label: 'Development', icon: 'code-slash' },
  ];

  /*
   * Accessibility announcements on changes
   */
  useEffect(() => {
    const fw = frameworkData[selectedFramework];
    const metrics = calculateMetrics(fw);

    AccessibilityInfo.announceForAccessibility(
      `Selected ${fw.name}. Current category: ${selectedCategory}.
       ${selectedCategory} rating: ${
         metrics[selectedCategory] ?? metrics.accessibility
       }`
    );
  }, [selectedFramework, selectedCategory]);

  /*
   * 4) Themed + local styles
   */
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
      fontSize: textSizes.medium,
      lineHeight: 24,
    },
    frameworkSelection: {
      flexDirection: 'row',
      gap: 12,
      padding: 16,
    },
    frameworkButton: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    frameworkButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    frameworkButtonText: {
      fontSize: textSizes.medium,
      fontWeight: '600',
      color: colors.text,
    },
    frameworkButtonTextActive: {
      color: colors.background,
    },
    categoryTabsContainer: {
      marginBottom: 16,
      paddingHorizontal: 16,
    },
    categoryTabsContent: {
      gap: 8,
      flexDirection: 'row',
    },
    categoryTab: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 24,
      minWidth: 80,
      height: 40,
      marginRight: 8,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 6,
    },
    categoryTabActive: {
      backgroundColor: colors.primaryLight,
      borderColor: colors.primary,
    },
    categoryTabText: {
      color: colors.textSecondary,
      fontSize: textSizes.small + 1,
      fontWeight: '500',
    },
    categoryTabTextActive: {
      color: colors.primary,
    },
    section: {
      padding: 16,
      gap: 16,
    },
    infoCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: isDarkMode ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 2,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
    },
    frameworkName: {
      color: colors.text,
      fontSize: textSizes.large,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    companyName: {
      color: colors.textSecondary,
      fontSize: textSizes.medium,
      marginBottom: 8,
    },
    version: {
      color: colors.primary,
      fontSize: textSizes.small + 1,
      fontWeight: '500',
      marginBottom: 12,
    },
    description: {
      color: colors.textSecondary,
      fontSize: textSizes.medium,
      lineHeight: 24,
    },
    quickStats: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 16,
    },
    statItem: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDarkMode ? 0.2 : 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    statLabel: {
      marginTop: 8,
      marginBottom: 4,
      color: colors.textSecondary,
      fontSize: textSizes.small + 1,
    },
    statValue: {
      fontSize: textSizes.medium,
      fontWeight: '600',
      color: colors.text,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginTop: 8,
    },
    ratingBar: {
      flex: 1,
      height: 8,
      backgroundColor: isDarkMode ? colors.border : '#f0f0f0',
      borderRadius: 4,
      overflow: 'hidden',
    },
    ratingFilled: {
      height: '100%',
      backgroundColor: colors.primary,
    },
    ratingText: {
      fontSize: textSizes.small + 1,
      fontWeight: '600',
      color: colors.primary,
      minWidth: 32,
      textAlign: 'right',
    },
    ratingLabel: {
      color: colors.text,
      fontSize: textSizes.medium,
      fontWeight: '600',
      marginBottom: 8,
    },
    accessibilityCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: isDarkMode ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 2,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
    },
    cardTitle: {
      color: colors.text,
      fontSize: textSizes.large,
      fontWeight: '600',
      marginBottom: 12,
    },
    platformSupport: {
      marginBottom: 16,
      gap: 12,
    },
    platformItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    platformText: {
      fontSize: textSizes.small + 1,
      color: colors.textSecondary,
      flex: 1,
    },
    featureList: {
      gap: 8,
      marginBottom: 16,
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    featureText: {
      color: colors.textSecondary,
      fontSize: textSizes.small + 1,
    },
    performanceCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: isDarkMode ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 2,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
    },
    performanceItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      gap: 12,
    },
    performanceInfo: {
      flex: 1,
    },
    performanceLabel: {
      fontSize: textSizes.small + 1,
      color: colors.textSecondary,
      marginBottom: 4,
    },
    performanceValue: {
      fontSize: textSizes.medium,
      fontWeight: '600',
      color: colors.text,
    },
    performanceRating: {
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
    developmentCard: {
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
    toolList: {
      gap: 16,
      marginTop: 12,
    },
    toolItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    toolInfo: {
      flex: 1,
    },
    toolLabel: {
      fontSize: textSizes.small + 1,
      color: colors.textSecondary,
      marginBottom: 4,
    },
    toolValue: {
      fontSize: textSizes.medium,
      color: colors.text,
    },
  };

  /* --------------------------------------------
     5) RENDER RATING BAR
  -------------------------------------------- */
  const renderRatingBar = (rating, label = '') => {
    const numericRating = Number(rating) || 0;
    const filledWidth = Math.min(100, Math.max(0, (numericRating / 5) * 100));

    return (
      <View
        style={themedStyles.ratingContainer}
        accessible
        accessibilityRole="progressbar"
        accessibilityLabel={`${label}: ${numericRating.toFixed(1)} out of 5`}
      >
        <View style={themedStyles.ratingBar}>
          <View
            style={[
              themedStyles.ratingFilled,
              { width: `${Math.round(filledWidth)}%` },
            ]}
          />
        </View>
        <Text style={themedStyles.ratingText}>{numericRating.toFixed(1)}</Text>
      </View>
    );
  };

  /* --------------------------------------------
     6) HANDLERS
  -------------------------------------------- */
  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    const fw = frameworkData[selectedFramework];
    AccessibilityInfo.announceForAccessibility(
      `Viewing ${catId} details for ${fw.name}`
    );
  };

  const handleFrameworkChange = (fwId) => {
    setSelectedFramework(fwId);
    const fw = frameworkData[fwId];
    const metrics = calculateMetrics(fw);
    AccessibilityInfo.announceForAccessibility(
      `Selected ${fw.name}. ${selectedCategory} rating: ${
        metrics[selectedCategory] ?? metrics.accessibility
      }`
    );
  };

  /* --------------------------------------------
     7) RENDER UI PIECES
  -------------------------------------------- */
  const renderFrameworkSelection = () => (
    <View style={themedStyles.frameworkSelection}>
      {Object.keys(frameworkData).map((fwId) => {
        const fwActive = selectedFramework === fwId;
        return (
          <TouchableOpacity
            key={fwId}
            style={[
              themedStyles.frameworkButton,
              fwActive && themedStyles.frameworkButtonActive,
            ]}
            onPress={() => handleFrameworkChange(fwId)}
            accessibilityRole="button"
            accessibilityLabel={`Select ${frameworkData[fwId].name} framework`}
            accessibilityState={{ selected: fwActive }}
          >
            <Text
              style={[
                themedStyles.frameworkButtonText,
                fwActive && themedStyles.frameworkButtonTextActive,
              ]}
            >
              {frameworkData[fwId].name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const renderCategoryTabs = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={themedStyles.categoryTabsContainer}
      contentContainerStyle={themedStyles.categoryTabsContent}
      accessibilityRole="tablist"
    >
      {categories.map((cat) => {
        const active = selectedCategory === cat.id;
        return (
          <TouchableOpacity
            key={cat.id}
            style={[
              themedStyles.categoryTab,
              active && themedStyles.categoryTabActive,
            ]}
            onPress={() => handleCategoryChange(cat.id)}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={`${cat.label} tab`}
            accessibilityHint={`Shows ${cat.label.toLowerCase()} information`}
          >
            <Ionicons
              name={cat.icon}
              size={18}
              color={active ? colors.primary : colors.textSecondary}
              accessibilityElementsHidden
            />
            <Text
              style={[
                themedStyles.categoryTabText,
                active && themedStyles.categoryTabTextActive,
              ]}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );

  /*
   * 7A) Overview Section
   */
  const renderOverviewSection = () => {
    const fw = frameworkData[selectedFramework];
    return (
      <View style={themedStyles.section}>
        {/* Info Card */}
        <View style={themedStyles.infoCard}>
          <Text style={themedStyles.frameworkName}>{fw.name}</Text>
          <Text style={themedStyles.companyName}>by {fw.company}</Text>
          <Text style={themedStyles.version}>Version {fw.version}</Text>
          <Text style={themedStyles.description}>{fw.description}</Text>
        </View>

        {/* Quick Stats */}
        <View style={themedStyles.quickStats}>
          <View style={themedStyles.statItem}>
            <Ionicons name="code-slash" size={24} color={colors.primary} />
            <Text style={themedStyles.statLabel}>Language</Text>
            <Text style={themedStyles.statValue}>{fw.development.language}</Text>
          </View>
          <View style={themedStyles.statItem}>
            <Ionicons name="trending-up" size={24} color={colors.primary} />
            <Text style={themedStyles.statLabel}>Learning Curve</Text>
            <Text style={themedStyles.statValue}>{fw.development.learning}</Text>
          </View>
          <View style={themedStyles.statItem}>
            <Ionicons name="flash" size={24} color={colors.primary} />
            <Text style={themedStyles.statLabel}>Hot Reload</Text>
            <Text style={themedStyles.statValue}>{fw.development.hot ? 'Yes' : 'No'}</Text>
          </View>
        </View>
      </View>
    );
  };

  /*
   * 7B) Accessibility Section
   */
  const renderAccessibilitySection = () => {
    const fw = frameworkData[selectedFramework];
    const sr = fw.accessibility.screenReaders;
    const sem = fw.accessibility.semantics;
    const focus = fw.accessibility.focusManagement;

    return (
      <View style={themedStyles.section}>
        {/* Screen Reader Support */}
        <View style={themedStyles.accessibilityCard}>
          <Text style={themedStyles.cardTitle}>Screen Reader Support</Text>
          <View style={styles.platformSupport}>
            <View style={styles.platformItem}>
              <Ionicons
                name="logo-apple"
                size={24}
                color={isDarkMode ? colors.text : '#000'}
                accessibilityElementsHidden
              />
              <Text style={themedStyles.platformText}>{sr.ios}</Text>
            </View>
            <View style={styles.platformItem}>
              <Ionicons
                name="logo-android"
                size={24}
                color={isDarkMode ? colors.text : '#3DDC84'}
                accessibilityElementsHidden
              />
              <Text style={themedStyles.platformText}>{sr.android}</Text>
            </View>
          </View>
          {renderRatingBar(sr.rating, 'Screen Reader Support')}
        </View>

        {/* Semantic Support */}
        <View style={themedStyles.accessibilityCard}>
          <Text style={themedStyles.cardTitle}>Semantic Support</Text>
          <Text style={themedStyles.platformText}>{sem.support}</Text>
          <View style={styles.featureList}>
            {sem.features.map((feature, idx) => (
              <View key={idx} style={styles.featureItem} accessibilityRole="text">
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color="#28A745"
                  accessibilityElementsHidden
                />
                <Text style={themedStyles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
          {renderRatingBar(sem.rating, 'Semantic Support')}
        </View>

        {/* Focus Management */}
        <View style={themedStyles.accessibilityCard}>
          <Text style={themedStyles.cardTitle}>Focus Management</Text>
          <Text style={themedStyles.platformText}>{focus.support}</Text>
          <View style={styles.featureList}>
            {focus.features.map((feature, idx) => (
              <View key={idx} style={styles.featureItem} accessibilityRole="text">
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color="#28A745"
                  accessibilityElementsHidden
                />
                <Text style={themedStyles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
          {renderRatingBar(focus.rating, 'Focus Management')}
        </View>
      </View>
    );
  };

  /*
   * 7C) Performance Section
   */
  const renderPerformanceSection = () => {
    const fw = frameworkData[selectedFramework];
    return (
      <View style={themedStyles.section}>
        <View style={themedStyles.performanceCard}>
          {/* Startup Time */}
          <View style={styles.performanceItem}>
            <Ionicons name="timer-outline" size={24} color={colors.primary} />
            <View style={styles.performanceInfo}>
              <Text style={styles.performanceLabel}>Startup Time</Text>
              <Text style={styles.performanceValue}>{fw.performance.startupTime}</Text>
            </View>
          </View>
          {/* Memory Usage */}
          <View style={styles.performanceItem}>
            <Ionicons name="hardware-chip-outline" size={24} color={colors.primary} />
            <View style={styles.performanceInfo}>
              <Text style={styles.performanceLabel}>Memory Usage</Text>
              <Text style={styles.performanceValue}>{fw.performance.memoryUsage}</Text>
            </View>
          </View>
          {/* Bundle Size */}
          <View style={styles.performanceItem}>
            <Ionicons name="archive-outline" size={24} color={colors.primary} />
            <View style={styles.performanceInfo}>
              <Text style={styles.performanceLabel}>Bundle Size</Text>
              <Text style={styles.performanceValue}>{fw.performance.bundleSize}</Text>
            </View>
          </View>
        </View>

        {/* Overall Performance Rating */}
        <View style={themedStyles.performanceRating}>
          <Text style={themedStyles.ratingLabel}>Overall Performance Rating</Text>
          {renderRatingBar(fw.performance.rating)}
        </View>
      </View>
    );
  };

  /*
   * 7D) Development Section
   */
  const renderDevelopmentSection = () => {
    const fw = frameworkData[selectedFramework];
    return (
      <View style={themedStyles.section}>
        <View style={themedStyles.developmentCard}>
          <Text style={themedStyles.cardTitle}>Development Tools</Text>
          <View style={styles.toolList}>
            <View style={styles.toolItem}>
              <Ionicons name="construct-outline" size={24} color={colors.primary} />
              <View style={styles.toolInfo}>
                <Text style={styles.toolLabel}>Testing Framework</Text>
                <Text style={styles.toolValue}>{fw.development.testing}</Text>
              </View>
            </View>
            <View style={styles.toolItem}>
              <Ionicons name="bug-outline" size={24} color={colors.primary} />
              <View style={styles.toolInfo}>
                <Text style={styles.toolLabel}>Debugging Tools</Text>
                <Text style={styles.toolValue}>{fw.development.debugging}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  /*
   * 8) MAIN CONTENT SWITCH
   */
  const renderContent = () => {
    switch (selectedCategory) {
      case 'overview':
        return renderOverviewSection();
      case 'accessibility':
        return renderAccessibilitySection();
      case 'performance':
        return renderPerformanceSection();
      case 'development':
        return renderDevelopmentSection();
      default:
        return renderOverviewSection();
    }
  };

  return (
    <LinearGradient colors={gradientColors} style={themedStyles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        accessibilityRole="scrollview"
        accessibilityLabel="Framework Comparison Screen"
      >
        {/* HERO CARD */}
        <View style={themedStyles.heroCard}>
          <Text style={themedStyles.heroTitle} accessibilityRole="header">
            Framework Comparison
          </Text>
          <Text style={themedStyles.heroSubtitle}>
            Compare key features and capabilities of popular mobile development frameworks
          </Text>
        </View>

        {/* Framework Selection (React Native, Flutter, Ionic) */}
        {renderFrameworkSelection()}

        {/* Category Tabs (Overview, Accessibility, Performance, Development) */}
        <View style={themedStyles.categoryTabsContainer}>
          {renderCategoryTabs()}
        </View>

        {/* Main Content based on selectedCategory */}
        {renderContent()}
      </ScrollView>
    </LinearGradient>
  );
}

/* --------------------------------------------
   9) BASE STYLES
-------------------------------------------- */
const styles = StyleSheet.create({
  /* Container fallback */
  container: {
    flex: 1,
  },
  /* Hero area fallback is replaced by a card in themedStyles */
  /* ... */
  platformSupport: {
    marginBottom: 16,
    gap: 12,
  },
  platformItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureList: {
    marginTop: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  performanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  performanceInfo: {
    flex: 1,
  },
  performanceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  performanceValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1c1e',
  },
  toolList: {
    gap: 16,
    marginTop: 12,
  },
  toolItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  toolInfo: {
    flex: 1,
  },
  toolLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  toolValue: {
    fontSize: 16,
    color: '#1c1c1e',
  },
});
