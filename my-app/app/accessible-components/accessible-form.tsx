import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, Clipboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AccessibleFormExample = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    birthDate: new Date(),
    agreed: false
  });

  const [showDateModal, setShowDateModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate()
  });

  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleDateSelection = () => {
    const newDate = new Date(selectedDate.year, selectedDate.month, selectedDate.day);
    setFormData(prev => ({ ...prev, birthDate: newDate }));
    setShowDateModal(false);
  };

  const codeExample = `// Accessible Form Implementation
<View accessibilityRole="form">
  {/* Text Input with Accessible Label */}
  <Text style={styles.label}>Name</Text>
  <TextInput
    style={styles.input}
    accessibilityLabel="Enter your name"
    value={formData.name}
    onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
  />

  {/* Radio Group for Gender Selection */}
  <Text style={styles.label}>Gender</Text>
  <View style={styles.radioGroup}>
    <TouchableOpacity
      style={styles.radioItem}
      accessibilityRole="radio"
      accessibilityLabel="Select male"
      accessibilityState={{ checked: formData.gender === 'male' }}
      onPress={() => setFormData(prev => ({ ...prev, gender: 'male' }))}
    >
      <View style={[styles.radioButton, formData.gender === 'male' && styles.radioButtonSelected]} />
      <Text style={styles.radioLabel}>Male</Text>
    </TouchableOpacity>
  </View>

  {/* Date Picker Button */}
  <TouchableOpacity
    style={styles.datePickerButton}
    accessibilityRole="button"
    accessibilityLabel="Select date of birth"
    onPress={() => setShowDateModal(true)}
  >
    <Text style={styles.datePickerText}>
      {formData.birthDate.toLocaleDateString()}
    </Text>
  </TouchableOpacity>

  {/* Checkbox for Terms Agreement */}
  <TouchableOpacity
    style={styles.checkboxContainer}
    accessibilityRole="checkbox"
    accessibilityLabel="Agree to terms and conditions"
    accessibilityState={{ checked: formData.agreed }}
    onPress={() => setFormData(prev => ({ ...prev, agreed: !prev.agreed }))}
  >
    <View style={[styles.checkbox, formData.agreed && styles.checkboxChecked]} />
    <Text style={styles.checkboxLabel}>I agree to the terms and conditions</Text>
  </TouchableOpacity>
</View>`;

    const handleCopy = async () => {
      try {
        await Clipboard.setString(codeExample);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interactive Example</Text>
        <View style={styles.demoContainer}>
          <View style={styles.form}>
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
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
            />

            <Text style={styles.label}>Gender</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={styles.radioItem}
                accessibilityLabel="Select male"
                onPress={() => setFormData(prev => ({ ...prev, gender: 'male' }))}
                accessibilityRole="radio"
                accessibilityState={{ checked: formData.gender === 'male' }}
              >
                <View style={[
                  styles.radioButton,
                  formData.gender === 'male' && styles.radioButtonSelected
                ]} />
                <Text style={styles.radioLabel}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.radioItem}
                accessibilityLabel="Select female"
                onPress={() => setFormData(prev => ({ ...prev, gender: 'female' }))}
                accessibilityRole="radio"
                accessibilityState={{ checked: formData.gender === 'female' }}
              >
                <View style={[
                  styles.radioButton,
                  formData.gender === 'female' && styles.radioButtonSelected
                ]} />
                <Text style={styles.radioLabel}>Female</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Date of Birth</Text>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDateModal(true)}
              accessibilityLabel="Select date of birth"
              accessibilityRole="button"
            >
              <Text style={styles.datePickerText}>
                {formData.birthDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxContainer}
              accessibilityLabel="Agree to terms and conditions"
              onPress={() => setFormData(prev => ({ ...prev, agreed: !prev.agreed }))}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: formData.agreed }}
            >
              <View style={[
                styles.checkbox,
                formData.agreed && styles.checkboxChecked
              ]} />
              <Text style={styles.checkboxLabel}>I agree to the terms and conditions</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.submitButton, !formData.agreed && styles.submitButtonDisabled]}
              disabled={!formData.agreed}
              accessibilityRole="button"
              accessibilityState={{ disabled: !formData.agreed }}
              onPress={() => {}}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.demoText}>
            Try this form with VoiceOver/TalkBack enabled
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Implementation</Text>
        <View style={styles.codeContainer}>
          <View style={styles.codeHeader}>
            <Text style={styles.codeHeaderText}>JSX</Text>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={handleCopy}
              accessibilityRole="button"
              accessibilityLabel={copied ? "Code copied" : "Copy code"}
            >
              <Ionicons
                name={copied ? "checkmark" : "copy-outline"}
                size={20}
                color={copied ? "#28A745" : "#666"}
              />
              <Text style={[styles.copyText, copied && styles.copiedText]}>
                {copied ? "Copied!" : "Copy"}
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.codeCard}>
            <Text style={styles.codeText}>{codeExample}</Text>
          </ScrollView>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accessibility Features</Text>
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Ionicons name="document-text" size={24} color="#007AFF" />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Semantic Labels</Text>
              <Text style={styles.featureDescription}>
                Clear labels and roles for each form control
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="radio" size={24} color="#007AFF" />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>State Management</Text>
              <Text style={styles.featureDescription}>
                Proper state handling for selection controls
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="alert-circle" size={24} color="#007AFF" />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Error Feedback</Text>
              <Text style={styles.featureDescription}>
                Accessible error messages and validation
              </Text>
            </View>
          </View>
        </View>
      </View>

      <Modal
        visible={showDateModal}
        transparent
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.dateModalContent}>
            <Text style={styles.modalTitle}>Select Date</Text>
            <View style={styles.datePickerContainer}>
              <ScrollView style={styles.datePickerScroll}>
                {years.map(year => (
                  <TouchableOpacity
                    key={year}
                    style={[
                      styles.dateOption,
                      selectedDate.year === year && styles.dateOptionSelected
                    ]}
                    onPress={() => setSelectedDate(prev => ({ ...prev, year }))}
                  >
                    <Text style={styles.dateOptionText}>{year}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <ScrollView style={styles.datePickerScroll}>
                {months.map((month, index) => (
                  <TouchableOpacity
                    key={month}
                    style={[
                      styles.dateOption,
                      selectedDate.month === index && styles.dateOptionSelected
                    ]}
                    onPress={() => setSelectedDate(prev => ({ ...prev, month: index }))}
                  >
                    <Text style={styles.dateOptionText}>{month}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <ScrollView style={styles.datePickerScroll}>
                {days.map(day => (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.dateOption,
                      selectedDate.day === day && styles.dateOptionSelected
                    ]}
                    onPress={() => setSelectedDate(prev => ({ ...prev, day }))}
                  >
                    <Text style={styles.dateOptionText}>{day}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowDateModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleDateSelection}
              >
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
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
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Code section styles
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
  // Modal styles
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
});

export default AccessibleFormExample;