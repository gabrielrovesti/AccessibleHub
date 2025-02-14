import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  AccessibilityInfo,
  Clipboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const AccessibleFormExample = () => {
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);

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

  const { colors, textSizes, isDarkMode } = useTheme();

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

  // Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.gender) newErrors.gender = 'Gender selection is required';
    if (!formData.contactTime) newErrors.contactTime = 'Contact time is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
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
          preferences: { email: false, phone: false, sms: false },
          birthDate: new Date(),
          agreed: false
        });
      }, 2000);
    } else {
      AccessibilityInfo.announceForAccessibility(
        'Form has errors. Please review and correct them.'
      );
    }
  };

  // Copy Code Example
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

  // Themed Styles
  const themedStyles = {
    container: {
      backgroundColor: colors.background
    },
    sectionTitle: {
      color: colors.text,
      fontSize: textSizes.xlarge
    },
    demoContainer: {
      backgroundColor: isDarkMode ? '#1c1c1e' : colors.surface
    },
    label: {
      color: colors.text
    },
    input: {
      borderColor: isDarkMode ? '#333' : colors.border,
      backgroundColor: isDarkMode ? '#2c2c2e' : '#fff',
      color: colors.text
    },
    radioButton: {
      borderColor: colors.primary
    },
    radioButtonSelected: {
      backgroundColor: colors.primary
    },
    radioLabel: {
      color: colors.text
    },
    checkbox: {
      borderColor: colors.primary
    },
    checkboxChecked: {
      backgroundColor: colors.primary
    },
    submitButton: {
      backgroundColor: formData.agreed ? colors.primary : colors.disabled
    },
    submitButtonText: {
      color: colors.background
    },
    accessibilityTip: {
      color: colors.textSecondary
    },
    // Code styling
    codeContainer: {
      backgroundColor: '#1c1c1e',
      borderRadius: 12,
      borderWidth: 2,
      borderColor: '#333',
      marginTop: 8,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3
    },
    codeHeader: {
      borderBottomColor: '#333'
    },
    codeHeaderText: {
      color: '#999'
    },
    copyText: {
      color: '#666'
    },
    copiedText: {
      color: '#28A745'
    },
    codeText: {
      color: '#fff'
    },
    // Features section
    featuresContainer: {
      backgroundColor: isDarkMode ? '#1c1c1e' : colors.surface,
      borderRadius: 12,
      padding: 16,
      gap: 16
    },
    featureCard: {
      backgroundColor: isDarkMode ? '#2c2c2e' : '#fff',
      borderColor: isDarkMode ? '#333' : colors.border,
      borderWidth: 1
    },
    featureIcon: {
      backgroundColor: isDarkMode ? '#333' : '#E8F1FF'
    },
    featureTitle: {
      color: colors.text
    },
    featureDescription: {
      color: colors.textSecondary
    },
    successModal: {
      backgroundColor: isDarkMode ? '#1c1c1e' : colors.surface
    },
    successTitle: {
      color: '#28A745'
    },
    successMessage: {
      color: colors.textSecondary
    },
    agreementText: {
      color: colors.text
    },
    errorMessage: {
      marginTop: 4,
      paddingHorizontal: 8,
      paddingVertical: 4
    },
    errorText: {
      color: '#dc3545',
      fontSize: 14
    }
  };

  return (
    <ScrollView style={[styles.container, themedStyles.container]}>
      {/* Interactive Example Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, themedStyles.sectionTitle]}>
          Form Controls - Interactive Example
        </Text>
        <View style={[styles.demoContainer, themedStyles.demoContainer, styles.demoContainerCustom]}>
          <View style={styles.form}>
            {/* NAME */}
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

            {/* EMAIL */}
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

            {/* GENDER */}
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
                    themedStyles.radioButton,
                    formData.gender === option && [styles.radioButtonSelected, themedStyles.radioButtonSelected]
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

            {/* CONTACT TIME */}
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
                    themedStyles.radioButton,
                    formData.contactTime === time && [styles.radioButtonSelected, themedStyles.radioButtonSelected]
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

            {/* COMMUNICATION PREFERENCES */}
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
                  onPress={() =>
                    setFormData(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        [option.key]: !prev.preferences[option.key]
                      }
                    }))
                  }
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: formData.preferences[option.key] }}
                  accessibilityLabel={`Select ${option.label} as contact method`}
                  accessibilityHint={`Toggle ${option.label} communication preference`}
                >
                  <View
                    style={[
                      styles.checkbox,
                      themedStyles.checkbox,
                      formData.preferences[option.key] && [
                        styles.checkboxChecked,
                        themedStyles.checkboxChecked
                      ]
                    ]}
                  />
                  <Text style={[styles.checkboxLabel, themedStyles.radioLabel]}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* AGREEMENT */}
            <View style={styles.agreementContainer}>
              <TouchableOpacity
                style={styles.agreementTouchable}
                onPress={() => setFormData(prev => ({ ...prev, agreed: !prev.agreed }))}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: formData.agreed }}
                accessibilityLabel="Agree to terms and conditions"
                accessibilityHint="Toggle agreement to terms and conditions"
              >
                <View
                  style={[
                    styles.checkbox,
                    themedStyles.checkbox,
                    formData.agreed && [styles.checkboxChecked, themedStyles.checkboxChecked]
                  ]}
                />
                <Text style={[styles.agreementText, themedStyles.agreementText]} numberOfLines={1}>
                  Agree to terms and conditions
                </Text>
              </TouchableOpacity>
            </View>

            {/* SUBMIT BUTTON */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                themedStyles.submitButton,
                { opacity: formData.agreed ? 1 : 0.5 }
              ]}
              onPress={handleSubmit}
              disabled={!formData.agreed}
              accessibilityRole="button"
              accessibilityState={{ disabled: !formData.agreed }}
              accessibilityLabel="Submit form"
              accessibilityHint="Double tap to submit the form if all fields are completed"
            >
              <Text style={[styles.submitButtonText, themedStyles.submitButtonText]}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Implementation Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, themedStyles.sectionTitle]}>
          Implementation
        </Text>
        <View style={[styles.codeContainer, themedStyles.codeContainer]}>
          {/* Header with a short accessible label */}
          <View style={[styles.codeHeader, themedStyles.codeHeader]}>
            <Text
              style={[styles.codeHeaderText, themedStyles.codeHeaderText]}
              accessible={true}
              accessibilityRole="text"
              accessibilityLabel="Source code for form component."
              accessibilityHint="Use copy button to copy it."
            >
              JSX
            </Text>

            <TouchableOpacity
              style={styles.copyButton}
              onPress={handleCopy}
              accessibilityRole="button"
              accessibilityLabel={copied ? 'Code copied' : 'Copy code'}
              accessibilityHint="Copies the code snippet to your clipboard"
            >
              <Ionicons
                name={copied ? 'checkmark' : 'copy-outline'}
                size={20}
                color={copied ? '#28A745' : colors.textSecondary}
                accessibilityElementsHidden={true}
                importantForAccessibility="no-hide-descendants"
              />
              <Text
                style={[
                  styles.copyText,
                  themedStyles.copyText,
                  copied && [styles.copiedText, themedStyles.copiedText]
                ]}
              >
                {copied ? 'Copied!' : 'Copy'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Actual code snippet, hidden from SR */}
          <View
            style={styles.codeCard}
            accessible={false}
            importantForAccessibility="no"
            accessibilityElementsHidden={true}
          >
            <Text
              style={[styles.codeText, themedStyles.codeText]}
              accessibilityElementsHidden={true}
              importantForAccessibility="no-hide-descendants"
            >
              {codeExample}
            </Text>
          </View>
        </View>
      </View>


      {/* Accessibility Features Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, themedStyles.sectionTitle]}>
          Accessibility Features
        </Text>
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
                Proper announcements for selection controls and submit button
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
        <View
          style={[
            styles.modalOverlay,
            {
              backgroundColor: isDarkMode
                ? 'rgba(0, 0, 0, 0.7)'
                : 'rgba(0, 0, 0, 0.5)'
            }
          ]}
        >
          <View style={[styles.successModal, themedStyles.successModal]}>
            <Ionicons name="checkmark-circle" size={48} color="#28A745" />
            <Text style={[styles.successTitle, themedStyles.successTitle]}>Success!</Text>
            <Text style={[styles.successMessage, themedStyles.successMessage]}>
              Your form has been submitted successfully.
            </Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

/*
 NOTE:
 The original styles from your code are preserved below
 and partially overridden (or extended) by themedStyles
 where needed.
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  section: {
    padding: 16,
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 12
  },
  // Demo Section
  demoContainerCustom: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D1D1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  demoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 12
  },
  form: {
    width: '100%',
    gap: 16
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1c1e'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    minHeight: 44
  },
  errorMessage: {
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  errorText: {
    color: '#dc3545',
    fontSize: 14
  },
  radioGroup: {
    gap: 12,
    marginTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007AFF'
  },
  radioButtonSelected: {
    backgroundColor: '#007AFF'
  },
  radioLabel: {
    fontSize: 16,
    color: '#1c1c1e'
  },
  checkboxGroup: {
    gap: 12,
    marginTop: 8
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#007AFF'
  },
  checkboxChecked: {
    backgroundColor: '#007AFF'
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#1c1c1e'
  },
  agreementContainer: {
    marginVertical: 16
  },
  agreementTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap'
  },
  agreementText: {
    fontSize: 16,
    color: '#1c1c1e',
    marginLeft: 8,
    flex: 1
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
    elevation: 5
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc'
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  accessibilityTip: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
    fontStyle: 'italic'
  },
  // Code Container
  codeContainer: {
    backgroundColor: '#1c1c1e',
    borderRadius: 8,
    overflow: 'hidden'
  },
  codeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333'
  },
  codeHeaderText: {
    color: '#999',
    fontSize: 14,
    fontFamily: 'monospace'
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 4
  },
  copyText: {
    color: '#666',
    fontSize: 14
  },
  copiedText: {
    color: '#28A745'
  },
  codeCard: {
    padding: 16,
    maxHeight: 400
  },
  codeText: {
    color: '#fff',
    fontFamily: 'monospace',
    fontSize: 14,
    lineHeight: 20
  },
  // Accessibility Features
  featuresContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    gap: 16
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'flex-start'
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F1FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  featureContent: {
    flex: 1
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 4
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20
  },
  // Modals
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
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
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#28A745',
    marginTop: 16,
    marginBottom: 8
  },
  successMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 24
  },
  // Additional UI for date pickers (kept to preserve original code)
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12
  },
  datePickerText: {
    fontSize: 16,
    color: '#1c1c1e'
  }
});

export default AccessibleFormExample;
