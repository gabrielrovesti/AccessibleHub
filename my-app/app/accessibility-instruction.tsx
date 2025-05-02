import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, AccessibilityInfo, Platform, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const communityProjects = [
  {
    id: 'project1',
    name: 'ESLint A11y Plugin',
    description: 'Static analysis tool that catches accessibility issues in your React Native apps during development.',
    contributors: 237,
    issuesCount: 14,
    icon: 'code-slash-outline',
    tags: ['linting', 'static-analysis', 'open-source'],
    link: 'https://github.com/FormidableLabs/eslint-plugin-react-native-a11y',
  },
  {
    id: 'project2',
    name: 'React Native Testing Library',
    description: 'Solution for testing React Native components that encourages good accessibility practices.',
    contributors: 112,
    issuesCount: 23,
    icon: 'construct-outline',
    tags: ['testing', 'automation', 'integration'],
    link: 'https://callstack.github.io/react-native-testing-library/',
  },
];

const successStories = [
  {
    id: 'inspire1',
    title: 'Complex UI Focus Management',
    author: 'React Native Core Team',
    excerpt: 'Managing focus in a multi-step form or wizard can be tricky. Use setAccessibilityFocus after each step to keep screen reader users oriented.',
    snippet: `// Example: Wizard step focusing
function goToNextStep(ref) {
  // ... update state to show next step
  AccessibilityInfo.announceForAccessibility('Step 2 of 3');
  const node = findNodeHandle(ref.current);
  if (node) {
    AccessibilityInfo.setAccessibilityFocus(node);
  }
}`,
  },
  {
    id: 'inspire2',
    title: 'Success Story: Netflix',
    author: 'Accessibility Research Team',
    excerpt: 'Netflix invests in robust subtitles, keyboard navigation, and audio descriptions to ensure content is available to everyone. Their success shows how accessibility broadens reach and user satisfaction.',
    snippet: `// Not actual Netflix code, just a conceptual snippet
<Video
  accessible
  accessibilityLabel="Playing: Your chosen show"
  accessibilityHint="Double tap to pause or play"
/>`,
  },
  {
    id: 'inspire3',
    title: 'Reduced Motion & Inclusive Animations',
    author: 'React Native Community',
    excerpt: 'Allow users to disable or reduce motion. React Native can respect OS-level reduce-motion settings, or provide a manual toggle.',
    snippet: `// Example: Checking prefers-reduced-motion
import { useColorScheme, AccessibilityInfo } from 'react-native';

useEffect(() => {
  AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
    if (enabled) {
      // Provide alternative UI or limit animations
    }
  });
}, []);`,
  },
];

const communityChannels = [
  {
    id: 'channel1',
    name: 'A11y Stack Exchange',
    members: '8.7K+',
    description: 'Q&A platform with tagged questions specific to React Native accessibility challenges.',
    icon: 'help-circle-outline',
    link: 'https://stackoverflow.com/questions/tagged/react-native+accessibility',
  },
  {
    id: 'channel2',
    name: 'Accessibility Twitter Community',
    members: '15K+',
    description: 'Follow the #ReactNativeA11y hashtag to stay updated with the latest discussions.',
    icon: 'logo-twitter',
    link: 'https://twitter.com/hashtag/ReactNativeA11y',
  },
];

function CollapsiblePreview({
  title,
  excerpt,
  snippet,
  isExpanded,
  onPress,
}) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${excerpt}`}
      style={{ marginBottom: 16 }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
        <Text style={{ fontWeight: '600', fontSize: 16, color: colors.text }}>{title}</Text>
        <Ionicons
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={colors.primary}
        />
      </View>
      <Text style={{ color: colors.textSecondary, fontSize: 14, lineHeight: 20 }}>{excerpt}</Text>

      {isExpanded && snippet && (
        <View style={{
          backgroundColor: colors.isDarkMode ? '#2c2c2e' : '#f8f8f8',
          borderRadius: 8,
          padding: 8,
          marginTop: 8
        }}>
          {snippet.split('\n').map((line, idx) => (
            <Text
              key={idx}
              style={{
                fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
                fontSize: 12,
                color: colors.isDarkMode ? '#e0e0e0' : '#333',
              }}
            >
              {line || ' '}
            </Text>
          ))}
        </View>
      )}

      <Text style={{ marginTop: 6, fontWeight: '600', color: colors.primary }}>
        {isExpanded ? 'Hide Details' : 'Show Details'}
      </Text>
    </TouchableOpacity>
  );
}

function ProjectCard({ project, colors, textSizes, onPress }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.surface,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      }}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${project.name}. ${project.description}`}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: colors.primary + '20',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
          }}
        >
          <Ionicons name={project.icon} size={24} color={colors.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: textSizes.medium,
              fontWeight: '700',
              color: colors.text,
              marginBottom: 2,
            }}
          >
            {project.name}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="people-outline" size={14} color={colors.textSecondary} />
            <Text
              style={{
                fontSize: textSizes.xsmall,
                color: colors.textSecondary,
                marginLeft: 4,
                marginRight: 12,
              }}
            >
              {project.contributors} contributors
            </Text>
            <Ionicons name="git-branch-outline" size={14} color={colors.textSecondary} />
            <Text
              style={{
                fontSize: textSizes.xsmall,
                color: colors.textSecondary,
                marginLeft: 4,
              }}
            >
              {project.issuesCount} open issues
            </Text>
          </View>
        </View>
      </View>
      <Text
        style={{
          fontSize: textSizes.small,
          color: colors.text,
          lineHeight: 20,
          marginBottom: 12,
        }}
      >
        {project.description}
      </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {project.tags.map((tag) => (
          <View
            key={tag}
            style={{
              backgroundColor: colors.primary + '15',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 12,
              marginRight: 8,
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                fontSize: textSizes.xsmall,
                color: colors.primary,
                fontWeight: '500',
              }}
            >
              {tag}
            </Text>
          </View>
        ))}
      </View>
      <View
        style={{
          marginTop: 8,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.primary,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 8,
          }}
          onPress={onPress}
          accessibilityRole="button"
          accessibilityLabel={`Contribute to ${project.name}`}
        >
          <Ionicons name="code-outline" size={16} color="#fff" />
          <Text
            style={{
              fontSize: textSizes.small,
              fontWeight: '600',
              color: '#fff',
              marginLeft: 6,
            }}
          >
            Contribute
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

function EventCard({ event, colors, textSizes, onPress }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.surface,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      }}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${event.title} on ${event.date}`}
    >
      <Text
        style={{
          fontSize: textSizes.medium,
          fontWeight: '700',
          color: colors.text,
          marginBottom: 8,
        }}
      >
        {event.title}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Ionicons name="calendar-outline" size={16} color={colors.primary} />
        <Text
          style={{
            fontSize: textSizes.small,
            color: colors.textSecondary,
            fontWeight: '500',
            marginLeft: 6,
          }}
        >
          {event.date}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <Ionicons name="location-outline" size={16} color={colors.primary} />
        <Text
          style={{
            fontSize: textSizes.small,
            color: colors.textSecondary,
            fontWeight: '500',
            marginLeft: 6,
          }}
        >
          {event.format}
        </Text>
      </View>
      <Text
        style={{
          fontSize: textSizes.small,
          color: colors.text,
          lineHeight: 20,
          marginBottom: 12,
        }}
      >
        {event.description}
      </Text>
      <View
        style={{
          marginTop: 8,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.primary,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 8,
          }}
          onPress={onPress}
          accessibilityRole="button"
          accessibilityLabel={`Register for ${event.title}`}
        >
          <Ionicons name="calendar-outline" size={16} color="#fff" />
          <Text
            style={{
              fontSize: textSizes.small,
              fontWeight: '600',
              color: '#fff',
              marginLeft: 6,
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

function ChannelCard({ channel, colors, textSizes, onPress }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.surface,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${channel.name} with ${channel.members} members`}
    >
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: colors.primary + '20',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 12,
        }}
      >
        <Ionicons name={channel.icon} size={24} color={colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: textSizes.medium,
            fontWeight: '600',
            color: colors.text,
            marginBottom: 4,
          }}
        >
          {channel.name}
        </Text>
        <Text
          style={{
            fontSize: textSizes.small,
            color: colors.textSecondary,
            marginBottom: 4,
          }}
        >
          {channel.members} members
        </Text>
        <Text
          style={{
            fontSize: textSizes.small,
            color: colors.text,
            lineHeight: 18,
          }}
        >
          {channel.description}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.primary} />
    </TouchableOpacity>
  );
}

export default function CommunityScreen() {
  const { colors, textSizes, isDarkMode } = useTheme();
  const { width } = useWindowDimensions();

  const [expandedStoryId, setExpandedStoryId] = useState(null);

  const openLink = async (url) => {
    if (await Linking.canOpenURL(url)) {
      await Linking.openURL(url);
      AccessibilityInfo.announceForAccessibility('Opening link');
    }
  };

  const gradientColors = isDarkMode
    ? [colors.background, '#1a1a1d']
    : ['#f5f7fa', colors.background];

  const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: { paddingBottom: 24 },
    heroCard: {
      backgroundColor: colors.primary + '15',
      margin: 16,
      padding: 24,
      borderRadius: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
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
      lineHeight: 22,
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: textSizes.large,
      fontWeight: '700',
      color: colors.text,
      marginHorizontal: 16,
      marginTop: 24,
      marginBottom: 16,
    },
    contentContainer: {
      marginHorizontal: 16,
    },
    callToAction: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 8,
      alignSelf: 'flex-start',
    },
    callToActionText: {
      fontSize: textSizes.small,
      fontWeight: '600',
      color: '#fff',
      marginLeft: 8,
    },
    sectionDivider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 24,
      marginHorizontal: 16,
    },
    highlightedContainer: {
      backgroundColor: colors.primary + '10',
      borderRadius: 16,
      padding: 16,
      marginHorizontal: 16,
      marginBottom: 24,
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
    },
    highlightedText: {
      fontSize: textSizes.medium,
      color: colors.text,
      fontWeight: '500',
      fontStyle: 'italic',
      lineHeight: 22,
    },
    storiesContainer: {
      marginHorizontal: 16,
      marginBottom: 16,
      padding: 16,
      backgroundColor: colors.surface,
      borderRadius: 16,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
  });

  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        accessibilityRole="scrollview"
        accessibilityLabel="Accessibility Community Screen"
      >

        <View style={styles.heroCard}>
          <Text style={styles.heroTitle} accessibilityRole="header">
            Join the A11y Community
          </Text>
          <Text style={styles.heroSubtitle}>
            Connect with developers committed to making React Native accessible for everyone.
            Share, learn, and contribute to projects that create inclusive mobile experiences.
          </Text>
          <TouchableOpacity
            style={styles.callToAction}
            onPress={() => openLink('https://github.com/facebook/react-native/labels/Accessibility')}
            accessibilityRole="button"
            accessibilityLabel="Explore open accessibility issues"
          >
            <Ionicons name="code-working-outline" size={18} color="#fff" />
            <Text style={styles.callToActionText}>Explore Open Issues</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Projects Seeking Contributors</Text>
        <View style={styles.contentContainer}>
          {communityProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              colors={colors}
              textSizes={textSizes}
              onPress={() => openLink(project.link)}
            />
          ))}
        </View>

        <View style={styles.sectionDivider} />

        <Text style={styles.sectionTitle}>Learning Resources</Text>
        <View style={styles.contentContainer}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.surface,
              borderRadius: 16,
              padding: 16,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: colors.border,
              flexDirection: 'row',
            }}
            onPress={() => openLink('https://reactnative.dev/docs/accessibility')}
            accessibilityRole="button"
            accessibilityLabel="Official React Native Accessibility Documentation"
          >
            <View style={{ marginRight: 16 }}>
              <Ionicons name="document-text-outline" size={36} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: textSizes.medium, fontWeight: '600', color: colors.text, marginBottom: 4 }}>
                Official Documentation
              </Text>
              <Text style={{ fontSize: textSizes.small, color: colors.text, lineHeight: 20 }}>
                The comprehensive guide to implementing accessibility features in React Native apps directly from the source.
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: colors.surface,
              borderRadius: 16,
              padding: 16,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: colors.border,
              flexDirection: 'row',
            }}
            onPress={() => openLink('https://reactnative.dev/community/building-accessibility')}
            accessibilityRole="button"
            accessibilityLabel="React Native Community Accessibility Guidelines"
          >
            <View style={{ marginRight: 16 }}>
              <Ionicons name="people-outline" size={36} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: textSizes.medium, fontWeight: '600', color: colors.text, marginBottom: 4 }}>
                Community Guidelines
              </Text>
              <Text style={{ fontSize: textSizes.small, color: colors.text, lineHeight: 20 }}>
                Official community-driven guidelines for implementing and testing accessible React Native applications.
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionDivider} />

        <Text style={styles.sectionTitle}>Inspiration Examples</Text>
        <View style={styles.storiesContainer}>
          {successStories.map((story) => {
            const isExpanded = expandedStoryId === story.id;
            return (
              <View key={story.id} style={{ marginBottom: 16 }}>
                <CollapsiblePreview
                  title={story.title}
                  excerpt={story.excerpt}
                  snippet={story.snippet}
                  isExpanded={isExpanded}
                  onPress={() => {
                    setExpandedStoryId(isExpanded ? null : story.id);
                    AccessibilityInfo.announceForAccessibility(
                      isExpanded ? `${story.title} collapsed` : `${story.title} expanded`
                    );
                  }}
                />
                <Text
                  style={{
                    fontSize: textSizes.small,
                    color: colors.textSecondary,
                    marginTop: 4,
                    fontStyle: 'italic',
                  }}
                >
                  By {story.author}
                </Text>
                {isExpanded && story.fullStory && (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 12,
                    }}
                    onPress={() => openLink(story.fullStory)}
                    accessibilityRole="button"
                    accessibilityLabel={`Read full story by ${story.author}`}
                  >
                    <Ionicons name="book-outline" size={16} color={colors.primary} />
                    <Text
                      style={{
                        fontSize: textSizes.small,
                        fontWeight: '600',
                        color: colors.primary,
                        marginLeft: 6,
                      }}
                    >
                      Read Full Story
                    </Text>
                  </TouchableOpacity>
                )}
                {story.id !== successStories[successStories.length - 1].id && (
                  <View
                    style={{
                      height: 1,
                      backgroundColor: colors.border,
                      marginVertical: 16,
                    }}
                  />
                )}
              </View>
            );
          })}
        </View>

        <View style={styles.sectionDivider} />

        <Text style={styles.sectionTitle}>Join Community Channels</Text>
        <View style={styles.contentContainer}>
          {communityChannels.map((channel) => (
            <ChannelCard
              key={channel.id}
              channel={channel}
              colors={colors}
              textSizes={textSizes}
              onPress={() => openLink(channel.link)}
            />
          ))}
        </View>

        <View
          style={{
            backgroundColor: colors.primary + '20',
            marginTop: 24,
            padding: 24,
          }}
        >
          <Text
            style={{
              fontSize: textSizes.large,
              fontWeight: '700',
              color: colors.text,
              marginBottom: 12,
            }}
          >
            Developer Toolkit
          </Text>
          <Text
            style={{
              fontSize: textSizes.medium,
              color: colors.textSecondary,
              marginBottom: 16,
              lineHeight: 22,
            }}
          >
            Essential resources to improve accessibility in your next React Native project:
          </Text>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>

            <TouchableOpacity
              style={{
                backgroundColor: colors.surface,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
                borderWidth: 1,
                borderColor: colors.border,
                width: '48%',
              }}
              onPress={() => openLink('https://developer.apple.com/accessibility/ios/')}
              accessibilityRole="button"
              accessibilityLabel="Apple iOS Accessibility Guidelines"
            >
              <Ionicons name="logo-apple" size={24} color={colors.primary} style={{ marginBottom: 8 }} />
              <Text style={{ fontSize: textSizes.small, fontWeight: '600', color: colors.text, marginBottom: 4 }}>
                iOS Guidelines
              </Text>
              <Text style={{ fontSize: textSizes.xsmall, color: colors.textSecondary }}>
                Apple's official accessibility guidelines and best practices
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: colors.surface,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
                borderWidth: 1,
                borderColor: colors.border,
                width: '48%',
              }}
              onPress={() => openLink('https://developer.android.com/guide/topics/ui/accessibility')}
              accessibilityRole="button"
              accessibilityLabel="Android Accessibility Guidelines"
            >
              <Ionicons name="logo-android" size={24} color={colors.primary} style={{ marginBottom: 8 }} />
              <Text style={{ fontSize: textSizes.small, fontWeight: '600', color: colors.text, marginBottom: 4 }}>
                Android Guidelines
              </Text>
              <Text style={{ fontSize: textSizes.xsmall, color: colors.textSecondary }}>
                Google's official accessibility documentation and best practices
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}