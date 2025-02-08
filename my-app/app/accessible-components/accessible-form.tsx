import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, Platform, KeyboardAvoidingView, Dimensions, AccessibilityInfo, Clipboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

const AccessibleFormExample = () => {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    contactTime: '',
    preferences: {
      email: false,
      phone: false,
      sms: false
    },
    birthDate: new Date(),
    agreed: false
  });
  const [showDateModal, setShowDateModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const { colors, textSizes, isDarkMode } = useTheme();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.gender) newErrors.gender = 'Gender selection is required';
    if (!formData.contactTime) newErrors.contactTime = 'Contact time is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      AccessibilityInfo.announceForAccessibility('Form submitted successfully');
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          gender: '',
          contactTime: '',
          preferences: {
            email: false,
            phone: false,
            sms: false
          },
          birthDate: new Date(),
          agreed: false
        });
      }, 2000);
    } else {
      AccessibilityInfo.announceForAccessibility('Form has errors. Please review and correct them.');
    }
  };

  const handleCopy = async () => {
    try {
      await Clipboard.setString(codeExample);
      setCopied(true);
      AccessibilityInfo.announceForAccessibility('Code copied to clipboard');
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      AccessibilityInfo.announceForAccessibility('Failed to copy code');
    }
  };

  const themedStyles = {
    container: {
      backgroundColor: colors.background,
    },
    sectionTitle: {
      color: colors.text,
      fontSize: textSizes.xlarge,
    },
    demoContainer: {
      backgroundColor: isDarkMode ? '#1c1c1e' : colors.surface,
    },
    label: {
      color: colors.text,
    },
    input: {
      borderColor: isDarkMode ? '#333' : colors.border,
      color: colors.text,
      backgroundColor: isDarkMode ? '#2c2c2e' : colors.surface,
    },
    radioLabel: {
      color: colors.text,
    },
    checkboxLabel: {
      color: colors.text,
    },
    radioButton: {
      borderColor: colors.primary,
    },
    radioButtonSelected: {
      backgroundColor: colors.primary,
    },
    checkbox: {
      borderColor: colors.primary,
    },
    checkboxChecked: {
      backgroundColor: colors.primary,
    },
    submitButton: {
      backgroundColor: formData.agreed ? colors.primary : colors.disabled,
      opacity: formData.agreed ? 1 : 0.5,
    },
    submitButtonDisabled: {
      backgroundColor: isDarkMode ? '#333' : colors.disabled,
    },
    submitButtonText: {
      color: colors.background,
    },
    accessibilityTip: {
      color: colors.textSecondary,
    },
    // Code section styling
    codeContainer: {
      backgroundColor: isDarkMode ? '#000' : '#1c1c1e',
    },
    codeHeader: {
      borderBottomColor: isDarkMode ? '#333' : colors.border,
      backgroundColor: isDarkMode ? '#1c1c1e' : '#2d2d2d',
    },
    codeHeaderText: {
      color: isDarkMode ? '#bbb' : '#999',
    },
    codeText: {
      color: '#fff',
    },
    copyText: {
      color: isDarkMode ? '#999' : colors.textSecondary,
    },
    copiedText: {
      color: '#28A745',
    },
    featuresContainer: {
      backgroundColor: isDarkMode ? '#1c1c1e' : colors.surface,
      borderRadius: 12,
      padding: 16,
      gap: 16,
    },
    featureCard: {
      backgroundColor: isDarkMode ? '#2c2c2e' : colors.surface,
      borderColor: isDarkMode ? '#333' : colors.border,
      borderWidth: 1,
    },
    featureIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: isDarkMode ? '#333' : '#E8F1FF',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    featureContent: {
      flex: 1,
    },
    featureTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    featureDescription: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
    },
    successModal: {
      backgroundColor: isDarkMode ? '#1c1c1e' : colors.surface,
    },
    successTitle: {
      color: '#28A745',
    },
    successMessage: {
      color: colors.textSecondary,
    },
    modalOverlay: {
      backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)',
    },
    agreementText: {
      color: colors.text,
    },
    errorMessage: {
      marginTop: 4,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    errorText: {
      color: '#dc3545',
      fontSize: 14,
    },
  };

  return (
    <ScrollView style={[styles.container, themedStyles.container]}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, themedStyles.sectionTitle]}>Interactive Example</Text>
        <View style={[styles.demoContainer, themedStyles.demoContainer]}>
          <View style={styles.form}>
            <Text style={[styles.label, themedStyles.label]}>Name</Text>
            <TextInput
              style={[styles.input, themedStyles.input]}
              value={formData.name}
              onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
              accessibilityLabel="Enter your name"
              accessibilityHint="Type your full name here"
            />
            {errors.name && (
              <View style={[styles.errorMessage]} accessibilityRole="alert">
                <Text style={[styles.errorText]}>{errors.name}</Text>
              </View>
            )}

            <Text style={[styles.label, themedStyles.label]}>Email</Text>
            <TextInput
              style={[styles.input, themedStyles.input]}
              value={formData.email}
              onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
              keyboardType="email-address"
              textContentType="emailAddress"
              autoCapitalize="none"
              accessibilityLabel="Enter your email"
              accessibilityHint="Type your email address using the @ keyboard"
            />
            {errors.email && (
              <View style={[styles.errorMessage]} accessibilityRole="alert">
                <Text style={[styles.errorText]}>{errors.email}</Text>
              </View>
            )}

            <Text style={[styles.label, themedStyles.label]}>Gender</Text>
            <View style={styles.radioGroup}>
              {['Male', 'Female'].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.radioItem}
                  onPress={() => setFormData(prev => ({ ...prev, gender: option }))}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: formData.gender === option }}
                  accessibilityLabel={`Select ${option}`}
                  accessibilityHint={`Choose ${option} as your gender`}
                >
                  <View style={[
                    styles.radioButton,
                    formData.gender === option && styles.radioButtonSelected,
                    { borderColor: colors.primary }
                  ]} />
                  <Text style={[styles.radioLabel, themedStyles.radioLabel]}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {errors.gender && (
              <View style={[styles.errorMessage]} accessibilityRole="alert">
                <Text style={[styles.errorText]}>{errors.gender}</Text>
              </View>
            )}

            <Text style={[styles.label, themedStyles.label]}>Preferred Contact Time</Text>
            <View style={styles.radioGroup}>
              {['Morning', 'Afternoon', 'Evening'].map((time) => (
                <TouchableOpacity
                  key={time}
                  style={styles.radioItem}
                  onPress={() => setFormData(prev => ({ ...prev, contactTime: time }))}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: formData.contactTime === time }}
                  accessibilityLabel={`Select ${time}`}
                  accessibilityHint={`Choose ${time} as your preferred contact time`}
                >
                  <View style={[
                    styles.radioButton,
                    formData.contactTime === time && styles.radioButtonSelected,
                    { borderColor: colors.primary }
                  ]} />
                  <Text style={[styles.radioLabel, themedStyles.radioLabel]}>{time}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {errors.contactTime && (
              <View style={[styles.errorMessage]} accessibilityRole="alert">
                <Text style={[styles.errorText]}>{errors.contactTime}</Text>
              </View>
            )}

            <Text style={[styles.label, themedStyles.label]}>Communication Preferences</Text>
            <View style={styles.checkboxGroup}>
              {[
                { key: 'email', label: 'Email' },
                { key: 'phone', label: 'Phone' },
                { key: 'sms', label: 'SMS' }
              ].map((option) => (
                <TouchableOpacity
                  key={option.key}
                  style={styles.checkboxItem}
                  onPress={() => setFormData(prev => ({
                    ...prev,
                    preferences: {
                      ...prev.preferences,
                      [option.key]: !prev.preferences[option.key]
                    }
                  }))}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: formData.preferences[option.key] }}
                  accessibilityLabel={`Select ${option.label} as contact method`}
                  accessibilityHint={`Toggle ${option.label} communication preference`}
                >
                  <View style={[
                    styles.checkbox,
                    formData.preferences[option.key] && styles.checkboxChecked,
                    { borderColor: colors.primary, backgroundColor: formData.preferences[option.key] ? colors.primary : 'transparent' }
                  ]} />
                  <Text style={[styles.checkboxLabel, themedStyles.checkboxLabel]}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.agreementContainer}>
              <TouchableOpacity
                style={styles.agreementTouchable}
                onPress={() => setFormData(prev => ({ ...prev, agreed: !prev.agreed }))}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: formData.agreed }}
                accessibilityLabel="Agree to terms and conditions"
                accessibilityHint="Toggle agreement to terms and conditions"
              >
                <View style={[styles.checkbox, formData.agreed && styles.checkboxChecked, { borderColor: colors.primary, backgroundColor: formData.agreed ? colors.primary : 'transparent' }]} />
                <Text style={[styles.agreementText, themedStyles.agreementText]} numberOfLines={1}>
                  Agree to terms and conditions
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.submitButton, themedStyles.submitButton, { opacity: formData.agreed ? 1 : 0.5 }]}
              onPress={handleSubmit}
              disabled={!formData.agreed}
              accessibilityRole="button"
              accessibilityState={{ disabled: !formData.agreed }}
              accessibilityLabel="Submit form"
              accessibilityHint="Double tap to submit the form if all fields are completed"
            >
              <Text style={[styles.submitButtonText, themedStyles.submitButtonText]}>Submit</Text>
            </TouchableOpacity>

            <Text style={[styles.accessibilityTip, themedStyles.accessibilityTip]}>
              Try this form with VoiceOver/TalkBack enabled
            </Text>
          </View>
        </View>
      </View>

      {/* Implementation Section with Code Example */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, themedStyles.sectionTitle]}>Implementation</Text>
        <View style={[styles.codeContainer, themedStyles.codeContainer]}>
          <View style={[styles.codeHeader, themedStyles.codeHeader]}>
            <Text style={[styles.codeHeaderText, themedStyles.codeHeaderText]}>JSX</Text>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={handleCopy}
              accessibilityRole="button"
              accessibilityLabel={copied ? "Code copied" : "Copy code"}
              accessibilityHint="Copies the code example to your clipboard"
            >
              <Ionicons
                name={copied ? "checkmark" : "copy-outline"}
                size={20}
                color={copied ? "#28A745" : colors.textSecondary}
                accessibilityElementsHidden={true}
              />
              <Text style={[styles.copyText, copied && styles.copiedText, themedStyles.copyText]}>
                {copied ? "Copied!" : "Copy"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.codeCard}>
            <Text style={[styles.codeText, themedStyles.codeText]}>{codeExample}</Text>
          </View>
        </View>
      </View>

{/* Accessibility Features Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, themedStyles.sectionTitle]}>Accessibility Features</Text>
        <View style={[styles.featuresContainer, themedStyles.featuresContainer]}>
          <View style={[styles.featureCard, themedStyles.featureCard]}>
            <View style={[styles.featureIcon, themedStyles.featureIcon]}>
              <Ionicons name="text-outline" size={24} color={colors.primary} />
            </View>
            <View style={[styles.featureContent, themedStyles.featureContent]}>
              <Text style={[styles.featureTitle, themedStyles.featureTitle]}>Input Labels</Text>
              <Text style={[styles.featureDescription, themedStyles.featureDescription]}>
                Clear, descriptive labels that properly associate with form controls
              </Text>
            </View>
          </View>

          <View style={[styles.featureCard, themedStyles.featureCard]}>
            <View style={[styles.featureIcon, themedStyles.featureIcon]}>
              <Ionicons name="information-circle-outline" size={24} color={colors.primary} />
            </View>
            <View style={[styles.featureContent, themedStyles.featureContent]}>
              <Text style={[styles.featureTitle, themedStyles.featureTitle]}>Semantic Roles</Text>
              <Text style={[styles.featureDescription, themedStyles.featureDescription]}>
                Proper role assignments for form controls (radio, checkbox, button)
              </Text>
            </View>
          </View>

          <View style={[styles.featureCard, themedStyles.featureCard]}>
            <View style={[styles.featureIcon, themedStyles.featureIcon]}>
              <Ionicons name="alert-circle-outline" size={24} color={colors.primary} />
            </View>
            <View style={[styles.featureContent, themedStyles.featureContent]}>
              <Text style={[styles.featureTitle, themedStyles.featureTitle]}>Error States</Text>
              <Text style={[styles.featureDescription, themedStyles.featureDescription]}>
                Clear error messages and validation feedback for screen readers
              </Text>
            </View>
          </View>

          <View style={[styles.featureCard, themedStyles.featureCard]}>
            <View style={[styles.featureIcon, themedStyles.featureIcon]}>
              <Ionicons name="hand-left-outline" size={24} color={colors.primary} />
            </View>
            <View style={[styles.featureContent, themedStyles.featureContent]}>
              <Text style={[styles.featureTitle, themedStyles.featureTitle]}>Touch Targets</Text>
              <Text style={[styles.featureDescription, themedStyles.featureDescription]}>
                Adequate sizing for interactive elements (minimum 44x44 points)
              </Text>
            </View>
          </View>

          <View style={[styles.featureCard, themedStyles.featureCard]}>
            <View style={[styles.featureIcon, themedStyles.featureIcon]}>
              <Ionicons name="sync-outline" size={24} color={colors.primary} />
            </View>
            <View style={[styles.featureContent, themedStyles.featureContent]}>
              <Text style={[styles.featureTitle, themedStyles.featureTitle]}>State Management</Text>
              <Text style={[styles.featureDescription, themedStyles.featureDescription]}>
                Proper state announcements for selection controls and submit button
              </Text>
            </View>
          </View>
        </View>
      </View>

     {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
        accessibilityViewIsModal={true}
      >
        <View style={[styles.modalOverlay, { backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)' }]}>
          <View style={[styles.successModal, { backgroundColor: colors.surface }]}>
            <Ionicons name="checkmark-circle" size={48} color="#28A745" />
            <Text style={[styles.successTitle, { color: colors.text }]}>Success!</Text>
            <Text style={[styles.successMessage, { color: colors.textSecondary }]}>
              Your form has been submitted successfully.
            </Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};


const codeExample = `<View accessibilityRole="form">
  <Text style={styles.label}>Name</Text>
  <TextInput
    style={styles.input}
    accessibilityLabel="Enter your name"
    value={formData.name}
    onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
  />

  <Text style={styles.label}>Email</Text>
  <TextInput
    style={styles.input}
    accessibilityLabel="Enter your email"
    value={formData.email}
    onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
    keyboardType="email-address"
    textContentType="emailAddress"
    autoCapitalize="none"
  />

  <Text style={styles.label}>Gender</Text>
  <View style={styles.radioGroup}>
    {['Male', 'Female'].map((option) => (
      <TouchableOpacity
        key={option}
        style={styles.radioItem}
        onPress={() => setFormData(prev => ({ ...prev, gender: option }))}
        accessibilityRole="radio"
        accessibilityState={{ checked: formData.gender === option }}
      >
        <View style={[
          styles.radioButton,
          formData.gender === option && styles.radioButtonSelected
        ]} />
        <Text style={styles.radioLabel}>{option}</Text>
      </TouchableOpacity>
    ))}
  </View>

  <Text style={styles.label}>Date of Birth</Text>
  <TouchableOpacity
    style={styles.datePickerButton}
    onPress={() => setShowDateModal(true)}
    accessibilityRole="button"
  >
    <Text style={styles.datePickerText}>
      {formData.birthDate.toLocaleDateString()}
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.agreementContainer}
    onPress={() => setFormData(prev => ({ ...prev, agreed: !prev.agreed }))}
    accessibilityRole="checkbox"
    accessibilityState={{ checked: formData.agreed }}
  >
    <View style={[styles.checkbox, formData.agreed && styles.checkboxChecked]} />
    <Text style={styles.checkboxLabel}>I agree to the terms and conditions</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[styles.submitButton, !formData.agreed && styles.submitButtonDisabled]}
    onPress={handleSubmit}
    disabled={!formData.agreed}
    accessibilityRole="button"
    accessibilityState={{ disabled: !formData.agreed }}
  >
    <Text style={styles.submitButtonText}>Submit</Text>
  </TouchableOpacity>
</View>`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  section: {
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 12,
  },
  demoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
  },
  demoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 12,
  },
  form: {
    width: '100%',
    gap: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1c1e',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 24,
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
    borderColor: '#007AFF',
  },
  radioButtonSelected: {
    backgroundColor: '#007AFF',
  },
  radioLabel: {
    fontSize: 16,
    color: '#1c1c1e',
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
  },
  datePickerText: {
    fontSize: 16,
    color: '#1c1c1e',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#1c1c1e',
  },
submitButton: {
  backgroundColor: '#007AFF',
  borderRadius: 8,
  padding: 16,
  alignItems: 'center',
  marginTop: 24,
  minHeight: 48,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  codeContainer: {
    backgroundColor: '#1c1c1e',
    borderRadius: 8,
    overflow: 'hidden',
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
    color: '#999',
    fontSize: 14,
    fontFamily: 'monospace',
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 4,
  },
  copyText: {
    color: '#666',
    fontSize: 14,
  },
  copiedText: {
    color: '#28A745',
  },
  codeCard: {
    padding: 16,
    maxHeight: 400,
  },
  codeText: {
    color: '#fff',
    fontFamily: 'monospace',
    fontSize: 14,
    lineHeight: 20,
  },
  // Features section styles
  featuresContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateModalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginBottom: 16,
  },
  datePickerContainer: {
    flexDirection: 'row',
    height: 200,
    marginVertical: 20,
  },
  datePickerScroll: {
    flex: 1,
    marginHorizontal: 4,
  },
  dateOption: {
    padding: 12,
    alignItems: 'center',
  },
  dateOptionSelected: {
    backgroundColor: '#E8F1FF',
    borderRadius: 8,
  },
  dateOptionText: {
    fontSize: 16,
    color: '#1c1c1e',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f2f2f2',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: '#1c1c1e',
    fontSize: 16,
    fontWeight: '600',
  },
  successModal: {
      backgroundColor: '#fff',
      borderRadius: 16,
      padding: 24,
      alignItems: 'center',
      width: '80%',
      maxWidth: 400,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    successTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#28A745',
      marginTop: 16,
      marginBottom: 8,
    },
    successMessage: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
      marginBottom: 16,
      lineHeight: 24,
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
    radioGroup: {
      gap: 12,
      marginTop: 8,
    },
    fieldContainer: {
      gap: 8,
      marginBottom: 16,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      backgroundColor: '#fff',
      minHeight: 44,
    },
    modalContent: {
      backgroundColor: '#fff',
      borderRadius: 16,
      padding: 24,
      width: '90%',
      maxWidth: 400,
      alignItems: 'center',
    },
    datePickerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 16,
      marginBottom: 24,
    },
    datePicker: {
      flex: 1,
      marginHorizontal: 4,
    },
    buttonGroup: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 12,
      marginTop: 16,
    },
    secondaryButton: {
      backgroundColor: '#f2f2f2',
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8,
      minWidth: 80,
      alignItems: 'center',
    },
    secondaryButtonText: {
      color: '#1c1c1e',
      fontSize: 16,
      fontWeight: '600',
    },
    errorContainer: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      marginTop: 8,
      borderWidth: 1,
      borderColor: '#dc3545',
    },
    errorTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#dc3545',
      marginBottom: 8,
    },
    errorList: {
      gap: 4,
    },
    errorItem: {
      fontSize: 14,
      color: '#dc3545',
      lineHeight: 20,
    },
    agreementContainer: {
        marginVertical: 16,
      },
      agreementTouchable: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'nowrap',
      },
      agreementText: {
        fontSize: 16,
        color: '#1c1c1e',
        marginLeft: 8,
        flex: 1,
      },
      accessibilityTip: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginTop: 16,
        fontStyle: 'italic',
      },
  featureCard: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      alignItems: 'flex-start',
    },
    featureIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#E8F1FF',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    featureContent: {
      flex: 1,
    },
    featureTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#1c1c1e',
      marginBottom: 4,
    },
    featureDescription: {
      fontSize: 14,
      color: '#666',
      lineHeight: 20,
    },
});

export default AccessibleFormExample;