import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const FrameworkComparisonScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('overview');
  const [selectedFramework, setSelectedFramework] = useState('react-native');
  const { colors, textSizes, isDarkMode } = useTheme();

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
      description: 'A framework for building multi-platform applications using Dart',
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

  const categories = [
    { id: 'overview', label: 'Overview', icon: 'information-circle' },
    { id: 'accessibility', label: 'Accessibility', icon: 'eye' },
    { id: 'performance', label: 'Performance', icon: 'speedometer' },
    { id: 'development', label: 'Development', icon: 'code-slash' }
  ];

  const renderRatingBar = (rating) => {
    const maxRating = 5;
    const filledWidth = (rating / maxRating) * 100;

    return (
      <View style={styles.ratingContainer}>
        <View style={styles.ratingBar}>
          <View style={[styles.ratingFilled, { width: `${filledWidth}%`, backgroundColor: colors.primary }]} />
        </View>
        <Text style={[styles.ratingText, { color: colors.primary }]}>{rating.toFixed(1)}</Text>
      </View>
    );
  };

  const themedStyles = {
    container: {
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.surface,
      borderBottomColor: colors.border,
    },
    headerTitle: {
      color: colors.text,
      fontSize: textSizes.xlarge,
    },
    headerDescription: {
      color: colors.textSecondary,
      fontSize: textSizes.medium,
    },
    frameworkButton: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
    frameworkButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    frameworkButtonText: {
      color: colors.text,
    },
    frameworkButtonTextActive: {
      color: colors.background,
    },
    categoryTab: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
    categoryTabActive: {
      backgroundColor: colors.primaryLight,
      borderColor: colors.primary,
    },
    categoryTabText: {
      color: colors.textSecondary,
    },
    categoryTabTextActive: {
      color: colors.primary,
    },
    infoCard: {
      backgroundColor: colors.surface,
    },
    frameworkName: {
      color: colors.text,
    },
    companyName: {
      color: colors.textSecondary,
    },
    version: {
      color: colors.primary,
    },
    description: {
      color: colors.textSecondary,
    },
    statItem: {
      backgroundColor: colors.surface,
    },
    statLabel: {
      color: colors.textSecondary,
    },
    statValue: {
      color: colors.text,
    },
    accessibilityCard: {
      backgroundColor: colors.surface,
    },
    cardTitle: {
      color: colors.text,
    },
    platformText: {
      color: colors.textSecondary,
    },
    supportText: {
      color: colors.textSecondary,
    },
    featureText: {
      color: colors.textSecondary,
    },
    performanceCard: {
      backgroundColor: colors.surface,
    },
    performanceLabel: {
      color: colors.textSecondary,
    },
    performanceValue: {
      color: colors.text,
    },
    performanceRating: {
      backgroundColor: colors.surface,
    },
    ratingLabel: {
      color: colors.text,
    },
    developmentCard: {
      backgroundColor: colors.surface,
    },
    toolLabel: {
      color: colors.textSecondary,
    },
    toolValue: {
      color: colors.text,
    },
  };

  const renderFrameworkSelection = () => (
    <View style={styles.frameworkSelection}>
      {Object.keys(frameworkData).map((fw) => (
        <TouchableOpacity
          key={fw}
          style={[
            styles.frameworkButton,
            selectedFramework === fw && styles.frameworkButtonActive,
            themedStyles.frameworkButton,
            selectedFramework === fw && themedStyles.frameworkButtonActive,
          ]}
          onPress={() => setSelectedFramework(fw)}
        >
          <Text
            style={[
              styles.frameworkButtonText,
              selectedFramework === fw && styles.frameworkButtonTextActive,
              themedStyles.frameworkButtonText,
              selectedFramework === fw && themedStyles.frameworkButtonTextActive,
            ]}
          >
            {frameworkData[fw].name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

    const renderCategoryTabs = () => (
      <View style={styles.categoryTabs}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 12}}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryTab,
                selectedCategory === category.id && styles.categoryTabActive
              ]}
              onPress={() => setSelectedCategory(category.id)}
              accessibilityRole="tab"
              accessibilityState={{ selected: selectedCategory === category.id }}
            >
              <Ionicons name={category.icon} size={20} color={colors.primary} />
              <Text style={styles.categoryTabText}>{category.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );

  const renderOverviewSection = () => {
    const framework = frameworkData[selectedFramework];
    return (
      <View style={styles.section}>
        <View style={[styles.infoCard, themedStyles.infoCard]}>
          <Text style={[styles.frameworkName, themedStyles.frameworkName]}>{framework.name}</Text>
          <Text style={[styles.companyName, themedStyles.companyName]}>by {framework.company}</Text>
          <Text style={[styles.version, themedStyles.version]}>Version {framework.version}</Text>
          <Text style={[styles.description, themedStyles.description]}>{framework.description}</Text>
        </View>

        <View style={styles.quickStats}>
          <View style={[styles.statItem, themedStyles.statItem]}>
            <Ionicons name="code-slash" size={24} color={colors.primary} />
            <Text style={[styles.statLabel, themedStyles.statLabel]}>Language</Text>
            <Text style={[styles.statValue, themedStyles.statValue]}>{framework.development.language}</Text>
          </View>
          <View style={[styles.statItem, themedStyles.statItem]}>
            <Ionicons name="trending-up" size={24} color={colors.primary} />
            <Text style={[styles.statLabel, themedStyles.statLabel]}>Learning Curve</Text>
            <Text style={[styles.statValue, themedStyles.statValue]}>{framework.development.learning}</Text>
          </View>
          <View style={[styles.statItem, themedStyles.statItem]}>
            <Ionicons name="flash" size={24} color={colors.primary} />
            <Text style={[styles.statLabel, themedStyles.statLabel]}>Hot Reload</Text>
            <Text style={[styles.statValue, themedStyles.statValue]}>{framework.development.hot ? 'Yes' : 'No'}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderAccessibilitySection = () => {
    const framework = frameworkData[selectedFramework];
    return (
      <View style={styles.section}>
        <View style={[styles.accessibilityCard, themedStyles.accessibilityCard]}>
          <Text style={[styles.cardTitle, themedStyles.cardTitle]}>Screen Reader Support</Text>
          <View style={styles.platformSupport}>
            <View style={styles.platformItem}>
              <Ionicons name="logo-apple" size={24} color={isDarkMode ? colors.text : '#000'} />
              <Text style={[styles.platformText, themedStyles.platformText]}>{framework.accessibility.screenReaders.ios}</Text>
            </View>
            <View style={styles.platformItem}>
              <Ionicons name="logo-android" size={24} color={isDarkMode ? colors.text : '#3DDC84'} />
              <Text style={[styles.platformText, themedStyles.platformText]}>{framework.accessibility.screenReaders.android}</Text>
            </View>
          </View>
          {renderRatingBar(framework.accessibility.screenReaders.rating)}
        </View>

        <View style={[styles.accessibilityCard, themedStyles.accessibilityCard]}>
          <Text style={[styles.cardTitle, themedStyles.cardTitle]}>Semantic Support</Text>
          <Text style={[styles.supportText, themedStyles.supportText]}>{framework.accessibility.semantics.support}</Text>
          <View style={styles.featureList}>
            {framework.accessibility.semantics.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color="#28A745" />
                <Text style={[styles.featureText, themedStyles.featureText]}>{feature}</Text>
              </View>
            ))}
          </View>
          {renderRatingBar(framework.accessibility.semantics.rating)}
        </View>

        <View style={[styles.accessibilityCard, themedStyles.accessibilityCard]}>
          <Text style={[styles.cardTitle, themedStyles.cardTitle]}>Focus Management</Text>
          <Text style={[styles.supportText, themedStyles.supportText]}>{framework.accessibility.focusManagement.support}</Text>
          <View style={styles.featureList}>
{framework.accessibility.focusManagement.features.map((feature, index) => (
    <View key={index} style={styles.featureItem}>
      <Ionicons name="checkmark-circle" size={20} color="#28A745" />
      <Text style={[styles.featureText, themedStyles.featureText]}>{feature}</Text>
    </View>
  ))}
</View>
{renderRatingBar(framework.accessibility.focusManagement.rating)}
</View>
</View>
);
};

const renderPerformanceSection = () => {
  const framework = frameworkData[selectedFramework];
  return (
    <View style={styles.section}>
      <View style={[styles.performanceCard, themedStyles.performanceCard]}>
        <View style={styles.performanceItem}>
          <Ionicons name="timer-outline" size={24} color={colors.primary} />
          <View style={styles.performanceInfo}>
            <Text style={[styles.performanceLabel, themedStyles.performanceLabel]}>Startup Time</Text>
            <Text style={[styles.performanceValue, themedStyles.performanceValue]}>{framework.performance.startupTime}</Text>
          </View>
        </View>
        <View style={styles.performanceItem}>
          <Ionicons name="hardware-chip-outline" size={24} color={colors.primary} />
          <View style={styles.performanceInfo}>
            <Text style={[styles.performanceLabel, themedStyles.performanceLabel]}>Memory Usage</Text>
            <Text style={[styles.performanceValue, themedStyles.performanceValue]}>{framework.performance.memoryUsage}</Text>
          </View>
        </View>
        <View style={styles.performanceItem}>
          <Ionicons name="archive-outline" size={24} color={colors.primary} />
          <View style={styles.performanceInfo}>
            <Text style={[styles.performanceLabel, themedStyles.performanceLabel]}>Bundle Size</Text>
            <Text style={[styles.performanceValue, themedStyles.performanceValue]}>{framework.performance.bundleSize}</Text>
          </View>
        </View>
      </View>
      <View style={[styles.performanceRating, themedStyles.performanceRating]}>
        <Text style={[styles.ratingLabel, themedStyles.ratingLabel]}>Overall Performance Rating</Text>
        {renderRatingBar(framework.performance.rating)}
      </View>
    </View>
  );
};

const renderDevelopmentSection = () => {
  const framework = frameworkData[selectedFramework];
  return (
    <View style={styles.section}>
      <View style={[styles.developmentCard, themedStyles.developmentCard]}>
        <Text style={[styles.cardTitle, themedStyles.cardTitle]}>Development Tools</Text>
        <View style={styles.toolList}>
          <View style={styles.toolItem}>
            <Ionicons name="construct-outline" size={24} color={colors.primary} />
            <View style={styles.toolInfo}>
              <Text style={[styles.toolLabel, themedStyles.toolLabel]}>Testing Framework</Text>
              <Text style={[styles.toolValue, themedStyles.toolValue]}>{framework.development.testing}</Text>
            </View>
          </View>
          <View style={styles.toolItem}>
            <Ionicons name="bug-outline" size={24} color={colors.primary} />
            <View style={styles.toolInfo}>
              <Text style={[styles.toolLabel, themedStyles.toolLabel]}>Debugging Tools</Text>
              <Text style={[styles.toolValue, themedStyles.toolValue]}>{framework.development.debugging}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

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
  <ScrollView style={[styles.container, themedStyles.container]}>
    <View style={[styles.header, themedStyles.header]}>
      <Text style={[styles.headerTitle, themedStyles.headerTitle]}>Framework Comparison</Text>
      <Text style={[styles.headerDescription, themedStyles.headerDescription]}>
        Compare key features and capabilities of popular mobile development frameworks
      </Text>
    </View>

    {renderFrameworkSelection()}
    {renderCategoryTabs()}
    {renderContent()}
  </ScrollView>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    width: '100%',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginBottom: 8,
  },
  headerDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  frameworkSelection: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  frameworkButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  frameworkButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  frameworkButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1c1c1e',
  },
  frameworkButtonTextActive: {
    color: '#fff',
  },
  categoryTabs: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '100%',
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    borderRadius: 20,
    minWidth: 80,
    gap: 4,
  },
  performanceSection: {
    flex: 1,
    paddingHorizontal: 16,
  },
  categoryTabActive: {
    backgroundColor: '#E8F1FF',
    borderColor: '#007AFF',
  },
  categoryTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    flexShrink: 1,
  },
  categoryTabTextActive: {
    color: '#007AFF',
  },
  section: {
    padding: 16,
    gap: 16,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  frameworkName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  version: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  quickStats: {
    flexDirection: 'row',
    gap: 12,
  },
  statItem: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1c1e',
  },
  accessibilityCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1c1c1e',
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
    fontSize: 14,
    color: '#444',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ratingBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  ratingFilled: {
    height: '100%',
    backgroundColor: '#007AFF',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    minWidth: 32,
    textAlign: 'right',
  },
  supportText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  featureList: {
    marginBottom: 16,
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#444',
  },
  performanceCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
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
  performanceRating: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 12,
  },
  developmentCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  toolList: {
    gap: 16,
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

export default FrameworkComparisonScreen;