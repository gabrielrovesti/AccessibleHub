import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  AccessibilityInfo,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * Map of official documentation links for each tool.
 */
const TOOL_LINKS: Record<string, string> = {
  talkback: 'https://support.google.com/accessibility/android/answer/6283677',
  voiceover: 'https://support.apple.com/guide/iphone/turn-on-and-practice-voiceover-iph3e2e415f/ios',
  inspector: 'https://docs.expo.dev/debugging/tools/#accessibility-inspector',
  contrast: 'https://webaim.org/resources/contrastchecker/',
  testing: 'https://developer.android.com/guide/topics/ui/accessibility/testing',
  scanner: 'https://support.google.com/accessibility/android/answer/7101858',
  linter: 'https://github.com/microsoft/accessibility-insights-web', // example link
};

/**
 * Data for each tool, enriched with a brief "Practical Usage" explanation.
 */
const TOOLS_DATA = [
  {
    id: 'talkback',
    section: 'Screen Readers',
    title: 'TalkBack (Android)',
    description: "Native Android screen reader. Essential gestures:",
    icon: 'phone-portrait-outline',
    features: [
      'Single tap: Select an element',
      'Double tap: Activate selected element',
      'Swipe right/left: Navigate between elements',
    ],
    practicalUsage:
      "TalkBack allows you to test navigation and interactions for users with visual impairments, ensuring every component has clear labels and hints.",
    link: TOOL_LINKS.talkback,
    badge: 'Built-in',
  },
  {
    id: 'voiceover',
    section: 'Screen Readers',
    title: 'VoiceOver (iOS)',
    description: "Native iOS screen reader. Key gestures:",
    icon: 'logo-apple',
    features: [
      'Single tap: Select and read aloud',
      'Double tap: Activate an element',
      'Three-finger swipe: Scroll content',
    ],
    practicalUsage:
      "VoiceOver helps verify the accessibility of your interface for blind users, ensuring a logical and well-structured navigation experience.",
    link: TOOL_LINKS.voiceover,
    badge: 'Built-in',
  },
  {
    id: 'inspector',
    section: 'Development Tools',
    title: 'Accessibility Inspector',
    description: 'Built-in tool for inspecting accessibility properties:',
    icon: 'code-working-outline',
    features: [
      'Check labels and hints',
      'Review navigation order',
      'Test screen reader announcements',
    ],
    practicalUsage:
      "The Accessibility Inspector assists in identifying errors and refining component hierarchies, thereby improving the semantic structure of your app.",
    link: TOOL_LINKS.inspector,
  },
  {
    id: 'contrast',
    section: 'Development Tools',
    title: 'Contrast Analyzer',
    description: 'Tool to verify color contrast ratios according to WCAG guidelines:',
    icon: 'color-palette-outline',
    features: [
      'Assess text contrast',
      'Verify UI component contrast',
      'Support for WCAG 2.2 standards',
    ],
    practicalUsage:
      "The Contrast Analyzer is essential for ensuring text readability, helping you choose color combinations that meet standards for users with low vision.",
    link: TOOL_LINKS.contrast,
  },
  {
    id: 'linter',
    section: 'Development Tools',
    title: 'Accessibility Linter',
    description: 'Static analysis tool to detect accessibility issues in code:',
    icon: 'bug-outline',
    features: [
      'Detect missing accessibility labels',
      'Highlight potential navigation order issues',
      'Ensure adherence to WCAG guidelines',
    ],
    practicalUsage:
      "Integrate an accessibility linter into your workflow to catch issues early and maintain high-quality, accessible code.",
    link: TOOL_LINKS.linter,
  },
  {
    id: 'testing',
    section: 'Testing Checklist',
    title: 'Automated Testing',
    description: 'Automated checks for accessibility:',
    icon: 'checkbox-outline',
    features: [
      'Run accessibility linters',
      'Verify component properties and state',
      'Check navigation order',
      'Test color contrast',
    ],
    practicalUsage:
      "Automated testing ensures that code changes do not compromise accessibility, automating repetitive checks and reducing the risk of issues.",
    link: TOOL_LINKS.testing,
  },
  {
    id: 'scanner',
    section: 'Testing Checklist',
    title: 'Accessibility Scanner (Android)',
    description: 'An app for scanning accessibility issues on Android devices:',
    icon: 'search-outline',
    features: [
      'Identify potential accessibility improvements',
      'Provide recommendations based on WCAG',
      'Easy to use on any Android device',
    ],
    practicalUsage:
      "Use Accessibility Scanner to run quick tests on your Android builds, ensuring that all UI components meet accessibility standards and receive actionable recommendations.",
    link: TOOL_LINKS.scanner,
  },
];

/**
 * Mobile Accessibility Tools Screen with card-based layout and practical usage details.
 */
export default function TestingToolsScreen() {
  const { colors, textSizes, isDarkMode } = useTheme();
  const [expanded, setExpanded] = useState<string | null>(null);

  const gradientColors = isDarkMode
    ? [colors.background, '#2c2c2e']
    : ['#e2e2e2', colors.background];

  // Group tools by their section (e.g., Screen Readers, Development Tools, Testing Checklist)
  const groupedTools = TOOLS_DATA.reduce((acc, tool) => {
    if (!acc[tool.section]) {
      acc[tool.section] = [];
    }
    acc[tool.section].push(tool);
    return acc;
  }, {} as Record<string, typeof TOOLS_DATA>);

  /**
   * Handle opening the official documentation link.
   */
  const handleOpenLink = async (toolId: string, toolTitle: string) => {
    const url = TOOL_LINKS[toolId];
    if (url && (await Linking.canOpenURL(url))) {
      try {
        await Linking.openURL(url);
        AccessibilityInfo.announceForAccessibility(`Opening documentation for ${toolTitle}`);
      } catch {
        AccessibilityInfo.announceForAccessibility('Failed to open documentation');
      }
    }
  };

  /**
   * Toggle the expansion state of a card.
   */
  const toggleExpand = (toolId: string) => {
    setExpanded((prev) => (prev === toolId ? null : toolId));
  };

  /**
   * Render a single tool card.
   */
  const renderToolCard = (tool: any) => {
    const isOpen = expanded === tool.id;

    return (
      <View
        key={tool.id}
        style={[
          styles.toolCard,
          {
            backgroundColor: colors.surface,
            borderColor: isDarkMode ? colors.border : 'transparent',
            shadowColor: '#000',
          },
        ]}
        accessibilityRole="button"
        accessibilityLabel={`${tool.title}. Double tap to ${isOpen ? 'collapse' : 'expand'} details and practical usage.`}
      >
        <TouchableOpacity onPress={() => toggleExpand(tool.id)} style={styles.cardHeader}>
          <View style={[styles.iconContainer, { backgroundColor: isDarkMode ? '#333' : '#f0f0f0' }]} importantForAccessibility="no">
            <Ionicons name={tool.icon} size={24} color={colors.primary} accessibilityElementsHidden />
          </View>
          <Text style={[styles.cardTitle, { color: colors.text, fontSize: textSizes.medium }]}>{tool.title}</Text>
          {tool.badge && (
            <View style={styles.badge} importantForAccessibility="no">
              <Text style={styles.badgeText}>{tool.badge}</Text>
            </View>
          )}
          <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={20} color={colors.textSecondary} style={{ marginLeft: 'auto' }} accessibilityElementsHidden />
        </TouchableOpacity>

        {isOpen && (
          <View style={styles.cardBody}>
            <Text style={[styles.toolDescription, { color: colors.textSecondary, fontSize: textSizes.small + 1 }]}>{tool.description}</Text>
            <View role="list">
              {tool.features.map((feature: string, idx: number) => (
                <Text key={idx} style={[styles.featureItem, { color: colors.textSecondary, fontSize: textSizes.small + 1 }]} role="listitem">
                  • {feature}
                </Text>
              ))}
            </View>
            {/* Practical Usage Section */}
            <View style={styles.practicalSection}>
              <Text style={[styles.practicalHeader, { color: colors.primary, fontSize: textSizes.small + 1 }]}>
                Practical Usage:
              </Text>
              <Text style={[styles.practicalUsage, { color: colors.textSecondary, fontSize: textSizes.small }]}>
                {tool.practicalUsage}
              </Text>
            </View>
            {tool.link && (
              <TouchableOpacity
                onPress={() => handleOpenLink(tool.id, tool.title)}
                style={styles.docLink}
                accessibilityRole="link"
                accessibilityLabel={`Open official documentation for ${tool.title}`}
                accessibilityHint="Opens browser"
              >
                <Ionicons name="open-outline" size={18} color={colors.primary} style={{ marginRight: 4 }} accessibilityElementsHidden />
                <Text style={{ color: colors.primary, fontWeight: '600' }}>Documentation</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
  };

  /**
   * Render each section (e.g., Screen Readers, Development Tools, Testing Checklist).
   */
  const renderSection = (sectionTitle: string, toolsList: any[]) => {
    return (
      <View key={sectionTitle} style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text, fontSize: textSizes.large }]} accessibilityRole="header">
          {sectionTitle}
        </Text>
        <View role="list">
          {toolsList.map((tool) => renderToolCard(tool))}
        </View>
      </View>
    );
  };

  return (
    <LinearGradient colors={gradientColors} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer} accessibilityRole="scrollview" accessibilityLabel="Mobile Accessibility Tools Screen">
        {/* Introductory Hero Card */}
        <View style={[styles.heroCard, { backgroundColor: colors.surface, borderColor: isDarkMode ? colors.border : 'transparent', shadowColor: '#000' }]}>
          <Text style={[styles.heroTitle, { color: colors.text, fontSize: textSizes.xlarge }]} accessibilityRole="header">
            Mobile Accessibility Tools
          </Text>
          <Text style={[styles.heroSubtitle, { color: colors.textSecondary, fontSize: textSizes.medium }]}>
            Explore essential tools for testing and improving the accessibility of your mobile apps.
          </Text>
        </View>

        {/* Render grouped sections */}
        {Object.entries(groupedTools).map(([section, items]) => renderSection(section, items))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  heroCard: {
    marginVertical: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  heroTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  heroSubtitle: {
    lineHeight: 22,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 12,
  },
  toolCard: {
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
    padding: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardTitle: {
    fontWeight: '600',
    flexShrink: 1,
  },
  badge: {
    marginLeft: 8,
    backgroundColor: '#E8F1FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 12,
    color: '#0055CC',
    fontWeight: '500',
  },
  cardBody: {
    marginTop: 8,
    paddingLeft: 52,
  },
  toolDescription: {
    marginBottom: 8,
  },
  featureItem: {
    marginBottom: 4,
    paddingLeft: 8,
  },
  docLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  practicalSection: {
    marginTop: 12,
    padding: 8,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
  },
  practicalHeader: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  practicalUsage: {
    lineHeight: 20,
  },
});
