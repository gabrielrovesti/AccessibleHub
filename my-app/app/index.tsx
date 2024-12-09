import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function HomeScreen() {
  const router = useRouter();
  const { colors, textSizes, isDarkMode } = useTheme();

  const themedStyles = {
    container: {
      backgroundColor: colors.background,
    },
    hero: {
      backgroundColor: colors.surface,
      borderBottomColor: colors.border,
    },
    title: {
      color: colors.text,
      fontSize: textSizes.xlarge,
    },
    subtitle: {
      color: colors.textSecondary,
      fontSize: textSizes.medium,
    },
    statsContainer: {
      borderTopColor: colors.border,
    },
    statNumber: {
      color: colors.text,
      fontSize: textSizes.large,
    },
    statLabel: {
      color: colors.textSecondary,
      fontSize: textSizes.small,
    },
    statDivider: {
      backgroundColor: colors.border,
    },
    quickStartCard: {
      backgroundColor: colors.surface,
      shadowColor: isDarkMode ? '#000' : '#000',
      shadowOpacity: isDarkMode ? 0.3 : 0.05,
    },
    quickStartTitle: {
      color: colors.text,
      fontSize: textSizes.large,
    },
    quickStartDesc: {
      color: colors.textSecondary,
      fontSize: textSizes.small,
    },
    sectionTitle: {
      color: colors.text,
      fontSize: textSizes.large,
    },
    card: {
      backgroundColor: colors.surface,
      shadowColor: isDarkMode ? '#000' : '#000',
      shadowOpacity: isDarkMode ? 0.3 : 0.05,
    },
    cardTitle: {
      color: colors.text,
      fontSize: textSizes.medium,
    },
    cardDescription: {
      color: colors.textSecondary,
      fontSize: textSizes.small,
    },
    cardIconContainer: {
      backgroundColor: isDarkMode ? colors.surface : '#E8F1FF',
    },
    cardIconColor: isDarkMode ? colors.primary : '#0055CC',
    tagContainer: {
      backgroundColor: isDarkMode ? colors.surface : '#E8F1FF',
    },
    tagText: {
      color: isDarkMode ? colors.primary : '#0055CC',
    },
  };

  return (
    <ScrollView style={[styles.container, themedStyles.container]}>
      <View style={[styles.hero, themedStyles.hero]}>
        <View style={styles.heroContent}>
          <Text style={[styles.title, themedStyles.title]}>
            An accessibility testing manual for developers
          </Text>
          <Text style={[styles.subtitle, themedStyles.subtitle]}>
            A developer's guide to creating inclusive applications
          </Text>
        </View>
        <View style={[styles.statsContainer, themedStyles.statsContainer]}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, themedStyles.statNumber]}>15+</Text>
            <Text style={[styles.statLabel, themedStyles.statLabel]}>Components</Text>
          </View>
          <View style={[styles.statDivider, themedStyles.statDivider]} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, themedStyles.statNumber]}>WCAG</Text>
            <Text style={[styles.statLabel, themedStyles.statLabel]}>2.2 Ready</Text>
          </View>
          <View style={[styles.statDivider, themedStyles.statDivider]} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, themedStyles.statNumber]}>100%</Text>
            <Text style={[styles.statLabel, themedStyles.statLabel]}>Accessible</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={[styles.quickStartCard, themedStyles.quickStartCard]}
          onPress={() => router.push('/components')}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Quick start with component examples"
        >
          <View style={styles.quickStartContent}>
            <Text style={[styles.quickStartTitle, themedStyles.quickStartTitle]}>
              Quick Start
            </Text>
            <Text style={[styles.quickStartDesc, themedStyles.quickStartDesc]}>
              Begin with component examples
            </Text>
          </View>
          <Ionicons name="arrow-forward-circle" size={32} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, themedStyles.sectionTitle]}>
          Explore topics
        </Text>

        <TouchableOpacity
          style={[styles.card, themedStyles.card]}
          onPress={() => router.push('/practices')}
          accessible={true}
          accessibilityRole="button"
          accessibilityHint="Learn about WCAG guidelines implementation"
        >
          <View style={[styles.cardIconContainer, themedStyles.cardIconContainer]}>
            <Ionicons name="book-outline" size={24} color={themedStyles.cardIconColor} />
          </View>
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, themedStyles.cardTitle]}>
                Best Practices
              </Text>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </View>
            <Text style={[styles.cardDescription, themedStyles.cardDescription]}>
              Learn how to implement WCAG guidelines in React Native
            </Text>
            <View style={styles.tagContainer}>
              <View style={[styles.tag, themedStyles.tagContainer]}>
                <Text style={[styles.tagText, themedStyles.tagText]}>WCAG 2.2</Text>
              </View>
              <View style={[styles.tag, themedStyles.tagContainer]}>
                <Text style={[styles.tagText, themedStyles.tagText]}>Guidelines</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, themedStyles.card]}
          onPress={() => router.push('/tools')}
          accessible={true}
          accessibilityRole="button"
          accessibilityHint="Access testing tools and methods"
        >
          <View style={[styles.cardIconContainer, themedStyles.cardIconContainer]}>
            <Ionicons name="build-outline" size={24} color={themedStyles.cardIconColor} />
          </View>
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, themedStyles.cardTitle]}>
                Testing Tools
              </Text>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </View>
            <Text style={[styles.cardDescription, themedStyles.cardDescription]}>
              Tools and methods to verify your app's accessibility
            </Text>
            <View style={styles.tagContainer}>
              <View style={[styles.tag, themedStyles.tagContainer]}>
                <Text style={[styles.tagText, themedStyles.tagText]}>TalkBack</Text>
              </View>
              <View style={[styles.tag, themedStyles.tagContainer]}>
                <Text style={[styles.tagText, themedStyles.tagText]}>VoiceOver</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, themedStyles.card]}
          onPress={() => router.push('/frameworks-comparison')}
          accessible={true}
          accessibilityRole="button"
          accessibilityHint="Compare different mobile development frameworks"
        >
          <View style={[styles.cardIconContainer, themedStyles.cardIconContainer]}>
            <Ionicons name="git-compare" size={24} color={themedStyles.cardIconColor} />
          </View>
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, themedStyles.cardTitle]}>
                Framework Comparison
              </Text>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </View>
            <Text style={[styles.cardDescription, themedStyles.cardDescription]}>
              Compare accessibility features across different mobile frameworks
            </Text>
            <View style={styles.tagContainer}>
              <View style={[styles.tag, themedStyles.tagContainer]}>
                <Text style={[styles.tagText, themedStyles.tagText]}>React Native</Text>
              </View>
              <View style={[styles.tag, themedStyles.tagContainer]}>
                <Text style={[styles.tagText, themedStyles.tagText]}>Flutter</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  heroContent: {
    marginBottom: 24,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 24,
    borderTopWidth: 1,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
  },
  section: {
    padding: 20,
  },
  quickStartCard: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  quickStartContent: {
    flex: 1,
  },
  quickStartTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontWeight: '600',
  },
  cardDescription: {
    lineHeight: 20,
    marginBottom: 12,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
});