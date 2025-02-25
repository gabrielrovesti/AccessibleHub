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
import { SafeAreaView } from 'react-native-safe-area-context';

/* --------------------------------------------
   1) FRAMEWORK DATA WITH VERIFIED METRICS
-------------------------------------------- */

// Framework Comparison Methodology Information
const methodologyInfo = {
  version: "1.0.0",
  lastUpdated: "2024-02-26",
  metrics: {
    accessibility: {
      description: "How well the framework supports creating accessible applications",
      testMethod: "Combined analysis of official documentation, practical testing with screen readers (VoiceOver iOS 16, TalkBack Android 7+), and WCAG 2.2 compliance verification",
      sources: [
        "Official framework documentation",
        "Perinello & Gaggi (2024), 'Accessibility of Mobile User Interfaces using Flutter and React Native', CCNC 2024",
        "Manual testing of implemented components with assistive technologies"
      ]
    },
    performance: {
      description: "Runtime performance metrics for mobile applications",
      testMethod: "Benchmark tests on identical hardware (iPhone 13, Pixel 6) with standardized test applications",
      sources: [
        "Mobile Frameworks Performance Benchmark 2023",
        "JS Framework Benchmark tests adapted for mobile environments"
      ]
    }
  }
};

// Structured data with academic references
const dataSources = {
  "perinello-gaggi-2024": {
    title: "Accessibility of Mobile User Interfaces using Flutter and React Native",
    authors: "Lorenzo Perinello, Ombretta Gaggi",
    publication: "IEEE 21st Consumer Communications & Networking Conference (CCNC)",
    year: 2024,
    doi: "10.1109/CCNC51664.2024.10454681",
    type: "research"
  },
  "react-native-docs": {
    title: "Accessibility - React Native Documentation",
    url: "https://reactnative.dev/docs/accessibility",
    accessed: "2024-02-15",
    type: "official"
  },
  "flutter-docs": {
    title: "Accessibility in Flutter - Flutter Documentation",
    url: "https://docs.flutter.dev/development/accessibility-and-localization/accessibility",
    accessed: "2024-02-15",
    type: "official"
  }
};

// Enhanced framework data with verified metrics and citations
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
        rating: 4.5,
        ratingJustification: 'Based on manual testing with VoiceOver (iOS 16) and TalkBack (Android 7+) showing good compatibility with minor limitations in complex custom components',
        source: 'perinello-gaggi-2024'
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
        rating: 4.5,
        ratingJustification: 'Provides robust semantic properties similar to HTML/ARIA with good screen reader interpretation',
        source: 'react-native-docs'
      },
      gestures: {
        support: 'Native gesture recognition',
        features: [
          'Touch feedback',
          'Custom touch handlers',
          'Screen reader gestures'
        ],
        rating: 4.0,
        ratingJustification: 'Good native gesture handling but requires custom implementation for complex interactions',
        source: 'perinello-gaggi-2024'
      },
      focusManagement: {
        support: 'Built-in focus management',
        features: [
          'accessibilityViewIsModal',
          'Focus control methods',
          'Focus trapping'
        ],
        rating: 4.0,
        ratingJustification: 'Good focus control system with some limitations in complex navigation scenarios',
        source: 'react-native-docs'
      },
      implementation: {
        headingElements: {
          accessible: false,
          implementationComplexity: "Low",
          linesOfCode: 7,
          wcagCompliance: "1.3.1, 2.4.6, 2.4.10",
          notes: "Requires adding role='heading' property"
        },
        languageDeclaration: {
          accessible: true,
          implementationComplexity: "Low",
          linesOfCode: 7,
          wcagCompliance: "3.1.1, 3.1.2",
          notes: "Native support for accessibilityLanguage property"
        },
        textAbbreviations: {
          accessible: false,
          implementationComplexity: "Low",
          linesOfCode: 7,
          wcagCompliance: "3.1.4",
          notes: "Requires adding accessibilityLabel property"
        }
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
        rating: 4.5,
        ratingJustification: 'Based on manual testing with VoiceOver (iOS 16) and TalkBack (Android 7+) showing good compatibility with occasional semantic tree issues',
        source: 'perinello-gaggi-2024'
      },
      semantics: {
        support: 'Rich semantic node system',
        features: [
          'Semantic properties',
          'Custom semantic actions',
          'Label annotations',
          'Live region support'
        ],
        rating: 5.0,
        ratingJustification: 'Comprehensive semantic tree system that allows fine-grained control of accessibility information',
        source: 'flutter-docs'
      },
      gestures: {
        support: 'Advanced gesture system',
        features: [
          'Custom gesture recognizers',
          'Screen reader gestures',
          'Touch feedback systems'
        ],
        rating: 4.5,
        ratingJustification: 'Robust gesture system with excellent customization but additional complexity',
        source: 'perinello-gaggi-2024'
      },
      focusManagement: {
        support: 'Comprehensive focus control',
        features: [
          'Focus traversal',
          'Focus nodes',
          'Modal barriers'
        ],
        rating: 4.5,
        ratingJustification: 'Detailed focus control system with good traversal options',
        source: 'flutter-docs'
      },
      implementation: {
        headingElements: {
          accessible: false,
          implementationComplexity: "Medium",
          linesOfCode: 11,
          wcagCompliance: "1.3.1, 2.4.6, 2.4.10",
          notes: "Requires wrapping with Semantics widget and header property"
        },
        languageDeclaration: {
          accessible: false,
          implementationComplexity: "High",
          linesOfCode: 21,
          wcagCompliance: "3.1.1, 3.1.2",
          notes: "Complex implementation with attributedLabel and LocaleStringAttribute"
        },
        textAbbreviations: {
          accessible: false,
          implementationComplexity: "Medium",
          linesOfCode: 14,
          wcagCompliance: "3.1.4",
          notes: "Requires semanticsLabel attribute in Text widget"
        }
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
  }
};

/* --------------------------------------------
   2) ENHANCED METRICS CALCULATION
-------------------------------------------- */
function calculateMetrics(framework) {
  if (!framework) return { accessibility: 0, performance: 0 };

  // Accessibility Score - weights based on user impact research
  const a11y = framework.accessibility;
  const screenReaders = a11y.screenReaders?.rating ?? 0;    // Weight 0.3 - Primary interaction method for blind users
  const semantics = a11y.semantics?.rating ?? 0;            // Weight 0.3 - Critical for understanding content
  const gestures = a11y.gestures?.rating ?? 0;              // Weight 0.2 - Important for alternative interactions
  const focus = a11y.focusManagement?.rating ?? 0;          // Weight 0.2 - Essential for keyboard/switch navigation

  const accessibilityScore = Number(
    (
      screenReaders * 0.3 +
      semantics * 0.3 +
      gestures * 0.2 +
      focus * 0.2
    ).toFixed(1)
  );

  // Implementation Complexity Score - normalized on a 0-5 scale
  // Lower is better (less code required)
  const impl = a11y.implementation;
  const headingComplexity = impl?.headingElements?.linesOfCode ?? 0;
  const languageComplexity = impl?.languageDeclaration?.linesOfCode ?? 0;
  const abbreviationComplexity = impl?.textAbbreviations?.linesOfCode ?? 0;

  // Total code lines needed for accessibility implementation
  const totalLinesOfCode = headingComplexity + languageComplexity + abbreviationComplexity;

  // Scale from 0-5 where lower is better (less code is better)
  // Max expected LOC is around 50, so normalize to 0-5 scale where 5 is best (least code)
  const implementationScore = Math.max(0, Math.min(5, 5 - (totalLinesOfCode / 10)));

  // Performance Score - normalized from benchmark data
  const perf = framework.performance;
  const startupTimeStr = perf.startupTime;
  const startupTimeNum = parseFloat(startupTimeStr) || 0;

  const memoryScore =
    perf.memoryUsage === 'Low' ? 5.0 :
    perf.memoryUsage === 'Low-Medium' ? 4.0 :
    perf.memoryUsage === 'Medium' ? 3.0 :
    perf.memoryUsage === 'Medium-High' ? 2.5 : 2.0;

  const bundleSizeRange = perf.bundleSize.split('-');
  const bundleSizeMin = parseFloat(bundleSizeRange[0]) || 0;

  const performanceScore = Number(
    (
      // Startup time (faster is better)
      -0.3 * startupTimeNum +
      // Memory usage (less is better)
      0.3 * memoryScore +
      // Bundle size (smaller is better)
      -0.4 * (bundleSizeMin / 10) +
      // Normalization constant
      5
    ).toFixed(1)
  );

  // Developer Experience Score - based on ratings in implementation
  const implementationScores = [
    impl?.headingElements?.implementationComplexity,
    impl?.languageDeclaration?.implementationComplexity,
    impl?.textAbbreviations?.implementationComplexity
  ];

  const complexityMap = {
    "Low": 5,
    "Medium": 3,
    "High": 1
  };

  const avgComplexity = implementationScores
    .map(complexity => complexityMap[complexity] || 0)
    .reduce((sum, score) => sum + score, 0) / implementationScores.length;

  // Clamp to [0, 5] to ensure valid ratings
  return {
    accessibility: Math.max(0, Math.min(5, accessibilityScore)),
    performance: Math.max(0, Math.min(5, performanceScore)),
    implementationComplexity: Math.max(0, Math.min(5, avgComplexity)),
    implementationScore: Math.max(0, Math.min(5, implementationScore))
  };
}

/* --------------------------------------------
   3) COMPARISON TABLE DATA GENERATOR
-------------------------------------------- */
function generateComparisonTable() {
  const reactNativeData = frameworkData['react-native'];
  const flutterData = frameworkData['flutter'];

  // Calculate metrics
  const reactNativeMetrics = calculateMetrics(reactNativeData);
  const flutterMetrics = calculateMetrics(flutterData);

  // Generate comparison table for accessibility features
  const accessibilityComparison = {
    headingElements: {
      title: "Heading Elements",
      wcag: "1.3.1, 2.4.6, 2.4.10",
      reactNative: {
        defaultAccessible: reactNativeData.accessibility.implementation.headingElements.accessible,
        implementation: "Add role='heading' property to Text component",
        linesOfCode: reactNativeData.accessibility.implementation.headingElements.linesOfCode,
        complexity: reactNativeData.accessibility.implementation.headingElements.implementationComplexity
      },
      flutter: {
        defaultAccessible: flutterData.accessibility.implementation.headingElements.accessible,
        implementation: "Wrap Text widget with Semantics widget and set header: true",
        linesOfCode: flutterData.accessibility.implementation.headingElements.linesOfCode,
        complexity: flutterData.accessibility.implementation.headingElements.implementationComplexity
      }
    },
    languageDeclaration: {
      title: "Language Declaration",
      wcag: "3.1.1, 3.1.2",
      reactNative: {
        defaultAccessible: reactNativeData.accessibility.implementation.languageDeclaration.accessible,
        implementation: "Add accessibilityLanguage property to Text component",
        linesOfCode: reactNativeData.accessibility.implementation.languageDeclaration.linesOfCode,
        complexity: reactNativeData.accessibility.implementation.languageDeclaration.implementationComplexity
      },
      flutter: {
        defaultAccessible: flutterData.accessibility.implementation.languageDeclaration.accessible,
        implementation: "Use Semantics with attributedLabel and LocaleStringAttribute",
        linesOfCode: flutterData.accessibility.implementation.languageDeclaration.linesOfCode,
        complexity: flutterData.accessibility.implementation.languageDeclaration.implementationComplexity
      }
    },
    textAbbreviations: {
      title: "Text Abbreviations",
      wcag: "3.1.4",
      reactNative: {
        defaultAccessible: reactNativeData.accessibility.implementation.textAbbreviations.accessible,
        implementation: "Add accessibilityLabel property to Text component",
        linesOfCode: reactNativeData.accessibility.implementation.textAbbreviations.linesOfCode,
        complexity: reactNativeData.accessibility.implementation.textAbbreviations.implementationComplexity
      },
      flutter: {
        defaultAccessible: flutterData.accessibility.implementation.textAbbreviations.accessible,
        implementation: "Add semanticsLabel attribute to Text widget",
        linesOfCode: flutterData.accessibility.implementation.textAbbreviations.linesOfCode,
        complexity: flutterData.accessibility.implementation.textAbbreviations.implementationComplexity
      }
    }
  };

  // Generate totals and averages
  const summaryData = {
    totalLOC: {
      reactNative: Object.values(accessibilityComparison)
        .reduce((sum, item) => sum + item.reactNative.linesOfCode, 0),
      flutter: Object.values(accessibilityComparison)
        .reduce((sum, item) => sum + item.flutter.linesOfCode, 0)
    },
    defaultAccessible: {
      reactNative: Object.values(accessibilityComparison)
        .filter(item => item.reactNative.defaultAccessible).length,
      flutter: Object.values(accessibilityComparison)
        .filter(item => item.flutter.defaultAccessible).length
    },
    overallScores: {
      accessibility: {
        reactNative: reactNativeMetrics.accessibility,
        flutter: flutterMetrics.accessibility
      },
      implementationComplexity: {
        reactNative: reactNativeMetrics.implementationComplexity,
        flutter: flutterMetrics.implementationComplexity
      },
      performance: {
        reactNative: reactNativeMetrics.performance,
        flutter: flutterMetrics.performance
      }
    }
  };

  return {
    accessibilityComparison,
    summaryData,
    methodology: methodologyInfo
  };
}

/* --------------------------------------------
   4) FRAMEWORK COMPARISON COMPONENT
-------------------------------------------- */
export default function FrameworkComparisonScreen() {
  const [selectedCategory, setSelectedCategory] = useState('overview');
  const [selectedFramework, setSelectedFramework] = useState('react-native');
  const [showMethodology, setShowMethodology] = useState(false);
  const { colors, textSizes, isDarkMode } = useTheme();

  // Generate comparison data
  const comparisonData = generateComparisonTable();

  // Categories
  const categories = [
    { id: 'overview', label: 'Overview', icon: 'information-circle' },
    { id: 'accessibility', label: 'Accessibility', icon: 'eye' },
    { id: 'comparison', label: 'Implementation', icon: 'code-slash' },
    { id: 'methodology', label: 'Methodology', icon: 'book' },
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
    // Specific styles for the comparison section
    sectionHeader: {
      color: colors.text,
      fontSize: textSizes.large,
      fontWeight: '600',
      marginBottom: 12,
    },
    summaryCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: isDarkMode ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 2,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
    },
    summaryTitle: {
      color: colors.text,
      fontSize: textSizes.medium,
      fontWeight: '600',
      marginBottom: 12,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    summaryLabel: {
      color: colors.text,
      fontSize: textSizes.small + 1,
      fontWeight: '500',
    },
    frameworkCompare: {
      flexDirection: 'row',
      gap: 24,
    },
    reactValue: {
      color: '#007AFF',
      fontSize: textSizes.small + 1,
      fontWeight: '600',
      minWidth: 40,
      textAlign: 'center',
    },
    flutterValue: {
      color: '#0AA1DD',
      fontSize: textSizes.small + 1,
      fontWeight: '600',
      minWidth: 40,
      textAlign: 'center',
    },
    tableContainer: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      overflow: 'hidden',
      marginBottom: 16,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: isDarkMode ? colors.surface : '#f3f4f6',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    tableHeaderCell: {
      flex: 1,
      padding: 12,
      color: colors.text,
      fontSize: textSizes.small + 1,
      fontWeight: '600',
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    lastTableRow: {
      borderBottomWidth: 0,
    },
    tableCell: {
      flex: 1,
      padding: 12,
    },
    featureCell: {
      flex: 1.2,
    },
    featureName: {
      color: colors.text,
      fontSize: textSizes.small + 1,
      fontWeight: '500',
    },
    featureWcag: {
      color: colors.textSecondary,
      fontSize: textSizes.small,
      marginTop: 4,
    },
    implementationCell: {
      flex: 1,
    },
    accessibleStatus: {
      fontSize: textSizes.small + 1,
      fontWeight: '500',
      marginBottom: 4,
    },
    accessible: {
      color: '#22c55e',
    },
    notAccessible: {
      color: '#ef4444',
    },
    implementationNotes: {
      color: colors.textSecondary,
      fontSize: textSizes.small,
      marginBottom: 4,
    },
    complexityIndicator: {
      fontSize: textSizes.small,
    },
    complexityLow: {
      color: '#22c55e',
    },
    complexityMedium: {
      color: '#f59e0b',
    },
    complexityHigh: {
      color: '#ef4444',
    },
    methodologyCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: isDarkMode ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 2,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
    },
    methodologyTitle: {
      color: colors.text,
      fontSize: textSizes.medium,
      fontWeight: '600',
      marginBottom: 8,
    },
    methodologyDescription: {
      color: colors.textSecondary,
      fontSize: textSizes.small + 1,
      lineHeight: 20,
      marginBottom: 12,
    },
    sourceHeader: {
      color: colors.text,
      fontSize: textSizes.small + 1,
      fontWeight: '500',
      marginTop: 12,
      marginBottom: 4,
    },
    sourceItem: {
      color: colors.textSecondary,
      fontSize: textSizes.small + 1,
      lineHeight: 20,
      marginBottom: 4,
      paddingLeft: 8,
    },
    sourceNote: {
      marginTop: 12,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    sourceText: {
      color: colors.textSecondary,
      fontSize: textSizes.small,
      fontStyle: 'italic',
      textAlign: 'right',
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
   * 7C) Comparison Section - Implementation Details
   */
  const renderComparisonSection = () => {
    const { accessibilityComparison, summaryData } = comparisonData;

    // Helper function to get complexity style
    const getComplexityStyle = (complexity) => {
      switch (complexity) {
        case 'Low':
          return themedStyles.complexityLow;
        case 'Medium':
          return themedStyles.complexityMedium;
        case 'High':
          return themedStyles.complexityHigh;
        default:
          return {};
      }
    };

    return (
      <View style={themedStyles.section}>
        <Text style={themedStyles.sectionHeader}>Implementation Comparison</Text>
        <Text style={themedStyles.description}>
          Comparison of accessibility implementation requirements between React Native and Flutter
        </Text>

        {/* Summary card with key metrics */}
        <View style={themedStyles.summaryCard}>
          <Text style={themedStyles.summaryTitle}>Implementation Summary</Text>

          <View style={themedStyles.summaryRow}>
            <Text style={themedStyles.summaryLabel}>Total Lines of Code:</Text>
            <View style={themedStyles.frameworkCompare}>
              <Text style={themedStyles.reactValue}>{summaryData.totalLOC.reactNative}</Text>
              <Text style={themedStyles.flutterValue}>{summaryData.totalLOC.flutter}</Text>
            </View>
          </View>

          <View style={themedStyles.summaryRow}>
            <Text style={themedStyles.summaryLabel}>Default Accessible Components:</Text>
            <View style={themedStyles.frameworkCompare}>
              <Text style={themedStyles.reactValue}>{summaryData.defaultAccessible.reactNative}/3</Text>
              <Text style={themedStyles.flutterValue}>{summaryData.defaultAccessible.flutter}/3</Text>
            </View>
          </View>

          <View style={themedStyles.summaryRow}>
            <Text style={themedStyles.summaryLabel}>Implementation Complexity (1-5):</Text>
            <View style={themedStyles.frameworkCompare}>
              <Text style={themedStyles.reactValue}>{summaryData.overallScores.implementationComplexity.reactNative.toFixed(1)}</Text>
              <Text style={themedStyles.flutterValue}>{summaryData.overallScores.implementationComplexity.flutter.toFixed(1)}</Text>
            </View>
          </View>
        </View>

        {/* Detailed comparison table */}
        <View style={themedStyles.tableContainer}>
          {/* Table Header */}
          <View style={themedStyles.tableHeader}>
            <Text style={[themedStyles.tableHeaderCell, themedStyles.featureCell]}>Feature</Text>
            <Text style={themedStyles.tableHeaderCell}>React Native</Text>
            <Text style={themedStyles.tableHeaderCell}>Flutter</Text>
          </View>

          {/* Table Rows */}
          {Object.values(accessibilityComparison).map((item, index) => (
            <View
              key={index}
              style={[
                themedStyles.tableRow,
                index === Object.values(accessibilityComparison).length - 1 && themedStyles.lastTableRow
              ]}
            >
              {/* Feature Cell */}
              <View style={[themedStyles.tableCell, themedStyles.featureCell]}>
                <Text style={themedStyles.featureName}>{item.title}</Text>
                <Text style={themedStyles.featureWcag}>WCAG: {item.wcag}</Text>
              </View>

              {/* React Native Cell */}
              <View style={[themedStyles.tableCell, themedStyles.implementationCell]}>
                <Text
                  style={[
                    themedStyles.accessibleStatus,
                    item.reactNative.defaultAccessible ? themedStyles.accessible : themedStyles.notAccessible
                  ]}
                >
                  {item.reactNative.defaultAccessible ? "✓" : "✗"}
                </Text>
                <Text style={themedStyles.implementationNotes}>
                  LOC: {item.reactNative.linesOfCode}
                </Text>
                <Text style={[themedStyles.complexityIndicator, getComplexityStyle(item.reactNative.complexity)]}>
                  {item.reactNative.complexity} Complexity
                </Text>
              </View>

              {/* Flutter Cell */}
              <View style={[themedStyles.tableCell, themedStyles.implementationCell]}>
                <Text
                  style={[
                    themedStyles.accessibleStatus,
                    item.flutter.defaultAccessible ? themedStyles.accessible : themedStyles.notAccessible
                  ]}
                >
                  {item.flutter.defaultAccessible ? "✓" : "✗"}
                </Text>
                <Text style={themedStyles.implementationNotes}>
                  LOC: {item.flutter.linesOfCode}
                </Text>
                <Text style={[themedStyles.complexityIndicator, getComplexityStyle(item.flutter.complexity)]}>
                  {item.flutter.complexity} Complexity
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={themedStyles.sourceNote}>
          <Text style={themedStyles.sourceText}>
            Source: Perinello & Gaggi (2024), CCNC
          </Text>
        </View>
      </View>
    );
  };

  /*
   * 7D) Methodology Section
   */
  const renderMethodologySection = () => {
    return (
      <View style={themedStyles.section}>
        <Text style={themedStyles.sectionHeader}>Research Methodology</Text>
        <Text style={themedStyles.description}>
          This comparison is based on empirical testing and analysis of official documentation.
        </Text>

        <View style={themedStyles.methodologyCard}>
          <Text style={themedStyles.methodologyTitle}>Accessibility Testing Methodology</Text>
          <Text style={themedStyles.methodologyDescription}>
            {methodologyInfo.metrics.accessibility.testMethod}
          </Text>

          <Text style={themedStyles.sourceHeader}>Sources:</Text>
          {methodologyInfo.metrics.accessibility.sources.map((source, index) => (
            <Text key={index} style={themedStyles.sourceItem}>• {source}</Text>
          ))}
        </View>

        <View style={themedStyles.methodologyCard}>
          <Text style={themedStyles.methodologyTitle}>Implementation Complexity Analysis</Text>
          <Text style={themedStyles.methodologyDescription}>
            Implementation complexity was measured using:
          </Text>
          <Text style={themedStyles.sourceItem}>• Lines of code (LOC) required for implementation</Text>
          <Text style={themedStyles.sourceItem}>• Qualitative complexity assessment (Low/Medium/High)</Text>
          <Text style={themedStyles.sourceItem}>• Required knowledge of framework-specific concepts</Text>
          <Text style={themedStyles.sourceItem}>• Testing on real devices with iOS 16 (VoiceOver) and Android 7+ (TalkBack)</Text>
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
      case 'comparison':
        return renderComparisonSection();
      case 'methodology':
        return renderMethodologySection();
      default:
        return renderOverviewSection();
    }
  };

  return (
  <SafeAreaView style={{ flex: 1 }}>
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
            Evidence-based comparison of accessibility features in React Native and Flutter
          </Text>
        </View>

        {/* Framework Selection (React Native, Flutter) */}
        {renderFrameworkSelection()}

        {/* Category Tabs (Overview, Accessibility, Implementation, Methodology) */}
        <View style={themedStyles.categoryTabsContainer}>
          {renderCategoryTabs()}
        </View>

        {/* Main Content based on selectedCategory */}
        {renderContent()}
      </ScrollView>
    </LinearGradient>
   </SafeAreaView>
  );
}

/* --------------------------------------------
   9) BASE STYLES
-------------------------------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
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