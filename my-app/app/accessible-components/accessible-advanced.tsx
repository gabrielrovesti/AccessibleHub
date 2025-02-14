import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AccessibilityInfo,
  ScrollView,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';

/**
 * A single screen demonstrating:
 * 1) Tabs & Carousels
 * 2) Progress Indicators
 * 3) Alerts & Toasts
 * 4) Sliders / Range Inputs
 */
export default function AccessibleAdvancedScreen() {
  const { colors, textSizes, isDarkMode } = useTheme();

  /********************************************************
   * 1) TABS & CAROUSELS (Minimal Tab Switcher Demo)
   ********************************************************/
  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = ['Tab One', 'Tab Two', 'Tab Three'];

  const tabsSnippet = `// Minimal Tabs
const [selectedTab, setSelectedTab] = useState(0);
const tabs = ['Tab One', 'Tab Two', 'Tab Three'];

<View style={{ flexDirection: 'row' }}>
  {tabs.map((tab, idx) => (
    <TouchableOpacity
      key={idx}
      accessibilityRole="tab"
      accessibilityLabel={\`Select \${tab}\`}
      accessibilityState={{ selected: selectedTab === idx }}
      onPress={() => setSelectedTab(idx)}
    >
      <Text>{tab}</Text>
    </TouchableOpacity>
  ))}
</View>
<Text>Current tab: {tabs[selectedTab]}</Text>`;

  /********************************************************
   * 2) PROGRESS INDICATORS (Simple animated bar)
   ********************************************************/
  const [progress, setProgress] = useState(0);
  const progressWidth = new Animated.Value(progress);

  useEffect(() => {
    Animated.timing(progressWidth, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const progressSnippet = `// Basic progress bar
const [progress, setProgress] = useState(0);
const progressWidth = new Animated.Value(progress);

useEffect(() => {
  Animated.timing(progressWidth, {
    toValue: progress,
    duration: 300,
    useNativeDriver: false,
  }).start();
}, [progress]);

// In render:
<Animated.View
  style={{
    height: 10,
    backgroundColor: 'blue',
    width: progressWidth.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%'],
    }),
  }}
/>`;

  /********************************************************
   * 3) ALERTS & TOASTS (Simple ephemeral message)
   ********************************************************/
  const [showToast, setShowToast] = useState(false);

  const showToastMessage = () => {
    setShowToast(true);
    AccessibilityInfo.announceForAccessibility('Alert: Something happened');
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  const alertsSnippet = `// Minimal toast/alert
const [showToast, setShowToast] = useState(false);

function showToastMessage() {
  setShowToast(true);
  AccessibilityInfo.announceForAccessibility('Alert: Something happened');
  setTimeout(() => setShowToast(false), 2000);
}

// ...
{showToast && (
  <View style={{ ... }}>
    <Text>Something happened!</Text>
  </View>
)}`;

  /********************************************************
   * 4) SLIDERS / RANGE INPUTS (Minimal example)
   ********************************************************/
  const [sliderValue, setSliderValue] = useState(50);

  const sliderSnippet = `// Minimal slider example
const [sliderValue, setSliderValue] = useState(50);

// Using @react-native-community/slider or custom:
<Slider
  minimumValue={0}
  maximumValue={100}
  value={sliderValue}
  onValueChange={(val) => setSliderValue(val)}
  accessibilityLabel="Volume slider"
/>`;

  /********************************************************
   * Theming & Layout
   ********************************************************/
  const gradientColors = isDarkMode
    ? [colors.background, '#2c2c2e']
    : ['#e2e2e2', colors.background];

  // Common shadow style
  const cardShadowStyle = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: isDarkMode ? 0.3 : 0.1,
    shadowRadius: 6,
    elevation: 3,
  };

  // Themed + local styles
  const themedStyles = {
    container: {
      flex: 1,
    },
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
    section: {
      paddingHorizontal: 16,
      marginTop: 16,
    },
    demoCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      ...cardShadowStyle,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
      marginHorizontal: 16,
      marginBottom: 16,
    },
    sectionTitle: {
      color: colors.text,
      fontSize: textSizes.large,
      fontWeight: '600',
      marginBottom: 12,
    },
    codeCard: {
      backgroundColor: '#1c1c1e',
      borderRadius: 8,
      overflow: 'hidden',
      marginTop: 12,
      ...cardShadowStyle,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? '#333' : 'transparent',
      marginBottom: 16,
    },
    codeHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#333',
    },
    codeHeaderText: {
      fontSize: 14,
      fontFamily: 'monospace',
      color: '#999',
    },
    codeBody: {
      padding: 16,
    },
    codeText: {
      fontFamily: 'monospace',
      fontSize: 14,
      lineHeight: 20,
      color: '#fff',
    },
    snippetButtonArea: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      padding: 4,
    },
    snippetButtonText: {
      fontSize: 14,
      color: '#666',
    },
    snippetCopiedText: {
      color: '#28A745',
    },
    progressBarContainer: {
      height: 10,
      width: '100%',
      backgroundColor: '#ccc',
      borderRadius: 5,
      overflow: 'hidden',
      marginTop: 8,
    },
    progressFill: {
      height: 10,
      backgroundColor: colors.primary,
    },
  };

  return (
    <LinearGradient colors={gradientColors} style={themedStyles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        accessibilityRole="scrollview"
      >
        {/* HERO CARD */}
        <View style={themedStyles.heroCard}>
          <Text style={themedStyles.heroTitle} accessibilityRole="header">
            Advanced Accessible Components
          </Text>
          <Text style={themedStyles.heroSubtitle}>
            Demonstrating Tabs/Carousels, Progress Indicators, Alerts/Toasts, and Sliders in one screen
          </Text>
        </View>

        {/* 1) TABS & CAROUSELS */}
        <View style={themedStyles.section}>
          <View style={themedStyles.demoCard}>
            <Text style={themedStyles.sectionTitle}>Tabs &amp; Carousels</Text>
            {/* Minimal tab example */}
            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
              {tabs.map((tab, idx) => {
                const isSelected = selectedTab === idx;
                return (
                  <TouchableOpacity
                    key={tab}
                    style={{
                      flex: 1,
                      paddingVertical: 10,
                      backgroundColor: isSelected ? colors.primary : '#ccc',
                      alignItems: 'center',
                      marginRight: idx < tabs.length - 1 ? 4 : 0,
                      borderRadius: 8,
                    }}
                    accessibilityRole="tab"
                    accessibilityLabel={`Select ${tab}`}
                    accessibilityState={{ selected: isSelected }}
                    onPress={() => {
                      setSelectedTab(idx);
                      AccessibilityInfo.announceForAccessibility(`${tab} selected`);
                    }}
                  >
                    <Text
                      style={{
                        color: isSelected ? colors.background : colors.text,
                        fontWeight: '600',
                      }}
                    >
                      {tab}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text style={{ color: colors.text }}>
              Current tab: {tabs[selectedTab]}
            </Text>

            {/* Code snippet (NO copying logic) */}
            <View style={themedStyles.codeCard}>
              <View style={themedStyles.codeHeader}>
                <Text style={themedStyles.codeHeaderText}>JSX</Text>
              </View>
              <View style={themedStyles.codeBody}>
                <Text style={themedStyles.codeText}>{tabsSnippet}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 2) PROGRESS INDICATORS */}
        <View style={themedStyles.section}>
          <View style={themedStyles.demoCard}>
            <Text style={themedStyles.sectionTitle}>Progress Indicators</Text>
            <Text style={{ color: colors.text }}>
              Current progress: {progress}%
            </Text>
            <View style={themedStyles.progressBarContainer}>
              <Animated.View
                style={[
                  themedStyles.progressFill,
                  {
                    width: `${progress}%`,
                  },
                ]}
              />
            </View>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
              {[0, 25, 50, 75, 100].map((val) => (
                <TouchableOpacity
                  key={val}
                  style={{
                    backgroundColor: colors.primary,
                    borderRadius: 8,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                  }}
                  onPress={() => {
                    setProgress(val);
                    AccessibilityInfo.announceForAccessibility(`Progress set to ${val}%`);
                  }}
                >
                  <Text style={{ color: colors.background }}>{val}%</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Code snippet (NO copying logic) */}
            <View style={themedStyles.codeCard}>
              <View style={themedStyles.codeHeader}>
                <Text style={themedStyles.codeHeaderText}>JSX</Text>
              </View>
              <View style={themedStyles.codeBody}>
                <Text style={themedStyles.codeText}>{progressSnippet}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 3) ALERTS & TOASTS */}
        <View style={themedStyles.section}>
          <View style={themedStyles.demoCard}>
            <Text style={themedStyles.sectionTitle}>Alerts &amp; Toasts</Text>
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                padding: 12,
                borderRadius: 8,
                alignItems: 'center',
              }}
              onPress={() => showToastMessage()}
              accessibilityRole="button"
              accessibilityLabel="Show alert message"
            >
              <Text style={{ color: colors.background, fontWeight: '600' }}>
                Trigger Alert
              </Text>
            </TouchableOpacity>

            {/* Ephemeral alert message */}
            {showToast && (
              <View style={{ marginTop: 8, padding: 8, borderRadius: 8, backgroundColor: '#f33' }}>
                <Text style={{ color: '#fff', fontWeight: '600' }}>
                  Something happened!
                </Text>
              </View>
            )}

            {/* Code snippet (NO copying logic) */}
            <View style={themedStyles.codeCard}>
              <View style={themedStyles.codeHeader}>
                <Text style={themedStyles.codeHeaderText}>JSX</Text>
              </View>
              <View style={themedStyles.codeBody}>
                <Text style={themedStyles.codeText}>{alertsSnippet}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 4) SLIDERS / RANGE INPUTS */}
        <View style={themedStyles.section}>
          <View style={themedStyles.demoCard}>
            <Text style={themedStyles.sectionTitle}>Sliders &amp; Range Inputs</Text>
            <Text style={{ color: colors.text, marginBottom: 8 }}>
              (Placeholder example, library needed for a real slider)
            </Text>
            <Text style={{ color: colors.text }}>
              Current slider value: {sliderValue}
            </Text>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
              {[0, 25, 50, 75, 100].map((val) => (
                <TouchableOpacity
                  key={val}
                  style={{
                    backgroundColor: colors.primary,
                    borderRadius: 8,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                  }}
                  onPress={() => {
                    setSliderValue(val);
                    AccessibilityInfo.announceForAccessibility(
                      `Slider value set to ${val}`
                    );
                  }}
                >
                  <Text style={{ color: colors.background }}>{val}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Code snippet (NO copying logic) */}
            <View style={themedStyles.codeCard}>
              <View style={themedStyles.codeHeader}>
                <Text style={themedStyles.codeHeaderText}>JSX</Text>
              </View>
              <View style={themedStyles.codeBody}>
                <Text style={themedStyles.codeText}>{sliderSnippet}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Extra spacing at bottom */}
        <View style={{ height: 48 }} />
      </ScrollView>
    </LinearGradient>
  );
}

/* -------------------------------------------
   HIDE ROUTE NAME (if using Expo Router)
--------------------------------------------*/
export const options = {
  headerTitle: '',
};
