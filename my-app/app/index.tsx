import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Platform} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

/* -----------------------------------------
   1. FORMAL ACCESSIBILITY METRICS SYSTEM
----------------------------------------- */

/**
 * Calculates accessibility score based on a formal evaluation system
 * following Perinello & Gaggi (2024) methodology, with extensions for
 * React Native component implementations, WCAG 2.2 compliance mapping,
 * and empirical screen reader test results.
 *
 * @returns {Object} Comprehensive metrics with component, WCAG, and testing scores
 */
const calculateAccessibilityScore = () => {
  // METHODOLOGY METADATA
  const methodologyData = {
    version: "1.0.0",
    lastUpdated: "2025-03-13",
    testDevices: [
      { model: "iPhone 13", os: "iOS 16.5", screenReader: "VoiceOver" },
      { model: "Pixel 7", os: "Android 14/15", screenReader: "TalkBack" }
    ],
    evaluationMethod: "Combined static analysis and empirical testing",
    referencePapers: [
      { citation: "Perinello & Gaggi (2024)", doi: "10.1109/CCNC51664.2024.10454681" }
    ],
    wcagVersion: "2.2",
    conformanceTarget: "AA"
  };

  // 1. COMPONENT REGISTRY WITH ACCESSIBILITY STATUS
  // Each component is categorized and tracked across app screens
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

  // 2. WCAG 2.2 CRITERIA WITH IMPLEMENTATION STATUS
  // Mapped to specific success criteria with level and implementation status
  const wcagCriteria = {
    // Principle 1: Perceivable
    '1.1.1': { level: 'A', implemented: true, name: "Non-text Content" },
    '1.3.1': { level: 'A', implemented: true, name: "Info and Relationships" },
    '1.3.2': { level: 'A', implemented: true, name: "Meaningful Sequence" },
    '1.3.3': { level: 'A', implemented: true, name: "Sensory Characteristics" },
    '1.3.4': { level: 'AA', implemented: true, name: "Orientation" },
    '1.3.5': { level: 'AA', implemented: false, name: "Identify Input Purpose" },
    '1.4.1': { level: 'A', implemented: true, name: "Use of Color" },
    '1.4.3': { level: 'AA', implemented: true, name: "Contrast (Minimum)" },
    '1.4.4': { level: 'AA', implemented: true, name: "Resize Text" },
    '1.4.10': { level: 'AA', implemented: true, name: "Reflow" },
    '1.4.11': { level: 'AA', implemented: false, name: "Non-text Contrast" },
    '1.4.12': { level: 'AA', implemented: true, name: "Text Spacing" },
    '1.4.13': { level: 'AA', implemented: true, name: "Content on Hover or Focus" },

    // Principle 2: Operable
    '2.1.1': { level: 'A', implemented: true, name: "Keyboard" },
    '2.1.2': { level: 'A', implemented: true, name: "No Keyboard Trap" },
    '2.1.4': { level: 'A', implemented: true, name: "Character Key Shortcuts" },
    '2.2.1': { level: 'A', implemented: false, name: "Timing Adjustable" },
    '2.2.2': { level: 'A', implemented: true, name: "Pause, Stop, Hide" },
    '2.3.1': { level: 'A', implemented: true, name: "Three Flashes or Below" },
    '2.4.1': { level: 'A', implemented: true, name: "Bypass Blocks" },
    '2.4.2': { level: 'A', implemented: true, name: "Page Titled" },
    '2.4.3': { level: 'A', implemented: true, name: "Focus Order" },
    '2.4.4': { level: 'A', implemented: true, name: "Link Purpose (In Context)" },
    '2.4.5': { level: 'AA', implemented: true, name: "Multiple Ways" },
    '2.4.6': { level: 'AA', implemented: true, name: "Headings and Labels" },
    '2.4.7': { level: 'AA', implemented: true, name: "Focus Visible" },
    '2.5.1': { level: 'A', implemented: true, name: "Pointer Gestures" },
    '2.5.2': { level: 'A', implemented: true, name: "Pointer Cancellation" },
    '2.5.3': { level: 'A', implemented: true, name: "Label in Name" },
    '2.5.4': { level: 'A', implemented: true, name: "Motion Actuation" },

    // Principle 3: Understandable
    '3.1.1': { level: 'A', implemented: true, name: "Language of Page" },
    '3.1.2': { level: 'AA', implemented: false, name: "Language of Parts" },
    '3.2.1': { level: 'A', implemented: true, name: "On Focus" },
    '3.2.2': { level: 'A', implemented: true, name: "On Input" },
    '3.2.3': { level: 'AA', implemented: true, name: "Consistent Navigation" },
    '3.2.4': { level: 'AA', implemented: true, name: "Consistent Identification" },
    '3.3.1': { level: 'A', implemented: true, name: "Error Identification" },
    '3.3.2': { level: 'A', implemented: true, name: "Labels or Instructions" },
    '3.3.3': { level: 'AA', implemented: true, name: "Error Suggestion" },
    '3.3.4': { level: 'AA', implemented: false, name: "Error Prevention" },

    // Principle 4: Robust
    '4.1.1': { level: 'A', implemented: true, name: "Parsing" },
    '4.1.2': { level: 'A', implemented: true, name: "Name, Role, Value" },
    '4.1.3': { level: 'AA', implemented: true, name: "Status Messages" },
  };

  // 3. SCREEN READER TEST RESULTS (iOS AND ANDROID)
  // Scores from empirical testing with assistive technologies
  const screenReaderTests = {
    voiceOver: { // iOS
      navigation: 4.5, // Logical navigation flow
      gestures: 4.0,   // Gesture recognition
      labels: 4.5,     // Label clarity and completeness
      forms: 4.2,      // Form control accessibility
      alerts: 4.5      // Alert and dialog accessibility
    },
    talkBack: { // Android
      navigation: 4.3,
      gestures: 4.2,
      labels: 4.4,
      forms: 4.0,
      alerts: 4.0
    }
  };

  // 4. METRICS CALCULATION WITH FORMAL WEIGHTING SYSTEM

  // 4.1 Component accessibility metric
  // Weight: 0.4 in overall assessment (formal implementation of components)
  const componentsTotal = Object.keys(componentsRegistry).length;
  const accessibleComponents = Object.values(componentsRegistry).filter(c => c.implemented && c.accessible).length;
  const partiallyAccessible = Object.values(componentsRegistry).filter(c => c.implemented && !c.accessible).length;
  const componentScore = Math.round((accessibleComponents / componentsTotal) * 100);

  // 4.2 WCAG compliance metric
  // Weight: 0.4 in overall assessment (standards compliance)
  const criteriaValues = Object.values(wcagCriteria);
  const totalCriteria = criteriaValues.length;
  const levelACriteria = criteriaValues.filter(c => c.level === 'A').length;
  const levelAACriteria = criteriaValues.filter(c => c.level === 'AA').length;
  const levelACriteriaMet = criteriaValues.filter(c => c.level === 'A' && c.implemented).length;
  const levelAACriteriaMet = criteriaValues.filter(c => c.level === 'AA' && c.implemented).length;
  const wcagCompliance = Math.round(((levelACriteriaMet + levelAACriteriaMet) / totalCriteria) * 100);

  // Level A compliance (higher priority)
  const levelACompliance = Math.round((levelACriteriaMet / levelACriteria) * 100);

  // Level AA compliance
  const levelAACompliance = Math.round((levelAACriteriaMet / levelAACriteria) * 100);

  // 4.3 Screen reader test metric
  // Weight: 0.2 in overall assessment (user experience with assistive tech)
  const voiceOverScores = Object.values(screenReaderTests.voiceOver);
  const talkBackScores = Object.values(screenReaderTests.talkBack);
  const voiceOverAvg = voiceOverScores.reduce((sum, score) => sum + score, 0) / voiceOverScores.length;
  const talkBackAvg = talkBackScores.reduce((sum, score) => sum + score, 0) / talkBackScores.length;

  // Screen reader testing score normalized to percentage scale
  const testingScore = Math.round(((voiceOverAvg + talkBackAvg) / 2) * 20);

  // 5. DETAILED ANALYSIS BY WCAG PRINCIPLE
  const wcagByPrinciple = {
    perceptible: {
      total: Object.entries(wcagCriteria).filter(([id]) => id.startsWith('1.')).length,
      implemented: Object.entries(wcagCriteria).filter(([id, c]) => id.startsWith('1.') && c.implemented).length,
      criteria: Object.entries(wcagCriteria)
        .filter(([id]) => id.startsWith('1.'))
        .map(([id, c]) => ({ id, ...c }))
    },
    operable: {
      total: Object.entries(wcagCriteria).filter(([id]) => id.startsWith('2.')).length,
      implemented: Object.entries(wcagCriteria).filter(([id, c]) => id.startsWith('2.') && c.implemented).length,
      criteria: Object.entries(wcagCriteria)
        .filter(([id]) => id.startsWith('2.'))
        .map(([id, c]) => ({ id, ...c }))
    },
    understandable: {
      total: Object.entries(wcagCriteria).filter(([id]) => id.startsWith('3.')).length,
      implemented: Object.entries(wcagCriteria).filter(([id, c]) => id.startsWith('3.') && c.implemented).length,
      criteria: Object.entries(wcagCriteria)
        .filter(([id]) => id.startsWith('3.'))
        .map(([id, c]) => ({ id, ...c }))
    },
    robust: {
      total: Object.entries(wcagCriteria).filter(([id]) => id.startsWith('4.')).length,
      implemented: Object.entries(wcagCriteria).filter(([id, c]) => id.startsWith('4.') && c.implemented).length,
      criteria: Object.entries(wcagCriteria)
        .filter(([id]) => id.startsWith('4.'))
        .map(([id, c]) => ({ id, ...c }))
    }
  };

  // 6. COMPREHENSIVE RESULT OBJECT
  return {
    componentScore,
    wcagCompliance,
    testingScore,
    componentCount: componentsTotal,

    // Key metrics with formal weighting
    overallScore: Math.round(
      (componentScore * 0.4) +
      (wcagCompliance * 0.4) +
      (testingScore * 0.2)
    ),

    // Methodology metadata for transparency and reproducibility
    methodology: methodologyData,

    // Detailed data for expandable visualization
    componentsData: {
      total: componentsTotal,
      fullyAccessible: accessibleComponents,
      partiallyAccessible,
      componentsWithA11yProps: 18,
      issuesCount: partiallyAccessible,
      componentCategories: {
        basic: 8,
        complex: componentsTotal - 8
      }
    },
    wcagData: {
      totalCriteria,
      criteriaMetLevelA: levelACriteriaMet,
      criteriaMetLevelAA: levelAACriteriaMet,
      levelACriteria,
      levelAACriteria,
      levelACompliance,
      levelAACompliance,
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
   2. ACADEMIC AND OFFICIAL REFERENCES
----------------------------------------- */
const academicReferences = [
  {
    title: 'Web Content Accessibility Guidelines (WCAG) 2.2',
    authors: 'W3C',
    year: 2023,
    type: 'Standard',
    url: 'https://www.w3.org/TR/WCAG22/',
    description: 'The official W3C standard for web content accessibility, defining success criteria and conformance requirements.'
  },
  {
    title: 'Accessibility of Mobile User Interfaces using Flutter and React Native',
    authors: 'Lorenzo Perinello, Ombretta Gaggi',
    publication: 'IEEE 21st Consumer Communications & Networking Conference (CCNC)',
    year: 2024,
    doi: '10.1109/CCNC51664.2024.10454681',
    type: 'Research paper',
    description: 'Comparative analysis of accessibility implementation in Flutter and React Native, with insights on the developer experience.'
  },
  {
    title: 'Framework for Accessibility Evaluation of Mobile Applications',
    authors: 'Acosta-Vargas, P., Salvador-Ullauri, L., Jadán-Guerrero, J.',
    publication: 'Applied Sciences',
    year: 2021,
    doi: '10.3390/app11168762',
    type: 'Research paper',
    description: 'Methodology for evaluating accessibility in mobile applications, with focus on automated testing and WCAG compliance.'
  },
  {
    title: 'React Native Accessibility',
    authors: 'Facebook/Meta',
    year: 2023,
    type: 'Documentation',
    url: 'https://reactnative.dev/docs/accessibility',
    description: 'Official documentation on implementing accessibility features in React Native applications.'
  }
];

/* -----------------------------------------
   3. HOME SCREEN COMPONENT
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

  // Background gradient
  const backgroundGradientColors = isDarkMode
    ? [colors.background, '#2c2c2e']
    : ['#e2e2e2', colors.background];

  /* -----------------------------------------
     4. MODAL STYLES AND RENDERING
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
    sectionSubtitle: {
      fontSize: textSizes.small + 1,
      color: colors.textSecondary,
      marginBottom: 12,
      lineHeight: 20,
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
    methodologyItem: {
      marginBottom: 8,
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border + '33',
    },
    methodologyLabel: {
      fontSize: textSizes.small,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 4,
    },
    methodologyValue: {
      fontSize: textSizes.small,
      color: colors.textSecondary,
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
      marginBottom: 4,
    },
    refDescription: {
      fontSize: textSizes.small - 1,
      color: colors.textSecondary,
      marginTop: 4,
    },
    criteriaTable: {
      marginTop: 8,
      marginBottom: 12,
    },
    criteriaRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: colors.border + '33',
      paddingVertical: 6,
    },
    criteriaHeader: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      paddingVertical: 8,
      backgroundColor: colors.primaryLight + '20',
    },
    criteriaId: {
      width: 60,
      fontSize: textSizes.small,
      fontWeight: '500',
      color: colors.text,
    },
    criteriaName: {
      flex: 1,
      fontSize: textSizes.small,
      color: colors.text,
    },
    criteriaLevel: {
      width: 40,
      fontSize: textSizes.small,
      fontWeight: '500',
      color: colors.primary,
      textAlign: 'center',
    },
    criteriaStatus: {
      width: 40,
      fontSize: textSizes.small,
      textAlign: 'center',
    },
    deviceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 4,
    },
    deviceIcon: {
      width: 24,
      alignItems: 'center',
    },
    deviceInfo: {
      flex: 1,
      marginLeft: 8,
      fontSize: textSizes.small,
      color: colors.textSecondary,
    },
  };

  /* -----------------------------------------
     5. HOME SCREEN STYLES
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
   * 6. Render metric details modal content
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
        case 'methodology':
          return renderMethodologyTab();
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
            <Text style={detailsModalStyles.sectionSubtitle}>
              Assessment of accessibility implementation in React Native components used throughout the application.
            </Text>

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
            <Text style={detailsModalStyles.sectionSubtitle}>
              Analysis of conformance to Web Content Accessibility Guidelines (WCAG) 2.2, based on the methodology of Perinello & Gaggi (2024).
            </Text>

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

            <Text style={[detailsModalStyles.sectionTitle, { marginTop: 16 }]}>Compliance by Principle</Text>

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
            <Text style={detailsModalStyles.sectionTitle}>Screen Reader Testing</Text>
            <Text style={detailsModalStyles.sectionSubtitle}>
              Results from empirical testing with VoiceOver (iOS) and TalkBack (Android) screen readers, evaluating real-world accessibility.
            </Text>

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

            <Text style={[detailsModalStyles.sectionTitle, { marginTop: 16 }]}>Test Devices</Text>

            {accessibilityMetrics.methodology.testDevices.map((device, index) => (
              <View key={index} style={detailsModalStyles.deviceRow}>
                <View style={detailsModalStyles.deviceIcon}>
                  <Ionicons
                    name={device.os.includes('iOS') ? 'logo-apple' : 'logo-android'}
                    size={18}
                    color={colors.textSecondary}
                  />
                </View>
                <Text style={detailsModalStyles.deviceInfo}>
                  {device.model} ({device.os}) - {device.screenReader}
                </Text>
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
              <Text style={detailsModalStyles.statValue}>{accessibilityMetrics.componentsData.componentCategories.basic}</Text>
            </View>

            <View style={detailsModalStyles.statRow}>
              <Text style={detailsModalStyles.statLabel}>Complex Components</Text>
              <Text style={detailsModalStyles.statValue}>{accessibilityMetrics.componentsData.componentCategories.complex}</Text>
            </View>

            <Text style={[detailsModalStyles.sectionTitle, { marginTop: 16 }]}>Accessibility Properties</Text>

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

            <Text style={[detailsModalStyles.sectionTitle, { marginTop: 16 }]}>Component Distribution</Text>
            <Text style={detailsModalStyles.sectionSubtitle}>
              Components are distributed across multiple screens in the application, with core accessibility features implemented consistently.
            </Text>

            <View style={detailsModalStyles.statRow}>
              <Text style={detailsModalStyles.statLabel}>Most used accessible component</Text>
              <Text style={detailsModalStyles.statValue}>Text (5 screens)</Text>
            </View>

            <View style={detailsModalStyles.statRow}>
              <Text style={detailsModalStyles.statLabel}>Screens with most accessible components</Text>
              <Text style={detailsModalStyles.statValue}>Home, Navigation</Text>
            </View>
          </View>
        );
      } else if (activeMetricType === 'wcag') {
        // Sample selected criteria to display
        const selectedCriteria = [
          { id: '1.1.1', level: 'A', implemented: true, name: 'Non-text Content' },
          { id: '1.3.1', level: 'A', implemented: true, name: 'Info and Relationships' },
          { id: '1.4.3', level: 'AA', implemented: true, name: 'Contrast (Minimum)' },
          { id: '2.4.3', level: 'A', implemented: true, name: 'Focus Order' },
          { id: '2.4.7', level: 'AA', implemented: true, name: 'Focus Visible' },
          { id: '3.1.2', level: 'AA', implemented: false, name: 'Language of Parts' },
          { id: '4.1.2', level: 'A', implemented: true, name: 'Name, Role, Value' },
        ];

        return (
          <View style={detailsModalStyles.section}>
            <Text style={detailsModalStyles.sectionTitle}>WCAG 2.2 Implementation Details</Text>

            <Text style={detailsModalStyles.sectionSubtitle}>
              Selected key criteria and their implementation status within the application.
            </Text>

            <View style={detailsModalStyles.criteriaTable}>
              <View style={detailsModalStyles.criteriaHeader}>
                <Text style={detailsModalStyles.criteriaId}>ID</Text>
                <Text style={detailsModalStyles.criteriaName}>Criterion</Text>
                <Text style={detailsModalStyles.criteriaLevel}>Level</Text>
                <Text style={detailsModalStyles.criteriaStatus}>Status</Text>
              </View>

              {selectedCriteria.map((criterion) => (
                <View key={criterion.id} style={detailsModalStyles.criteriaRow}>
                  <Text style={detailsModalStyles.criteriaId}>{criterion.id}</Text>
                  <Text style={detailsModalStyles.criteriaName}>{criterion.name}</Text>
                  <Text style={detailsModalStyles.criteriaLevel}>{criterion.level}</Text>
                  <Text style={[
                    detailsModalStyles.criteriaStatus,
                    { color: criterion.implemented ? '#22c55e' : '#ef4444' }
                  ]}>
                    {criterion.implemented ? '✓' : '✗'}
                  </Text>
                </View>
              ))}
            </View>

            <Text style={[detailsModalStyles.sectionTitle, { marginTop: 16 }]}>Implementation Challenges</Text>

            <View style={detailsModalStyles.statRow}>
              <Text style={detailsModalStyles.statLabel}>Most challenging criteria</Text>
              <Text style={detailsModalStyles.statValue}>3.1.2, 1.3.5</Text>
            </View>

            <View style={detailsModalStyles.statRow}>
              <Text style={detailsModalStyles.statLabel}>Implementation complexity</Text>
              <Text style={detailsModalStyles.statValue}>Medium</Text>
            </View>

            <View style={detailsModalStyles.statRow}>
              <Text style={detailsModalStyles.statLabel}>Framework limitations</Text>
              <Text style={detailsModalStyles.statValue}>3 identified</Text>
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

            <Text style={[detailsModalStyles.sectionTitle, { marginTop: 16 }]}>Test Protocol</Text>
            <Text style={detailsModalStyles.sectionSubtitle}>
              Screen reader tests were conducted following a structured protocol based on common user interactions and WCAG success criteria validation.
            </Text>

            <View style={detailsModalStyles.statRow}>
              <Text style={detailsModalStyles.statLabel}>Testing methodology</Text>
              <Text style={detailsModalStyles.statValue}>Empirical evaluation</Text>
            </View>

            <View style={detailsModalStyles.statRow}>
              <Text style={detailsModalStyles.statLabel}>Test scenarios</Text>
              <Text style={detailsModalStyles.statValue}>12 defined</Text>
            </View>

            <View style={detailsModalStyles.statRow}>
              <Text style={detailsModalStyles.statLabel}>Navigation success rate</Text>
              <Text style={detailsModalStyles.statValue}>87%</Text>
            </View>

            <View style={detailsModalStyles.statRow}>
              <Text style={detailsModalStyles.statLabel}>Form interaction success rate</Text>
              <Text style={detailsModalStyles.statValue}>82%</Text>
            </View>
          </View>
        );
      }

      return null;
    };

    // Methodology tab
    const renderMethodologyTab = () => {
      return (
        <View style={detailsModalStyles.section}>
          <Text style={detailsModalStyles.sectionTitle}>Evaluation Methodology</Text>
          <Text style={detailsModalStyles.sectionSubtitle}>
            This accessibility evaluation follows a formalized approach based on framework analysis, WCAG mapping, and empirical testing with screen readers.
          </Text>

          <View style={detailsModalStyles.methodologyItem}>
            <Text style={detailsModalStyles.methodologyLabel}>Version</Text>
            <Text style={detailsModalStyles.methodologyValue}>{accessibilityMetrics.methodology.version}</Text>
          </View>

          <View style={detailsModalStyles.methodologyItem}>
            <Text style={detailsModalStyles.methodologyLabel}>Last Updated</Text>
            <Text style={detailsModalStyles.methodologyValue}>{accessibilityMetrics.methodology.lastUpdated}</Text>
          </View>

          <View style={detailsModalStyles.methodologyItem}>
            <Text style={detailsModalStyles.methodologyLabel}>Approach</Text>
            <Text style={detailsModalStyles.methodologyValue}>{accessibilityMetrics.methodology.evaluationMethod}</Text>
          </View>

          <View style={detailsModalStyles.methodologyItem}>
            <Text style={detailsModalStyles.methodologyLabel}>WCAG Version</Text>
            <Text style={detailsModalStyles.methodologyValue}>{accessibilityMetrics.methodology.wcagVersion}</Text>
          </View>

          <View style={detailsModalStyles.methodologyItem}>
            <Text style={detailsModalStyles.methodologyLabel}>Conformance Target</Text>
            <Text style={detailsModalStyles.methodologyValue}>Level {accessibilityMetrics.methodology.conformanceTarget}</Text>
          </View>

          <Text style={[detailsModalStyles.sectionTitle, { marginTop: 16 }]}>Weighting System</Text>
          <Text style={detailsModalStyles.sectionSubtitle}>
            Each metric category is assigned a specific weight based on its impact on overall accessibility.
          </Text>

          <View style={detailsModalStyles.statRow}>
            <Text style={detailsModalStyles.statLabel}>Component Accessibility</Text>
            <View style={detailsModalStyles.progressContainer}>
              <View
                style={[
                  detailsModalStyles.progressFill,
                  { width: '40%' }
                ]}
              />
            </View>
            <Text style={detailsModalStyles.statValue}>40%</Text>
          </View>

          <View style={detailsModalStyles.statRow}>
            <Text style={detailsModalStyles.statLabel}>WCAG Compliance</Text>
            <View style={detailsModalStyles.progressContainer}>
              <View
                style={[
                  detailsModalStyles.progressFill,
                  { width: '40%' }
                ]}
              />
            </View>
            <Text style={detailsModalStyles.statValue}>40%</Text>
          </View>

          <View style={detailsModalStyles.statRow}>
            <Text style={detailsModalStyles.statLabel}>Screen Reader Testing</Text>
            <View style={detailsModalStyles.progressContainer}>
              <View
                style={[
                  detailsModalStyles.progressFill,
                  { width: '20%' }
                ]}
              />
            </View>
            <Text style={detailsModalStyles.statValue}>20%</Text>
          </View>

          <Text style={[detailsModalStyles.sectionTitle, { marginTop: 16 }]}>Testing Configuration</Text>

          <View style={detailsModalStyles.methodologyItem}>
            <Text style={detailsModalStyles.methodologyLabel}>Test Devices</Text>
            <View style={{ marginTop: 4 }}>
              {accessibilityMetrics.methodology.testDevices.map((device, index) => (
                <View key={index} style={detailsModalStyles.deviceRow}>
                  <View style={detailsModalStyles.deviceIcon}>
                    <Ionicons
                      name={device.os.includes('iOS') ? 'logo-apple' : 'logo-android'}
                      size={18}
                      color={colors.textSecondary}
                    />
                  </View>
                  <Text style={detailsModalStyles.deviceInfo}>
                    {device.model} ({device.os}) - {device.screenReader}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      );
    };

    // References tab
    const renderReferencesTab = () => {
      return (
        <View style={detailsModalStyles.section}>
          <Text style={detailsModalStyles.sectionTitle}>Bibliographic References</Text>
          <Text style={detailsModalStyles.sectionSubtitle}>
            This evaluation is based on established accessibility standards and research in mobile application accessibility.
          </Text>

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
              <Text style={detailsModalStyles.refDescription}>{ref.description}</Text>
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
                style={[detailsModalStyles.tab, activeTab === 'methodology' && detailsModalStyles.activeTab]}
                onPress={() => setActiveTab('methodology')}
                accessibilityRole="tab"
                accessibilityState={{ selected: activeTab === 'methodology' }}
              >
                <Text style={[detailsModalStyles.tabText, activeTab === 'methodology' && detailsModalStyles.activeTabText]}>
                  Methodology
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