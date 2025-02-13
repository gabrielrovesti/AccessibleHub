import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const WCAGGuidelinesScreen = () => {
  const { colors, textSizes } = useTheme();

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
      fontWeight: 'bold',
      marginBottom: 16,
    },
    headerSubtitle: {
      color: colors.textSecondary,
      fontSize: textSizes.large,
      lineHeight: 28,
    },
    section: {
      gap: 24,
    },
    guidelineCard: {
      backgroundColor: colors.surface,
      shadowColor: colors.shadow,
      shadowOpacity: 0.05,
      paddingVertical: 24,
      paddingHorizontal: 20,
    },
    cardHeader: {
      gap: 16,
    },
    iconContainer: {
      backgroundColor: '#E8F1FF',
    },
    iconColor: '#0055CC',
    cardTitle: {
      color: colors.text,
      fontSize: textSizes.large,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    cardDescription: {
      color: colors.textSecondary,
      fontSize: textSizes.medium,
      lineHeight: 24,
      marginBottom: 16,
    },
    checkItem: {
      color: colors.text,
      fontSize: textSizes.medium,
      marginVertical: 8,
    },
  };

  return (
    <ScrollView style={[styles.container, themedStyles.container]}>
      <View style={[styles.header, themedStyles.header]}>
        <Text style={[styles.headerTitle, themedStyles.headerTitle]}>WCAG 2.2 Guidelines</Text>
        <Text style={[styles.headerSubtitle, themedStyles.headerSubtitle]}>
          Essential principles for building accessible mobile apps
        </Text>
      </View>

      <View style={[styles.section, themedStyles.section]}>
        {guidelineData.map((guideline, index) => (
          <View key={index} style={[styles.guidelineCard, themedStyles.guidelineCard]}>
            <View style={[styles.cardHeader, themedStyles.cardHeader]}>
              <View style={[styles.iconContainer, { backgroundColor: '#E8F1FF' }]}>
                <Ionicons name={guideline.icon} size={28} color={themedStyles.iconColor} />
              </View>
              <Text style={[styles.cardTitle, themedStyles.cardTitle]}>{guideline.title}</Text>
            </View>
            <Text style={[styles.cardDescription, themedStyles.cardDescription]}>
              {guideline.description}
            </Text>
            <View style={styles.checkList}>
              {guideline.checkItems.map((item, itemIndex) => (
                <View key={itemIndex} style={styles.checkItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#28A745" style={styles.checkIcon} />
                  <Text style={[themedStyles.checkItem]}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const guidelineData = [
  {
    title: 'Perceivable',
    icon: 'eye-outline',
    description: 'Information and user interface components must be presentable to users in ways they can perceive.',
    checkItems: [
      'Provide text alternatives for non-text content',
      'Provide captions and other alternatives for multimedia',
      'Create content that can be presented in different ways without losing meaning',
      'Make it easier for users to see and hear content',
    ],
  },
  {
    title: 'Operable',
    icon: 'hand-left-outline',
    description:
      'User interface components and navigation must be operable.',
    checkItems: [
      'Make all functionality available from a keyboard',
      'Give users enough time to read and use content',
      'Do not use content that causes seizures or physical reactions',
      'Help users navigate and find content',
    ],
  },
  {
    title: 'Understandable',
    icon: 'document-text-outline',
    description: 'Information and the operation of user interface must be understandable.',
    checkItems: [
      'Make text readable and understandable',
      'Make content appear and operate in predictable ways',
      'Help users avoid and correct mistakes',
    ],
  },
  {
    title: 'Robust',
    icon: 'code-outline',
    description:
      'Content must be robust enough that it can be interpreted by a wide variety of user agents, including assistive technologies.',
    checkItems: [
      'Maximize compatibility with current and future user tools',
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    marginBottom: 8,
  },
  section: {
    padding: 20,
  },
  guidelineCard: {
    borderRadius: 16,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 2 },
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
  },
  cardDescription: {
    marginBottom: 12,
  },
  checkList: {
    gap: 12,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  checkIcon: {
    marginTop: 4,
  },
});

export default WCAGGuidelinesScreen;