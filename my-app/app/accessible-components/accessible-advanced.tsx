// app/accessible-components/accessible-advanced.tsx

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Clipboard,
  Modal,
  AccessibilityInfo,
  Animated,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';
import { useTheme } from '../../context/ThemeContext';

function CodeSnippet({ snippet, label }: { snippet: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const { colors } = useTheme();

  const handleCopy = async () => {
    try {
      await Clipboard.setString(snippet);
      setCopied(true);
      AccessibilityInfo.announceForAccessibility('Code copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      AccessibilityInfo.announceForAccessibility('Failed to copy code');
    }
  };

  return (
    <View
      style={styles.snippetContainer}
      accessible={true}
      accessibilityLabel={`Source code for ${label}`}
      accessibilityRole="text"
    >
      <View style={styles.snippetHeader}>
        <Text style={styles.snippetHeaderText}JSX></Text>
        <TouchableOpacity
          style={styles.copyButton}
          onPress={handleCopy}
          accessibilityRole="button"
          accessibilityLabel={copied ? "Code copied" : "Copy code example"}
          accessibilityHint="Copies the code example to your clipboard"
        >
          <Ionicons
            name={copied ? "checkmark" : "copy-outline"}
            size={20}
            color={copied ? "#28A745" : colors.textSecondary}
            accessibilityElementsHidden
          />
          <Text style={[styles.copyText, copied && styles.copiedText]}>
            {copied ? "Copied!" : "Copy"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Actual code text (hidden from screen readers) */}
      <Text style={styles.codeText} accessibilityElementsHidden>
        {snippet}
      </Text>
    </View>
  );
}

export default function AccessibleAdvancedScreen() {
  const { colors, textSizes, isDarkMode } = useTheme();

  /********************************************************
   * 1) TABS & CAROUSELS
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
   * 2) PROGRESS INDICATORS
   ********************************************************/
  const [progress, setProgress] = useState(0);
  const progressAnimated = useRef(new Animated.Value(progress)).current;

  const progressSnippet = `// Basic progress bar
const [progress, setProgress] = useState(0);
const progressAnimated = new Animated.Value(progress);

useEffect(() => {
  Animated.timing(progressAnimated, {
    toValue: progress,
    duration: 300,
    useNativeDriver: false,
  }).start();
}, [progress]);

<Animated.View
  style={{
    height: 10,
    backgroundColor: 'blue',
    width: progressAnimated.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%'],
    }),
  }}
/>`;

  useEffect(() => {
    Animated.timing(progressAnimated, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  /********************************************************
   * 3) ALERTS & TOASTS
   ********************************************************/
  const [showToast, setShowToast] = useState(false);

  const alertsSnippet = `// Minimal toast/alert
const [showToast, setShowToast] = useState(false);

function showToastMessage() {
  setShowToast(true);
  AccessibilityInfo.announceForAccessibility('Alert: Something happened');
  setTimeout(() => setShowToast(false), 2000);
}

{showToast && (
  <View style={{ ... }}>
    <Text>Something happened!</Text>
  </View>
)}`;

  const showToastMessage = () => {
    setShowToast(true);
    AccessibilityInfo.announceForAccessibility('Alert: Something happened');
    setTimeout(() => setShowToast(false), 2000);
  };

  /********************************************************
   * 4) SLIDERS / RANGE INPUTS
   ********************************************************/
  const [sliderValue, setSliderValue] = useState(50);

  // Use onSlidingComplete to finalize the value, preventing flicker
  const sliderSnippet = `// Minimal slider example using @react-native-community/slider
import Slider from '@react-native-community/slider';

<Slider
  minimumValue={0}
  maximumValue={100}
  value={sliderValue}
  onSlidingComplete={(val) => {
    setSliderValue(val);
    AccessibilityInfo.announceForAccessibility(\`Slider value set to \${Math.round(val)}\`);
  }}
  style={{ width: '100%' }}
  minimumTrackTintColor={colors.primary}
  maximumTrackTintColor="#ccc"
/>
<Text>Current slider value: {sliderValue}</Text>`;

  /********************************************************
   * Theming & Layout
   ********************************************************/
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
    section: { paddingHorizontal: 16, marginTop: 16 },
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
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }} accessibilityRole="scrollview">
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
                    <Text style={{ color: isSelected ? colors.background : colors.text, fontWeight: '600' }}>
                      {tab}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text style={{ color: colors.text }}>Current tab: {tabs[selectedTab]}</Text>

            <CodeSnippet snippet={tabsSnippet} label="Tabs & Carousels" />
          </View>
        </View>

        {/* 2) PROGRESS INDICATORS */}
        <View style={themedStyles.section}>
          <View style={themedStyles.demoCard}>
            <Text style={themedStyles.sectionTitle}>Progress Indicators</Text>
            <Text style={{ color: colors.text }}>Current progress: {progress}%</Text>
            <View style={themedStyles.progressBarContainer}>
              <Animated.View
                style={[
                  themedStyles.progressFill,
                  {
                    width: progressAnimated.interpolate({
                      inputRange: [0, 100],
                      outputRange: ['0%', '100%'],
                    }),
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

            <CodeSnippet snippet={progressSnippet} label="Progress Indicator" />
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
              onPress={showToastMessage}
              accessibilityRole="button"
              accessibilityLabel="Show alert message"
            >
              <Text style={{ color: colors.background, fontWeight: '600' }}>Trigger Alert</Text>
            </TouchableOpacity>
            {showToast && (
              <View style={{ marginTop: 8, padding: 8, borderRadius: 8, backgroundColor: '#f33' }}>
                <Text style={{ color: '#fff', fontWeight: '600' }}>Something happened!</Text>
              </View>
            )}

            <CodeSnippet snippet={alertsSnippet} label="Alerts & Toasts" />
          </View>
        </View>

        {/* 4) SLIDERS / RANGE INPUTS */}
        <View style={themedStyles.section}>
          <View style={themedStyles.demoCard}>
            <Text style={themedStyles.sectionTitle}>Sliders &amp; Range Inputs</Text>
            <Text style={{ color: colors.text, marginBottom: 8 }}>
              Current slider value: {sliderValue}
            </Text>
            <Slider
              minimumValue={0}
              maximumValue={100}
              value={sliderValue}
              onSlidingComplete={(val) => {
                setSliderValue(val);
                AccessibilityInfo.announceForAccessibility(`Slider value set to ${Math.round(val)}`);
              }}
              accessibilityLabel="Slider input"
              style={{ width: '100%', height: 40 }}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor="#ccc"
            />

            <CodeSnippet snippet={sliderSnippet} label="Slider / Range Input" />
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 48 }} />
      </ScrollView>
    </LinearGradient>
  );
}

/**
 * By default, the raw route name "accessible-advanced" might appear.
 * Here, we override it with a custom header or hide it entirely.
 */
export const options = {
  // If you want a custom name in the header:
  headerShown: true,
  title: 'Loading & Navigation',

  // OR hide the header completely:
  // headerShown: false,
};

/* -------------------------------------------
   LOCAL STYLES
--------------------------------------------*/
const styles = StyleSheet.create({
  snippetContainer: {
    backgroundColor: '#1c1c1e',
    borderRadius: 8,
    marginTop: 12,
    padding: 12,
  },
  snippetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  snippetHeaderText: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#999',
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 4,
  },
  copyText: {
    fontSize: 14,
    color: '#666',
  },
  copiedText: {
    color: '#28A745',
  },
  codeText: {
    color: '#fff',
    fontFamily: 'monospace',
    fontSize: 14,
    lineHeight: 20,
  },
});
