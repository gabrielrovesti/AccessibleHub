import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Animated,
  PanResponder,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const GesturesTutorialScreen = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [position] = useState(new Animated.ValueXY());
  const [scale] = useState(new Animated.Value(1));
  const [rotation] = useState(new Animated.Value(0));
  const { colors, textSizes, isDarkMode } = useTheme();

  // Pan responder for drag gesture example
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [null, { dx: position.x, dy: position.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: () => {
      Animated.spring(position, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false
      }).start();
    }
  });

  // Function to handle tap gesture success
  const handleTapSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  // Function to handle pinch gesture
  const handlePinch = (scale) => {
    Animated.spring(this.scale, {
      toValue: scale,
      friction: 3,
      useNativeDriver: false
    }).start();
  };

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
    headerDescription: {
      color: colors.textSecondary,
      fontSize: textSizes.medium,
    },
    section: {
      gap: textSizes.medium,
    },
    sectionTitle: {
      color: colors.text,
      fontSize: textSizes.large,
    },
    gestureCard: {
      backgroundColor: colors.surface,
      shadowColor: isDarkMode ? '#000' : '#000',
      shadowOpacity: isDarkMode ? 0.3 : 0.05,
    },
    gestureHeader: {
      gap: textSizes.medium,
    },
    gestureTitle: {
      color: colors.text,
      fontSize: textSizes.medium,
    },
    gestureDescription: {
      color: colors.textSecondary,
      fontSize: textSizes.small,
    },
    practiceArea: {
      backgroundColor: colors.background,
    },
    practiceTitle: {
      color: colors.textSecondary,
      fontSize: textSizes.small,
    },
    practiceTouchable: {
      backgroundColor: colors.primary,
    },
    practiceText: {
      color: colors.background,
      fontSize: textSizes.medium,
    },
    swipeItem: {
      backgroundColor: colors.primary,
    },
    swipeText: {
      color: colors.background,
      fontSize: textSizes.medium,
    },
    rotorPracticeArea: {
      backgroundColor: colors.primary,
    },
    rotorText: {
      color: colors.background,
      fontSize: textSizes.small,
    },
    modalOverlay: {
      backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)',
    },
    successModal: {
      backgroundColor: colors.surface,
    },
    successText: {
      color: '#28A745',
      fontSize: textSizes.medium,
    },
  };

  return (
    <ScrollView style={[styles.container, themedStyles.container]}>
      <View style={[styles.header, themedStyles.header]}>
        <Text style={[styles.headerTitle, themedStyles.headerTitle]}>Accessibility Gestures</Text>
        <Text style={[styles.headerDescription, themedStyles.headerDescription]}>
          Learn and practice common accessibility gestures used with screen readers
        </Text>
      </View>

      {/* Basic Gestures Section */}
      <View style={[styles.section, themedStyles.section]}>
        <Text style={[styles.sectionTitle, themedStyles.sectionTitle]}>Basic Screen Reader Gestures</Text>

        <TouchableOpacity
          style={[styles.gestureCard, themedStyles.gestureCard]}
          onPress={() => setActiveSection('tap')}
          accessibilityRole="button"
          accessibilityLabel="Learn about single tap gesture"
        >
          <View style={[styles.gestureHeader, themedStyles.gestureHeader]}>
            <View style={[styles.iconContainer, { backgroundColor: '#E8F1FF' }]}>
              <Ionicons name="finger-print-outline" size={24} color="#0055CC" />
            </View>
            <Text style={[styles.gestureTitle, themedStyles.gestureTitle]}>Single Tap</Text>
          </View>
          <Text style={[styles.gestureDescription, themedStyles.gestureDescription]}>
            Select and announce items under your finger
          </Text>

          {activeSection === 'tap' && (
            <View style={[styles.practiceArea, themedStyles.practiceArea]}>
              <Text style={[styles.practiceTitle, themedStyles.practiceTitle]}>Practice Area</Text>
              <TouchableOpacity
                style={[styles.practiceTouchable, themedStyles.practiceTouchable]}
                onPress={handleTapSuccess}
                accessibilityRole="button"
                accessibilityLabel="Tap here to practice single tap gesture"
              >
                <Text style={[styles.practiceText, themedStyles.practiceText]}>Tap here</Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.gestureCard, themedStyles.gestureCard]}
          onPress={() => setActiveSection('double')}
          accessibilityRole="button"
          accessibilityLabel="Learn about double tap gesture"
        >
          <View style={[styles.gestureHeader, themedStyles.gestureHeader]}>
            <View style={[styles.iconContainer, { backgroundColor: '#E8F1FF' }]}>
              <Ionicons name="sync-outline" size={24} color="#0055CC" />
            </View>
            <Text style={[styles.gestureTitle, themedStyles.gestureTitle]}>Double Tap</Text>
          </View>
          <Text style={[styles.gestureDescription, themedStyles.gestureDescription]}>
            Activate the selected item
          </Text>

          {activeSection === 'double' && (
            <View style={[styles.practiceArea, themedStyles.practiceArea]}>
              <Text style={[styles.practiceTitle, themedStyles.practiceTitle]}>Practice Area</Text>
              <TouchableOpacity
                style={[styles.practiceTouchable, themedStyles.practiceTouchable]}
                onPress={handleTapSuccess}
                accessibilityRole="button"
                accessibilityLabel="Double tap here to practice the gesture"
              >
                <Text style={[styles.practiceText, themedStyles.practiceText]}>Double tap here</Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Navigation Gestures Section */}
      <View style={[styles.section, themedStyles.section]}>
        <Text style={[styles.sectionTitle, themedStyles.sectionTitle]}>Navigation Gestures</Text>

        <TouchableOpacity
          style={[styles.gestureCard, themedStyles.gestureCard]}
          onPress={() => setActiveSection('swipe')}
          accessibilityRole="button"
          accessibilityLabel="Learn about swipe gestures"
        >
          <View style={[styles.gestureHeader, themedStyles.gestureHeader]}>
            <View style={[styles.iconContainer, { backgroundColor: '#E8F1FF' }]}>
              <Ionicons name="arrow-forward-outline" size={24} color="#0055CC" />
            </View>
            <Text style={[styles.gestureTitle, themedStyles.gestureTitle]}>Swipe Right/Left</Text>
          </View>
          <Text style={[styles.gestureDescription, themedStyles.gestureDescription]}>
            Move to next/previous item in the interface
          </Text>

          {activeSection === 'swipe' && (
            <View style={[styles.practiceArea, themedStyles.practiceArea]}>
              <Text style={[styles.practiceTitle, themedStyles.practiceTitle]}>Practice Area</Text>
              <ScrollView horizontal style={styles.swipePracticeArea}>
                <View style={[styles.swipeItem, themedStyles.swipeItem]}>
                  <Text style={[styles.swipeText, themedStyles.swipeText]}>Item 1</Text>
                </View>
                <View style={[styles.swipeItem, themedStyles.swipeItem]}>
                  <Text style={[styles.swipeText, themedStyles.swipeText]}>Item 2</Text>
                </View>
                <View style={[styles.swipeItem, themedStyles.swipeItem]}>
                  <Text style={[styles.swipeText, themedStyles.swipeText]}>Item 3</Text>
                </View>
              </ScrollView>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Advanced Gestures Section */}
      <View style={[styles.section, themedStyles.section]}>
        <Text style={[styles.sectionTitle, themedStyles.sectionTitle]}>Advanced Gestures</Text>

        <TouchableOpacity
          style={[styles.gestureCard, themedStyles.gestureCard]}
          onPress={() => setActiveSection('rotor')}
          accessibilityRole="button"
          accessibilityLabel="Learn about rotor gesture"
        >
          <View style={[styles.gestureHeader, themedStyles.gestureHeader]}>
            <View style={[styles.iconContainer, { backgroundColor: '#E8F1FF' }]}>
              <Ionicons name="radio-outline" size={24} color="#0055CC" />
            </View>
            <Text style={[styles.gestureTitle, themedStyles.gestureTitle]}>Rotor Control</Text>
          </View>
          <Text style={[styles.gestureDescription, themedStyles.gestureDescription]}>
            Two-finger rotation to access additional navigation options
          </Text>

          {activeSection === 'rotor' && (
            <View style={[styles.practiceArea, themedStyles.practiceArea]}>
              <Text style={[styles.practiceTitle, themedStyles.practiceTitle]}>Practice Area</Text>
              <Animated.View
                style={[
                  styles.rotorPracticeArea,
                  themedStyles.rotorPracticeArea,
                  {
                    transform: [
                      { rotate: rotation.interpolate({
                        inputRange: [0, 360],
                        outputRange: ['0deg', '360deg']
                      })}
                    ]
                  }
                ]}
              >
                <Text style={[styles.rotorText, themedStyles.rotorText]}>Rotate with two fingers</Text>
              </Animated.View>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Success Modal */}
      <Modal
        visible={showSuccess}
        transparent
        animationType="fade"
      >
        <View style={[styles.modalOverlay, themedStyles.modalOverlay]}>
          <View style={[styles.successModal, themedStyles.successModal]}>
            <Ionicons name="checkmark-circle" size={32} color="#28A745" />
            <Text style={[styles.successText, themedStyles.successText]}>Gesture Completed!</Text>
          </View>
        </View>
      </Modal>
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
  headerDescription: {
    fontSize: 16,
    lineHeight: 24,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  gestureCard: {
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
  gestureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gestureTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  gestureDescription: {
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
    marginBottom: 12,
  },
  practiceTouchable: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  practiceText: {
    fontSize: 16,
    fontWeight: '600',
  },
  swipePracticeArea: {
    flexDirection: 'row',
    height: 80,
  },
  swipeItem: {
    width: 120,
    height: 80,
    marginRight: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  rotorPracticeArea: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rotorText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModal: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    gap: 12,
  },
  successText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default GesturesTutorialScreen;