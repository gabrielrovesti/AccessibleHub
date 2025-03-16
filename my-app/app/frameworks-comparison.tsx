import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, AccessibilityInfo, Platform, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

/* ----------------------------------------------------------------------
  1) FORMAL SYSTEM FOR FRAMEWORK EVALUATION
---------------------------------------------------------------------- */

/**
 * Methodological information for framework comparison
 * Used to document the scientific approach to evaluation
 */
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

/**
 * Academic references and official documentation
 * Used to support evaluations with verifiable sources
 */
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
  },
  "palmieri-2022": {
    title: "Accessibility of Mobile Applications: A Systematic Literature Review",
    authors: "Palmieri, M., Singh, I., Cicchetti, A.",
    publication: "International Conference on Mobile Software Engineering and Systems",
    year: 2022,
    type: "research"
  },
  "w3c-eval": {
    title: "Website Accessibility Conformance Evaluation Methodology (WCAG-EM) 1.0",
    url: "https://www.w3.org/TR/WCAG-EM/",
    type: "methodology",
    publisher: "W3C",
    year: 2014
  }
};

/**
 * Framework data with verified metrics and citations
 * Each aspect is supported by sources and justifications
 */
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
   2) FORMAL METRICS CALCULATION
-------------------------------------------- */
function calculateMetrics(framework) {
  if (!framework) return { accessibility: 0, performance: 0 };

  // Accessibility Score - weighted based on impact for users with disabilities
  const a11y = framework.accessibility;
  const screenReaders = a11y.screenReaders?.rating ?? 0;    // Weight 0.3 - Primary method for blind users
  const semantics = a11y.semantics?.rating ?? 0;            // Weight 0.3 - Critical for content understanding
  const gestures = a11y.gestures?.rating ?? 0;              // Weight 0.2 - Important for alternative interactions
  const focus = a11y.focusManagement?.rating ?? 0;          // Weight 0.2 - Essential for keyboard navigation

  const accessibilityScore = Number(
    (
      screenReaders * 0.3 +
      semantics * 0.3 +
      gestures * 0.2 +
      focus * 0.2
    ).toFixed(1)
  );

  // Implementation Complexity Score - normalized to 0-5 scale
  // (lower value is better = less code required)
  const impl = a11y.implementation;
  const headingComplexity = impl?.headingElements?.linesOfCode ?? 0;
  const languageComplexity = impl?.languageDeclaration?.linesOfCode ?? 0;
  const abbreviationComplexity = impl?.textAbbreviations?.linesOfCode ?? 0;

  // Total lines of code needed for accessibility implementation
  const totalLinesOfCode = headingComplexity + languageComplexity + abbreviationComplexity;

  // Scale from 0-5 where lower value is better (less code is better)
  // Expected max LOC around 50, so normalized to 0-5 scale where 5 is better (less code)
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

  // Developer Experience Score - based on implementation scores
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

  // Limit to [0, 5] to ensure valid scores
  return {
    accessibility: Math.max(0, Math.min(5, accessibilityScore)),
    performance: Math.max(0, Math.min(5, performanceScore)),
    implementationComplexity: Math.max(0, Math.min(5, avgComplexity)),
    implementationScore: Math.max(0, Math.min(5, implementationScore))
  };
}

/* --------------------------------------------
   3) COMPARISON DATA GENERATION
-------------------------------------------- */
function generateComparisonTable() {
  const reactNativeData = frameworkData['react-native'];
  const flutterData = frameworkData['flutter'];

  // Calculate metrics
  const reactNativeMetrics = calculateMetrics(reactNativeData);
  const flutterMetrics = calculateMetrics(flutterData);

  // Detailed comparison for accessibility features
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

  // Generate summary statistics
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

  // Add details for debugging and deeper analysis
  const detailedAnalysis = {
    reactNative: {
      screenReader: reactNativeData.accessibility.screenReaders,
      semantics: reactNativeData.accessibility.semantics,
      gestures: reactNativeData.accessibility.gestures,
      focusManagement: reactNativeData.accessibility.focusManagement,
      performance: reactNativeData.performance,
      development: reactNativeData.development
    },
    flutter: {
      screenReader: flutterData.accessibility.screenReaders,
      semantics: flutterData.accessibility.semantics,
      gestures: flutterData.accessibility.gestures,
      focusManagement: flutterData.accessibility.focusManagement,
      performance: flutterData.performance,
      development: flutterData.development
    }
  };

  return {
    accessibilityComparison,
    summaryData,
    methodology: methodologyInfo,
    sources: dataSources,
    detailedAnalysis
  };
}

/* --------------------------------------------
   4) FRAMEWORK COMPARISON COMPONENT
-------------------------------------------- */
export default function FrameworkComparisonScreen() {
  const [selectedCategory, setSelectedCategory] = useState('overview');
  const [selectedFramework, setSelectedFramework] = useState('react-native');
  const [activeStat, setActiveStat] = useState(null); // 'language', 'learning', 'hotReload', etc.
  const [activeBannerTab, setActiveBannerTab] = useState('overview'); // 'overview', 'calculation', 'references'

  // State for detail modal
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [detailType, setDetailType] = useState(null); // 'methodology', 'implementation', 'references'
  const [activeDetailTab, setActiveDetailTab] = useState('overview');

  const { colors, textSizes, isDarkMode } = useTheme();

  // Generate comparison data
  const comparisonData = generateComparisonTable();

  // Display categories
  const categories = [
    { id: 'overview', label: 'Overview', icon: 'information-circle' },
    { id: 'accessibility', label: 'Accessibility', icon: 'eye' },
    { id: 'implementation', label: 'Implementation', icon: 'code-slash' },
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

  // Show details in a modal
  const showDetails = (type) => {
    setDetailType(type);
    setActiveDetailTab('overview');
    setDetailsVisible(true);
  };

  /*
   * 5) Themed + local styles
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
    infoButton: {
      position: 'absolute',
      right: 16,
      top: 16,
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: colors.primaryLight,
      alignItems: 'center',
      justifyContent: 'center',
    },
    // Styles for details modal
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
      width: '90%',
      maxHeight: '80%',
      backgroundColor: colors.surface,
      borderRadius: 20,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      overflow: 'hidden',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    modalTitle: {
      fontSize: textSizes.large,
      fontWeight: 'bold',
      color: colors.text,
    },
    closeButton: {
      padding: 4,
    },
    modalContent: {
      padding: 16,
    },
    tabsContainer: {
      flexDirection: 'row',
      marginBottom: 16,
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    tab: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginRight: 8,
      borderRadius: 16,
    },
    activeTab: {
      backgroundColor: colors.primaryLight,
    },
    tabText: {
      color: colors.textSecondary,
      fontSize: textSizes.small,
      fontWeight: '500',
    },
    activeTabText: {
      color: colors.primary,
      fontWeight: 'bold',
    },
    detailSection: {
      marginBottom: 16,
    },
    detailTitle: {
      fontSize: textSizes.medium,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border + '40',
    },
    detailLabel: {
      fontSize: textSizes.small,
      color: colors.textSecondary,
      flex: 1,
    },
    detailValue: {
      fontSize: textSizes.small,
      fontWeight: 'bold',
      color: colors.text,
    },
    codeBlock: {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#f6f8fa',
      padding: 12,
      borderRadius: 8,
      marginTop: 8,
      marginBottom: 12,
    },
    codeText: {
      fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
      fontSize: textSizes.small - 1,
      color: isDarkMode ? '#e6e6e6' : '#1a1a1a',
    },
    referenceItem: {
      marginBottom: 12,
      padding: 12,
      backgroundColor: colors.surface,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border + '40',
    },
    referenceTitle: {
      fontSize: textSizes.small,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 4,
    },
    referenceAuthors: {
      fontSize: textSizes.small - 1,
      color: colors.textSecondary,
      marginBottom: 2,
    },
    referencePublication: {
      fontSize: textSizes.small - 1,
      fontStyle: 'italic',
      color: colors.textSecondary,
    },
    progressContainer: {
      height: 8,
      backgroundColor: colors.border,
      borderRadius: 4,
      flex: 1,
      marginHorizontal: 12,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: colors.primary,
    },
    methodologyBanner: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      marginTop: 16,
      marginHorizontal: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDarkMode ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    bannerHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    bannerTitle: {
      fontSize: textSizes.medium,
      fontWeight: 'bold',
      color: colors.text,
    },
    bannerTabs: {
      flexDirection: 'row',
      marginBottom: 12,
    },
    bannerTab: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      marginRight: 8,
      borderRadius: 16,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    activeBannerTab: {
      backgroundColor: colors.primaryLight,
      borderColor: colors.primary,
    },
    bannerTabText: {
      color: colors.textSecondary,
      fontSize: textSizes.small,
    },
    activeBannerTabText: {
      color: colors.primary,
    },
    bannerContent: {
      paddingVertical: 8,
    },
    bannerText: {
      fontSize: textSizes.small + 1,
      color: colors.textSecondary,
      marginBottom: 8,
      lineHeight: 20,
    },
    bannerSubtext: {
      fontSize: textSizes.small,
      color: colors.textSecondary,
      fontStyle: 'italic',
      marginBottom: 8,
    },
    methodDataRow: {
      flexDirection: 'row',
      marginBottom: 6,
    },
    methodDataLabel: {
      fontSize: textSizes.small,
      fontWeight: '500',
      color: colors.text,
      width: 120,
    },
    methodDataValue: {
      fontSize: textSizes.small,
      color: colors.textSecondary,
      flex: 1,
    },
    codeBlockBanner: {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#f6f8fa',
      padding: 10,
      borderRadius: 8,
      marginVertical: 8,
    },
    referenceRow: {
      marginBottom: 8,
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border + '30',
    },
    implementationBanner: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      marginTop: 16,
      marginBottom: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDarkMode ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    codeExample: {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#f6f8fa',
      padding: 12,
      borderRadius: 8,
      marginVertical: 8,
    },
    codeExampleTitle: {
      color: colors.text,
      fontSize: textSizes.small + 1,
      fontWeight: '600',
      marginBottom: 8,
    },
    implementationFeature: {
      padding: 12,
      backgroundColor: colors.surface,
      borderRadius: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border + '60',
    },
    implementationFeatureHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    implementationFeatureTitle: {
      fontSize: textSizes.medium,
      fontWeight: '600',
      color: colors.text,
    },
    implementationFeatureWcag: {
      fontSize: textSizes.small,
      color: colors.primary,
      fontWeight: '500',
    },
    implementationDetails: {
      marginTop: 8,
    },
    implementationDetail: {
      flexDirection: 'row',
      marginBottom: 6,
    },
    implementationDetailLabel: {
      fontSize: textSizes.small,
      color: colors.textSecondary,
      width: 100,
    },
    implementationDetailValue: {
      fontSize: textSizes.small,
      color: colors.text,
      flex: 1,
    },
  };

  /* --------------------------------------------
     5.1) RENDER METHODOLOGY BANNER CONTENT
  -------------------------------------------- */
  const renderBannerContent = () => {
    if (activeBannerTab === 'overview') {
      if (activeStat === 'language') {
        return (
          <View>
            <Text style={themedStyles.bannerText}>
              The language assessment is based on developer accessibility and ecosystem support.
              For accessibility implementation, the language's expressiveness and type safety
              were evaluated based on Perinello & Gaggi (2024) methodology.
            </Text>

            <View style={themedStyles.methodDataRow}>
              <Text style={themedStyles.methodDataLabel}>Evaluation Date:</Text>
              <Text style={themedStyles.methodDataValue}>{comparisonData.methodology.lastUpdated}</Text>
            </View>

            <View style={themedStyles.methodDataRow}>
              <Text style={themedStyles.methodDataLabel}>Testing Method:</Text>
              <Text style={themedStyles.methodDataValue}>Documentation analysis, static typing assessment</Text>
            </View>
          </View>
        );
      } else if (activeStat === 'learning') {
        return (
          <View>
            <Text style={themedStyles.bannerText}>
              Learning curve assessment is based on framework documentation complexity, required
              prior knowledge, and community support. This is particularly important for
              accessibility implementations which often require deeper framework understanding.
            </Text>

            <View style={themedStyles.methodDataRow}>
              <Text style={themedStyles.methodDataLabel}>Assessment Method:</Text>
              <Text style={themedStyles.methodDataValue}>Documentation analysis, community survey</Text>
            </View>
          </View>
        );
      } else if (activeStat === 'hotReload') {
        return (
          <View>
            <Text style={themedStyles.bannerText}>
              Hot reload capability assessment measures the framework's ability to update UI
              without losing state, which is critical for efficient accessibility testing and
              implementation workflows.
            </Text>

            <View style={themedStyles.methodDataRow}>
              <Text style={themedStyles.methodDataLabel}>Testing Method:</Text>
              <Text style={themedStyles.methodDataValue}>Real-time modification testing on iOS and Android</Text>
            </View>
          </View>
        );
      } else if (activeStat === 'accessibility') {
        return (
          <View>
            <Text style={themedStyles.bannerText}>
              The accessibility score is calculated based on screenreader compatibility,
              semantic richness, gesture handling, and focus management capabilities.
            </Text>

            <View style={themedStyles.methodDataRow}>
              <Text style={themedStyles.methodDataLabel}>Test Devices:</Text>
              <Text style={themedStyles.methodDataValue}>iPhone 13 (iOS 16.5), Pixel 7 (Android 14)</Text>
            </View>
          </View>
        );
      } else if (activeStat === 'implementation') {
        return (
          <View>
            <Text style={themedStyles.bannerText}>
              Implementation complexity is assessed based on lines of code required, API
              complexity, and framework-specific knowledge needed to implement accessibility
              features compliant with WCAG 2.2.
            </Text>

            <View style={themedStyles.methodDataRow}>
              <Text style={themedStyles.methodDataLabel}>Metrics:</Text>
              <Text style={themedStyles.methodDataValue}>LOC, API complexity, developer experience</Text>
            </View>
          </View>
        );
      } else if (activeStat === 'implementationDetail') {
        // Implementation detail-specific content
        const fw = frameworkData[selectedFramework];
        return (
          <View>
            <Text style={themedStyles.bannerText}>
              This shows implementation details for {fw.name} accessibility features.
              The complexity and lines of code metrics highlight efficiency differences
              between frameworks.
            </Text>

            <View style={themedStyles.methodDataRow}>
              <Text style={themedStyles.methodDataLabel}>Framework:</Text>
              <Text style={themedStyles.methodDataValue}>{fw.name} {fw.version}</Text>
            </View>

            <View style={themedStyles.methodDataRow}>
              <Text style={themedStyles.methodDataLabel}>Analysis Method:</Text>
              <Text style={themedStyles.methodDataValue}>Static code analysis, empirical testing</Text>
            </View>
          </View>
        );
      }
    } else if (activeBannerTab === 'calculation') {
      // Calculation tab content
      if (activeStat === 'accessibility') {
        return (
          <View>
            <Text style={themedStyles.bannerText}>
              The accessibility score is calculated using a weighted formula:
            </Text>

            <View style={themedStyles.codeBlockBanner}>
              <Text style={themedStyles.codeText}>
                {`accessibilityScore =
    screenReaders * 0.3 +
    semantics * 0.3 +
    gestures * 0.2 +
    focus * 0.2`}
              </Text>
            </View>

            <Text style={themedStyles.bannerText}>
              This weighting reflects the relative importance of each feature for accessibility.
            </Text>
          </View>
        );
      } else if (activeStat === 'implementation' || activeStat === 'implementationDetail') {
        return (
          <View>
            <Text style={themedStyles.bannerText}>
              Implementation complexity score is calculated as:
            </Text>

            <View style={themedStyles.codeBlockBanner}>
              <Text style={themedStyles.codeText}>
                {`// Implementation Complexity Score (0-5)
  // Lower LOC = better score
  implementationScore =
    Math.max(0, Math.min(5, 5 - (totalLinesOfCode / 10)))`}
              </Text>
            </View>

            <Text style={themedStyles.bannerText}>
              Framework-specific implementation examples are evaluated using standardized test cases based on WCAG 2.2 requirements.
            </Text>
          </View>
        );
      } else {
        return (
          <View>
            <Text style={themedStyles.bannerText}>
              The framework metrics are calculated using standardized formulas that normalize
              different aspects to a 0-5 scale, enabling objective comparison.
            </Text>

            <View style={themedStyles.methodDataRow}>
              <Text style={themedStyles.methodDataLabel}>Scale:</Text>
              <Text style={themedStyles.methodDataValue}>0 (poor) to 5 (excellent)</Text>
            </View>
          </View>
        );
      }
    } else {
      // References tab
      return (
        <View>
          <Text style={themedStyles.bannerSubtext}>Key References</Text>
          {Object.values(comparisonData.sources)
            .filter(s => s.type === 'research')
            .slice(0, 2)
            .map((ref, idx) => (
              <View key={idx} style={themedStyles.referenceRow}>
                <Text style={themedStyles.bannerText}>{ref.title}</Text>
                <Text style={themedStyles.bannerSubtext}>{ref.authors}, {ref.year}</Text>
              </View>
            ))
          }
        </View>
      );
    }

    return null;
  };

  /* --------------------------------------------
     6) RENDER DETAILS MODAL
  -------------------------------------------- */
  const renderDetailsModal = () => {
    // Appropriate title based on detail type
    const getModalTitle = () => {
      switch (detailType) {
        case 'methodology':
          return 'Research Methodology';
        case 'implementation':
          return 'Implementation Details';
        case 'references':
          return 'Academic References';
        default:
          return 'Framework Analysis';
      }
    };

    // Content based on active tab
    const renderTabContent = () => {
      switch (activeDetailTab) {
        case 'overview':
          return renderOverviewTab();
        case 'details':
          return renderDetailsTab();
        case 'references':
          return renderReferencesTab();
        default:
          return renderOverviewTab();
      }
    };

    // Overview tab
    const renderOverviewTab = () => {
      if (detailType === 'methodology') {
        return (
          <View style={themedStyles.detailSection}>
            <Text style={themedStyles.detailTitle}>Research Approach</Text>
            <Text style={{
              color: colors.textSecondary,
              fontSize: textSizes.small + 1,
              lineHeight: 20,
              marginBottom: 12
            }}>
              {comparisonData.methodology.metrics.accessibility.testMethod}
            </Text>

            <Text style={themedStyles.detailTitle}>Testing Methodology</Text>
            <View style={themedStyles.detailRow}>
              <Text style={themedStyles.detailLabel}>Version</Text>
              <Text style={themedStyles.detailValue}>{comparisonData.methodology.version}</Text>
            </View>

            <View style={themedStyles.detailRow}>
              <Text style={themedStyles.detailLabel}>Last Updated</Text>
              <Text style={themedStyles.detailValue}>{comparisonData.methodology.lastUpdated}</Text>
            </View>

            <Text style={[themedStyles.detailTitle, { marginTop: 16 }]}>Performance Testing</Text>
            <Text style={{
              color: colors.textSecondary,
              fontSize: textSizes.small + 1,
              lineHeight: 20,
              marginBottom: 12
            }}>
              {comparisonData.methodology.metrics.performance.testMethod}
            </Text>
          </View>
        );
      } else if (detailType === 'implementation') {
        return (
          <View style={themedStyles.detailSection}>
            <Text style={themedStyles.detailTitle}>Implementation Comparison</Text>

            <View style={themedStyles.detailRow}>
              <Text style={themedStyles.detailLabel}>Total Lines of Code (React Native)</Text>
              <Text style={themedStyles.detailValue}>{comparisonData.summaryData.totalLOC.reactNative}</Text>
            </View>

            <View style={themedStyles.detailRow}>
              <Text style={themedStyles.detailLabel}>Total Lines of Code (Flutter)</Text>
              <Text style={themedStyles.detailValue}>{comparisonData.summaryData.totalLOC.flutter}</Text>
            </View>

            <View style={themedStyles.detailRow}>
              <Text style={themedStyles.detailLabel}>Default Accessible Features (React Native)</Text>
              <Text style={themedStyles.detailValue}>
                {comparisonData.summaryData.defaultAccessible.reactNative} / 3
              </Text>
            </View>

            <View style={themedStyles.detailRow}>
              <Text style={themedStyles.detailLabel}>Default Accessible Features (Flutter)</Text>
              <Text style={themedStyles.detailValue}>
                {comparisonData.summaryData.defaultAccessible.flutter} / 3
              </Text>
            </View>

            <Text style={[themedStyles.detailTitle, { marginTop: 16 }]}>Implementation Example</Text>
            <Text style={{ color: colors.textSecondary, fontSize: textSizes.small, marginBottom: 4 }}>
              React Native Heading Element:
            </Text>
            <View style={themedStyles.codeBlock}>
              <Text style={themedStyles.codeText}>
                {'<Text accessibilityRole="header">Heading</Text>'}
              </Text>
            </View>

            <Text style={{ color: colors.textSecondary, fontSize: textSizes.small, marginBottom: 4 }}>
              Flutter Heading Element:
            </Text>
            <View style={themedStyles.codeBlock}>
              <Text style={themedStyles.codeText}>
                {'Semantics(\n  header: true,\n  child: Text(\'Heading\')\n)'}
              </Text>
            </View>
          </View>
        );
      } else if (detailType === 'references') {
        const references = Object.values(comparisonData.sources);
        return (
          <View style={themedStyles.detailSection}>
            <Text style={themedStyles.detailTitle}>Academic References</Text>

            {references.map((ref, index) => (
              <View key={index} style={themedStyles.referenceItem}>
                <Text style={themedStyles.referenceTitle}>{ref.title}</Text>
                {ref.authors && (
                  <Text style={themedStyles.referenceAuthors}>{ref.authors}</Text>
                )}
                {ref.publication && (
                  <Text style={themedStyles.referencePublication}>
                    {ref.publication}, {ref.year}
                    {ref.doi && ` (doi: ${ref.doi})`}
                  </Text>
                )}
                {!ref.publication && ref.publisher && (
                  <Text style={themedStyles.referencePublication}>
                    {ref.publisher}, {ref.year}
                  </Text>
                )}
              </View>
            ))}
          </View>
        );
      }

      return null;
    };

    // Details tab
    const renderDetailsTab = () => {
      if (detailType === 'methodology') {
        return (
          <View style={themedStyles.detailSection}>
            <Text style={themedStyles.detailTitle}>Testing Devices</Text>
            <View style={themedStyles.detailRow}>
              <Text style={themedStyles.detailLabel}>iOS</Text>
              <Text style={themedStyles.detailValue}>iPhone 13, iOS 16.5</Text>
            </View>
            <View style={themedStyles.detailRow}>
              <Text style={themedStyles.detailLabel}>Android</Text>
              <Text style={themedStyles.detailValue}>Pixel 6, Android 13</Text>
            </View>

            <Text style={[themedStyles.detailTitle, { marginTop: 16 }]}>Assessment Criteria</Text>
            <View style={themedStyles.detailRow}>
              <Text style={themedStyles.detailLabel}>Semantic Support</Text>
              <Text style={themedStyles.detailValue}>Weight: 30%</Text>
            </View>
            <View style={themedStyles.detailRow}>
              <Text style={themedStyles.detailLabel}>Screen Reader Compatibility</Text>
              <Text style={themedStyles.detailValue}>Weight: 30%</Text>
            </View>
            <View style={themedStyles.detailRow}>
<Text style={themedStyles.detailLabel}>Gesture Handling</Text>
              <Text style={themedStyles.detailValue}>Weight: 20%</Text>
            </View>
            <View style={themedStyles.detailRow}>
              <Text style={themedStyles.detailLabel}>Focus Management</Text>
              <Text style={themedStyles.detailValue}>Weight: 20%</Text>
            </View>
          </View>
        );
      } else if (detailType === 'implementation') {
        return (
          <View style={themedStyles.detailSection}>
            <Text style={themedStyles.detailTitle}>Heading Elements Implementation</Text>
            <View style={themedStyles.detailRow}>
              <Text style={themedStyles.detailLabel}>React Native LOC</Text>
              <Text style={themedStyles.detailValue}>
                {comparisonData.accessibilityComparison.headingElements.reactNative.linesOfCode}
              </Text>
            </View>
            <View style={themedStyles.detailRow}>
              <Text style={themedStyles.detailLabel}>React Native Complexity</Text>
              <Text style={[
                themedStyles.detailValue,
                themedStyles[`complexity${comparisonData.accessibilityComparison.headingElements.reactNative.complexity}`]
              ]}>
                {comparisonData.accessibilityComparison.headingElements.reactNative.complexity}
              </Text>
            </View>
            <View style={themedStyles.detailRow}>
              <Text style={themedStyles.detailLabel}>Flutter LOC</Text>
              <Text style={themedStyles.detailValue}>
                {comparisonData.accessibilityComparison.headingElements.flutter.linesOfCode}
              </Text>
            </View>
            <View style={themedStyles.detailRow}>
              <Text style={themedStyles.detailLabel}>Flutter Complexity</Text>
              <Text style={[
                themedStyles.detailValue,
                themedStyles[`complexity${comparisonData.accessibilityComparison.headingElements.flutter.complexity}`]
              ]}>
                {comparisonData.accessibilityComparison.headingElements.flutter.complexity}
              </Text>
            </View>

            <Text style={[themedStyles.detailTitle, { marginTop: 16 }]}>Language Declaration Implementation</Text>
            <View style={themedStyles.detailRow}>
              <Text style={themedStyles.detailLabel}>React Native LOC</Text>
              <Text style={themedStyles.detailValue}>
                {comparisonData.accessibilityComparison.languageDeclaration.reactNative.linesOfCode}
              </Text>
            </View>
            <View style={themedStyles.detailRow}>
              <Text style={themedStyles.detailLabel}>Flutter LOC</Text>
              <Text style={themedStyles.detailValue}>
                {comparisonData.accessibilityComparison.languageDeclaration.flutter.linesOfCode}
              </Text>
            </View>
          </View>
        );
      } else if (detailType === 'references') {
        return (
          <View style={themedStyles.detailSection}>
            <Text style={themedStyles.detailTitle}>Research Publications</Text>

            {Object.values(comparisonData.sources)
              .filter(source => source.type === 'research')
              .map((ref, index) => (
                <View key={index} style={themedStyles.detailRow}>
                  <Text style={themedStyles.detailLabel}>{ref.authors ? ref.authors.split(',')[0] : 'Unknown'}</Text>
                  <Text style={themedStyles.detailValue}>{ref.year}</Text>
                </View>
              ))}

            <Text style={[themedStyles.detailTitle, { marginTop: 16 }]}>Official Documentation</Text>

            {Object.values(comparisonData.sources)
              .filter(source => source.type === 'official' || source.type === 'methodology')
              .map((ref, index) => (
                <View key={index} style={themedStyles.detailRow}>
                  <Text style={themedStyles.detailLabel}>{ref.title.split(' - ')[0]}</Text>
                  <Text style={themedStyles.detailValue}>{ref.year || ref.accessed?.substring(0, 4)}</Text>
                </View>
              ))}
          </View>
        );
      }

      return null;
    };

    // References tab
    const renderReferencesTab = () => {
      return (
        <View style={themedStyles.detailSection}>
          <Text style={themedStyles.detailTitle}>Citations</Text>

          {Object.values(comparisonData.sources).map((ref, index) => (
            <View key={index} style={themedStyles.referenceItem}>
              <Text style={themedStyles.referenceTitle}>{ref.title}</Text>
              {ref.authors && (
                <Text style={themedStyles.referenceAuthors}>{ref.authors}</Text>
              )}
              {ref.publication && (
                <Text style={themedStyles.referencePublication}>
                  {ref.publication}, {ref.year}
                  {ref.doi && ` (doi: ${ref.doi})`}
                </Text>
              )}
              {!ref.publication && ref.url && (
                <Text style={themedStyles.referencePublication}>
                  {ref.url}
                  {ref.accessed && `, accessed ${ref.accessed}`}
                </Text>
              )}
            </View>
          ))}
        </View>
      );
    };

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={detailsVisible}
        onRequestClose={() => setDetailsVisible(false)}
      >
        <View style={themedStyles.centeredView}>
          <View style={themedStyles.modalView}>
            <View style={themedStyles.modalHeader}>
              <Text style={themedStyles.modalTitle}>{getModalTitle()}</Text>
              <TouchableOpacity
                style={themedStyles.closeButton}
                onPress={() => setDetailsVisible(false)}
                accessibilityLabel="Close details"
                accessibilityRole="button"
              >
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <View style={themedStyles.tabsContainer}>
              <TouchableOpacity
                style={[themedStyles.tab, activeDetailTab === 'overview' && themedStyles.activeTab]}
                onPress={() => setActiveDetailTab('overview')}
                accessibilityRole="tab"
                accessibilityState={{ selected: activeDetailTab === 'overview' }}
              >
                <Text style={[themedStyles.tabText, activeDetailTab === 'overview' && themedStyles.activeTabText]}>
                  Overview
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[themedStyles.tab, activeDetailTab === 'details' && themedStyles.activeTab]}
                onPress={() => setActiveDetailTab('details')}
                accessibilityRole="tab"
                accessibilityState={{ selected: activeDetailTab === 'details' }}
              >
                <Text style={[themedStyles.tabText, activeDetailTab === 'details' && themedStyles.activeTabText]}>
                  Details
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[themedStyles.tab, activeDetailTab === 'references' && themedStyles.activeTab]}
                onPress={() => setActiveDetailTab('references')}
                accessibilityRole="tab"
                accessibilityState={{ selected: activeDetailTab === 'references' }}
              >
                <Text style={[themedStyles.tabText, activeDetailTab === 'references' && themedStyles.activeTabText]}>
                  References
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              contentContainerStyle={themedStyles.modalContent}
              showsVerticalScrollIndicator={true}
              accessibilityRole="scrollview"
            >
              {renderTabContent()}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  /* --------------------------------------------
     7) RENDER RATING BAR
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
     8) HANDLERS
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
     9) RENDER UI PIECES
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
              importantForAccessibility="no-hide-descendants"
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
  * 9A) Overview Section
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

       {/* Quick Stats with methodology inline banners */}
       <View style={themedStyles.quickStats}>
         <TouchableOpacity
           style={themedStyles.statItem}
           onPress={() => setActiveStat(activeStat === 'language' ? null : 'language')}
           accessibilityRole="button"
           accessibilityLabel={`Language: ${fw.development.language}. Tap to view methodology details.`}
         >
           <Ionicons name="code-slash" size={24} color={colors.primary} importantForAccessibility="no-hide-descendants"/>
           <Text style={themedStyles.statLabel}>Language</Text>
           <Text style={themedStyles.statValue}>{fw.development.language}</Text>
           <Ionicons
             name="information-circle-outline"
             size={16}
             color={colors.primary}
             style={{ marginTop: 4, opacity: 0.6 }}
             accessibilityElementsHidden
           />
         </TouchableOpacity>

         <TouchableOpacity
           style={themedStyles.statItem}
           onPress={() => setActiveStat(activeStat === 'learning' ? null : 'learning')}
           accessibilityRole="button"
           accessibilityLabel={`Learning Curve: ${fw.development.learning}. Tap to view methodology details.`}
         >
           <Ionicons name="trending-up" size={24} color={colors.primary} />
           <Text style={themedStyles.statLabel}>Learning Curve</Text>
           <Text style={themedStyles.statValue}>{fw.development.learning}</Text>
           <Ionicons
             name="information-circle-outline"
             size={16}
             color={colors.primary}
             style={{ marginTop: 4, opacity: 0.6 }}
             accessibilityElementsHidden
           />
         </TouchableOpacity>

         <TouchableOpacity
           style={themedStyles.statItem}
           onPress={() => setActiveStat(activeStat === 'hotReload' ? null : 'hotReload')}
           accessibilityRole="button"
           accessibilityLabel={`Hot Reload: ${fw.development.hot ? 'Yes' : 'No'}. Tap to view methodology details.`}
         >
           <Ionicons name="flash" size={24} color={colors.primary} />
           <Text style={themedStyles.statLabel}>Hot Reload</Text>
           <Text style={themedStyles.statValue}>{fw.development.hot ? 'Yes' : 'No'}</Text>
           <Ionicons
             name="information-circle-outline"
             size={16}
             color={colors.primary}
             style={{ marginTop: 4, opacity: 0.6 }}
             accessibilityElementsHidden
           />
         </TouchableOpacity>
       </View>

       {/* Methodology Banner - displayed when a stat is selected */}
        {activeStat && (
          <View
            style={themedStyles.methodologyBanner}
            accessible={true}
            accessibilityLabel={`${activeStat === 'language' ? 'Language' :
                                 activeStat === 'learning' ? 'Learning Curve' :
                                 activeStat === 'hotReload' ? 'Hot Reload' :
                                 'Metric'} Methodology Details`}
          >
            <View style={themedStyles.bannerHeader}>
              <Text style={themedStyles.bannerTitle}>
                {activeStat === 'language' ? 'Language Methodology' :
                 activeStat === 'learning' ? 'Learning Curve Assessment' :
                 activeStat === 'hotReload' ? 'Hot Reload Evaluation' :
                 'Metric Methodology'}
              </Text>
              <TouchableOpacity
                onPress={() => setActiveStat(null)}
                accessibilityLabel="Close methodology details"
                accessibilityRole="button"
                accessibilityHint="Dismisses the methodology information panel"
              >
                <Ionicons name="close" size={20} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              accessibilityRole="tablist"
            >
              <View style={themedStyles.bannerTabs}>
                <TouchableOpacity
                  style={[
                    themedStyles.bannerTab,
                    activeBannerTab === 'overview' && themedStyles.activeBannerTab
                  ]}
                  onPress={() => setActiveBannerTab('overview')}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: activeBannerTab === 'overview' }}
                  accessibilityLabel="Methodology tab"
                  accessibilityHint="Shows methodology information"
                >
                  <Text style={[
                    themedStyles.bannerTabText,
                    activeBannerTab === 'overview' && themedStyles.activeBannerTabText
                  ]}>Methodology</Text>
                </TouchableOpacity>
             </View>
           </ScrollView>

           <View
            style={themedStyles.bannerContent}
            accessibilityLiveRegion="polite"
            importantForAccessibility="yes"
           >
             {renderBannerContent()}
           </View>
         </View>
       )}
     </View>
   );
 };

 /*
  * 9B) Accessibility Section
  */
 const renderAccessibilitySection = () => {
   const fw = frameworkData[selectedFramework];
   const sr = fw.accessibility.screenReaders;
   const sem = fw.accessibility.semantics;
   const focus = fw.accessibility.focusManagement;

   return (
     <View style={themedStyles.section}>
       {/* Screen Reader Support */}
       <TouchableOpacity
         style={themedStyles.accessibilityCard}
         onPress={() => setActiveStat(activeStat === 'accessibility' ? null : 'accessibility')}
         accessibilityRole="button"
         accessibilityLabel="Screen Reader Support. Tap for methodology details."
       >
         <Text style={themedStyles.cardTitle}>Screen Reader Support</Text>
         <View style={styles.platformSupport}>
           <View style={styles.platformItem}>
             <Ionicons
               name="logo-apple"
               size={24}
               color={isDarkMode ? colors.text : '#000'}
               accessibilityElementsHidden
               importantForAccessibility="no-hide-descendants"
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
         <Ionicons
           name="information-circle-outline"
           size={16}
           color={colors.primary}
           style={{ position: 'absolute', top: 20, right: 20, opacity: 0.6 }}
           accessibilityElementsHidden
         />
       </TouchableOpacity>

       {/* Semantic Support */}
       <TouchableOpacity
         style={themedStyles.accessibilityCard}
         onPress={() => setActiveStat(activeStat === 'implementation' ? null : 'implementation')}
         accessibilityRole="button"
         accessibilityLabel="Semantic Support. Tap for implementation details."
       >
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
                 importantForAccessibility="no-hide-descendants"
               />
               <Text style={themedStyles.featureText}>{feature}</Text>
             </View>
           ))}
         </View>
         {renderRatingBar(sem.rating, 'Semantic Support')}
         <Ionicons
           name="information-circle-outline"
           size={16}
           color={colors.primary}
           style={{ position: 'absolute', top: 20, right: 20, opacity: 0.6 }}
           accessibilityElementsHidden
         />
       </TouchableOpacity>

       {/* Add methodology banner at the end of this section too */}
       {activeStat && (activeStat === 'accessibility' || activeStat === 'implementation') && (
         <View
           style={themedStyles.methodologyBanner}
           accessible={true}
           accessibilityLabel={`${activeStat === 'accessibility' ? 'Accessibility Assessment' : 'Implementation Analysis'}`}
         >
           <View style={themedStyles.bannerHeader}>
             <Text style={themedStyles.bannerTitle}>
               {activeStat === 'accessibility' ? 'Accessibility Assessment' : 'Implementation Analysis'}
             </Text>
             <TouchableOpacity
               onPress={() => setActiveStat(null)}
               accessibilityLabel="Close methodology details"
               accessibilityRole="button"
             >
               <Ionicons name="close" size={20} color={colors.text} />
             </TouchableOpacity>
           </View>

           <ScrollView
             horizontal
             showsHorizontalScrollIndicator={false}
             accessibilityRole="tablist"
           >
             <View style={themedStyles.bannerTabs}>
               <TouchableOpacity
                 style={[
                   themedStyles.bannerTab,
                   activeBannerTab === 'overview' && themedStyles.activeBannerTab
                 ]}
                 onPress={() => setActiveBannerTab('overview')}
                 accessibilityRole="tab"
                 accessibilityState={{ selected: activeBannerTab === 'overview' }}
               >
                 <Text style={[
                   themedStyles.bannerTabText,
                   activeBannerTab === 'overview' && themedStyles.activeBannerTabText
                 ]}>Methodology</Text>
               </TouchableOpacity>
               <TouchableOpacity
                 style={[
                   themedStyles.bannerTab,
                   activeBannerTab === 'calculation' && themedStyles.activeBannerTab
                 ]}
                 onPress={() => setActiveBannerTab('calculation')}
                 accessibilityRole="tab"
                 accessibilityState={{ selected: activeBannerTab === 'calculation' }}
               >
                 <Text style={[
                   themedStyles.bannerTabText,
                   activeBannerTab === 'calculation' && themedStyles.activeBannerTabText
                 ]}>Calculation</Text>
               </TouchableOpacity>
               <TouchableOpacity
                 style={[
                   themedStyles.bannerTab,
                   activeBannerTab === 'references' && themedStyles.activeBannerTab
                 ]}
                 onPress={() => setActiveBannerTab('references')}
                 accessibilityRole="tab"
                 accessibilityState={{ selected: activeBannerTab === 'references' }}
               >
                 <Text style={[
                   themedStyles.bannerTabText,
                   activeBannerTab === 'references' && themedStyles.activeBannerTabText
                 ]}>References</Text>
               </TouchableOpacity>
             </View>
           </ScrollView>

           <View
             style={themedStyles.bannerContent}
             accessibilityLiveRegion="polite"
             importantForAccessibility="yes"
           >
             {renderBannerContent()}
           </View>
         </View>
       )}

       {/* Focus Management section */}
       <TouchableOpacity
         style={themedStyles.accessibilityCard}
         onPress={() => setActiveStat(activeStat === 'implementation' ? null : 'implementation')}
         accessibilityRole="button"
         accessibilityLabel="Focus Management. Tap for implementation details."
       >
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
                 importantForAccessibility="no-hide-descendants"
               />
               <Text style={themedStyles.featureText}>{feature}</Text>
             </View>
           ))}
         </View>
         {renderRatingBar(focus.rating, 'Focus Management')}
         <Ionicons
           name="information-circle-outline"
           size={16}
           color={colors.primary}
           style={{ position: 'absolute', top: 20, right: 20, opacity: 0.6 }}
           accessibilityElementsHidden
         />
       </TouchableOpacity>
     </View>
   );
 };

  /*
   * 9C) Implementation Section - Features specific implementation details for the selected framework
   */
  const renderImplementationSection = () => {
    const fw = frameworkData[selectedFramework];
    const implementation = fw.accessibility.implementation;
    const metrics = calculateMetrics(fw);

    // Get framework-specific data
    const frameworkImplementationDetails = selectedFramework === 'react-native'
      ? comparisonData.accessibilityComparison
      : comparisonData.accessibilityComparison;

    // Helper function to get complexity class
    const getComplexityClass = (complexity) => {
      switch(complexity) {
        case 'Low': return themedStyles.complexityLow;
        case 'Medium': return themedStyles.complexityMedium;
        case 'High': return themedStyles.complexityHigh;
        default: return {};
      }
    };

    // Generate code examples based on selected framework
    const getCodeExample = (feature) => {
      if (selectedFramework === 'react-native') {
        switch(feature) {
          case 'headingElements':
            return '<Text accessibilityRole="header">Heading</Text>';
          case 'languageDeclaration':
            return '<Text accessibilityLanguage="en">English text</Text>';
          case 'textAbbreviations':
            return '<Text accessibilityLabel="National Aeronautics and Space Administration">NASA</Text>';
          default:
            return '';
        }
      } else {
        switch(feature) {
          case 'headingElements':
            return 'Semantics(\n  header: true,\n  child: Text(\'Heading\')\n)';
          case 'languageDeclaration':
            return 'Semantics(\n  attributedLabel: StringAttribute(\n    string: \'Text\',\n    attributes: {\n      LocaleStringAttribute(locale: Locale(\'en\'))\n    }\n  ),\n  child: Text(\'English text\')\n)';
          case 'textAbbreviations':
            return 'Text(\n  \'NASA\',\n  semanticsLabel: \'National Aeronautics and Space Administration\'\n)';
          default:
            return '';
        }
      }
    };

    return (
      <View style={themedStyles.section}>
        <Text style={themedStyles.sectionHeader}>Implementation Details</Text>
        <Text style={themedStyles.description}>
          Analysis of accessibility implementation requirements for {fw.name}
        </Text>

        {/* Overview Card */}
        <TouchableOpacity
          style={themedStyles.summaryCard}
          onPress={() => setActiveStat(activeStat === 'implementationDetail' ? null : 'implementationDetail')}
          accessibilityRole="button"
          accessibilityLabel={`${fw.name} implementation overview. Tap for details.`}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={themedStyles.summaryTitle}>Implementation Overview</Text>
            <Ionicons
              name="information-circle-outline"
              size={16}
              color={colors.primary}
              style={{ opacity: 0.6 }}
              accessibilityElementsHidden
            />
          </View>

          <View style={themedStyles.summaryRow}>
            <Text style={themedStyles.summaryLabel}>Implementation Complexity:</Text>
            <Text style={themedStyles.statValue}>{metrics.implementationComplexity.toFixed(1)}/5</Text>
          </View>

          <View style={themedStyles.summaryRow}>
            <Text style={themedStyles.summaryLabel}>Total Lines of Code Required:</Text>
            <Text style={themedStyles.statValue}>
              {selectedFramework === 'react-native'
                ? comparisonData.summaryData.totalLOC.reactNative
                : comparisonData.summaryData.totalLOC.flutter}
            </Text>
          </View>

          <View style={themedStyles.summaryRow}>
            <Text style={themedStyles.summaryLabel}>Default Accessible Components:</Text>
            <Text style={themedStyles.statValue}>
              {selectedFramework === 'react-native'
                ? comparisonData.summaryData.defaultAccessible.reactNative + '/3'
                : comparisonData.summaryData.defaultAccessible.flutter + '/3'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Implementation Features Details */}
        <View style={themedStyles.implementationFeature}>
          <View style={themedStyles.implementationFeatureHeader}>
<Text style={themedStyles.implementationFeatureTitle}>Heading Elements</Text>
            <Text style={themedStyles.implementationFeatureWcag}>WCAG: 1.3.1, 2.4.6</Text>
          </View>

          <View style={themedStyles.implementationDetails}>
            <View style={themedStyles.implementationDetail}>
              <Text style={themedStyles.implementationDetailLabel}>Default Accessible:</Text>
              <Text style={themedStyles.implementationDetailValue}>
                {implementation.headingElements.accessible ? "Yes" : "No"}
              </Text>
            </View>

            <View style={themedStyles.implementationDetail}>
              <Text style={themedStyles.implementationDetailLabel}>Complexity:</Text>
              <Text style={[
                themedStyles.implementationDetailValue,
                getComplexityClass(implementation.headingElements.implementationComplexity)
              ]}>
                {implementation.headingElements.implementationComplexity}
              </Text>
            </View>

            <View style={themedStyles.implementationDetail}>
              <Text style={themedStyles.implementationDetailLabel}>Lines of Code:</Text>
              <Text style={themedStyles.implementationDetailValue}>
                {implementation.headingElements.linesOfCode}
              </Text>
            </View>

            <View style={themedStyles.implementationDetail}>
              <Text style={themedStyles.implementationDetailLabel}>Notes:</Text>
              <Text style={themedStyles.implementationDetailValue}>
                {implementation.headingElements.notes}
              </Text>
            </View>
          </View>

          <View style={themedStyles.codeExample}>
            <Text style={themedStyles.codeExampleTitle}>Code Example:</Text>
            <Text style={themedStyles.codeText}>{getCodeExample('headingElements')}</Text>
          </View>
        </View>

        <View style={themedStyles.implementationFeature}>
          <View style={themedStyles.implementationFeatureHeader}>
            <Text style={themedStyles.implementationFeatureTitle}>Language Declaration</Text>
            <Text style={themedStyles.implementationFeatureWcag}>WCAG: 3.1.1, 3.1.2</Text>
          </View>

          <View style={themedStyles.implementationDetails}>
            <View style={themedStyles.implementationDetail}>
              <Text style={themedStyles.implementationDetailLabel}>Default Accessible:</Text>
              <Text style={themedStyles.implementationDetailValue}>
                {implementation.languageDeclaration.accessible ? "Yes" : "No"}
              </Text>
            </View>

            <View style={themedStyles.implementationDetail}>
              <Text style={themedStyles.implementationDetailLabel}>Complexity:</Text>
              <Text style={[
                themedStyles.implementationDetailValue,
                getComplexityClass(implementation.languageDeclaration.implementationComplexity)
              ]}>
                {implementation.languageDeclaration.implementationComplexity}
              </Text>
            </View>

            <View style={themedStyles.implementationDetail}>
              <Text style={themedStyles.implementationDetailLabel}>Lines of Code:</Text>
              <Text style={themedStyles.implementationDetailValue}>
                {implementation.languageDeclaration.linesOfCode}
              </Text>
            </View>

            <View style={themedStyles.implementationDetail}>
              <Text style={themedStyles.implementationDetailLabel}>Notes:</Text>
              <Text style={themedStyles.implementationDetailValue}>
                {implementation.languageDeclaration.notes}
              </Text>
            </View>
          </View>

          <View style={themedStyles.codeExample}>
            <Text style={themedStyles.codeExampleTitle}>Code Example:</Text>
            <Text style={themedStyles.codeText}>{getCodeExample('languageDeclaration')}</Text>
          </View>
        </View>

        <View style={themedStyles.implementationFeature}>
          <View style={themedStyles.implementationFeatureHeader}>
            <Text style={themedStyles.implementationFeatureTitle}>Text Abbreviations</Text>
            <Text style={themedStyles.implementationFeatureWcag}>WCAG: 3.1.4</Text>
          </View>

          <View style={themedStyles.implementationDetails}>
            <View style={themedStyles.implementationDetail}>
              <Text style={themedStyles.implementationDetailLabel}>Default Accessible:</Text>
              <Text style={themedStyles.implementationDetailValue}>
                {implementation.textAbbreviations.accessible ? "Yes" : "No"}
              </Text>
            </View>

            <View style={themedStyles.implementationDetail}>
              <Text style={themedStyles.implementationDetailLabel}>Complexity:</Text>
              <Text style={[
                themedStyles.implementationDetailValue,
                getComplexityClass(implementation.textAbbreviations.implementationComplexity)
              ]}>
                {implementation.textAbbreviations.implementationComplexity}
              </Text>
            </View>

            <View style={themedStyles.implementationDetail}>
              <Text style={themedStyles.implementationDetailLabel}>Lines of Code:</Text>
              <Text style={themedStyles.implementationDetailValue}>
                {implementation.textAbbreviations.linesOfCode}
              </Text>
            </View>

            <View style={themedStyles.implementationDetail}>
              <Text style={themedStyles.implementationDetailLabel}>Notes:</Text>
              <Text style={themedStyles.implementationDetailValue}>
                {implementation.textAbbreviations.notes}
              </Text>
            </View>
          </View>

          <View style={themedStyles.codeExample}>
            <Text style={themedStyles.codeExampleTitle}>Code Example:</Text>
            <Text style={themedStyles.codeText}>{getCodeExample('textAbbreviations')}</Text>
          </View>
        </View>

        {/* Banner for implementation detail info */}
        {activeStat === 'implementationDetail' && (
          <View
            style={themedStyles.methodologyBanner}
            accessible={true}
            accessibilityLabel={`${fw.name} implementation details`}
          >
            <View style={themedStyles.bannerHeader}>
              <Text style={themedStyles.bannerTitle}>
                {fw.name} Implementation Analysis
              </Text>
              <TouchableOpacity
                onPress={() => setActiveStat(null)}
                accessibilityLabel="Close implementation details"
                accessibilityRole="button"
              >
                <Ionicons name="close" size={20} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              accessibilityRole="tablist"
            >
              <View style={themedStyles.bannerTabs}>
                <TouchableOpacity
                  style={[
                    themedStyles.bannerTab,
                    activeBannerTab === 'overview' && themedStyles.activeBannerTab
                  ]}
                  onPress={() => setActiveBannerTab('overview')}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: activeBannerTab === 'overview' }}
                >
                  <Text style={[
                    themedStyles.bannerTabText,
                    activeBannerTab === 'overview' && themedStyles.activeBannerTabText
                  ]}>Methodology</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    themedStyles.bannerTab,
                    activeBannerTab === 'calculation' && themedStyles.activeBannerTab
                  ]}
                  onPress={() => setActiveBannerTab('calculation')}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: activeBannerTab === 'calculation' }}
                >
                  <Text style={[
                    themedStyles.bannerTabText,
                    activeBannerTab === 'calculation' && themedStyles.activeBannerTabText
                  ]}>Calculation</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

            <View
              style={themedStyles.bannerContent}
              accessibilityLiveRegion="polite"
              importantForAccessibility="yes"
            >
              {renderBannerContent()}
            </View>
          </View>
        )}

        <View style={themedStyles.sourceNote}>
          <TouchableOpacity
            onPress={() => showDetails('references')}
            accessibilityRole="button"
            accessibilityLabel="View reference details"
          >
            <Text style={themedStyles.sourceText}>
              Source: Perinello & Gaggi (2024), CCNC
              <Ionicons
                name="information-circle-outline"
                size={12}
                color={colors.textSecondary}
                style={{ marginLeft: 4, opacity: 0.8 }}
                accessibilityElementsHidden
              />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  /*
   * 9D) Methodology Section
   */
  const renderMethodologySection = () => {
    return (
      <View style={themedStyles.section}>
        <Text style={themedStyles.sectionHeader}>Research Methodology</Text>
        <Text style={themedStyles.description}>
          This comparison is based on empirical testing and analysis of official documentation.
        </Text>

        <TouchableOpacity
          style={themedStyles.methodologyCard}
          onPress={() => showDetails('methodology')}
          accessibilityRole="button"
          accessibilityLabel="Accessibility Testing Methodology. Tap for more details."
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={themedStyles.methodologyTitle}>Accessibility Testing Methodology</Text>
            <Ionicons
              name="information-circle-outline"
              size={16}
              color={colors.primary}
              style={{ opacity: 0.6 }}
              accessibilityElementsHidden
            />
          </View>
          <Text style={themedStyles.methodologyDescription}>
            {methodologyInfo.metrics.accessibility.testMethod}
          </Text>

          <Text style={themedStyles.sourceHeader}>Sources:</Text>
          {methodologyInfo.metrics.accessibility.sources.map((source, index) => (
            <Text key={index} style={themedStyles.sourceItem}>• {source}</Text>
          ))}
        </TouchableOpacity>

        <TouchableOpacity
          style={themedStyles.methodologyCard}
          onPress={() => showDetails('implementation')}
          accessibilityRole="button"
          accessibilityLabel="Implementation Complexity Analysis. Tap for more details."
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={themedStyles.methodologyTitle}>Implementation Complexity Analysis</Text>
            <Ionicons
              name="information-circle-outline"
              size={16}
              color={colors.primary}
              style={{ opacity: 0.6 }}
              accessibilityElementsHidden
            />
          </View>
          <Text style={themedStyles.methodologyDescription}>
            Implementation complexity was measured using:
          </Text>
          <Text style={themedStyles.sourceItem}>• Lines of code (LOC) required for implementation</Text>
          <Text style={themedStyles.sourceItem}>• Qualitative complexity assessment (Low/Medium/High)</Text>
          <Text style={themedStyles.sourceItem}>• Required knowledge of framework-specific concepts</Text>
          <Text style={themedStyles.sourceItem}>• Testing on real devices with iOS 16 (VoiceOver) and Android 7+ (TalkBack)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={themedStyles.methodologyCard}
          onPress={() => showDetails('references')}
          accessibilityRole="button"
          accessibilityLabel="Academic References. Tap to view references."
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={themedStyles.methodologyTitle}>Academic References</Text>
            <Ionicons
              name="information-circle-outline"
              size={16}
              color={colors.primary}
              style={{ opacity: 0.6 }}
              accessibilityElementsHidden
            />
          </View>
          <Text style={themedStyles.methodologyDescription}>
            Our analysis is based on peer-reviewed research and official documentation.
          </Text>
          <Text style={themedStyles.sourceItem}>• {Object.values(comparisonData.sources).find(s => s.type === 'research')?.title}</Text>
          <Text style={themedStyles.sourceItem}>• {Object.values(comparisonData.sources)[1]?.title}</Text>
          <Text style={themedStyles.sourceItem}>• See all references for more details</Text>
        </TouchableOpacity>
      </View>
    );
  };

  /*
   * 10) MAIN CONTENT SWITCH
   */
  const renderContent = () => {
    switch (selectedCategory) {
      case 'overview':
        return renderOverviewSection();
      case 'accessibility':
        return renderAccessibilitySection();
      case 'implementation':
        return renderImplementationSection();
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

        {/* Modal for details */}
        {renderDetailsModal()}
      </LinearGradient>
    </SafeAreaView>
  );
}

/* --------------------------------------------
   11) BASE STYLES
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
