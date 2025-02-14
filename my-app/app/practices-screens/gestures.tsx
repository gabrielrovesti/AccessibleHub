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

export default function GesturesTutorialScreen() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [swipeIndex, setSwipeIndex] = useState(0);
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);
  const { colors, textSizes, isDarkMode } = useTheme();

  /*
   * 1. Check if screen reader is enabled
   *    If so, we disable vertical swipes
   *    to avoid conflict with TalkBack/VoiceOver
   */
  useEffect(() => {
    AccessibilityInfo.isScreenReaderEnabled().then((enabled) => {
      setScreenReaderEnabled(enabled);
    });

    const screenReaderListener = AccessibilityInfo.addEventListener(
      'change',
      (enabled) => {
        setScreenReaderEnabled(enabled);
      }
    );

    return () => {
      screenReaderListener.remove();
    };
  }, []);

  /*
   * 2. Gesture Data
   *    Demonstration of single tap, double tap,
   *    swipe left/right, and swipe up/down
   */
  const gestureTypes = [
    {
      id: 'tap',
      title: 'Single Tap',
      icon: 'finger-print-outline',
      description: 'Select and announce items. Most basic and reliable gesture.',
      practice: 'Tap to activate',
    },
    {
      id: 'double',
      title: 'Double Tap',
      icon: 'sync-outline',
      description: 'Activate the selected item. Commonly used and easy to perform.',
      practice: 'Double tap to activate',
    },
    {
      id: 'swipe-lr',
      title: 'Swipe Left/Right',
      icon: 'arrow-forward-outline',
      description: 'Navigate between items. Basic horizontal movement.',
      practice: 'Swipe left or right',
    },
    {
      id: 'swipe-ud',
      title: 'Swipe Up/Down',
      icon: 'arrow-up-outline',
      description: 'Scroll content. Simple vertical movement.',
      practice: 'Swipe up or down',
    },
  ];

  /*
   * 3. Accessibility announcements on success
   */
  const handleTapSuccess = (gestureName: string) => {
    setShowSuccess(true);
    AccessibilityInfo.announceForAccessibility(
      `${gestureName} gesture completed successfully`
    );
    setTimeout(() => setShowSuccess(false), 2000);
  };

  /*
   * 4. Expand/Collapse practice area
   */
  const toggleSection = (sectionId: string) => {
    const newSection = activeSection === sectionId ? null : sectionId;
    setActiveSection(newSection);

    if (newSection) {
      AccessibilityInfo.announceForAccessibility(`${sectionId} practice area opened`);
    } else {
      AccessibilityInfo.announceForAccessibility(`${sectionId} practice area closed`);
    }
  };

  /*
   * 5. PanResponder for swipe gestures
   *    - Horizontal swipes for "swipe-lr"
   *    - Vertical swipes for "swipe-ud" (skipped if screenReaderEnabled)
   */
  const threshold = 50;
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,

    onPanResponderMove: (evt, gestureState) => {
      // Distinguish horizontal vs. vertical movement
      const isHorizontal = Math.abs(gestureState.dx) > Math.abs(gestureState.dy);

      // Handle horizontal swipes (Left/Right)
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
      // Handle vertical swipes (Up/Down) if screen reader is NOT active
      else if (!isHorizontal && activeSection === 'swipe-ud' && !screenReaderEnabled) {
        if (Math.abs(gestureState.dy) > threshold) {
          const direction = gestureState.dy > 0 ? 'down' : 'up';
          AccessibilityInfo.announceForAccessibility(`Swiped ${direction}`);
          handleTapSuccess('Vertical swipe');
        }
      }
    },
  });

  /*
   * 6. Themed + local styles
   */
  const themedStyles = {
    container: {
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.surface,
      borderBottomColor: colors.border,
    },
    card: {
      backgroundColor: colors.surface,
      // Stronger shadow for better depth
      shadowColor: isDarkMode ? '#000' : '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 3,
    },
    title: {
      color: colors.text,
      fontSize: textSizes.large,
      fontWeight: 'bold',
    },
    description: {
      color: colors.textSecondary,
      fontSize: textSizes.medium,
      lineHeight: 22,
    },
    practiceArea: {
      backgroundColor: isDarkMode ? colors.background : '#f8f9fa',
    },
    practiceButton: {
      backgroundColor: colors.primary,
    },
    practiceButtonText: {
      color: colors.background,
      fontSize: textSizes.medium,
      fontWeight: '600',
    },
  };

  const renderPracticeArea = (gesture: any) => {
    switch (gesture.id) {
      case 'tap':
      case 'double':
        return (
          <TouchableOpacity
            style={[styles.practiceButton, themedStyles.practiceButton]}
            onPress={() => handleTapSuccess(gesture.title)}
            accessibilityRole="button"
            accessibilityLabel={`Practice ${gesture.title}`}
            accessibilityHint={gesture.practice}
          >
            <Text style={[styles.practiceButtonText, themedStyles.practiceButtonText]}>
              {gesture.practice}
            </Text>
          </TouchableOpacity>
        );
      case 'swipe-lr':
        return (
          <View
            {...panResponder.panHandlers}
            style={styles.swipeArea}
            accessibilityLabel="Horizontal swipe practice area"
            accessibilityHint="Swipe left or right to navigate between items"
          >
            <Text style={[styles.itemIndicator, { color: colors.text }]}>
              Item {swipeIndex + 1} of 3
            </Text>
            <Text style={[styles.swipeInstruction, { color: colors.textSecondary }]}>
              ← Swipe left or right →
            </Text>
          </View>
        );
      case 'swipe-ud':
        return (
          <View
            {...(!screenReaderEnabled ? panResponder.panHandlers : {})}
            style={styles.swipeArea}
            accessibilityLabel="Vertical swipe practice area"
            accessibilityHint={
              screenReaderEnabled
                ? 'Screen reader is active. Vertical swipe detection disabled.'
                : 'Swipe up or down to scroll'
            }
          >
            {screenReaderEnabled ? (
              <Text style={[styles.swipeInstruction, { color: colors.textSecondary }]}>
                Vertical swipes are reserved by screen readers (TalkBack, VoiceOver).
              </Text>
            ) : (
              <Text style={[styles.swipeInstruction, { color: colors.textSecondary }]}>
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
    <ScrollView
      style={[styles.container, themedStyles.container]}
      ref={scrollViewRef}
      accessibilityRole="scrollView"
    >
      {/* HEADER */}
      <View style={[styles.header, themedStyles.header]}>
        <Text
          style={[styles.headerTitle, themedStyles.title]}
          accessibilityRole="header"
        >
          Gestures Tutorial
        </Text>
        <Text style={[styles.headerDescription, themedStyles.description]}>
          Learn and practice the most common and reliable accessibility gestures
        </Text>
      </View>

      {/* CONTENT: GESTURE CARDS */}
      <View style={styles.content}>
        {gestureTypes.map((gesture) => {
          const expanded = activeSection === gesture.id;
          return (
            <TouchableOpacity
              key={gesture.id}
              style={[styles.card, themedStyles.card]}
              onPress={() => toggleSection(gesture.id)}
              accessibilityRole="button"
              accessibilityState={{ expanded }}
              accessibilityLabel={`${gesture.title} practice section`}
              accessibilityHint={`Double tap to ${expanded ? 'close' : 'open'} practice area`}
            >
              <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name={gesture.icon}
                    size={24}
                    color={colors.primary}
                    accessibilityElementsHidden
                  />
                </View>
                <Text style={[styles.cardTitle, { color: colors.text }]}>
                  {gesture.title}
                </Text>
              </View>

              <Text style={[styles.cardDescription, { color: colors.textSecondary }]}>
                {gesture.description}
              </Text>

              {expanded && (
                <View
                  style={[
                    styles.practiceArea,
                    themedStyles.practiceArea
                  ]}
                >
                  <Text style={[styles.practiceTitle, { color: colors.textSecondary }]}>
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
        <View style={styles.modalOverlay}>
          <View style={[styles.successModal, themedStyles.card]}>
            <Ionicons
              name="checkmark-circle"
              size={32}
              color="#28A745"
              accessibilityElementsHidden
            />
            <Text style={[styles.successText, { color: colors.text }]}>
              Gesture Completed!
            </Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

/* ----------------------------------------------------------------
   LOCAL STYLES
   (combine with your theme-based overrides above)
------------------------------------------------------------------ */
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  headerDescription: {
    fontSize: 16,
    lineHeight: 22,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  card: {
    borderRadius: 16,
    padding: 16,
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
    backgroundColor: '#E8F1FF',
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
    marginBottom: 8,
  },
  practiceArea: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
  },
  practiceTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  practiceButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  practiceButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  swipeArea: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    gap: 16,
  },
  itemIndicator: {
    fontSize: 18,
    fontWeight: '600',
  },
  swipeInstruction: {
    fontSize: 14,
    opacity: 0.7,
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
  },
  successText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
