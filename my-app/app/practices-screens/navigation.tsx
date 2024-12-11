import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

export default function NavigationFocus() {
  const { colors, textSizes } = useTheme();

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
    section: {
      gap: textSizes.medium,
    },
    card: {
      backgroundColor: colors.surface,
      shadowColor: colors.shadow,
      shadowOpacity: 0.05,
    },
    cardHeader: {
      gap: textSizes.medium,
    },
    cardTitle: {
      color: colors.text,
      fontSize: textSizes.medium,
    },
    cardDescription: {
      color: colors.textSecondary,
      fontSize: textSizes.small,
    },
    bulletItem: {
      color: colors.textSecondary,
      fontSize: textSizes.small,
    },
  };

  return (
    <ScrollView style={[styles.container, themedStyles.container]}>
      <View style={[styles.header, themedStyles.header]}>
        <Text style={[styles.title, themedStyles.title]}>Navigation & Focus</Text>
        <Text style={[styles.description, themedStyles.description]}>
          Guidelines for implementing effective keyboard and focus navigation
        </Text>
      </View>

      <View style={[styles.section, themedStyles.section]}>
        <View style={[styles.card, themedStyles.card]}>
          <View style={[styles.cardHeader, themedStyles.cardHeader]}>
            <Ionicons name="git-branch-outline" size={24} color={colors.primary} />
            <Text style={[styles.cardTitle, themedStyles.cardTitle]}>Focus Flow</Text>
          </View>
          <Text style={[styles.cardDescription, themedStyles.cardDescription]}>
            Managing the order and flow of focus navigation
          </Text>
          <View style={styles.bulletList}>
            <Text style={[styles.bulletItem, themedStyles.bulletItem]}>• Logical tab order</Text>
            <Text style={[styles.bulletItem, themedStyles.bulletItem]}>• Clear focus indicators</Text>
            <Text style={[styles.bulletItem, themedStyles.bulletItem]}>• Skip navigation patterns</Text>
          </View>
        </View>

        <View style={[styles.card, themedStyles.card]}>
          <View style={[styles.cardHeader, themedStyles.cardHeader]}>
            <Ionicons name="scan-outline" size={24} color={colors.primary} />
            <Text style={[styles.cardTitle, themedStyles.cardTitle]}>Focus Management</Text>
          </View>
          <Text style={[styles.cardDescription, themedStyles.cardDescription]}>
            Handling focus during interface changes
          </Text>
          <View style={styles.bulletList}>
            <Text style={[styles.bulletItem, themedStyles.bulletItem]}>• Modal and dialog focus</Text>
            <Text style={[styles.bulletItem, themedStyles.bulletItem]}>• Focus restoration</Text>
            <Text style={[styles.bulletItem, themedStyles.bulletItem]}>• Dynamic content updates</Text>
          </View>
        </View>

        <View style={[styles.card, themedStyles.card]}>
          <View style={[styles.cardHeader, themedStyles.cardHeader]}>
            <Ionicons name="keypad-outline" size={24} color={colors.primary} />
            <Text style={[styles.cardTitle, themedStyles.cardTitle]}>Keyboard Navigation</Text>
          </View>
          <Text style={[styles.cardDescription, themedStyles.cardDescription]}>
            Supporting keyboard-only navigation
          </Text>
          <View style={styles.bulletList}>
            <Text style={[styles.bulletItem, themedStyles.bulletItem]}>• Keyboard shortcuts</Text>
            <Text style={[styles.bulletItem, themedStyles.bulletItem]}>• Focus trapping</Text>
            <Text style={[styles.bulletItem, themedStyles.bulletItem]}>• Custom key handlers</Text>
          </View>
        </View>
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
    padding: 16,
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: 14,
    marginBottom: 12,
  },
  bulletList: {
    gap: 8,
  },
  bulletItem: {
    fontSize: 14,
    paddingLeft: 8,
  },
});