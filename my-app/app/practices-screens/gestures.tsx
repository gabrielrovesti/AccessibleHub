import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, AccessibilityInfo, Platform, UIManager, findNodeHandle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function GesturesTutorialScreen() {
  const { colors, textSizes, isDarkMode } = useTheme();
  const [showSingleTapSuccess, setShowSingleTapSuccess] = useState(false);
  const [showDoubleTapSuccess, setShowDoubleTapSuccess] = useState(false);
  const [showLongPressSuccess, setShowLongPressSuccess] = useState(false);
  const [lastTap, setLastTap] = useState(0);
  const doubleTapButtonRef = React.useRef(null);
  const DOUBLE_TAP_DELAY = 300;

  const setAccessibilityFocus = (ref) => {
    if (ref && ref.current) {
      if (Platform.OS === 'android') {
        UIManager.sendAccessibilityEvent(
          findNodeHandle(ref.current),
          UIManager.AccessibilityEventTypes.typeViewFocused
        );
      }
    }
  };

  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);
  useEffect(() => {
    AccessibilityInfo.isScreenReaderEnabled().then((enabled) => {
      setScreenReaderEnabled(enabled);
    });
    const listener = AccessibilityInfo.addEventListener('change', (enabled) => {
      setScreenReaderEnabled(enabled);
    });
    return () => listener.remove();
  }, []);

  const handleSingleTap = () => {
    setShowSingleTapSuccess(true);
    AccessibilityInfo.announceForAccessibility('Single tap gesture completed successfully');
    setTimeout(() => setShowSingleTapSuccess(false), 1500);
  };

const handleDoubleTap = () => {
  if (screenReaderEnabled) {
    setShowDoubleTapSuccess(true);
    AccessibilityInfo.announceForAccessibility('Double tap gesture completed successfully with screen reader');
    setTimeout(() => setShowDoubleTapSuccess(false), 1500);
    return;
  }

  const now = Date.now();
  if (lastTap && now - lastTap < DOUBLE_TAP_DELAY) {
    setShowDoubleTapSuccess(true);
    AccessibilityInfo.announceForAccessibility('Double tap gesture completed successfully');
    setTimeout(() => setShowDoubleTapSuccess(false), 1500);
    setLastTap(0);
  } else {
    setLastTap(now);
  }
};

const handleLongPress = () => {
  setShowLongPressSuccess(true);
  const message = screenReaderEnabled
    ? 'Long press gesture completed successfully with screen reader'
    : 'Long press gesture completed successfully';
  AccessibilityInfo.announceForAccessibility(message);
  setTimeout(() => setShowLongPressSuccess(false), 1500);
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
    section: {
      padding: 16,
    },
    practiceCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      ...cardShadowStyle,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
      alignItems: 'center',
      marginBottom: 16,
    },
    practiceTitle: {
      color: colors.text,
      fontSize: textSizes.large,
      fontWeight: '600',
      marginBottom: 12,
    },
    practiceButton: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: 14,
      paddingHorizontal: 24,
      alignItems: 'center',
      marginBottom: 12,
    },
    practiceButtonText: {
      color: colors.surface,
      fontSize: textSizes.medium,
      fontWeight: '600',
    },
    feedbackText: {
      color: '#28A745',
      fontSize: textSizes.medium,
      marginTop: 12,
      textAlign: 'center',
    },
    infoText: {
      color: colors.textSecondary,
      fontSize: textSizes.small,
      textAlign: 'center',
      marginTop: 8,
    },
  };

  return (
    <LinearGradient colors={gradientColors} style={themedStyles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        accessibilityRole="scrollview"
        accessibilityLabel="Gestures Tutorial Screen"
      >
        <View style={themedStyles.heroCard}>
          <Text style={themedStyles.heroTitle} accessibilityRole="header">
            Gestures Tutorial
          </Text>
          <Text style={themedStyles.heroSubtitle}>
            Practice tap gestures: single tap, double tap, and long press.
          </Text>
        </View>

        <View style={themedStyles.section}>
          <View style={themedStyles.practiceCard}>
            <Text style={themedStyles.practiceTitle}>Single Tap</Text>
            <TouchableOpacity
              style={themedStyles.practiceButton}
              onPress={handleSingleTap}
              accessibilityRole="button"
              accessibilityLabel="Practice single tap"
              accessibilityHint="Double tap to activate if using a screen reader"
            >
              <Text style={themedStyles.practiceButtonText}>Tap me!</Text>
            </TouchableOpacity>
            {showSingleTapSuccess && (
              <Text style={themedStyles.feedbackText} accessibilityLiveRegion="polite">Single tap successful!</Text>
            )}
            <Text style={themedStyles.infoText}>
              For screen readers, double tap activates the item.
            </Text>
          </View>

          <View style={themedStyles.practiceCard}>
            <Text style={themedStyles.practiceTitle}>Double Tap</Text>
            <TouchableOpacity
              style={themedStyles.practiceButton}
              onPress={handleDoubleTap}
              accessibilityRole="button"
              accessibilityLabel="Practice double tap"
              accessibilityHint={screenReaderEnabled ?
                "Tap to simulate double tap gesture" :
                "Double tap quickly to activate"}
              accessibilityActions={[
                { name: 'activate', label: 'Activate double tap' }
              ]}
              onAccessibilityAction={(event) => {
                if (event.nativeEvent.actionName === 'activate') {
                  handleDoubleTap();
                }
              }}
            >
              <Text style={themedStyles.practiceButtonText}>Double Tap me!</Text>
            </TouchableOpacity>
            {showDoubleTapSuccess && (
              <Text style={themedStyles.feedbackText} accessibilityLiveRegion="polite">Double tap successful!</Text>
            )}
            <Text style={themedStyles.infoText}>
              {screenReaderEnabled
                ? "With screen reader: Tap once to simulate double tap. The activate action is also available."
                : "Tap twice quickly (if using a screen reader, double tap will activate)."}
            </Text>
          </View>

          <View style={themedStyles.practiceCard}>
            <Text style={themedStyles.practiceTitle}>Long Press</Text>
            <TouchableOpacity
              style={themedStyles.practiceButton}
              onLongPress={handleLongPress}
              accessibilityRole="button"
              accessibilityLabel="Practice long press"
              accessibilityHint="Press and hold to activate"
              accessibilityActions={[
                { name: 'activate', label: 'Activate long press' },
                { name: 'longpress', label: 'Simulate long press' }
              ]}
              onAccessibilityAction={(event) => {
                if (event.nativeEvent.actionName === 'activate' ||
                    event.nativeEvent.actionName === 'longpress') {
                  handleLongPress();
                }
              }}
              accessibilityState={{
                disabled: false,
                busy: showLongPressSuccess
              }}
            >
              <Text style={themedStyles.practiceButtonText}>Long Press me!</Text>
            </TouchableOpacity>
            {showLongPressSuccess && (
              <Text style={themedStyles.feedbackText} accessibilityLiveRegion="polite">Long press successful!</Text>
            )}
            <Text style={themedStyles.infoText}>
              {screenReaderEnabled
                ? "With screen reader: Use the activate or longpress action to simulate a long press."
                : "Press and hold the button. In screen readers, use the custom actions to simulate long press."}
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}