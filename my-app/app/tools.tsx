import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, AccessibilityInfo, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const TOOL_LINKS = {
  'accessibility-inspector': 'https://docs.expo.dev/debugging/tools/#accessibility-inspector',
  'contrast-analyzer': 'https://developer.android.com/studio/debug/dev-options#drawing',
  'talkback': 'https://support.google.com/accessibility/android/answer/6283677',
  'voiceover': 'https://support.apple.com/guide/iphone/turn-on-and-practice-voiceover-iph3e2e415f/ios',
  'checklist': 'https://developer.android.com/guide/topics/ui/accessibility/testing'
};

export default function TestingToolsScreen() {
  const { colors, textSizes, isDarkMode } = useTheme();

  const handleToolPress = async (toolId: string, toolName: string) => {
    const url = TOOL_LINKS[toolId];
    if (url && await Linking.canOpenURL(url)) {
      try {
        await Linking.openURL(url);
        AccessibilityInfo.announceForAccessibility(`Opening documentation for ${toolName}`);
      } catch (error) {
        AccessibilityInfo.announceForAccessibility('Failed to open documentation');
      }
    }
  };

  const tools = [
    {
      id: 'talkback',
      section: 'Screen Readers',
      title: 'TalkBack (Android)',
      description: 'Android\'s built-in screen reader. Essential gestures:',
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
      description: 'iOS\'s integrated screen reader. Key gestures:',
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

  const renderToolCard = (tool) => {
    const CardComponent = tool.link ? TouchableOpacity : View;
    const cardProps = tool.link ? {
      onPress: () => handleToolPress(tool.id, tool.title),
      accessibilityRole: "button",
      accessibilityLabel: `${tool.title}. ${tool.description}`,
      accessibilityHint: "Double tap to open documentation",
      style: [
        styles.toolCard,
        { backgroundColor: colors.surface },
        tool.link && styles.interactiveCard
      ]
    } : {
      accessibilityRole: "text",
      style: [styles.toolCard, { backgroundColor: colors.surface }]
    };

    return (
      <CardComponent key={tool.id} {...cardProps}>
        <View style={styles.toolHeader}>
          <View
            style={[styles.iconContainer, { backgroundColor: tool.iconBg }]}
            importantForAccessibility="no"
          >
            <Ionicons
              name={tool.icon}
              size={24}
              color={tool.iconColor}
              accessibilityElementsHidden={true}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={[styles.toolTitle, { color: colors.text }]}>
              {tool.title}
            </Text>
            {tool.badge && (
              <View
                style={[styles.badge, {
                  backgroundColor: isDarkMode ? colors.surface : '#E8F1FF'
                }]}
                importantForAccessibility="no"
              >
                <Text
                  style={[styles.badgeText, {
                    color: isDarkMode ? colors.primary : '#0055CC'
                  }]}
                >
                  {tool.badge}
                </Text>
              </View>
            )}
          </View>
          {tool.link && (
            <Ionicons
              name="open-outline"
              size={20}
              color={colors.primary}
              style={styles.linkIcon}
              accessibilityElementsHidden={true}
            />
          )}
        </View>

        <Text
          style={[styles.toolDescription, { color: colors.textSecondary }]}
          accessibilityRole="text"
        >
          {tool.description}
        </Text>

        <View style={styles.featureList}>
          {tool.features.map((feature, index) => (
            <Text
              key={index}
              style={[styles.featureItem, { color: colors.textSecondary }]}
              accessibilityRole="text"
            >
              • {feature}
            </Text>
          ))}
        </View>
      </CardComponent>
    );
  };

  const renderSection = (sectionTitle, sectionTools) => (
    <View key={sectionTitle} style={styles.section}>
      <Text
        style={[styles.sectionTitle, { color: colors.text }]}
        accessibilityRole="header"
      >
        {sectionTitle}
      </Text>
      {sectionTools.map(tool => renderToolCard(tool))}
    </View>
  );

  const groupedTools = tools.reduce((acc, tool) => {
    if (!acc[tool.section]) {
      acc[tool.section] = [];
    }
    acc[tool.section].push(tool);
    return acc;
  }, {});

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      accessibilityRole="scrollview"
      accessibilityLabel="Testing Tools Screen"
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={[styles.header, {
        backgroundColor: colors.surface,
        borderBottomColor: colors.border
      }]}>
        <Text
          style={[styles.title, { color: colors.text }]}
          accessibilityRole="header"
        >
          Testing Tools
        </Text>
        <Text
          style={[styles.description, { color: colors.textSecondary }]}
          accessibilityRole="text"
        >
          Essential tools for testing accessibility in your mobile applications
        </Text>
      </View>

      {Object.entries(groupedTools).map(([section, sectionTools]) =>
        renderSection(section, sectionTools)
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  toolCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    minHeight: 44,
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
    fontSize: 18,
    fontWeight: '600',
    flexShrink: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  toolDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  featureList: {
    gap: 8,
  },
  featureItem: {
    fontSize: 14,
    lineHeight: 20,
    paddingLeft: 8,
  },
  linkIcon: {
    marginLeft: 8,
  }
});