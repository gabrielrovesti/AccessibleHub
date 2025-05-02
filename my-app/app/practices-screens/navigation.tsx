import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, AccessibilityInfo, findNodeHandle, NativeSyntheticEvent, LayoutChangeEvent, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function LogicalFocusOrderScreen() {
  const { colors, textSizes, isDarkMode } = useTheme();

  const scrollViewRef = useRef<ScrollView>(null);
  const mainContentRef = useRef<View>(null);

  const [mainContentY, setMainContentY] = useState(0);

  const handleMainContentLayout = (e: NativeSyntheticEvent<LayoutChangeEvent>) => {
    const { y } = e.nativeEvent.layout;
    setMainContentY(y);
  };

  const [feedback, setFeedback] = useState('');

  const gradientColors = isDarkMode
    ? [colors.background, '#2c2c2e']
    : ['#e2e2e2', colors.background];

  const cardShadowStyle = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: isDarkMode ? 0.3 : 0.1,
    shadowRadius: 6,
    elevation: 3,
  };

  const themedStyles = {
    container: { flex: 1 },
    heroCard: {
      backgroundColor: colors.surface,
      marginHorizontal: 16,
      marginTop: 16,
      paddingVertical: 24,
      paddingHorizontal: 16,
      borderRadius: 16,
      ...cardShadowStyle,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
      alignItems: 'center',
    },
    heroTitle: {
      color: colors.text,
      fontSize: textSizes.xlarge,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 8,
    },
    heroSubtitle: {
      color: colors.textSecondary,
      fontSize: textSizes.medium,
      lineHeight: 24,
      textAlign: 'center',
    },
    skipLinkContainer: {
      alignItems: 'center',
      marginTop: 16,
    },
    skipLinkButton: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    skipLinkText: {
      color: colors.surface,
      fontSize: textSizes.medium,
      fontWeight: '600',
    },
    section: {
      padding: 16,
    },
    infoCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      ...cardShadowStyle,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
    },
    infoTitle: {
      color: colors.text,
      fontSize: textSizes.large,
      fontWeight: '600',
      marginBottom: 8,
    },
    infoDescription: {
      color: colors.textSecondary,
      fontSize: textSizes.medium,
      lineHeight: 22,
      marginBottom: 12,
    },
    focusableButton: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 24,
      alignSelf: 'center',
      marginTop: 16,
      alignItems: 'center',
    },
    focusableButtonText: {
      color: colors.surface,
      fontSize: textSizes.medium,
      fontWeight: '600',
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: 12,
      color: colors.text,
      fontSize: textSizes.medium,
      marginBottom: 12,
    },
  };

  const skipToMainContent = () => {
    scrollViewRef.current?.scrollTo({
      y: mainContentY,
      animated: true,
    });

    setTimeout(() => {
      if (mainContentRef.current && Platform.OS !== 'web') {
        const reactTag = findNodeHandle(mainContentRef.current);
        if (reactTag) {
          AccessibilityInfo.setAccessibilityFocus(reactTag);
        }
      }
    }, 500);
  };

  const handleSubmitFeedback = () => {
    Alert.alert('Feedback Submitted', `Feedback: ${feedback}`);
  };

  return (
    <LinearGradient colors={gradientColors} style={themedStyles.container}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ paddingBottom: 24 }}
        accessibilityRole="scrollview"
        accessibilityLabel="Logical Focus Order Screen"
      >
        <View style={themedStyles.heroCard}>
          <Text style={themedStyles.heroTitle} accessibilityRole="header">
            Logical Focus Order
          </Text>
          <Text style={themedStyles.heroSubtitle}>
            Demonstrate skip links and consistent navigation order.
          </Text>
        </View>

        <View style={themedStyles.skipLinkContainer}>
          <TouchableOpacity
            style={themedStyles.skipLinkButton}
            accessibilityRole="button"
            accessibilityLabel="Skip to main content"
            onPress={skipToMainContent}
          >
            <Text style={themedStyles.skipLinkText}>Skip to Main Content</Text>
          </TouchableOpacity>
        </View>

        <View style={themedStyles.section}>
          <View style={themedStyles.infoCard}>
            <Text style={themedStyles.infoTitle}>Why Focus Order Matters</Text>
            <Text style={themedStyles.infoDescription}>
              Proper focus order helps screen reader and keyboard users navigate without confusion.
              A skip link allows bypassing repetitive blocks, ensuring more efficient access to primary content.
            </Text>
          </View>
        </View>

        <View
          style={[themedStyles.section, { marginTop: 0 }]}
          onLayout={handleMainContentLayout}
          ref={mainContentRef}
          accessibilityRole="summary"
          accessibilityLabel="Main Content Section"
        >
          <View style={themedStyles.infoCard}>
            <Text style={themedStyles.infoTitle}>Main Content</Text>
            <Text style={themedStyles.infoDescription}>
              Below are interactive elements in a logical sequence.
            </Text>

            <TouchableOpacity
              style={[themedStyles.focusableButton, { marginBottom: 10 }]}
              onPress={() => Alert.alert('Button Pressed', 'You pressed the first button!')}
              accessibilityRole="button"
              accessibilityLabel="Focusable Button 1"
            >
              <Text style={themedStyles.focusableButtonText}>Focusable Button 1</Text>
            </TouchableOpacity>

            <TextInput
              style={themedStyles.input}
              placeholder="Enter feedback"
              placeholderTextColor={colors.textSecondary}
              value={feedback}
              onChangeText={setFeedback}
              accessibilityLabel="Feedback Input"
            />

            <TouchableOpacity
              style={[themedStyles.focusableButton, { marginBottom: 10 }]}
              onPress={handleSubmitFeedback}
              accessibilityRole="button"
              accessibilityLabel="Submit feedback"
            >
              <Text style={themedStyles.focusableButtonText}>Submit Feedback</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}