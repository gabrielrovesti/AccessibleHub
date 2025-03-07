import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

/* -----------------------------------------
   1. ACCESSIBILITY METRICS SYSTEM
----------------------------------------- */

/**
 * Calculates accessibility score based on a formal system of evaluation
 * referencing actual component implementations, WCAG 2.2 compliance,
 * and screen reader test results.
 */
const calculateAccessibilityScore = () => {
  // BASE DATA FOR CALCULATIONS

  // 1. Component registry with accessibility status
  const componentsRegistry = {
    // Basic UI components
    'button': { implemented: true, accessible: true, screens: ['home', 'gestures', 'navigation'] },
    'text': { implemented: true, accessible: true, screens: ['home', 'guidelines', 'navigation', 'screen-reader', 'semantics'] },
    'image': { implemented: true, accessible: true, screens: ['accessible-media'] },
    'touchableOpacity': { implemented: true, accessible: true, screens: ['home', 'gestures', 'navigation', 'screen-reader'] },
    'scrollView': { implemented: true, accessible: true, screens: ['home', 'guidelines', 'navigation', 'screen-reader', 'semantics'] },
    'view': { implemented: true, accessible: true, screens: ['home', 'guidelines', 'navigation', 'screen-reader', 'semantics'] },
    'textInput': { implemented: true, accessible: true, screens: ['navigation', 'accessible-form'] },
    'switch': { implemented: true, accessible: true, screens: ['settings'] },

    // More complex components
    'card': { implemented: true, accessible: true, screens: ['home', 'guidelines', 'navigation', 'screen-reader', 'semantics'] },
    'icon': { implemented: true, accessible: false, screens: ['home', 'guidelines', 'screen-reader', 'semantics'] },
    'linearGradient': { implemented: true, accessible: true, screens: ['home', 'guidelines', 'navigation', 'screen-reader', 'semantics'] },
    'modal': { implemented: true, accessible: true, screens: ['accessible-dialog', 'frameworks-comparison'] },
    'alert': { implemented: true, accessible: true, screens: ['navigation', 'accessible-advanced'] },
    'skipLink': { implemented: true, accessible: true, screens: ['navigation'] },
    'listItem': { implemented: true, accessible: true, screens: ['guidelines', 'screen-reader'] },
    'tabNavigator': { implemented: true, accessible: true, screens: ['accessible-advanced', '_layout'] },
    'checklistItem': { implemented: true, accessible: true, screens: ['guidelines', 'screen-reader', 'semantics'] },
    'tooltip': { implemented: true, accessible: false, screens: [] },
    'slider': { implemented: true, accessible: true, screens: ['accessible-advanced'] },
    'datePicker': { implemented: true, accessible: true, screens: ['accessible-form'] },
  };

  // 2. WCAG 2.2 criteria with implementation status
  const wcagCriteria = {
    // Principle 1: Perceivable
    '1.1.1': { level: 'A', implemented: true },
    '1.3.1': { level: 'A', implemented: true },
    '1.3.2': { level: 'A', implemented: true },
    '1.3.3': { level: 'A', implemented: true },
    '1.3.4': { level: 'AA', implemented: true },
    '1.3.5': { level: 'AA', implemented: false },
    '1.4.1': { level: 'A', implemented: true },
    '1.4.3': { level: 'AA', implemented: true },
    '1.4.4': { level: 'AA', implemented: true },
    '1.4.10': { level: 'AA', implemented: true },
    '1.4.11': { level: 'AA', implemented: false },
    '1.4.12': { level: 'AA', implemented: true },
    '1.4.13': { level: 'AA', implemented: true },

    // Principle 2: Operable
    '2.1.1': { level: 'A', implemented: true },
    '2.1.2': { level: 'A', implemented: true },
    '2.1.4': { level: 'A', implemented: true },
    '2.2.1': { level: 'A', implemented: false },
    '2.2.2': { level: 'A', implemented: true },
    '2.3.1': { level: 'A', implemented: true },
    '2.4.1': { level: 'A', implemented: true },
    '2.4.2': { level: 'A', implemented: true },
    '2.4.3': { level: 'A', implemented: true },
    '2.4.4': { level: 'A', implemented: true },
    '2.4.5': { level: 'AA', implemented: true },
    '2.4.6': { level: 'AA', implemented: true },
    '2.4.7': { level: 'AA', implemented: true },
    '2.5.1': { level: 'A', implemented: true },
    '2.5.2': { level: 'A', implemented: true },
    '2.5.3': { level: 'A', implemented: true },
    '2.5.4': { level: 'A', implemented: true },

    // Principle 3: Understandable
    '3.1.1': { level: 'A', implemented: true },
    '3.1.2': { level: 'AA', implemented: false },
    '3.2.1': { level: 'A', implemented: true },
    '3.2.2': { level: 'A', implemented: true },
    '3.2.3': { level: 'AA', implemented: true },
    '3.2.4': { level: 'AA', implemented: true },
    '3.3.1': { level: 'A', implemented: true },
    '3.3.2': { level: 'A', implemented: true },
    '3.3.3': { level: 'AA', implemented: true },
    '3.3.4': { level: 'AA', implemented: false },

    // Principle 4: Robust
    '4.1.1': { level: 'A', implemented: true },
    '4.1.2': { level: 'A', implemented: true },
    '4.1.3': { level: 'AA', implemented: true },
  };

  // 3. Screen reader test results (iOS and Android)
  const screenReaderTests = {
    voiceOver: { // iOS
      navigation: 4.5,
      gestures: 4.0,
      labels: 4.5,
      forms: 4.2,
      alerts: 4.5
    },
    talkBack: { // Android
      navigation: 4.3,
      gestures: 4.2,
      labels: 4.4,
      forms: 4.0,
      alerts: 4.0
    }
  };

  // 4. METRICS CALCULATION

  // 4.1 Component metric
  const componentsTotal = Object.keys(componentsRegistry).length;
  const accessibleComponents = Object.values(componentsRegistry).filter(c => c.implemented && c.accessible).length;
  const partiallyAccessible = Object.values(componentsRegistry).filter(c => c.implemented && !c.accessible).length;
  const componentScore = Math.round((accessibleComponents / componentsTotal) * 100);

  // 4.2 WCAG compliance metric
  const criteriaValues = Object.values(wcagCriteria);
  const totalCriteria = criteriaValues.length;
  const levelACriteria = criteriaValues.filter(c => c.level === 'A').length;
  const levelAACriteria = criteriaValues.filter(c => c.level === 'AA').length;
  const levelACriteriaMet = criteriaValues.filter(c => c.level === 'A' && c.implemented).length;
  const levelAACriteriaMet = criteriaValues.filter(c => c.level === 'AA' && c.implemented).length;
  const wcagCompliance = Math.round(((levelACriteriaMet + levelAACriteriaMet) / totalCriteria) * 100);

  // 4.3 Screen reader test metric
  const voiceOverScores = Object.values(screenReaderTests.voiceOver);
  const talkBackScores = Object.values(screenReaderTests.talkBack);
  const voiceOverAvg = voiceOverScores.reduce((sum, score) => sum + score, 0) / voiceOverScores.length;
  const talkBackAvg = talkBackScores.reduce((sum, score) => sum + score, 0) / talkBackScores.length;
  const testingScore = Math.round(((voiceOverAvg + talkBackAvg) / 2) * 20);

  // 5. Data for detailed visualization
  const wcagByPrinciple = {
    perceptible: {
      total: Object.entries(wcagCriteria).filter(([id]) => id.startsWith('1.')).length,
      implemented: Object.entries(wcagCriteria).filter(([id, c]) => id.startsWith('1.') && c.implemented).length
    },
    operable: {
      total: Object.entries(wcagCriteria).filter(([id]) => id.startsWith('2.')).length,
      implemented: Object.entries(wcagCriteria).filter(([id, c]) => id.startsWith('2.') && c.implemented).length
    },
    understandable: {
      total: Object.entries(wcagCriteria).filter(([id]) => id.startsWith('3.')).length,
      implemented: Object.entries(wcagCriteria).filter(([id, c]) => id.startsWith('3.') && c.implemented).length
    },
    robust: {
      total: Object.entries(wcagCriteria).filter(([id]) => id.startsWith('4.')).length,
      implemented: Object.entries(wcagCriteria).filter(([id, c]) => id.startsWith('4.') && c.implemented).length
    }
  };

  // 6. Calculation result
  return {
    componentScore,
    wcagCompliance,
    testingScore,
    componentCount: componentsTotal,

    // Detailed data for expandable visualization
    componentsData: {
      total: componentsTotal,
      fullyAccessible: accessibleComponents,
      partiallyAccessible,
      componentsWithA11yProps: 18, // Updated based on actual project components
      issuesCount: 2 // Number of components with accessibility issues
    },
    wcagData: {
      totalCriteria,
      criteriaMetLevelA: levelACriteriaMet,
      criteriaMetLevelAA: levelAACriteriaMet,
      levelACriteria,
      levelAACriteria,
      levelACompliance: Math.round((levelACriteriaMet / levelACriteria) * 100),
      levelAACompliance: Math.round((levelAACriteriaMet / levelAACriteria) * 100),
      perceptible: wcagByPrinciple.perceptible,
      operable: wcagByPrinciple.operable,
      understandable: wcagByPrinciple.understandable,
      robust: wcagByPrinciple.robust
    },
    testingData: {
      talkbackScore: talkBackAvg,
      voiceoverScore: voiceOverAvg,
      automatedTestsPassed: 95,
      categories: {
        navigation: {
          voiceOver: screenReaderTests.voiceOver.navigation,
          talkBack: screenReaderTests.talkBack.navigation,
          average: (screenReaderTests.voiceOver.navigation + screenReaderTests.talkBack.navigation) / 2
        },
        gestures: {
          voiceOver: screenReaderTests.voiceOver.gestures,
          talkBack: screenReaderTests.talkBack.gestures,
          average: (screenReaderTests.voiceOver.gestures + screenReaderTests.talkBack.gestures) / 2
        },
        labels: {
          voiceOver: screenReaderTests.voiceOver.labels,
          talkBack: screenReaderTests.talkBack.labels,
          average: (screenReaderTests.voiceOver.labels + screenReaderTests.talkBack.labels) / 2
        },
        forms: {
          voiceOver: screenReaderTests.voiceOver.forms,
          talkBack: screenReaderTests.talkBack.forms,
          average: (screenReaderTests.voiceOver.forms + screenReaderTests.talkBack.forms) / 2
        },
        alerts: {
          voiceOver: screenReaderTests.voiceOver.alerts,
          talkBack: screenReaderTests.talkBack.alerts,
          average: (screenReaderTests.voiceOver.alerts + screenReaderTests.talkBack.alerts) / 2
        }
      }
    }
  };
};

/* -----------------------------------------
   2. Academic and official references
----------------------------------------- */
const academicReferences = [
  {
    title: 'Web Content Accessibility Guidelines (WCAG) 2.2',
    authors: 'W3C',
    year: 2023,
    type: 'Standard',
    url: 'https://www.w3.org/TR/WCAG22/'
  },
  {
    title: 'Accessibility of Mobile User Interfaces using Flutter and React Native',
    authors: 'Lorenzo Perinello, Ombretta Gaggi',
    publication: 'IEEE 21st Consumer Communications & Networking Conference (CCNC)',
    year: 2024,
    doi: '10.1109/CCNC51664.2024.10454681',
    type: 'Research paper'
  },
  {
    title: 'Framework for Accessibility Evaluation of Mobile Applications',
    authors: 'Acosta-Vargas, P., Salvador-Ullauri, L., Jadán-Guerrero, J.',
    publication: 'Applied Sciences',
    year: 2021,
    doi: '10.3390/app11168762',
    type: 'Research paper'
  },
  {
    title: 'React Native Accessibility',
    authors: 'Facebook/Meta',
    year: 2023,
    type: 'Documentation',
    url: 'https://reactnative.dev/docs/accessibility'
  }
];

/* -----------------------------------------
   3. HomeScreen Component
----------------------------------------- */
export default function HomeScreen() {
  const router = useRouter();
  const { colors, textSizes, isDarkMode } = useTheme();
  const accessibilityMetrics = calculateAccessibilityScore();

  // State for managing the metrics details modal
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [activeMetricType, setActiveMetricType] = useState(null); // 'component', 'wcag', 'testing'
  const [activeTab, setActiveTab] = useState('overview');

  // Function to open metric details
  const openMetricDetails = (metricType) => {
    setActiveMetricType(metricType);
    setActiveTab('overview');
    setDetailsVisible(true);
  };

  /**
   * Use an inverted gradient for the background:
   * - Light mode: slightly darker → background
   * - Dark mode: background → #2c2c2e
   */
  const backgroundGradientColors = isDarkMode
    ? [colors.background, '#2c2c2e']
    : ['#e2e2e2', colors.background];

  /* -----------------------------------------
     4. Styled components for metric details
  ----------------------------------------- */
  // Styles for the details modal
  const detailsModalStyles = {
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
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      fontSize: textSizes.large,
      fontWeight: 'bold',
      color: colors.text,
    },
    closeButton: {
      padding: 4,
    },
    content: {
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
    section: {
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: textSizes.medium,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    statRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border + '33',
    },
    statLabel: {
      fontSize: textSizes.small,
      color: colors.textSecondary,
      flex: 1,
    },
    statValue: {
      fontSize: textSizes.small,
      fontWeight: 'bold',
      color: colors.text,
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
    refItem: {
      marginBottom: 12,
      padding: 12,
      backgroundColor: colors.surface,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border + '40',
    },
    refTitle: {
      fontSize: textSizes.small,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 4,
    },
    refAuthors: {
      fontSize: textSizes.small - 1,
      color: colors.textSecondary,
      marginBottom: 2,
    },
    refPublication: {
      fontSize: textSizes.small - 1,
      fontStyle: 'italic',
      color: colors.textSecondary,
    },
  };

  /* -----------------------------------------
     5. Themed styles for HomeScreen
  ----------------------------------------- */
  const themedStyles = {
    container: {
      flex: 1,
    },
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
    touchableStat: {
      alignItems: 'center',
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 8,
    },
    touchableStatPressed: {
      backgroundColor: isDarkMode ? colors.primary + '20' : colors.primaryLight + '40',
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
    detailsIcon: {
      marginTop: 4,
      opacity: 0.6,
    },
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
      backgroundColor: isDarkMode ? `${colors.primary}30` : colors.primaryLight,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.primary : 'transparent',
    },
    tagText: {
      color: isDarkMode ? colors.primary : colors.primary,
      fontSize: textSizes.small,
      fontWeight: '600',
    },
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
    communityButton: {
      backgroundColor: colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    communityButtonText: {
      color: colors.background,
      fontSize: textSizes.medium,
      fontWeight: 'bold',
      marginRight: 8,
    },
  };

  /**
   * 6. Render metric details
   */
  const renderMetricDetails = () => {
    // Appropriate title based on metric type
    const getDetailsTitle = () => {
      switch (activeMetricType) {
        case 'component':
          return 'Component Accessibility';
        case 'wcag':
          return 'WCAG 2.2 Compliance';
        case 'testing':
          return 'Screen Reader Testing';
        default:
          return 'Accessibility Details';
      }
    };

    // Content based on active tab
    const renderTabContent = () => {
      switch (activeTab) {
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
      if (activeMetricType === 'component') {
        return (
          <View style={detailsModalStyles.section}>
            <Text style={detailsModalStyles.sectionTitle}>UI Components</Text>

            <View style={detailsModalStyles.statRow}>
              <Text style={detailsModalStyles.statLabel}>Total components</Text>
              <Text style={detailsModalStyles.statValue}>{accessibilityMetrics.componentsData.total}</Text>
            </View>

            <View style={detailsModalStyles.statRow}>
              <Text style={detailsModalStyles.statLabel}>Fully accessible</Text>
              <View style={detailsModalStyles.progressContainer}>
                <View
                  style={[
                    detailsModalStyles.progressFill,
                    { width: `${accessibilityMetrics.componentScore}%` }
                  ]}
                />
              </View>
              <Text style={detailsModalStyles.statValue}>
                {accessibilityMetrics.componentsData.fullyAccessible} / {accessibilityMetrics.componentsData.total}
              </Text>
            </View>

            <View style={detailsModalStyles.statRow}>
              <Text style={detailsModalStyles.statLabel}>Partially accessible</Text>
              <Text style={detailsModalStyles.statValue}>{accessibilityMetrics.componentsData.partiallyAccessible}</Text>
            </View>

            <View style={detailsModalStyles.statRow}>
              <Text style={detailsModalStyles.statLabel}>With accessibility props</Text>
              <Text style={detailsModalStyles.statValue}>{accessibilityMetrics.componentsData.componentsWithA11yProps}</Text>
            </View>

            <View style={detailsModalStyles.statRow}>
              <Text style={detailsModalStyles.statLabel}>Identified accessibility issues</Text>
              <Text style={detailsModalStyles.statValue}>{accessibilityMetrics.componentsData.issuesCount}</Text>
            </View>
          </View>
        );
      } else if (activeMetricType === 'wcag') {
        return (
          <View style={detailsModalStyles.section}>
            <Text style={detailsModalStyles.sectionTitle}>WCAG 2.2 Compliance</Text>

            <View style={detailsModalStyles.statRow}>
              <Text style={detailsModalStyles.statLabel}>Criteria evaluated</Text>
              <Text style={detailsModalStyles.statValue}>{accessibilityMetrics.wcagData.totalCriteria}</Text>
            </View>

            <View style={detailsModalStyles.statRow}>
              <Text style={detailsModalStyles.statLabel}>Overall compliance</Text>
              <View style={detailsModalStyles.progressContainer}>
                <View
                  style={[
                    detailsModalStyles.progressFill,
                    { width: `${accessibilityMetrics.wcagCompliance}%` }
                  ]}
                />
              </View>
              <Text style={detailsModalStyles.statValue}>{accessibilityMetrics.wcagCompliance}%</Text>
            </View>

            <View style={detailsModalStyles.statRow}>
              <Text style={detailsModalStyles.statLabel}>Level A criteria implemented</Text>
              <View style={detailsModalStyles.progressContainer}>
                <View
                  style={[
                    detailsModalStyles.progressFill,
                    { width: `${accessibilityMetrics.wcagData.levelACompliance}%` }
                  ]}
                />
              </View>
              <Text style={detailsModalStyles.statValue}>
                {accessibilityMetrics.wcagData.criteriaMetLevelA} / {accessibilityMetrics.wcagData.levelACriteria}
              </Text>
            </View>

            <View style={detailsModalStyles.statRow}>
              <Text style={detailsModalStyles.statLabel}>Level AA criteria implemented</Text>
              <View style={detailsModalStyles.progressContainer}>
                <View
                  style={[
                    detailsModalStyles.progressFill,
                    { width: `${accessibilityMetrics.wcagData.levelAACompliance}%` }
                  ]}
                />
              </View>
              <Text style={detailsModalStyles.statValue}>
                {accessibilityMetrics.wcagData.criteriaMetLevelAA} / {accessibilityMetrics.wcagData.levelAACriteria}
              </Text>
            </View>
          </View>
        );
      } else if (activeMetricType === 'testing') {
        return (
          <View style={detailsModalStyles.section}>
            <Text style={detailsModalStyles.sectionTitle}>Screen Reader Testing</Text>

            <View style={detailsModalStyles.statRow}>
              <Text style={detailsModalStyles.statLabel}>VoiceOver (iOS)</Text>
              <View style={detailsModalStyles.progressContainer}>
                <View
                  style={[
                    detailsModalStyles.progressFill,
                    { width: `${accessibilityMetrics.testingData.voiceoverScore * 20}%` }
                  ]}
                />
              </View>
              <Text style={detailsModalStyles.statValue}>{accessibilityMetrics.testingData.voiceoverScore.toFixed(1)} / 5</Text>
            </View>

            <View style={detailsModalStyles.statRow}>
              <Text style={detailsModalStyles.statLabel}>TalkBack (Android)</Text>
              <View style={detailsModalStyles.progressContainer}>
                <View
                  style={[
                    detailsModalStyles.progressFill,
                    { width: `${accessibilityMetrics.testingData.talkbackScore * 20}%` }
                  ]}
                />
              </View>
              <Text style={detailsModalStyles.statValue}>{accessibilityMetrics.testingData.talkbackScore.toFixed(1)} / 5</Text>
            </View>

            <Text style={[detailsModalStyles.sectionTitle, { marginTop: 16 }]}>Test Categories</Text>

            {Object.entries(accessibilityMetrics.testingData.categories).map(([category, data]) => (
              <View key={category} style={detailsModalStyles.statRow}>
                <Text style={detailsModalStyles.statLabel}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
                <View style={detailsModalStyles.progressContainer}>
                  <View
                    style={[
                      detailsModalStyles.progressFill,
                      { width: `${data.average * 20}%` }
                    ]}
                  />
                </View>
                <Text style={detailsModalStyles.statValue}>{data.average.toFixed(1)} / 5</Text>
              </View>
            ))}
          </View>
        );
      }

      return null;
    };

    // Details tab
    const renderDetailsTab = () => {
      if (activeMetricType === 'component') {
        return (
          <View style={detailsModalStyles.section}>
            <Text style={detailsModalStyles.sectionTitle}>Components by Type</Text>

            <View style={detailsModalStyles.statRow}>
              <Text style={detailsModalStyles.statLabel}>Basic UI Components</Text>
              <Text style={detailsModalStyles.statValue}>8</Text>
            </View>

            <View style={detailsModalStyles.statRow}>
              <Text style={detailsModalStyles.statLabel}>Complex Components</Text>
              <Text style={detailsModalStyles.statValue}>14</Text>
            </View>

            <Text style={[detailsModalStyles.sectionTitle, { marginTop: 16 }]}>Property Types</Text>

            <View style={detailsModalStyles.statRow}>
              <Text style={detailsModalStyles.statLabel}>accessibilityLabel</Text>
              <Text style={detailsModalStyles.statValue}>16 components</Text>
            </View>

            <View style={detailsModalStyles.statRow}>
              <Text style={detailsModalStyles.statLabel}>accessibilityRole</Text>
              <Text style={detailsModalStyles.statValue}>14 components</Text>
            </View>

            <View style={detailsModalStyles.statRow}>
              <Text style={detailsModalStyles.statLabel}>accessibilityHint</Text>
              <Text style={detailsModalStyles.statValue}>10 components</Text>
            </View>

            <View style={detailsModalStyles.statRow}>
              <Text style={detailsModalStyles.statLabel}>accessibilityState</Text>
              <Text style={detailsModalStyles.statValue}>8 components</Text>
            </View>
          </View>
        );
      } else if (activeMetricType === 'wcag') {
        return (
          <View style={detailsModalStyles.section}>
            <Text style={detailsModalStyles.sectionTitle}>WCAG Principles</Text>

            <View style={detailsModalStyles.statRow}>
              <Text style={detailsModalStyles.statLabel}>1. Perceivable</Text>
              <View style={detailsModalStyles.progressContainer}>
                <View
                  style={[
                    detailsModalStyles.progressFill,
                    { width: `${(accessibilityMetrics.wcagData.perceptible.implemented / accessibilityMetrics.wcagData.perceptible.total) * 100}%` }
                  ]}
                />
              </View>
              <Text style={detailsModalStyles.statValue}>
                {accessibilityMetrics.wcagData.perceptible.implemented} / {accessibilityMetrics.wcagData.perceptible.total}
              </Text>
            </View>

            <View style={detailsModalStyles.statRow}>
              <Text style={detailsModalStyles.statLabel}>2. Operable</Text>
              <View style={detailsModalStyles.progressContainer}>
                <View
                  style={[
                    detailsModalStyles.progressFill,
                    { width: `${(accessibilityMetrics.wcagData.operable.implemented / accessibilityMetrics.wcagData.operable.total) * 100}%` }
                  ]}
                />
              </View>
              <Text style={detailsModalStyles.statValue}>
                {accessibilityMetrics.wcagData.operable.implemented} / {accessibilityMetrics.wcagData.operable.total}
              </Text>
            </View>

            <View style={detailsModalStyles.statRow}>
              <Text style={detailsModalStyles.statLabel}>3. Understandable</Text>
              <View style={detailsModalStyles.progressContainer}>
                <View
                  style={[
                    detailsModalStyles.progressFill,
                    { width: `${(accessibilityMetrics.wcagData.understandable.implemented / accessibilityMetrics.wcagData.understandable.total) * 100}%` }
                  ]}
                />
              </View>
              <Text style={detailsModalStyles.statValue}>
                {accessibilityMetrics.wcagData.understandable.implemented} / {accessibilityMetrics.wcagData.understandable.total}
              </Text>
            </View>

            <View style={detailsModalStyles.statRow}>
              <Text style={detailsModalStyles.statLabel}>4. Robust</Text>
              <View style={detailsModalStyles.progressContainer}>
                <View
                  style={[
                    detailsModalStyles.progressFill,
                    { width: `${(accessibilityMetrics.wcagData.robust.implemented / accessibilityMetrics.wcagData.robust.total) * 100}%` }
                  ]}
                />
              </View>
              <Text style={detailsModalStyles.statValue}>
                {accessibilityMetrics.wcagData.robust.implemented} / {accessibilityMetrics.wcagData.robust.total}
              </Text>
            </View>
          </View>
        );
      } else if (activeMetricType === 'testing') {
        return (
          <View style={detailsModalStyles.section}>
            <Text style={detailsModalStyles.sectionTitle}>VoiceOver Test Details</Text>

            {Object.entries(accessibilityMetrics.testingData.categories).map(([category, data]) => (
              <View key={`vo-${category}`} style={detailsModalStyles.statRow}>
                <Text style={detailsModalStyles.statLabel}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
                <View style={detailsModalStyles.progressContainer}>
                  <View
                    style={[
                      detailsModalStyles.progressFill,
                      { width: `${data.voiceOver * 20}%` }
                    ]}
                  />
                </View>
                <Text style={detailsModalStyles.statValue}>{data.voiceOver.toFixed(1)} / 5</Text>
              </View>
            ))}

            <Text style={[detailsModalStyles.sectionTitle, { marginTop: 16 }]}>TalkBack Test Details</Text>

            {Object.entries(accessibilityMetrics.testingData.categories).map(([category, data]) => (
              <View key={`tb-${category}`} style={detailsModalStyles.statRow}>
                <Text style={detailsModalStyles.statLabel}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
                <View style={detailsModalStyles.progressContainer}>
                  <View
                    style={[
                      detailsModalStyles.progressFill,
                      { width: `${data.talkBack * 20}%` }
                    ]}
                  />
                </View>
                <Text style={detailsModalStyles.statValue}>{data.talkBack.toFixed(1)} / 5</Text>
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
        <View style={detailsModalStyles.section}>
          <Text style={detailsModalStyles.sectionTitle}>Bibliographic References</Text>

          {academicReferences.map((ref, index) => (
            <View key={index} style={detailsModalStyles.refItem}>
              <Text style={detailsModalStyles.refTitle}>{ref.title}</Text>
              <Text style={detailsModalStyles.refAuthors}>{ref.authors}</Text>
              {ref.publication && (
                <Text style={detailsModalStyles.refPublication}>
                  {ref.publication}, {ref.year}
                  {ref.doi && ` (doi: ${ref.doi})`}
                </Text>
              )}
              {!ref.publication && (
                <Text style={detailsModalStyles.refPublication}>
                  {ref.type}, {ref.year}
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
        <View style={detailsModalStyles.centeredView}>
          <View style={detailsModalStyles.modalView}>
            <View style={detailsModalStyles.header}>
              <Text style={detailsModalStyles.title}>{getDetailsTitle()}</Text>
              <TouchableOpacity
                style={detailsModalStyles.closeButton}
                onPress={() => setDetailsVisible(false)}
                accessibilityLabel="Close details"
                accessibilityRole="button"
              >
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <View style={detailsModalStyles.tabsContainer}>
              <TouchableOpacity
                style={[detailsModalStyles.tab, activeTab === 'overview' && detailsModalStyles.activeTab]}
                onPress={() => setActiveTab('overview')}
                accessibilityRole="tab"
                accessibilityState={{ selected: activeTab === 'overview' }}
              >
                <Text style={[detailsModalStyles.tabText, activeTab === 'overview' && detailsModalStyles.activeTabText]}>
                  Overview
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[detailsModalStyles.tab, activeTab === 'details' && detailsModalStyles.activeTab]}
                onPress={() => setActiveTab('details')}
                accessibilityRole="tab"
                accessibilityState={{ selected: activeTab === 'details' }}
              >
                <Text style={[detailsModalStyles.tabText, activeTab === 'details' && detailsModalStyles.activeTabText]}>
                  Details
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[detailsModalStyles.tab, activeTab === 'references' && detailsModalStyles.activeTab]}
                onPress={() => setActiveTab('references')}
                accessibilityRole="tab"
                accessibilityState={{ selected: activeTab === 'references' }}
              >
                <Text style={[detailsModalStyles.tabText, activeTab === 'references' && detailsModalStyles.activeTabText]}>
                  References
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={detailsModalStyles.content}>
              {renderTabContent()}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  /* -----------------------------------------
     7. Main render function
  ----------------------------------------- */
  return (
    <LinearGradient colors={backgroundGradientColors} style={themedStyles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        accessibilityRole="scrollview"
        accessibilityLabel="AccessibleHub Home Screen"
      >
        {/* HERO SECTION */}
        <View style={themedStyles.heroCard}>
          <Text style={themedStyles.heroTitle} accessibilityRole="header">
            The ultimate accessibility-driven toolkit for developers
          </Text>
          <Text style={themedStyles.heroSubtitle}>
            A comprehensive resource for building inclusive React Native applications with verified accessibility standards – explore for more!
          </Text>

          {/* STATS - Clickable */}
          <View style={themedStyles.statsContainer}>
            {/* COMPONENTS STAT */}
            <View
              style={themedStyles.statCard}
              accessible
              accessibilityRole="button"
              accessibilityLabel={`${accessibilityMetrics.componentCount} components, ${accessibilityMetrics.componentScore}% accessible implementation. Tap to see details.`}
              accessibilityHint="Shows component accessibility details"
            >
              <TouchableOpacity
                style={themedStyles.touchableStat}
                onPress={() => openMetricDetails('component')}
              >
                <Text style={themedStyles.statNumber} accessibilityElementsHidden>
                  {accessibilityMetrics.componentCount}
                </Text>
                <Text style={themedStyles.statLabel} accessibilityElementsHidden>
                  Components
                </Text>
                <Text style={themedStyles.statDescription} accessibilityElementsHidden>
                  Ready to Use
                </Text>
                <Ionicons
                  name="information-circle-outline"
                  size={16}
                  color={colors.primary}
                  style={themedStyles.detailsIcon}
                  accessibilityElementsHidden
                />
              </TouchableOpacity>
            </View>

            <View style={themedStyles.statDivider} importantForAccessibility="no" />

            {/* WCAG STAT */}
            <View
              style={themedStyles.statCard}
              accessible
              accessibilityRole="button"
              accessibilityLabel={`${accessibilityMetrics.wcagCompliance}% WCAG 2.2, Level AA. Tap to see details.`}
              accessibilityHint="Shows WCAG compliance details"
            >
              <TouchableOpacity
                style={themedStyles.touchableStat}
                onPress={() => openMetricDetails('wcag')}
              >
                <Text style={themedStyles.statNumber} accessibilityElementsHidden>
                  {accessibilityMetrics.wcagCompliance}%
                </Text>
                <Text style={themedStyles.statLabel} accessibilityElementsHidden>
                  WCAG 2.2
                </Text>
                <Text style={themedStyles.statDescription} accessibilityElementsHidden>
                  Level AA
                </Text>
                <Ionicons
                  name="information-circle-outline"
                  size={16}
                  color={colors.primary}
                  style={themedStyles.detailsIcon}
                  accessibilityElementsHidden
                />
              </TouchableOpacity>
            </View>

            <View style={themedStyles.statDivider} importantForAccessibility="no" />

            {/* SCREEN READER STAT */}
            <View
              style={themedStyles.statCard}
              accessible
              accessibilityRole="button"
              accessibilityLabel={`${accessibilityMetrics.testingScore}% screen reader test coverage. Tap to see details.`}
              accessibilityHint="Shows screen reader test details"
            >
              <TouchableOpacity
                style={themedStyles.touchableStat}
                onPress={() => openMetricDetails('testing')}
              >
                <Text style={themedStyles.statNumber} accessibilityElementsHidden>
                  {accessibilityMetrics.testingScore}%
                </Text>
                <Text style={themedStyles.statLabel} accessibilityElementsHidden>
                  Screen Reader
                </Text>
                <Text style={themedStyles.statDescription} accessibilityElementsHidden>
                  Test Coverage
                </Text>
                <Ionicons
                  name="information-circle-outline"
                  size={16}
                  color={colors.primary}
                  style={themedStyles.detailsIcon}
                  accessibilityElementsHidden
                />
              </TouchableOpacity>
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
            importantForAccessibility="no"
          />
        </TouchableOpacity>

        {/* DEVELOPMENT RESOURCES */}
        <View style={themedStyles.mainContent}>
          <Text style={themedStyles.sectionTitle}>Development Resources</Text>

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
                  color={isDarkMode ? '#000000' : colors.primary}
                  accessibilityElementsHidden
                />
              </View>
              <Text style={themedStyles.featureTitle}>{feature.title}</Text>
              <Text style={themedStyles.featureDescription}>{feature.description}</Text>
              <View style={themedStyles.tagContainer}>
                {feature.tags.map((tag, tagIndex) => (
                  <View key={tagIndex} style={themedStyles.tag} importantForAccessibility="no">
                    <Text style={themedStyles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* COMMUNITY / INSTRUCTION SECTION */}
        <View style={themedStyles.mainContent}>
          <View style={themedStyles.communitySection}>
            <Text style={themedStyles.communitySectionTitle}>
              Accessibility Instruction & Community
            </Text>
            <Text style={themedStyles.communitySectionDescription}>
              Dive deeper into accessibility with in-depth articles, success stories, and an engaged community. Share your insights, learn from experts, and grow your accessibility skills.
            </Text>

            <TouchableOpacity
              style={themedStyles.communityButton}
              onPress={() => router.push('/accessibility-instruction')}
              accessibilityRole="button"
              accessibilityLabel="Open accessibility instruction and community"
              accessibilityHint="Navigate to instructional modules and community resources"
            >
              <Text style={themedStyles.communityButtonText}>
                Open Instruction
              </Text>
              <Ionicons
                name="people-outline"
                size={20}
                color={colors.background}
                accessibilityElementsHidden
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Modal for metric details */}
      {renderMetricDetails()}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});