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

const GesturesTutorialScreen = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [position] = useState(new Animated.ValueXY());
  const [scale] = useState(new Animated.Value(1));
  const [rotation] = useState(new Animated.Value(0));

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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Accessibility Gestures</Text>
        <Text style={styles.headerDescription}>
          Learn and practice common accessibility gestures used with screen readers
        </Text>
      </View>

      {/* Basic Gestures Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Screen Reader Gestures</Text>

        <TouchableOpacity
          style={styles.gestureCard}
          onPress={() => setActiveSection('tap')}
          accessibilityRole="button"
          accessibilityLabel="Learn about single tap gesture"
        >
          <View style={styles.gestureHeader}>
            <View style={[styles.iconContainer, { backgroundColor: '#E8F1FF' }]}>
              <Ionicons name="finger-print-outline" size={24} color="#0055CC" />
            </View>
            <Text style={styles.gestureTitle}>Single Tap</Text>
          </View>
          <Text style={styles.gestureDescription}>
            Select and announce items under your finger
          </Text>

          {activeSection === 'tap' && (
            <View style={styles.practiceArea}>
              <Text style={styles.practiceTitle}>Practice Area</Text>
              <TouchableOpacity
                style={styles.practiceTouchable}
                onPress={handleTapSuccess}
                accessibilityRole="button"
                accessibilityLabel="Tap here to practice single tap gesture"
              >
                <Text style={styles.practiceText}>Tap here</Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gestureCard}
          onPress={() => setActiveSection('double')}
          accessibilityRole="button"
          accessibilityLabel="Learn about double tap gesture"
        >
          <View style={styles.gestureHeader}>
            <View style={[styles.iconContainer, { backgroundColor: '#E8F1FF' }]}>
              <Ionicons name="sync-outline" size={24} color="#0055CC" />
            </View>
            <Text style={styles.gestureTitle}>Double Tap</Text>
          </View>
          <Text style={styles.gestureDescription}>
            Activate the selected item
          </Text>

          {activeSection === 'double' && (
            <View style={styles.practiceArea}>
              <Text style={styles.practiceTitle}>Practice Area</Text>
              <TouchableOpacity
                style={styles.practiceTouchable}
                onPress={handleTapSuccess}
                accessibilityRole="button"
                accessibilityLabel="Double tap here to practice the gesture"
              >
                <Text style={styles.practiceText}>Double tap here</Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Navigation Gestures Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Navigation Gestures</Text>

        <TouchableOpacity
          style={styles.gestureCard}
          onPress={() => setActiveSection('swipe')}
          accessibilityRole="button"
          accessibilityLabel="Learn about swipe gestures"
        >
          <View style={styles.gestureHeader}>
            <View style={[styles.iconContainer, { backgroundColor: '#E8F1FF' }]}>
              <Ionicons name="arrow-forward-outline" size={24} color="#0055CC" />
            </View>
            <Text style={styles.gestureTitle}>Swipe Right/Left</Text>
          </View>
          <Text style={styles.gestureDescription}>
            Move to next/previous item in the interface
          </Text>

          {activeSection === 'swipe' && (
            <View style={styles.practiceArea}>
              <Text style={styles.practiceTitle}>Practice Area</Text>
              <ScrollView horizontal style={styles.swipePracticeArea}>
                <View style={styles.swipeItem}>
                  <Text style={styles.swipeText}>Item 1</Text>
                </View>
                <View style={styles.swipeItem}>
                  <Text style={styles.swipeText}>Item 2</Text>
                </View>
                <View style={styles.swipeItem}>
                  <Text style={styles.swipeText}>Item 3</Text>
                </View>
              </ScrollView>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Advanced Gestures Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Advanced Gestures</Text>

        <TouchableOpacity
          style={styles.gestureCard}
          onPress={() => setActiveSection('rotor')}
          accessibilityRole="button"
          accessibilityLabel="Learn about rotor gesture"
        >
          <View style={styles.gestureHeader}>
            <View style={[styles.iconContainer, { backgroundColor: '#E8F1FF' }]}>
              <Ionicons name="radio-outline" size={24} color="#0055CC" />
            </View>
            <Text style={styles.gestureTitle}>Rotor Control</Text>
          </View>
          <Text style={styles.gestureDescription}>
            Two-finger rotation to access additional navigation options
          </Text>

          {activeSection === 'rotor' && (
            <View style={styles.practiceArea}>
              <Text style={styles.practiceTitle}>Practice Area</Text>
              <Animated.View
                style={[
                  styles.rotorPracticeArea,
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
                <Text style={styles.rotorText}>Rotate with two fingers</Text>
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
        <View style={styles.modalOverlay}>
          <View style={styles.successModal}>
            <Ionicons name="checkmark-circle" size={32} color="#28A745" />
            <Text style={styles.successText}>Gesture Completed!</Text>
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
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginBottom: 8,
  },
  headerDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  section: {
    padding: 16,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1c1c1e',
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
    color: '#1c1c1e',
  },
  gestureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  practiceArea: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  practiceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
  },
  practiceTouchable: {
    backgroundColor: '#E8F1FF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  practiceText: {
    fontSize: 16,
    color: '#0055CC',
    fontWeight: '600',
  },
  swipePracticeArea: {
    flexDirection: 'row',
    height: 80,
  },
  swipeItem: {
    width: 120,
    height: 80,
    backgroundColor: '#E8F1FF',
    marginRight: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeText: {
    fontSize: 16,
    color: '#0055CC',
    fontWeight: '600',
  },
  rotorPracticeArea: {
    width: 150,
    height: 150,
    backgroundColor: '#E8F1FF',
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rotorText: {
    fontSize: 14,
    color: '#0055CC',
    fontWeight: '600',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    color: '#28A745',
  },
});

export default GesturesTutorialScreen;