import { View, Text, StyleSheet, ScrollView, TouchableOpacity, AccessibilityInfo } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';

export default function ComponentsScreen() {
  const router = useRouter();
  const { colors, textSizes, isDarkMode } = useTheme();

  const handleComponentPress = (route, title, description, type) => {
    router.push(route);
    AccessibilityInfo.announceForAccessibility(`Opening ${title} component details`);
  };

const themedStyles = {
  container: {
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.surface,
    borderBottomColor: colors.border,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  title: {
    color: colors.text,
    fontSize: textSizes.xlarge,
    fontWeight: '700',
  },
  description: {
    color: colors.textSecondary,
    fontSize: textSizes.medium,
    marginTop: 4,
  },
  section: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: isDarkMode ? colors.border : 'transparent',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: isDarkMode ? 0.3 : 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingBottom: 12,
  },
  iconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isDarkMode ? `${colors.primaryLight}20` : colors.primaryLight,
  },
  cardContent: {
    flex: 1,
    gap: 8,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  titleArea: {
    flex: 1,
    marginRight: 8,
  },
  cardTitle: {
    fontSize: textSizes.large,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  badge: {
    backgroundColor: isDarkMode ? `${colors.primaryLight}30` : colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: colors.primary,
    fontSize: textSizes.small,
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: textSizes.medium,
    color: colors.textSecondary,
    marginVertical: 8,
  },
  features: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: isDarkMode ? colors.border : colors.primaryLight,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  featureText: {
    fontSize: textSizes.small,
    color: colors.textSecondary,
  },
  chevron: {
    marginLeft: 'auto',
  }
};

  return (
    <ScrollView
      style={[styles.container, themedStyles.container]}
      accessibilityRole="scrollview"
      accessibilityLabel="Accessibility Components Screen"
    >
      <View style={[styles.header, themedStyles.header]}>
        <Text
          style={[styles.title, themedStyles.title]}
          accessibilityRole="header"
        >
          Accessibility Components
        </Text>
        <Text style={[styles.description, themedStyles.description]}>
          Interactive examples of accessible React Native components with code samples and best practices
        </Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={themedStyles.card}
          accessibilityRole="button"
          accessibilityLabel="Buttons and Touchables component. Create accessible touch targets with proper sizing and feedback. Essential component type."
          onPress={() => handleComponentPress(
            '/accessible-components/accessible-button',
            'Buttons & Touchables',
            'Create accessible touch targets with proper sizing and feedback',
            'Essential'
          )}
        >
          <View style={themedStyles.cardHeader}>
            <View style={themedStyles.iconWrapper}>
              <Ionicons
                name="radio-button-on-outline"
                size={24}
                color={colors.primary}
                accessibilityElementsHidden={true}
              />
            </View>
            <View style={themedStyles.cardContent}>
              <View style={themedStyles.cardTitleRow}>
                <View style={themedStyles.titleArea}>
                  <Text style={themedStyles.cardTitle}>Buttons & Touchables</Text>
                </View>
                <View style={themedStyles.badge}>
                  <Text style={themedStyles.badgeText}>Essential</Text>
                </View>
              </View>
              <Text style={themedStyles.cardDescription}>
                Create accessible touch targets with proper sizing and feedback
              </Text>
              <View style={themedStyles.features}>
                <View style={themedStyles.featureItem}>
                  <Ionicons
                    name="resize-outline"
                    size={16}
                    color={colors.textSecondary}
                    accessibilityElementsHidden={true}
                  />
                  <Text style={themedStyles.featureText}>Touch target sizing</Text>
                </View>
                <View style={themedStyles.featureItem}>
                  <Ionicons
                    name="hand-left-outline"
                    size={16}
                    color={colors.textSecondary}
                    accessibilityElementsHidden={true}
                  />
                  <Text style={themedStyles.featureText}>Haptic feedback</Text>
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

        <TouchableOpacity
          style={themedStyles.card}
          accessibilityRole="button"
          accessibilityLabel="Form Controls component. Implement accessible form inputs and controls. Complex component type."
          onPress={() => handleComponentPress(
            '/accessible-components/accessible-form',
            'Form Controls',
            'Implement accessible form inputs and controls',
            'Complex'
          )}
        >
          <View style={themedStyles.cardHeader}>
            <View style={themedStyles.iconWrapper}>
              <Ionicons
                name="create-outline"
                size={24}
                color={colors.primary}
                accessibilityElementsHidden={true}
              />
            </View>
            <View style={themedStyles.cardContent}>
              <View style={themedStyles.cardTitleRow}>
                <View style={themedStyles.titleArea}>
                  <Text style={themedStyles.cardTitle}>Form Controls</Text>
                </View>
                <View style={themedStyles.badge}>
                  <Text style={themedStyles.badgeText}>Complex</Text>
                </View>
              </View>
              <Text style={themedStyles.cardDescription}>
                Implement accessible form inputs and controls
              </Text>
              <View style={themedStyles.features}>
                <View style={themedStyles.featureItem}>
                  <Ionicons
                    name="alert-circle-outline"
                    size={16}
                    color={colors.textSecondary}
                    accessibilityElementsHidden={true}
                  />
                  <Text style={themedStyles.featureText}>Error states</Text>
                </View>
                <View style={themedStyles.featureItem}>
                  <Ionicons
                    name="help-circle-outline"
                    size={16}
                    color={colors.textSecondary}
                    accessibilityElementsHidden={true}
                  />
                  <Text style={themedStyles.featureText}>Helper text</Text>
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

        <TouchableOpacity
          style={themedStyles.card}
          accessibilityRole="button"
          accessibilityLabel="Media Content component. Make images and media content accessible. Advanced component type."
          onPress={() => handleComponentPress(
            '/accessible-components/accessible-media',
            'Media Content',
            'Make images and media content accessible',
            'Advanced'
          )}
        >
          <View style={themedStyles.cardHeader}>
            <View style={themedStyles.iconWrapper}>
              <Ionicons
                name="image-outline"
                size={24}
                color={colors.primary}
                accessibilityElementsHidden={true}
              />
            </View>
            <View style={themedStyles.cardContent}>
              <View style={themedStyles.cardTitleRow}>
                <View style={themedStyles.titleArea}>
                  <Text style={themedStyles.cardTitle}>Media Content</Text>
                </View>
                <View style={themedStyles.badge}>
                  <Text style={themedStyles.badgeText}>Advanced</Text>
                </View>
              </View>
              <Text style={themedStyles.cardDescription}>
                Make images and media content accessible
              </Text>
              <View style={themedStyles.features}>
                <View style={themedStyles.featureItem}>
                  <Ionicons
                    name="text-outline"
                    size={16}
                    color={colors.textSecondary}
                    accessibilityElementsHidden={true}
                  />
                  <Text style={themedStyles.featureText}>Alt text</Text>
                </View>
                <View style={themedStyles.featureItem}>
                  <Ionicons
                    name="play-outline"
                    size={16}
                    color={colors.textSecondary}
                    accessibilityElementsHidden={true}
                  />
                  <Text style={themedStyles.featureText}>Media controls</Text>
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

        <TouchableOpacity
          style={themedStyles.card}
          accessibilityRole="button"
          accessibilityLabel="Modal Dialogs component. Implement accessible modal dialogs with proper focus management and screen reader support. Advanced component type."
          onPress={() => handleComponentPress(
            '/accessible-components/accessible-dialog',
            'Modal Dialogs',
            'Implement accessible modal dialogs with proper focus management and screen reader support',
            'Advanced'
          )}
        >
          <View style={themedStyles.cardHeader}>
            <View style={themedStyles.iconWrapper}>
              <Ionicons
                name="browsers-outline"
                size={24}
                color={colors.primary}
                accessibilityElementsHidden={true}
              />
            </View>
            <View style={themedStyles.cardContent}>
              <View style={themedStyles.cardTitleRow}>
                <View style={themedStyles.titleArea}>
                  <Text style={themedStyles.cardTitle}>Modal Dialogs</Text>
                </View>
                <View style={themedStyles.badge}>
                  <Text style={themedStyles.badgeText}>Advanced</Text>
                </View>
              </View>
              <Text style={themedStyles.cardDescription}>
                Implement accessible modal dialogs with proper focus management and screen reader support
              </Text>
              <View style={themedStyles.features}>
                <View style={themedStyles.featureItem}>
                  <Ionicons
                    name="scan-outline"
                    size={16}
                    color={colors.textSecondary}
                    accessibilityElementsHidden={true}
                  />
                  <Text style={themedStyles.featureText}>Focus trapping</Text>
                </View>
                <View style={themedStyles.featureItem}>
                  <Ionicons
                    name="megaphone-outline"
                    size={16}
                    color={colors.textSecondary}
                    accessibilityElementsHidden={true}
                  />
                  <Text style={themedStyles.featureText}>Screen reader alerts</Text>
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