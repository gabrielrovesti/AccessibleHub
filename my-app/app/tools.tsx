import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  AccessibilityInfo,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

const TOOL_LINKS = {
  'accessibility-inspector': 'https://docs.expo.dev/debugging/tools/#accessibility-inspector',
  'contrast-analyzer': 'https://developer.android.com/studio/debug/dev-options#drawing',
  'talkback': 'https://support.google.com/accessibility/android/answer/6283677',
  'voiceover': 'https://support.apple.com/guide/iphone/turn-on-and-practice-voiceover-iph3e2e415f/ios',
  'checklist': 'https://developer.android.com/guide/topics/ui/accessibility/testing'
};

export default function TestingToolsScreen() {
  const { colors, textSizes, isDarkMode } = useTheme();

  /*
   * 1) Gradient background
   *    Light mode: slightly darker gray → background
   *    Dark mode: background → #2c2c2e
   */
  const gradientColors = isDarkMode
    ? [colors.background, '#2c2c2e']
    : ['#e2e2e2', colors.background];

  /*
   * 2) Tools data
   */
  const tools = [
    {
      id: 'talkback',
      section: 'Screen Readers',
      title: 'TalkBack (Android)',
      description: "Android's built-in screen reader. Essential gestures:",
      icon: 'phone-portrait-outline',
      iconBg: '#E8F1FF',
      iconColor: '#0055CC',
      features: [
        'Single tap: Select item',
        'Double tap: Activate selected item',
        'Swipe right/left: Next/previous item'
      ],
      link: true,
      badge: 'Built-in'
    },
    {
      id: 'voiceover',
      section: 'Screen Readers',
      title: 'VoiceOver (iOS)',
      description: "iOS's integrated screen reader. Key gestures:",
      icon: 'logo-apple',
      iconBg: '#F0F0F0',
      iconColor: '#333',
      features: [
        'Single tap: Select and speak',
        'Double tap: Activate item',
        'Three finger swipe: Scroll'
      ],
      link: true,
      badge: 'Built-in'
    },
    {
      id: 'accessibility-inspector',
      section: 'Development Tools',
      title: 'Accessibility Inspector',
      description: 'Built-in tool to inspect accessibility properties:',
      icon: 'code-working-outline',
      iconBg: '#FFF4E6',
      iconColor: '#FF8C00',
      features: [
        'Verify accessibility labels and hints',
        'Check navigation order',
        'Test screen reader announcements'
      ],
      link: true
    },
    {
      id: 'contrast-analyzer',
      section: 'Development Tools',
      title: 'Contrast Analyzer',
      description: 'Verify color contrast ratios for WCAG guidelines:',
      icon: 'color-palette-outline',
      iconBg: '#E6F4FF',
      iconColor: '#0066CC',
      features: [
        'Check text contrast ratios',
        'Verify UI component contrast',
        'Support for WCAG 2.2 standards'
      ],
      link: true
    },
    {
      id: 'checklist',
      section: 'Testing Checklist',
      title: 'Automated Testing',
      icon: 'checkbox-outline',
      iconBg: '#E8FFE6',
      iconColor: '#28A745',
      description: 'Essential checks for accessibility testing:',
      features: [
        'Run accessibility linter',
        'Verify accessibility props',
        'Check navigation order',
        'Test color contrast'
      ],
      link: true
    }
  ];

  /*
   * 3) Attempt to open external link
   */
  const handleToolPress = async (toolId: string, toolName: string) => {
    const url = TOOL_LINKS[toolId];
    if (url && (await Linking.canOpenURL(url))) {
      try {
        await Linking.openURL(url);
        AccessibilityInfo.announceForAccessibility(`Opening documentation for ${toolName}`);
      } catch (error) {
        AccessibilityInfo.announceForAccessibility('Failed to open documentation');
      }
    }
  };

  /*
   * 4) Group tools by their "section"
   */
  const groupedTools = tools.reduce((acc, tool) => {
    if (!acc[tool.section]) {
      acc[tool.section] = [];
    }
    acc[tool.section].push(tool);
    return acc;
  }, {} as Record<string, typeof tools>);

  /*
   * 5) Themed + local styles
   */
  const themedStyles = {
    container: {
      flex: 1,
    },
    /* Hero card for the screen title/description */
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
    section: {
      padding: 16,
    },
    sectionTitle: {
      color: colors.text,
      fontSize: textSizes.large,
      fontWeight: '600',
      marginBottom: 16,
    },
    /* Tools card */
    toolCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: isDarkMode ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 2,
      minHeight: 44,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
    },
    interactiveCard: {
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        android: {
          elevation: 4,
        },
      }),
    },
    toolHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    iconContainer: {
      width: 44,
      height: 44,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    titleContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    toolTitle: {
      fontSize: textSizes.large,
      fontWeight: '600',
      flexShrink: 1,
      color: colors.text,
    },
    badge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      backgroundColor: isDarkMode ? colors.surface : '#E8F1FF',
    },
    badgeText: {
      fontSize: textSizes.small,
      fontWeight: '500',
      color: isDarkMode ? colors.primary : '#0055CC',
    },
    linkIcon: {
      marginLeft: 8,
    },
    toolDescription: {
      fontSize: textSizes.small + 1,
      lineHeight: 20,
      marginBottom: 12,
      color: colors.textSecondary,
    },
    featureList: {
      gap: 8,
    },
    featureItem: {
      fontSize: textSizes.small + 1,
      lineHeight: 20,
      paddingLeft: 8,
      color: colors.textSecondary,
    },
  };

  /*
   * 6) Render a single tool card
   */
  const renderToolCard = (tool: any) => {
    const CardComponent = tool.link ? TouchableOpacity : View;
    const cardProps = tool.link
      ? {
          onPress: () => handleToolPress(tool.id, tool.title),
          accessibilityRole: 'button' as const,
          accessibilityLabel: `${tool.title}. ${tool.description}`,
          accessibilityHint: 'Double tap to open documentation',
          style: [
            themedStyles.toolCard,
            tool.link && themedStyles.interactiveCard,
          ],
        }
      : {
          accessibilityRole: 'text' as const,
          style: [themedStyles.toolCard],
        };

    return (
      <CardComponent key={tool.id} {...cardProps}>
        {/* Header with icon + title + optional badge + link icon */}
        <View style={themedStyles.toolHeader}>
          <View
            style={[
              themedStyles.iconContainer,
              { backgroundColor: tool.iconBg },
            ]}
            importantForAccessibility="no"
          >
            <Ionicons
              name={tool.icon}
              size={24}
              color={tool.iconColor}
              accessibilityElementsHidden
            />
          </View>

          <View style={themedStyles.titleContainer}>
            <Text style={themedStyles.toolTitle}>{tool.title}</Text>
            {tool.badge && (
              <View style={themedStyles.badge} importantForAccessibility="no">
                <Text style={themedStyles.badgeText}>{tool.badge}</Text>
              </View>
            )}
          </View>

          {tool.link && (
            <Ionicons
              name="open-outline"
              size={20}
              color={colors.primary}
              style={themedStyles.linkIcon}
              accessibilityElementsHidden
            />
          )}
        </View>

        {/* Description */}
        <Text style={themedStyles.toolDescription}>{tool.description}</Text>

        {/* Features */}
        <View style={themedStyles.featureList}>
          {tool.features.map((feature: string, index: number) => (
            <Text key={index} style={themedStyles.featureItem}>
              • {feature}
            </Text>
          ))}
        </View>
      </CardComponent>
    );
  };

  /*
   * 7) Render each section (e.g., "Screen Readers", "Development Tools")
   */
  const renderSection = (sectionTitle: string, sectionTools: any[]) => (
    <View key={sectionTitle} style={themedStyles.section}>
      <Text style={themedStyles.sectionTitle} accessibilityRole="header">
        {sectionTitle}
      </Text>
      {sectionTools.map((tool) => renderToolCard(tool))}
    </View>
  );

  /*
   * 8) Render screen
   */
  return (
    <LinearGradient
      colors={gradientColors}
      style={themedStyles.container}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        accessibilityRole="scrollview"
        accessibilityLabel="Testing Tools Screen"
      >
        {/* HERO CARD */}
        <View style={themedStyles.heroCard}>
          <Text style={themedStyles.heroTitle} accessibilityRole="header">
            Testing Tools
          </Text>
          <Text style={themedStyles.heroSubtitle}>
            Essential tools for testing accessibility in your mobile applications
          </Text>
        </View>

        {/* Sections (Screen Readers, Development Tools, Testing Checklist, etc.) */}
        {Object.entries(groupedTools).map(([section, sectionTools]) =>
          renderSection(section, sectionTools)
        )}
      </ScrollView>
    </LinearGradient>
  );
}
