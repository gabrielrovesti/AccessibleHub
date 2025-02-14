import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  AccessibilityInfo,
  Clipboard,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function AccessibleFormExample() {
  const { colors, textSizes, isDarkMode } = useTheme();

  // Form state + error state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    contactTime: '',
    preferences: { email: false, phone: false, sms: false },
    agreed: false,
    birthDate: null as Date | null,
    appointmentTime: null as Date | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // State for date/time pickers
  const [showBirthDatePicker, setShowBirthDatePicker] = useState(false);
  const [showAppointmentTimePicker, setShowAppointmentTimePicker] = useState(false);

  // Code snippet copy state
  const [copied, setCopied] = useState(false);

  // Minimal code snippet for demonstration
  const codeExample = `<View accessibilityRole="form">
  {/* Name, Email, Gender, Contact Time, Birth Date, Appointment Time */}
  {/* Communication Preferences */}
  {/* Agreement Checkbox */}
  {/* Submit button (disabled if fields incomplete) */}
</View>`;

  // Evaluate whether all required fields are filled
  const formDataComplete =
    formData.name &&
    formData.email &&
    formData.gender &&
    formData.contactTime &&
    formData.birthDate &&
    formData.agreed;

  // Validate required fields
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.contactTime) newErrors.contactTime = 'Preferred contact time is required';
    if (!formData.birthDate) newErrors.birthDate = 'Birth date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      AccessibilityInfo.announceForAccessibility('Form submitted successfully');
      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
        // Reset form
        setFormData({
          name: '',
          email: '',
          gender: '',
          contactTime: '',
          preferences: { email: false, phone: false, sms: false },
          agreed: false,
          birthDate: null,
          appointmentTime: null,
        });
        setErrors({});
      }, 2000);
    } else {
      AccessibilityInfo.announceForAccessibility(
        'Form has errors. Please review and correct them.'
      );
    }
  };

  // Copy code snippet
  const handleCopy = async () => {
    try {
      await Clipboard.setString(codeExample);
      setCopied(true);
      AccessibilityInfo.announceForAccessibility('Code copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      AccessibilityInfo.announceForAccessibility('Failed to copy code');
    }
  };

  /*
   * 1) Gradient background
   * 2) Elevated card style
   */
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
    // Elevated card for the form
    demoCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      ...cardShadowStyle,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
    },
    // Elevated card for code snippet
    codeCardContainer: {
      backgroundColor: '#1c1c1e',
      borderRadius: 8,
      overflow: 'hidden',
      marginTop: 12,
      ...cardShadowStyle,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? '#333' : 'transparent',
    },
    codeHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#333',
    },
    codeHeaderText: {
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
    codeCard: {
      padding: 16,
    },
    codeText: {
      color: '#fff',
      fontFamily: 'monospace',
      fontSize: 14,
      lineHeight: 20,
    },
    // Elevated card for features
    featuresCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      marginTop: 12,
      ...cardShadowStyle,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
    },
    successModalContainer: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 24,
      alignItems: 'center',
      width: '80%',
      maxWidth: 400,
      ...cardShadowStyle,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? colors.border : 'transparent',
    },
    successTitle: {
      fontSize: textSizes.large,
      fontWeight: 'bold',
      color: '#28A745',
      marginTop: 16,
      marginBottom: 8,
    },
    successMessage: {
      fontSize: textSizes.medium,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: 16,
      lineHeight: 24,
    },
    errorText: {
      color: '#dc3545',
      fontSize: textSizes.small,
    },
    disabledButton: {
      opacity: 0.5,
    },
    noteText: {
      color: colors.textSecondary,
      fontSize: textSizes.small,
      marginTop: 8,
      fontStyle: 'italic',
    },
  };

  // 2) Handlers for Date/Time pickers
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowBirthDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setFormData((prev) => ({
        ...prev,
        birthDate: selectedDate,
      }));
      AccessibilityInfo.announceForAccessibility(
        `Birth date set to ${selectedDate.toLocaleDateString()}`
      );
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowAppointmentTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      setFormData((prev) => ({
        ...prev,
        appointmentTime: selectedTime,
      }));
      AccessibilityInfo.announceForAccessibility(
        `Appointment time set to ${selectedTime.toLocaleTimeString()}`
      );
    }
  };

  // 3) Additional required field? If yes, incorporate it in formDataComplete and validateForm
  // For demonstration, we won't treat birthDate or appointmentTime as "strictly required",
  // but you can easily do so by adding them to the logic.

  return (
    <LinearGradient colors={gradientColors} style={themedStyles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        accessibilityRole="scrollview"
        accessibilityLabel="Accessible Form Example Screen"
      >
        {/* HERO CARD */}
        <View style={themedStyles.heroCard}>
          <Text style={themedStyles.heroTitle} accessibilityRole="header">
            Form Controls - Interactive Example
          </Text>
          <Text style={themedStyles.heroSubtitle}>
            Build accessible, validated forms with proper labels, roles, hints, and date/time pickers.
          </Text>
        </View>

        {/* 1) INTERACTIVE FORM */}
        <View style={themedStyles.section}>
          <View style={themedStyles.demoCard}>
            <Text style={[styles.sectionTitle, { color: colors.text, marginBottom: 12 }]}>
              Form Module
            </Text>

            {/* Name */}
            <Text style={[styles.label, { color: colors.text }]}>Name</Text>
            <TextInput
              style={[
                styles.input,
                { borderColor: colors.border, color: colors.text },
              ]}
              value={formData.name}
              onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
              accessibilityLabel="Enter your name"
              accessibilityHint="Type your full name"
            />
            {errors.name && (
              <View style={styles.errorMessage} accessibilityRole="alert">
                <Text style={themedStyles.errorText}>{errors.name}</Text>
              </View>
            )}

            {/* Email */}
            <Text style={[styles.label, { color: colors.text }]}>Email</Text>
            <TextInput
              style={[
                styles.input,
                { borderColor: colors.border, color: colors.text },
              ]}
              value={formData.email}
              onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
              keyboardType="email-address"
              textContentType="emailAddress"
              autoCapitalize="none"
              accessibilityLabel="Enter your email"
              accessibilityHint="Type your email address"
            />
            {errors.email && (
              <View style={styles.errorMessage} accessibilityRole="alert">
                <Text style={themedStyles.errorText}>{errors.email}</Text>
              </View>
            )}

            {/* Gender */}
            <Text style={[styles.label, { color: colors.text }]}>Gender</Text>
            <View style={styles.radioGroup}>
              {['Male', 'Female'].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.radioItem}
                  onPress={() => setFormData(prev => ({ ...prev, gender: option }))}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: formData.gender === option }}
                  accessibilityLabel={`Select ${option}`}
                >
                  <View
                    style={[
                      styles.radioButton,
                      { borderColor: colors.primary },
                      formData.gender === option && { backgroundColor: colors.primary },
                    ]}
                  />
                  <Text style={[styles.radioLabel, { color: colors.text }]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {errors.gender && (
              <View style={styles.errorMessage} accessibilityRole="alert">
                <Text style={themedStyles.errorText}>{errors.gender}</Text>
              </View>
            )}

            {/* Preferred Contact Time */}
            <Text style={[styles.label, { color: colors.text }]}>Preferred Contact Time</Text>
            <View style={styles.radioGroup}>
              {['Morning', 'Afternoon', 'Evening'].map((time) => (
                <TouchableOpacity
                  key={time}
                  style={styles.radioItem}
                  onPress={() => setFormData(prev => ({ ...prev, contactTime: time }))}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: formData.contactTime === time }}
                  accessibilityLabel={`Select ${time}`}
                >
                  <View
                    style={[
                      styles.radioButton,
                      { borderColor: colors.primary },
                      formData.contactTime === time && { backgroundColor: colors.primary },
                    ]}
                  />
                  <Text style={[styles.radioLabel, { color: colors.text }]}>{time}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {errors.contactTime && (
              <View style={styles.errorMessage} accessibilityRole="alert">
                <Text style={themedStyles.errorText}>{errors.contactTime}</Text>
              </View>
            )}

            {/* Birth Date */}
            <Text style={[styles.label, { color: colors.text }]}>Birth Date</Text>
            <TouchableOpacity
              style={styles.dateTimeButton}
              onPress={() => setShowBirthDatePicker(true)}
              accessibilityRole="button"
              accessibilityLabel="Select birth date"
              accessibilityHint="Opens a date picker"
            >
              <Text style={{ color: colors.text }}>
                {formData.birthDate
                  ? formData.birthDate.toLocaleDateString()
                  : 'Tap to select date'}
              </Text>
            </TouchableOpacity>
            {errors.birthDate && (
              <View style={styles.errorMessage} accessibilityRole="alert">
                <Text style={themedStyles.errorText}>{errors.birthDate}</Text>
              </View>
            )}
            {showBirthDatePicker && (
              <DateTimePicker
                value={formData.birthDate || new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  if (Platform.OS === 'android') setShowBirthDatePicker(false);
                  if (selectedDate) {
                    setFormData(prev => ({ ...prev, birthDate: selectedDate }));
                    AccessibilityInfo.announceForAccessibility(
                      `Birth date set to ${selectedDate.toLocaleDateString()}`
                    );
                  }
                }}
              />
            )}

            {/* Appointment Time (optional) */}
            <Text style={[styles.label, { color: colors.text }]}>Appointment Time (Optional)</Text>
            <TouchableOpacity
              style={styles.dateTimeButton}
              onPress={() => setShowAppointmentTimePicker(true)}
              accessibilityRole="button"
              accessibilityLabel="Select appointment time"
              accessibilityHint="Opens a time picker"
            >
              <Text style={{ color: colors.text }}>
                {formData.appointmentTime
                  ? formData.appointmentTime.toLocaleTimeString()
                  : 'Tap to select time'}
              </Text>
            </TouchableOpacity>
            {showAppointmentTimePicker && (
              <DateTimePicker
                value={formData.appointmentTime || new Date()}
                mode="time"
                display="default"
                onChange={(event, selectedTime) => {
                  if (Platform.OS === 'android') setShowAppointmentTimePicker(false);
                  if (selectedTime) {
                    setFormData(prev => ({ ...prev, appointmentTime: selectedTime }));
                    AccessibilityInfo.announceForAccessibility(
                      `Appointment time set to ${selectedTime.toLocaleTimeString()}`
                    );
                  }
                }}
              />
            )}

            {/* Communication Preferences */}
            <Text style={[styles.label, { color: colors.text }]}>
              Communication Preferences
            </Text>
            <View style={styles.checkboxGroup}>
              {[
                { key: 'email', label: 'Email' },
                { key: 'phone', label: 'Phone' },
                { key: 'sms', label: 'SMS' },
              ].map((option) => (
                <TouchableOpacity
                  key={option.key}
                  style={styles.checkboxItem}
                  onPress={() =>
                    setFormData(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        [option.key]: !prev.preferences[option.key],
                      },
                    }))
                  }
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: formData.preferences[option.key] }}
                  accessibilityLabel={`Select ${option.label}`}
                >
                  <View
                    style={[
                      styles.checkbox,
                      { borderColor: colors.primary },
                      formData.preferences[option.key] && { backgroundColor: colors.primary },
                    ]}
                  />
                  <Text style={[styles.checkboxLabel, { color: colors.text }]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Agreement */}
            <View style={{ marginVertical: 16 }}>
              <TouchableOpacity
                style={styles.agreementTouchable}
                onPress={() => setFormData(prev => ({ ...prev, agreed: !prev.agreed }))}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: formData.agreed }}
                accessibilityLabel="Agree to terms and conditions"
              >
                <View
                  style={[
                    styles.checkbox,
                    { borderColor: colors.primary },
                    formData.agreed && { backgroundColor: colors.primary },
                  ]}
                />
                <Text style={[styles.agreementText, { color: colors.text }]}>
                  Agree to terms and conditions
                </Text>
              </TouchableOpacity>
            </View>

            {/* If fields incomplete, show short note */}
            {!formDataComplete && (
              <Text style={themedStyles.noteText}>
                Complete all required fields to proceed
              </Text>
            )}

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                {
                  backgroundColor: formDataComplete ? colors.primary : '#ccc',
                  opacity: formDataComplete ? 1 : 0.5,
                },
              ]}
              onPress={handleSubmit}
              disabled={!formDataComplete}
              accessibilityRole="button"
              accessibilityState={{ disabled: !formDataComplete }}
              accessibilityLabel="Submit form"
              accessibilityHint="Double tap to submit the form"
            >
              <Text style={[styles.submitButtonText, { color: colors.background }]}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 2) IMPLEMENTATION CARD */}
        <View style={themedStyles.section}>
          <View style={themedStyles.demoCard}>
            <Text style={[styles.sectionTitle, { color: colors.text, marginBottom: 12 }]}>
              Implementation
            </Text>

            <View style={themedStyles.codeCardContainer}>
              {/* Code Header */}
              <View style={themedStyles.codeHeader}>
                <Text style={themedStyles.codeHeaderText}>JSX</Text>
                <TouchableOpacity
                  style={themedStyles.copyButton}
                  onPress={handleCopy}
                  accessibilityRole="button"
                  accessibilityLabel={copied ? 'Code copied' : 'Copy code'}
                >
                  <Ionicons
                    name={copied ? 'checkmark' : 'copy-outline'}
                    size={20}
                    color={copied ? '#28A745' : '#999'}
                    accessibilityElementsHidden
                  />
                  <Text
                    style={[
                      themedStyles.copyText,
                      copied && themedStyles.copiedText,
                    ]}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Code snippet */}
              <View style={themedStyles.codeCard} accessible={false} importantForAccessibility="no">
                <Text style={themedStyles.codeText}>{codeExample}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 3) ACCESSIBILITY FEATURES CARD */}
        <View style={themedStyles.section}>
          <View style={themedStyles.demoCard}>
            <Text style={[styles.sectionTitle, { color: colors.text, marginBottom: 12 }]}>
              Accessibility Features
            </Text>

            {/* Features List */}
            <View style={styles.featuresList}>
              {[
                {
                  icon: 'text-outline',
                  title: 'Input Labels',
                  description:
                    'Clear, descriptive labels that properly associate with form controls',
                },
                {
                  icon: 'information-circle-outline',
                  title: 'Semantic Roles',
                  description:
                    'Proper role assignments for form controls (radio, checkbox, button)',
                },
                {
                  icon: 'alert-circle-outline',
                  title: 'Error States',
                  description:
                    'Clear error messages and validation feedback for screen readers',
                },
                {
                  icon: 'hand-left-outline',
                  title: 'Touch Targets',
                  description:
                    'Adequate sizing for interactive elements (minimum 44x44 points)',
                },
                {
                  icon: 'sync-outline',
                  title: 'State Management',
                  description:
                    'Proper announcements for selection controls and submit button',
                },
                {
                  icon: 'calendar-outline',
                  title: 'Date/Time Pickers',
                  description:
                    'Integration with native pickers, with announced changes for screen readers',
                },
              ].map((feature, idx) => (
                <View key={idx} style={styles.featureItem} importantForAccessibility="no">
                  <View style={styles.featureIconContainer}>
                    <Ionicons
                      name={feature.icon}
                      size={24}
                      color={colors.primary}
                      accessibilityElementsHidden
                    />
                  </View>
                  <View style={styles.featureContent}>
                    <Text style={[styles.featureTitle, { color: colors.text }]}>
                      {feature.title}
                    </Text>
                    <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
                      {feature.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* SUCCESS MODAL */}
        <Modal
          visible={showSuccessModal}
          transparent
          animationType="fade"
          accessibilityViewIsModal
        >
          <View
            style={[
              styles.modalOverlay,
              {
                backgroundColor: isDarkMode
                  ? 'rgba(0, 0, 0, 0.7)'
                  : 'rgba(0, 0, 0, 0.5)',
              },
            ]}
          >
            <View style={themedStyles.successModalContainer}>
              <Ionicons name="checkmark-circle" size={48} color="#28A745" accessibilityElementsHidden />
              <Text style={themedStyles.successTitle}>Success!</Text>
              <Text style={themedStyles.successMessage}>
                Your form has been submitted successfully.
              </Text>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </LinearGradient>
  );
}

/* ---------------------------------------
   LOCAL STYLES (some overridden by
   themedStyles)
----------------------------------------*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 8,
    minHeight: 44,
  },
  errorMessage: {
    marginTop: 2,
    marginBottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 8,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
  },
  radioLabel: {
    fontSize: 16,
  },
  checkboxGroup: {
    gap: 12,
    marginTop: 8,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  agreementTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  agreementText: {
    fontSize: 16,
    flexShrink: 1,
  },
  dateTimeButton: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  submitButton: {
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    minHeight: 48,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  featuresList: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
