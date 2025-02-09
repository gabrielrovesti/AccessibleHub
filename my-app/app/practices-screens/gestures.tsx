import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Animated,
  PanResponder,
  AccessibilityInfo,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const GesturesTutorialScreen = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [swipeIndex, setSwipeIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const { colors, textSizes, isDarkMode } = useTheme();

  // Le gesture più semplici secondo il paper
  const gestureTypes = [
    {
      id: 'tap',
      title: 'Single Tap',
      icon: 'finger-print-outline',
      description: 'Select and announce items. Most basic and reliable gesture.',
      practice: 'Tap to activate'
    },
    {
      id: 'double',
      title: 'Double Tap',
      icon: 'sync-outline',
      description: 'Activate the selected item. Commonly used and easy to perform.',
      practice: 'Double tap to activate'
    },
    {
      id: 'swipe-lr',
      title: 'Swipe Left/Right',
      icon: 'arrow-forward-outline',
      description: 'Navigate between items. Basic horizontal movement.',
      practice: 'Swipe left or right'
    },
    {
      id: 'swipe-ud',
      title: 'Swipe Up/Down',
      icon: 'arrow-up-outline',
      description: 'Scroll content. Simple vertical movement.',
      practice: 'Swipe up or down'
    }
  ];

  const handleTapSuccess = (gestureName) => {
    setShowSuccess(true);
    AccessibilityInfo.announceForAccessibility(`${gestureName} gesture completed successfully`);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
    if (activeSection !== section) {
      AccessibilityInfo.announceForAccessibility(`${section} practice area opened`);
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const isHorizontal = Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      const threshold = 50;

      if (isHorizontal && activeSection === 'swipe-lr') {
        if (Math.abs(gestureState.dx) > threshold) {
          const direction = gestureState.dx > 0 ? 'right' : 'left';
          const newIndex = direction === 'right' ?
            Math.max(0, swipeIndex - 1) :
            Math.min(2, swipeIndex + 1);

          if (newIndex !== swipeIndex) {
            setSwipeIndex(newIndex);
            AccessibilityInfo.announceForAccessibility(
              `Swiped ${direction}. Item ${newIndex + 1} of 3`
            );
            handleTapSuccess('Swipe');
          }
        }
      } else if (!isHorizontal && activeSection === 'swipe-ud') {
        if (Math.abs(gestureState.dy) > threshold) {
          const direction = gestureState.dy > 0 ? 'down' : 'up';
          AccessibilityInfo.announceForAccessibility(`Swiped ${direction}`);
          handleTapSuccess('Vertical swipe');
        }
      }
    }
  });

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
      shadowColor: isDarkMode ? '#000' : colors.border,
      shadowOpacity: isDarkMode ? 0.3 : 0.1,
    },
    title: {
      color: colors.text,
    },
    description: {
      color: colors.textSecondary,
    },
    practiceArea: {
      backgroundColor: isDarkMode ? colors.background : '#f8f9fa',
    },
    practiceButton: {
      backgroundColor: colors.primary,
    },
    practiceText: {
      color: colors.background,
    }
  };

  const renderPracticeArea = (gesture) => {
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
            <Text style={[styles.practiceText, themedStyles.practiceText]}>
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
            <Text style={[styles.itemIndicator, themedStyles.title]}>
              Item {swipeIndex + 1} of 3
            </Text>
            <Text style={[styles.swipeInstruction, themedStyles.description]}>
              ← Swipe left or right →
            </Text>
          </View>
        );
      case 'swipe-ud':
        return (
          <View
            {...panResponder.panHandlers}
            style={styles.swipeArea}
            accessibilityLabel="Vertical swipe practice area"
            accessibilityHint="Swipe up or down to scroll"
          >
            <Text style={[styles.swipeInstruction, themedStyles.description]}>
              ↑ Swipe up or down ↓
            </Text>
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

      <View style={styles.content}>
        {gestureTypes.map((gesture) => (
          <TouchableOpacity
            key={gesture.id}
            style={[styles.card, themedStyles.card]}
            onPress={() => toggleSection(gesture.id)}
            accessibilityRole="button"
            accessibilityState={{ expanded: activeSection === gesture.id }}
            accessibilityLabel={`${gesture.title} practice section`}
            accessibilityHint={`Double tap to ${activeSection === gesture.id ? 'close' : 'open'} practice area`}
          >
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name={gesture.icon}
                  size={24}
                  color={colors.primary}
                  accessibilityElementsHidden={true}
                />
              </View>
              <Text style={[styles.cardTitle, themedStyles.title]}>
                {gesture.title}
              </Text>
            </View>

            <Text style={[styles.cardDescription, themedStyles.description]}>
              {gesture.description}
            </Text>

            {activeSection === gesture.id && (
              <View style={[styles.practiceArea, themedStyles.practiceArea]}>
                <Text style={[styles.practiceTitle, themedStyles.description]}>
                  Practice Area
                </Text>
                {renderPracticeArea(gesture)}
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        visible={showSuccess}
        transparent
        animationType="fade"
        accessibilityViewIsModal={true}
        accessibilityLiveRegion="polite"
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.successModal, themedStyles.card]}>
            <Ionicons
              name="checkmark-circle"
              size={32}
              color="#28A745"
              accessibilityElementsHidden={true}
            />
            <Text style={[styles.successText, themedStyles.title]}>
              Gesture Completed!
            </Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

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
    lineHeight: 24,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
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
  },
  practiceArea: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
  },
  practiceTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
  },
  practiceButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  practiceText: {
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

export default GesturesTutorialScreen;