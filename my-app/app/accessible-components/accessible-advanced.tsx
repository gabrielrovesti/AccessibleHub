import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Clipboard, Modal, AccessibilityInfo, Animated, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';
import { useTheme } from '../../context/ThemeContext';

const accessibilityFeatures = [
  {
    icon: 'albums-outline',
    title: 'Tab Navigation',
    description: 'Proper role and state management for tab controls',
  },
  {
    icon: 'hourglass-outline',
    title: 'Progress Updates',
    description: 'Live announcements of progress changes',
  },
  {
    icon: 'notifications-outline',
    title: 'Alert Notifications',
    description: 'Immediate feedback for important events',
  },
  {
    icon: 'options-outline',
    title: 'Slider Controls',
    description: 'Accessible range inputs with value announcements',
  },
];

function CodeSnippet({ snippet, label }) {
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
      accessible
      accessibilityLabel={`Source code for ${label}`}
      accessibilityRole="text"
    >
      <View style={styles.snippetHeader}>
        <Text style={styles.snippetHeaderText}>JSX</Text>
        <TouchableOpacity
          style={styles.copyButton}
          onPress={handleCopy}
          accessibilityRole="button"
          accessibilityLabel={copied ? 'Code copied' : 'Copy code example'}
          accessibilityHint="Tap to copy code example to clipboard"
        >
          <Ionicons
            name={copied ? 'checkmark' : 'copy-outline'}
            size={20}
            color={copied ? '#28A745' : colors.textSecondary}
            accessibilityElementsHidden={true}
            importantForAccessibility="no-hide-descendants"
          />
          <Text style={[styles.copyText, copied && styles.copiedText]}>
            {copied ? 'Copied!' : 'Copy'}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.codeText}>
        {snippet}
      </Text>
    </View>
  );
}

export default function AccessibleAdvancedScreen() {
  const { colors, textSizes, isDarkMode } = useTheme();
  const [selectedTab, setSelectedTab] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);
  const lastAnnouncedValue = useRef(sliderValue);

  const progressAnimated = useRef(new Animated.Value(progress)).current;
  const tabs = ['Tab One', 'Tab Two', 'Tab Three'];

  useEffect(() => {
    Animated.timing(progressAnimated, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  useEffect(() => {
    let isMounted = true;

    const checkScreenReader = async () => {
      const isEnabled = await AccessibilityInfo.isScreenReaderEnabled();
      if (isMounted) {
        setScreenReaderEnabled(isEnabled);
      }
    };

    checkScreenReader();

    const listener = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      checkScreenReader
    );

    return () => {
      isMounted = false;
      listener.remove();
    };
  }, []);

  const showToastMessage = () => {
    setShowToast(true);
    AccessibilityInfo.announceForAccessibility('Alert: Something happened');
    setTimeout(() => setShowToast(false), 2000);
  };

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
    tabText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: textSizes.medium,
    },
    inactiveTabText: {
      color: isDarkMode ? '#333' : '#666',
      fontWeight: '600',
      fontSize: textSizes.medium,
    },
    currentTabLabel: {
      color: colors.text,
      fontSize: textSizes.large,
      marginTop: 12,
      marginBottom: 16,
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
    featuresSection: {
      marginTop: 24,
      paddingHorizontal: 16,
    },
    featuresTitle: {
      color: colors.text,
      fontSize: textSizes.large,
      fontWeight: '600',
      marginBottom: 16,
    },
    featureCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      ...cardShadowStyle,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
    },
    featureRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 12,
    },
    featureIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: isDarkMode ? `${colors.primary}20` : '#E8F1FF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    featureContent: {
      flex: 1,
    },
    featureTitle: {
      color: colors.text,
      fontSize: textSizes.medium,
      fontWeight: '600',
      marginBottom: 4,
    },
    featureDescription: {
      color: colors.textSecondary,
      fontSize: textSizes.small + 1,
      lineHeight: 20,
    },
  };

  return (
    <LinearGradient colors={gradientColors} style={themedStyles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }} accessibilityRole="scrollview">
        <View style={themedStyles.heroCard}>
          <Text style={themedStyles.heroTitle} accessibilityRole="header">
            Advanced Accessible Components
          </Text>
          <Text style={themedStyles.heroSubtitle}>
            Demonstrating Tabs/Carousels, Progress Indicators, Alerts/Toasts, and Sliders in one screen
          </Text>
        </View>

        <View style={themedStyles.section}>
          <View style={themedStyles.demoCard}>
            <Text style={themedStyles.sectionTitle}>Tabs &amp; Carousels</Text>
            <View style={{ flexDirection: 'row', marginBottom: 8 }}
              accessibilityRole="tablist"
              accessibilityLabel="Navigation tabs"
            >
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
                    <Text style={isSelected ? themedStyles.tabText : themedStyles.inactiveTabText}>
                      {tab}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text style={themedStyles.currentTabLabel}>
              Current tab: {tabs[selectedTab]}
            </Text>

            <CodeSnippet snippet={tabsSnippet} label="Tabs & Carousels" />
          </View>
        </View>

        <View style={themedStyles.section}>
          <View style={themedStyles.demoCard}>
            <Text style={themedStyles.sectionTitle}>Progress Indicators</Text>
            <Text style={{ color: colors.text }}>Current progress: {progress}%</Text>
            <View
              style={themedStyles.progressBarContainer}
              accessibilityRole="progressbar"
              accessibilityLabel="Progress indicator"
              accessibilityValue={{
                min: 0,
                max: 100,
                now: progress
              }}
            >
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
                importantForAccessibility="no"
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
                    paddingVertical: 6,
                  }}
                  onPress={() => {
                    setProgress(val);
                    AccessibilityInfo.announceForAccessibility(`Progress set to ${val}%`);
                  }}
                accessibilityRole="button"
                accessibilityLabel={`Set progress to ${val} percent`}
                >
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: textSizes.medium,
                      fontWeight: '600',
                    }}
                  >
                    {val}%
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <CodeSnippet snippet={progressSnippet} label="Progress Indicator" />
          </View>
        </View>

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
              <Text style={{ color: '#fff', fontWeight: '600', fontSize: textSizes.medium }}>
                Trigger Alert
              </Text>
            </TouchableOpacity>
            {showToast && (
              <View
                style={{ marginTop: 8, padding: 8, borderRadius: 8, backgroundColor: '#f33' }}
                accessibilityRole="alert"
                accessibilityLiveRegion="assertive"
                accessible={true}
              >
                <Text style={{ color: '#fff', fontWeight: '600' }}>Something happened!</Text>
              </View>
            )}
            <CodeSnippet snippet={alertsSnippet} label="Alerts & Toasts" />
          </View>
        </View>

        <View style={themedStyles.section}>
          <View style={themedStyles.demoCard}>
            <Text style={themedStyles.sectionTitle}>Sliders &amp; Range Inputs</Text>

            <View
              accessible={true}
              accessibilityLabel={`Slider control, current value ${sliderValue} percent`}
              style={{ marginVertical: 12 }}
            >
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 14
              }}>
                <TouchableOpacity
                  style={{
                    padding: 10,
                    backgroundColor: colors.primary,
                    borderRadius: 25,
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onPress={() => {
                    const newValue = Math.max(0, sliderValue - 5);
                    setSliderValue(newValue);
                    lastAnnouncedValue.current = newValue;
                    AccessibilityInfo.announceForAccessibility(`Value set to ${newValue} percent`);
                  }}
                  accessibilityRole="button"
                  accessibilityLabel="Decrease value"
                  accessibilityHint="Decreases slider value by 5 percent"
                >
                  <Ionicons name="remove" size={24} color="#fff" />
                </TouchableOpacity>

                <Text style={{
                  color: colors.text,
                  fontSize: textSizes.large,
                  fontWeight: 'bold'
                }}>
                  {sliderValue}%
                </Text>

                <TouchableOpacity
                  style={{
                    padding: 10,
                    backgroundColor: colors.primary,
                    borderRadius: 25,
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onPress={() => {
                    const newValue = Math.min(100, sliderValue + 5);
                    setSliderValue(newValue);
                    lastAnnouncedValue.current = newValue;
                    AccessibilityInfo.announceForAccessibility(`Value set to ${newValue} percent`);
                  }}
                  accessibilityRole="button"
                  accessibilityLabel="Increase value"
                  accessibilityHint="Increases slider value by 5 percent"
                >
                  <Ionicons name="add" size={24} color="#fff" />
                </TouchableOpacity>
              </View>

              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 16
              }}>
                {[0, 25, 50, 75, 100].map(value => (
                  <TouchableOpacity
                    key={value}
                    style={{
                      backgroundColor: sliderValue === value ? colors.primary : colors.primary + '30',
                      paddingVertical: 6,
                      paddingHorizontal: 12,
                      borderRadius: 16,
                    }}
                    onPress={() => {
                      setSliderValue(value);
                      lastAnnouncedValue.current = value;
                      AccessibilityInfo.announceForAccessibility(`Value set to ${value} percent`);
                    }}
                    accessibilityRole="button"
                    accessibilityLabel={`Set value to ${value} percent`}
                    accessibilityState={{ selected: sliderValue === value }}
                  >
                    <Text style={{
                      color: sliderValue === value ? '#fff' : colors.text,
                      fontWeight: 'bold'
                    }}>
                      {value}%
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Slider
                value={sliderValue}
                minimumValue={0}
                maximumValue={100}
                step={1}
                onSlidingComplete={(val) => {
                  const newValue = Math.round(val);
                  setSliderValue(newValue);
                  if (Math.abs(lastAnnouncedValue.current - newValue) >= 5) {
                    AccessibilityInfo.announceForAccessibility(`Value set to ${newValue} percent`);
                    lastAnnouncedValue.current = newValue;
                  }
                }}
                style={{ width: '100%', height: 40 }}
                minimumTrackTintColor="#2196F3"
                maximumTrackTintColor="#ccc"
                importantForAccessibility="no-hide-descendants"
              />
            </View>

            <CodeSnippet snippet={sliderSnippet} label="Slider / Range Input" />
          </View>
        </View>

        <View style={themedStyles.featuresSection}>
          <Text style={themedStyles.featuresTitle}>Accessibility Features</Text>
          {accessibilityFeatures.map((feature, index) => (
            <View key={index} style={themedStyles.featureCard}>
              <View style={themedStyles.featureRow}>
                <View style={themedStyles.featureIconContainer}>
                  <Ionicons
                    name={feature.icon}
                    size={24}
                    color={isDarkMode ? '#1a75ff' : colors.primary}
                    accessibilityElementsHidden={true}
                    importantForAccessibility="no-hide-descendants"
                  />
                </View>
                <View style={themedStyles.featureContent}>
                  <Text style={themedStyles.featureTitle}>
                    {feature.title}
                  </Text>
                  <Text style={themedStyles.featureDescription}>
                    {feature.description}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 48 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const tabsSnippet = `const [selectedTab, setSelectedTab] = useState(0);
const tabs = ['Tab One', 'Tab Two', 'Tab Three'];

<View style={{ flexDirection: 'row' }} accessibilityRole="tablist">
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

const progressSnippet = `const [progress, setProgress] = useState(0);

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
/>
`;

const alertsSnippet = `const [showToast, setShowToast] = useState(false);

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

const sliderSnippet = `<View
  accessible={true}
  accessibilityLabel={\`Slider control, current value \${sliderValue} percent\`}
>

{/* Button Controls for Screen Reader Users */}

<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <TouchableOpacity
      onPress={() => {
        const newValue = Math.max(0, sliderValue - 5);
        setSliderValue(newValue);
        AccessibilityInfo.announceForAccessibility(\`Value set to \${newValue} percent\`);
      }}
      accessibilityRole="button"
      accessibilityLabel="Decrease value"
    >
      <Ionicons name="remove" size={24} color="#2196F3" />
    </TouchableOpacity>
    <Text>{sliderValue}%</Text>
  </View>

  {/* Preset buttons for quick access to common values */}

<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
{[0, 25, 50, 75, 100].map(value => (
  <TouchableOpacity
    key={value}
    onPress={() => {
      setSliderValue(value);
      AccessibilityInfo.announceForAccessibility(\`Value set to \${value} percent\`);}}
    accessibilityRole="button"
    accessibilityLabel={\`Set value to \${value}\`}    accessibilityState={{ selected: sliderValue === value }}
  >
        <Text>{value}%</Text>
      </TouchableOpacity>
    ))}
  </View>

  {/* Visual Slider (hidden from screen readers) */}
  <Slider
    value={sliderValue}
    onSlidingComplete={(val) => setSliderValue(Math.round(val))}
    importantForAccessibility="no-hide-descendants"
  />
</View>`;

export const options = {
  headerShown: true,
  title: 'Loading & Navigation',
};

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
