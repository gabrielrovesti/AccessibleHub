import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  PanResponder,
  Animated,
  AccessibilityInfo,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function GesturesTutorialScreen() {
  const { colors, textSizes, isDarkMode } = useTheme();

  // 1) Manage state for expanded sections, success modal, and swipe index
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [swipeIndex, setSwipeIndex] = useState(0);
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);

  // 2) Check if screen reader is enabled to disable vertical swipes
  useEffect(() => {
    AccessibilityInfo.isScreenReaderEnabled().then((enabled) => {
      setScreenReaderEnabled(enabled);
    });

    const srListener = AccessibilityInfo.addEventListener('change', (enabled) => {
      setScreenReaderEnabled(enabled);
    });

    return () => {
      srListener.remove();
    };
  }, []);

  // 3) Gesture Data
  const gestureTypes = [
    {
      id: 'tap',
      title: 'Single Tap',
      icon: 'finger-print-outline',
      description: 'Select and announce items. Most basic and reliable gesture.',
      practiceHint: 'Tap to activate',
    },
    {
      id: 'double',
      title: 'Double Tap',
      icon: 'sync-outline',
      description: 'Activate the selected item. Commonly used and easy to perform.',
      practiceHint: 'Double tap to activate',
    },
    {
      id: 'swipe-lr',
      title: 'Swipe Left/Right',
      icon: 'arrow-forward-outline',
      description: 'Navigate between items. Basic horizontal movement.',
      practiceHint: 'Swipe left or right',
    },
    {
      id: 'swipe-ud',
      title: 'Swipe Up/Down',
      icon: 'arrow-up-outline',
      description: 'Scroll content. Simple vertical movement.',
      practiceHint: 'Swipe up or down',
    },
  ];

  // 4) Announce gesture success
  const handleTapSuccess = (gestureName: string) => {
    setShowSuccess(true);
    AccessibilityInfo.announceForAccessibility(`${gestureName} gesture completed successfully`);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  // 5) Expand/Collapse practice area
  const toggleSection = (sectionId: string) => {
    const newSection = activeSection === sectionId ? null : sectionId;
    setActiveSection(newSection);
    if (newSection) {
      AccessibilityInfo.announceForAccessibility(`${sectionId} practice area opened`);
    } else {
      AccessibilityInfo.announceForAccessibility(`${sectionId} practice area closed`);
    }
  };

  // 6) PanResponder for swipe gestures
  const threshold = 50;
  const [panResponder] = useState(() =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const isHorizontal = Math.abs(gestureState.dx) > Math.abs(gestureState.dy);

        // Horizontal swipes
        if (isHorizontal && activeSection === 'swipe-lr') {
          if (Math.abs(gestureState.dx) > threshold) {
            const direction = gestureState.dx > 0 ? 'right' : 'left';
            const newIndex = direction === 'right'
              ? Math.max(0, swipeIndex - 1)
              : Math.min(2, swipeIndex + 1);

            if (newIndex !== swipeIndex) {
              setSwipeIndex(newIndex);
              AccessibilityInfo.announceForAccessibility(
                `Swiped ${direction}. Item ${newIndex + 1} of 3`
              );
              handleTapSuccess('Swipe');
            }
          }
        }
        // Vertical swipes (only if screenReader is disabled)
        else if (!isHorizontal && activeSection === 'swipe-ud' && !screenReaderEnabled) {
          if (Math.abs(gestureState.dy) > threshold) {
            const direction = gestureState.dy > 0 ? 'down' : 'up';
            AccessibilityInfo.announceForAccessibility(`Swiped ${direction}`);
            handleTapSuccess('Vertical swipe');
          }
        }
      },
    })
  );

  // 7) Theming + local styling
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
    container: {
      flex: 1,
    },
    // Hero card for top section
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
    content: {
      padding: 16,
      gap: 16,
    },
    gestureCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      ...cardShadowStyle,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 8,
    },
    cardTitle: {
      color: colors.text,
      fontSize: textSizes.large,
      fontWeight: '600',
      flexShrink: 1,
    },
    cardDescription: {
      color: colors.textSecondary,
      fontSize: textSizes.small + 1,
      lineHeight: 20,
      marginBottom: 8,
    },
    practiceArea: {
      marginTop: 16,
      padding: 16,
      borderRadius: 12,
      backgroundColor: isDarkMode ? colors.background : '#f8f9fa',
    },
    practiceTitle: {
      color: colors.textSecondary,
      fontSize: textSizes.small + 1,
      fontWeight: '600',
      marginBottom: 12,
    },
    practiceButton: {
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      backgroundColor: colors.primary,
    },
    practiceButtonText: {
      color: colors.surface,
      fontSize: textSizes.medium,
      fontWeight: '600',
    },
    swipeArea: {
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 120,
      gap: 16,
    },
    itemIndicator: {
      fontSize: textSizes.large,
      fontWeight: '600',
      color: colors.text,
    },
    swipeInstruction: {
      fontSize: textSizes.medium,
      color: colors.textSecondary,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    successModal: {
      padding: 24,
      borderRadius: 16,
      alignItems: 'center',
      gap: 12,
      minWidth: 200,
      backgroundColor: colors.surface,
      ...cardShadowStyle,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
    },
    successText: {
      fontSize: textSizes.large,
      fontWeight: '600',
      color: colors.text,
    },
  };

  // Renders the practice area for each gesture
  const renderPracticeArea = (gesture: any) => {
    switch (gesture.id) {
      case 'tap':
      case 'double':
        return (
          <TouchableOpacity
            style={themedStyles.practiceButton}
            onPress={() => handleTapSuccess(gesture.title)}
            accessibilityRole="button"
            accessibilityLabel={`Practice ${gesture.title}`}
            accessibilityHint={gesture.practiceHint}
          >
            <Text style={themedStyles.practiceButtonText}>
              {gesture.practiceHint}
            </Text>
          </TouchableOpacity>
        );
      case 'swipe-lr':
        return (
          <View
            {...panResponder.panHandlers}
            style={themedStyles.swipeArea}
            accessibilityLabel="Horizontal swipe practice area"
            accessibilityHint="Swipe left or right to navigate between items"
          >
            <Text style={themedStyles.itemIndicator}>
              Item {swipeIndex + 1} of 3
            </Text>
            <Text style={themedStyles.swipeInstruction}>
              ← Swipe left or right →
            </Text>
          </View>
        );
      case 'swipe-ud':
        return (
          <View
            {...(!screenReaderEnabled ? panResponder.panHandlers : {})}
            style={themedStyles.swipeArea}
            accessibilityLabel="Vertical swipe practice area"
            accessibilityHint={
              screenReaderEnabled
                ? 'Screen reader is active. Vertical swipe detection disabled.'
                : 'Swipe up or down to scroll'
            }
          >
            {screenReaderEnabled ? (
              <Text style={themedStyles.swipeInstruction}>
                Vertical swipes are reserved by screen readers
              </Text>
            ) : (
              <Text style={themedStyles.swipeInstruction}>
                ↑ Swipe up or down ↓
              </Text>
            )}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <LinearGradient colors={gradientColors} style={themedStyles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        accessibilityRole="scrollview"
        accessibilityLabel="Gestures Tutorial Screen"
      >
        {/* HERO CARD */}
        <View style={themedStyles.heroCard}>
          <Text style={themedStyles.heroTitle} accessibilityRole="header">
            Gestures Tutorial
          </Text>
          <Text style={themedStyles.heroSubtitle}>
            Learn and practice the most common and reliable accessibility gestures
          </Text>
        </View>

        {/* GESTURE CARDS */}
        <View style={themedStyles.content}>
          {gestureTypes.map((gesture) => {
            const expanded = activeSection === gesture.id;
            return (
              <TouchableOpacity
                key={gesture.id}
                style={themedStyles.gestureCard}
                onPress={() => toggleSection(gesture.id)}
                accessibilityRole="button"
                accessibilityState={{ expanded }}
                accessibilityLabel={`${gesture.title} practice section`}
                accessibilityHint={`Double tap to ${expanded ? 'close' : 'open'} practice area`}
              >
                <View style={themedStyles.cardHeader}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      backgroundColor: '#E8F1FF',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Ionicons
                      name={gesture.icon}
                      size={24}
                      color={colors.primary}
                      accessibilityElementsHidden
                    />
                  </View>
                  <Text style={themedStyles.cardTitle}>
                    {gesture.title}
                  </Text>
                </View>

                <Text style={themedStyles.cardDescription}>
                  {gesture.description}
                </Text>

                {expanded && (
                  <View style={themedStyles.practiceArea}>
                    <Text
                      style={[
                        themedStyles.practiceTitle,
                        { marginBottom: 12 },
                      ]}
                    >
                      Practice Area
                    </Text>
                    {renderPracticeArea(gesture)}
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* SUCCESS MODAL */}
        <Modal
          visible={showSuccess}
          transparent
          animationType="fade"
          accessibilityViewIsModal
          accessibilityLiveRegion="polite"
        >
          <View style={themedStyles.modalOverlay}>
            <View style={themedStyles.successModal}>
              <Ionicons
                name="checkmark-circle"
                size={32}
                color="#28A745"
                accessibilityElementsHidden
              />
              <Text style={themedStyles.successText}>
                Gesture Completed!
              </Text>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </LinearGradient>
  );
}
