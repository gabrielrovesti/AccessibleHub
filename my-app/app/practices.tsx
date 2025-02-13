import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';

export default function BestPracticesScreen() {
  const [selectedGuide, setSelectedGuide] = useState(null);
  const router = useRouter();
  const { colors, textSizes, isDarkMode } = useTheme();

  const themedStyles = {
    // Layout & Container styles
    container: {
      backgroundColor: colors.background,
      flex: 1,
    },
    header: {
      backgroundColor: colors.surface,
      borderBottomColor: colors.border,
      paddingVertical: 20,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
    },
    section: {
      padding: 16,
      gap: 12,
    },

    // Typography
    title: {
      color: colors.text,
      fontSize: textSizes.xlarge,
      fontWeight: '700',
      marginBottom: 8,
    },
    description: {
      color: colors.textSecondary,
      fontSize: textSizes.medium,
      lineHeight: 24,
    },

    // Card Styles
    card: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      marginBottom: 8,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDarkMode ? 0.15 : 0.08,
      shadowRadius: 8,
      elevation: 3,
    },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 12,
      padding: 12,
    },

    // Icon Styles
      iconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
      },
    iconColors: {
      wcag: {
        bg: '#E8F1FF',
        icon: '#0055CC',
      },
      semantic: {
        bg: '#F0F7FF',
        icon: '#0070F3',
      },
      gesture: {
        bg: '#FFF4E6',
        icon: '#FF8C00',
      },
      screenReader: {
        bg: '#E6F4FF',
        icon: '#0066CC',
      },
      navigation: {
        bg: '#E6FFE6',
        icon: '#28A745',
      },
    },

    // Content Layout
    textContent: {
      flex: 1,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    practiceTitle: {
      fontSize: textSizes.large,
      fontWeight: '600',
      color: colors.text,
      flex: 1,
      marginRight: 8,
    },

    // Badge Styles
    badgeContainer: {
      flexDirection: 'row',
      gap: 8,
    },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: isDarkMode ? `${colors.primaryLight}15` : colors.primaryLight,
  },
    badgeText: {
      fontSize: textSizes.small,
      fontWeight: '500',
      color: colors.primary,
    },

    // Description & Features
    practiceDescription: {
      fontSize: textSizes.medium,
      color: colors.textSecondary,
      marginBottom: 12,
      lineHeight: 22,
    },
    featureList: {
      flexDirection: 'row',
      gap: 16,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? colors.border : `${colors.primary}15`,
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    featureIcon: {
      width: 16,
      height: 16,
      color: colors.textSecondary,
    },
    featureText: {
      fontSize: textSizes.small,
      color: colors.textSecondary,
    },

    // Navigation
    chevron: {
      marginLeft: 'auto',
      color: colors.textSecondary,
    },
      features: {
        flexDirection: 'row',
        marginTop: 8,
        gap: 16,
      }
  };

  return (
    <ScrollView style={[styles.container, themedStyles.container]}>
      <View style={[styles.header, themedStyles.header]}>
        <Text style={[styles.title, themedStyles.title]}>Mobile Accessibility Best Practices</Text>
        <Text style={[styles.description, themedStyles.description]}>
          Essential guidelines for creating accessible React Native applications
        </Text>
      </View>

        <View style={themedStyles.section}>
          {/* WCAG Guidelines Card */}
          <TouchableOpacity
            style={themedStyles.card}
            onPress={() => router.push('/practices-screens/guidelines')}
            accessibilityRole="button"
          >
            <View style={themedStyles.cardContent}>
              <View
                style={[
                  themedStyles.iconWrapper,
                  { backgroundColor: themedStyles.iconColors.wcag.bg }
                ]}
              >
                <Ionicons
                  name="document-text-outline"
                  size={24}
                  color={themedStyles.iconColors.wcag.icon}
                  accessibilityElementsHidden={true}
                />
              </View>

              <View style={themedStyles.textContent}>
                <View style={themedStyles.titleRow}>
                  <Text style={themedStyles.practiceTitle}>WCAG Guidelines</Text>
                  <View style={themedStyles.badgeContainer}>
                    <View style={themedStyles.badge}>
                      <Text style={themedStyles.badgeText}>Documentation</Text>
                    </View>
                  </View>
                </View>

                <Text style={themedStyles.practiceDescription}>
                  Understanding and implementing WCAG 2.2 guidelines in mobile apps
                </Text>

                <View style={themedStyles.featureList}>
                  <View style={themedStyles.featureItem}>
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color={colors.textSecondary}
                      accessibilityElementsHidden={true}
                    />
                    <Text style={themedStyles.featureText}>Success Criteria</Text>
                  </View>
                  <View style={themedStyles.featureItem}>
                    <Ionicons
                      name="code-slash"
                      size={16}
                      color={colors.textSecondary}
                      accessibilityElementsHidden={true}
                    />
                    <Text style={themedStyles.featureText}>Examples</Text>
                  </View>
                </View>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textSecondary}
                style={themedStyles.chevron}
                accessibilityElementsHidden={true}
              />
            </View>
          </TouchableOpacity>

          {/* Semantic Structure Card */}
          <TouchableOpacity
            style={themedStyles.card}
            onPress={() => router.push('/practices-screens/semantics')}
            accessibilityRole="button"
          >
            <View style={themedStyles.cardContent}>
              <View
                style={[
                  themedStyles.iconWrapper,
                  { backgroundColor: themedStyles.iconColors.semantic.bg }
                ]}
              >
                <Ionicons
                  name="git-merge-outline"
                  size={24}
                  color={themedStyles.iconColors.semantic.icon}
                  accessibilityElementsHidden={true}
                />
              </View>

              <View style={themedStyles.textContent}>
                <View style={themedStyles.titleRow}>
                  <Text style={themedStyles.practiceTitle}>Semantic Structure</Text>
                  <View style={themedStyles.badgeContainer}>
                    <View style={themedStyles.badge}>
                      <Text style={themedStyles.badgeText}>Code Examples</Text>
                    </View>
                  </View>
                </View>

                <Text style={themedStyles.practiceDescription}>
                  Creating meaningful and well-organized content hierarchies
                </Text>

                <View style={themedStyles.featureList}>
                  <View style={themedStyles.featureItem}>
                    <Ionicons
                      name="layers-outline"
                      size={16}
                      color={colors.textSecondary}
                      accessibilityElementsHidden={true}
                    />
                    <Text style={themedStyles.featureText}>Hierarchy</Text>
                  </View>
                  <View style={themedStyles.featureItem}>
                    <Ionicons
                      name="code-slash"
                      size={16}
                      color={colors.textSecondary}
                      accessibilityElementsHidden={true}
                    />
                    <Text style={themedStyles.featureText}>Implementation</Text>
                  </View>
                </View>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textSecondary}
                style={themedStyles.chevron}
                accessibilityElementsHidden={true}
              />
            </View>
          </TouchableOpacity>

          {/* Gesture Tutorial Card */}
          <TouchableOpacity
            style={themedStyles.card}
            onPress={() => router.push('/practices-screens/gestures')}
            accessibilityRole="button"
          >
            <View style={themedStyles.cardContent}>
              <View
                style={[
                  themedStyles.iconWrapper,
                  { backgroundColor: themedStyles.iconColors.gesture.bg }
                ]}
              >
                <Ionicons
                  name="hand-left-outline"
                  size={24}
                  color={themedStyles.iconColors.gesture.icon}
                  accessibilityElementsHidden={true}
                />
              </View>

              <View style={themedStyles.textContent}>
                <View style={themedStyles.titleRow}>
                  <Text style={themedStyles.practiceTitle}>Gesture Tutorial</Text>
                  <View style={themedStyles.badgeContainer}>
                    <View style={themedStyles.badge}>
                      <Text style={themedStyles.badgeText}>Interactive Guide</Text>
                    </View>
                  </View>
                </View>

                <Text style={themedStyles.practiceDescription}>
                  Learn and test common accessibility gestures
                </Text>

                <View style={themedStyles.featureList}>
                  <View style={themedStyles.featureItem}>
                    <Ionicons
                      name="finger-print-outline"
                      size={16}
                      color={colors.textSecondary}
                      accessibilityElementsHidden={true}
                    />
                    <Text style={themedStyles.featureText}>Gesture Patterns</Text>
                  </View>
                  <View style={themedStyles.featureItem}>
                    <Ionicons
                      name="hand-right-outline"
                      size={16}
                      color={colors.textSecondary}
                      accessibilityElementsHidden={true}
                    />
                    <Text style={themedStyles.featureText}>Interactive Demo</Text>
                  </View>
                </View>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textSecondary}
                style={themedStyles.chevron}
                accessibilityElementsHidden={true}
              />
            </View>
          </TouchableOpacity>

          {/* Screen Reader Support Card */}
          <TouchableOpacity
            style={themedStyles.card}
            onPress={() => router.push('/practices-screens/screen-reader')}
            accessibilityRole="button"
          >
            <View style={themedStyles.cardContent}>
              <View
                style={[
                  themedStyles.iconWrapper,
                  { backgroundColor: themedStyles.iconColors.screenReader.bg }
                ]}
              >
                <Ionicons
                  name="eye-outline"
                  size={24}
                  color={themedStyles.iconColors.screenReader.icon}
                  accessibilityElementsHidden={true}
                />
              </View>

              <View style={themedStyles.textContent}>
                <View style={themedStyles.titleRow}>
                  <Text style={themedStyles.practiceTitle}>Screen Reader Support</Text>
                  <View style={themedStyles.badgeContainer}>
                    <View style={themedStyles.badge}>
                      <Text style={themedStyles.badgeText}>Guidelines</Text>
                    </View>
                  </View>
                </View>

                <Text style={themedStyles.practiceDescription}>
                  Optimizing your app for VoiceOver and TalkBack
                </Text>

                <View style={themedStyles.featureList}>
                  <View style={themedStyles.featureItem}>
                    <Ionicons
                      name="phone-portrait-outline"
                      size={16}
                      color={colors.textSecondary}
                      accessibilityElementsHidden={true}
                    />
                    <Text style={themedStyles.featureText}>Platform-specific</Text>
                  </View>
                  <View style={themedStyles.featureItem}>
                    <Ionicons
                      name="hand-left-outline"
                      size={16}
                      color={colors.textSecondary}
                      accessibilityElementsHidden={true}
                    />
                    <Text style={themedStyles.featureText}>Gestures</Text>
                  </View>
                </View>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textSecondary}
                style={themedStyles.chevron}
                accessibilityElementsHidden={true}
              />
            </View>
          </TouchableOpacity>

          {/* Navigation and Focus Card */}
          <TouchableOpacity
            style={themedStyles.card}
            onPress={() => router.push('/practices-screens/navigation')}
            accessibilityRole="button"
          >
            <View style={themedStyles.cardContent}>
              <View
                style={[
                  themedStyles.iconWrapper,
                  { backgroundColor: themedStyles.iconColors.navigation.bg }
                ]}
              >
                <Ionicons
                  name="navigate-outline"
                  size={24}
                  color={themedStyles.iconColors.navigation.icon}
                  accessibilityElementsHidden={true}
                />
              </View>

              <View style={themedStyles.textContent}>
                <View style={themedStyles.titleRow}>
                  <Text style={themedStyles.practiceTitle}>Logical Focus Order</Text>
                  <View style={themedStyles.badgeContainer}>
                    <View style={themedStyles.badge}>
                      <Text style={themedStyles.badgeText}>Interactive Guide</Text>
                    </View>
                  </View>
                </View>

                <Text style={themedStyles.practiceDescription}>
                  Managing focus and keyboard navigation effectively
                </Text>

                <View style={themedStyles.featureList}>
                  <View style={themedStyles.featureItem}>
                    <Ionicons
                      name="arrow-forward-circle-outline"
                      size={16}
                      color={colors.textSecondary}
                      accessibilityElementsHidden={true}
                    />
                    <Text style={themedStyles.featureText}>Focus Flow</Text>
                  </View>
                  <View style={themedStyles.featureItem}>
                    <Ionicons
                      name="hand-right-outline"
                      size={16}
                      color={colors.textSecondary}
                      accessibilityElementsHidden={true}
                    />
                    <Text style={themedStyles.featureText}>Interactive Demo</Text>
                  </View>
                </View>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textSecondary}
                style={themedStyles.chevron}
                accessibilityElementsHidden={true}
              />
            </View>
          </TouchableOpacity>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  section: {
    padding: 16,
    gap: 16,
  },
  guideCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    gap: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guideContent: {
    flex: 1,
  },
  guideHeader: {
    marginBottom: 8,
  },
  guideTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 4,
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  badge: {
    backgroundColor: '#E8F1FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    color: '#0055CC',
    fontWeight: '500',
  },
  guideDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  guideFooter: {
    flexDirection: 'row',
    gap: 16,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerText: {
    fontSize: 13,
    color: '#666',
  },
});