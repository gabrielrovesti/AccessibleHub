import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';

const AccessibleFormExample = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    birthDate: new Date(),
    agreed: false
  });

  const implementationCode = `// Accessible Form Implementation
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
        <View style={[
          styles.radioButton,
          formData.gender === 'male' && styles.radioButtonSelected
        ]} />
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
      <View style={[
        styles.checkbox,
        formData.agreed && styles.checkboxChecked
      ]} />
      <Text style={styles.checkboxLabel}>
        I agree to the terms and conditions
      </Text>
    </TouchableOpacity>

    {/* Submit Button */}
    <TouchableOpacity
      style={[styles.submitButton, !formData.agreed && styles.submitButtonDisabled]}
      disabled={!formData.agreed}
      accessibilityRole="button"
      accessibilityState={{ disabled: !formData.agreed }}
      accessibilityLabel="Submit form"
      onPress={handleSubmit}
    >
      <Text style={styles.submitButtonText}>Submit</Text>
    </TouchableOpacity>
  </View>`;

  const [showDateModal, setShowDateModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showImplementation, setShowImplementation] = useState(false);


  // Create arrays for date picker options
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const [selectedDate, setSelectedDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate()
  });

  const handleDateSelection = () => {
    const newDate = new Date(selectedDate.year, selectedDate.month, selectedDate.day);
    setFormData(prev => ({ ...prev, birthDate: newDate }));
    setShowDateModal(false);
  };

  const handleSubmit = () => {
    setShowConfirmation(true);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
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

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            accessibilityLabel="Enter your password"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
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
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Custom Date Selection Modal */}
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

      {/* Confirmation Modal */}
      <Modal
        visible={showConfirmation}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Form Submitted!</Text>
            <Text style={styles.modalDescription}>Thank you for submitting the form.</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setShowConfirmation(false);
                setFormData({
                  name: '',
                  email: '',
                  password: '',
                  gender: '',
                  birthDate: new Date(),
                  agreed: false
                });
              }}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

            {/* Confirmation Modal */}
            <Modal
              visible={showConfirmation}
              transparent
              animationType="fade"
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Form Submitted!</Text>
                  <Text style={styles.modalDescription}>Thank you for submitting the form.</Text>
                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={styles.modalButton}
                      onPress={() => {
                        setShowConfirmation(false);
                        setShowImplementation(true);
                        setFormData({
                          name: '',
                          email: '',
                          password: '',
                          gender: '',
                          birthDate: new Date(),
                          agreed: false
                        });
                      }}
                    >
                      <Text style={styles.modalButtonText}>View Implementation</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            {/* Implementation Modal */}
            <Modal
              visible={showImplementation}
              transparent
              animationType="fade"
            >
              <View style={styles.modalOverlay}>
                <View style={[styles.modalContent, styles.implementationModal]}>
                  <Text style={styles.modalTitle}>Accessible Implementation</Text>
                  <ScrollView style={styles.codeContainer}>
                    <Text style={styles.codeText}>{implementationCode}</Text>
                  </ScrollView>
                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={styles.modalButton}
                      onPress={() => setShowImplementation(false)}
                    >
                      <Text style={styles.modalButtonText}>Close</Text>
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
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  form: {
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
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1c1c1e',
  },
  modalDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
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
  implementationModal: {
      width: '90%',
      maxHeight: '80%',
      padding: 20,
    },
    codeContainer: {
      backgroundColor: '#1c1c1e',
      padding: 16,
      borderRadius: 8,
      marginVertical: 16,
      maxHeight: 400,
    },
    codeText: {
      color: '#fff',
      fontFamily: 'monospace',
      fontSize: 14,
      lineHeight: 20,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 16,
    },
});

export default AccessibleFormExample;