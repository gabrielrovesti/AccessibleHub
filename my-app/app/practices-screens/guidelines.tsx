import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
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
    },
    headerSubtitle: {
      color: colors.textSecondary,
      fontSize: textSizes.medium,
    },
    section: {
      gap: textSizes.medium,
    },
    guidelineCard: {
      backgroundColor: colors.surface,
      shadowColor: colors.shadow,
      shadowOpacity: 0.05,
    },
    cardHeader: {
      gap: textSizes.medium,
    },
    iconContainer: {
      backgroundColor: '#E8F1FF',
    },
    iconColor: '#0055CC',
    cardTitle: {
      color: colors.text,
      fontSize: textSizes.medium,
    },
    cardDescription: {
      color: colors.text,
      fontSize: textSizes.small,
    },
    checkItem: {
      color: colors.text,
      fontSize: textSizes.small,
    },
  };

  return (
    <ScrollView style={[styles.container, themedStyles.container]}>
      <View style={[styles.header, themedStyles.header]}>
        <Text style={[styles.headerTitle, themedStyles.headerTitle]}>WCAG 2.2 Guidelines</Text>
        <Text style={[styles.headerSubtitle, themedStyles.headerSubtitle]}>
          Essential guidelines for mobile accessibility
        </Text>
      </View>

      <View style={[styles.section, themedStyles.section]}>
        <View style={[styles.guidelineCard, themedStyles.guidelineCard]}>
          <View style={[styles.cardHeader, themedStyles.cardHeader]}>
            <View style={[styles.iconContainer, { backgroundColor: '#E8F1FF' }]}>
              <Ionicons name="eye-outline" size={24} color={themedStyles.iconColor} />
            </View>
            <Text style={[styles.cardTitle, themedStyles.cardTitle]}>Perceivable</Text>
          </View>
          <Text style={[styles.cardDescription, themedStyles.cardDescription]}>
            Information must be presentable to users in ways they can perceive.
          </Text>
          <View style={styles.checkList}>
            <Text style={[styles.checkItem, themedStyles.checkItem]}>• Text alternatives for non-text content</Text>
            <Text style={[styles.checkItem, themedStyles.checkItem]}>• Sufficient color contrast ratios</Text>
            <Text style={[styles.checkItem, themedStyles.checkItem]}>• Clear content structure and relationships</Text>
          </View>
        </View>

        <View style={[styles.guidelineCard, themedStyles.guidelineCard]}>
          <View style={[styles.cardHeader, themedStyles.cardHeader]}>
            <View style={[styles.iconContainer, { backgroundColor: '#E8F1FF' }]}>
              <Ionicons name="hand-left-outline" size={24} color={themedStyles.iconColor} />
            </View>
            <Text style={[styles.cardTitle, themedStyles.cardTitle]}>Operable</Text>
          </View>
          <Text style={[styles.cardDescription, themedStyles.cardDescription]}>
            Interface components must be operable by all users.
          </Text>
          <View style={styles.checkList}>
            <Text style={[styles.checkItem, themedStyles.checkItem]}>• All functionality available via keyboard</Text>
            <Text style={[styles.checkItem, themedStyles.checkItem]}>• Sufficient time to read and use content</Text>
            <Text style={[styles.checkItem, themedStyles.checkItem]}>• No content that could cause seizures</Text>
          </View>
        </View>

        <View style={[styles.guidelineCard, themedStyles.guidelineCard]}>
          <View style={[styles.cardHeader, themedStyles.cardHeader]}>
            <View style={[styles.iconContainer, { backgroundColor: '#E8F1FF' }]}>
              <Ionicons name="document-text-outline" size={24} color={themedStyles.iconColor} />
            </View>
            <Text style={[styles.cardTitle, themedStyles.cardTitle]}>Understandable</Text>
          </View>
          <Text style={[styles.cardDescription, themedStyles.cardDescription]}>
            Information and interface operation must be understandable.
          </Text>
          <View style={styles.checkList}>
            <Text style={[styles.checkItem, themedStyles.checkItem]}>• Readable and understandable text content</Text>
            <Text style={[styles.checkItem, themedStyles.checkItem]}>• Predictable functionality</Text>
            <Text style={[styles.checkItem, themedStyles.checkItem]}>• Input assistance and error prevention</Text>
          </View>
        </View>

        <View style={[styles.guidelineCard, themedStyles.guidelineCard]}>
          <View style={[styles.cardHeader, themedStyles.cardHeader]}>
            <View style={[styles.iconContainer, { backgroundColor: '#E8F1FF' }]}>
              <Ionicons name="code-outline" size={24} color={themedStyles.iconColor} />
            </View>
            <Text style={[styles.cardTitle, themedStyles.cardTitle]}>Robust</Text>
          </View>
          <Text style={[styles.cardDescription, themedStyles.cardDescription]}>
            Content must be robust enough to work with various assistive technologies.
          </Text>
          <View style={styles.checkList}>
            <Text style={[styles.checkItem, themedStyles.checkItem]}>• Compatible with current and future tools</Text>
            <Text style={[styles.checkItem, themedStyles.checkItem]}>• Proper markup and structure</Text>
            <Text style={[styles.checkItem, themedStyles.checkItem]}>• Accessible custom controls</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  section: {
    padding: 16,
  },
  guidelineCard: {
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
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  checkList: {
    gap: 8,
  },
  checkItem: {
    fontSize: 14,
    lineHeight: 20,
    paddingLeft: 8,
  },
});

export default WCAGGuidelinesScreen;