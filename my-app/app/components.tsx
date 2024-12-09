import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';

export default function ComponentsScreen() {
  const router = useRouter();
  const { colors, textSizes, isDarkMode } = useTheme();

  const themedStyles = {
    container: {
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.surface,
      borderBottomColor: colors.border,
    },
    title: {
      color: colors.text,
      fontSize: textSizes.xlarge,
    },
    description: {
      color: colors.textSecondary,
      fontSize: textSizes.medium,
    },
    componentCard: {
      backgroundColor: colors.surface,
      shadowColor: isDarkMode ? '#000' : '#000',
      shadowOpacity: isDarkMode ? 0.3 : 0.05,
    },
    componentName: {
      color: colors.text,
      fontSize: textSizes.large,
    },
    badgeText: {
      color: isDarkMode ? colors.primary : '#0055CC',
    },
    componentDesc: {
      color: colors.textSecondary,
      fontSize: textSizes.small,
    },
    featureText: {
      color: colors.textSecondary,
    },
  };

  return (
    <ScrollView style={[styles.container, themedStyles.container]}>
      <View style={[styles.header, themedStyles.header]}>
        <Text style={[styles.title, themedStyles.title]}>Accessibility Components</Text>
        <Text style={[styles.description, themedStyles.description]}>
          Interactive examples of accessible React Native components with code samples and best practices.
        </Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={[styles.componentCard, themedStyles.componentCard]}
          accessibilityRole="button"
          onPress={() => router.push('/accessible-components/accessible-button')}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: '#E8F1FF' }]}>
              <Ionicons name="radio-button-on-outline" size={24} color="#0055CC" />
            </View>
            <View style={styles.labelContainer}>
              <Text style={[styles.componentName, themedStyles.componentName]}>Buttons & Touchables</Text>
              <View style={styles.badge}>
                <Text style={[styles.badgeText, themedStyles.badgeText]}>Essential</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </View>
          <Text style={[styles.componentDesc, themedStyles.componentDesc]}>
            Create accessible touch targets with proper sizing and feedback
          </Text>
          <View style={styles.features}>
            <View style={styles.featureItem}>
              <Ionicons name="resize-outline" size={16} color={colors.textSecondary} />
              <Text style={[styles.featureText, themedStyles.featureText]}>Touch target sizing</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="hand-left-outline" size={16} color={colors.textSecondary} />
              <Text style={[styles.featureText, themedStyles.featureText]}>Haptic feedback</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.componentCard, themedStyles.componentCard]}
          accessibilityRole="button"
          onPress={() => router.push('/accessible-components/accessible-form')}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: '#F0F8FF' }]}>
              <Ionicons name="create-outline" size={24} color="#0070F3" />
            </View>
            <View style={styles.labelContainer}>
              <Text style={[styles.componentName, themedStyles.componentName]}>Form Controls</Text>
              <View style={styles.badge}>
                <Text style={[styles.badgeText, themedStyles.badgeText]}>Complex</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </View>
          <Text style={[styles.componentDesc, themedStyles.componentDesc]}>
            Implement accessible form inputs and controls
          </Text>
          <View style={styles.features}>
            <View style={styles.featureItem}>
              <Ionicons name="alert-circle-outline" size={16} color={colors.textSecondary} />
              <Text style={[styles.featureText, themedStyles.featureText]}>Error states</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="help-circle-outline" size={16} color={colors.textSecondary} />
              <Text style={[styles.featureText, themedStyles.featureText]}>Helper text</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.componentCard, themedStyles.componentCard]}
          accessibilityRole="button"
          onPress={() => router.push('/accessible-components/accessible-media')}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: '#FFF4E6' }]}>
              <Ionicons name="image-outline" size={24} color="#FF8C00" />
            </View>
            <View style={styles.labelContainer}>
              <Text style={[styles.componentName, themedStyles.componentName]}>Media Content</Text>
              <View style={styles.badge}>
                <Text style={[styles.badgeText, themedStyles.badgeText]}>Advanced</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </View>
          <Text style={[styles.componentDesc, themedStyles.componentDesc]}>
            Make images and media content accessible
          </Text>
          <View style={styles.features}>
            <View style={styles.featureItem}>
              <Ionicons name="text-outline" size={16} color={colors.textSecondary} />
              <Text style={[styles.featureText, themedStyles.featureText]}>Alt text</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="play-outline" size={16} color={colors.textSecondary} />
              <Text style={[styles.featureText, themedStyles.featureText]}>Media controls</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.componentCard, themedStyles.componentCard]}
          accessibilityRole="button"
          onPress={() => router.push('/accessible-components/accessible-dialog')}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: '#E6F4FF' }]}>
              <Ionicons name="browsers-outline" size={24} color="#0066CC" />
            </View>
            <View style={styles.labelContainer}>
              <Text style={[styles.componentName, themedStyles.componentName]}>Modal Dialogs</Text>
              <View style={styles.badge}>
                <Text style={[styles.badgeText, themedStyles.badgeText]}>Advanced</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </View>
          <Text style={[styles.componentDesc, themedStyles.componentDesc]}>
            Implement accessible modal dialogs with proper focus management and screen reader support
          </Text>
          <View style={styles.features}>
            <View style={styles.featureItem}>
              <Ionicons name="scan-outline" size={16} color={colors.textSecondary} />
              <Text style={[styles.featureText, themedStyles.featureText]}>Focus trapping</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="megaphone-outline" size={16} color={colors.textSecondary} />
              <Text style={[styles.featureText, themedStyles.featureText]}>Screen reader alerts</Text>
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
  },
  componentCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  componentName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1c1c1e',
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
  componentDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  features: {
    flexDirection: 'row',
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  featureText: {
    fontSize: 13,
    color: '#666',
  },
});