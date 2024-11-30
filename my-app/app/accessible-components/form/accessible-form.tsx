import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const AccessibleFormExample = () => {
  const router = useRouter();

  const DemoForm = () => (
    <View style={styles.form}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} accessibilityLabel="Enter your name" />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} accessibilityLabel="Enter your email" keyboardType="email-address" />

      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} accessibilityLabel="Enter your password" secureTextEntry />

      <Text style={styles.label}>Gender</Text>
      <View style={styles.radioGroup}>
        <TouchableOpacity style={styles.radioItem} accessibilityLabel="Select male">
          <View style={styles.radioButton} />
          <Text style={styles.radioLabel}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.radioItem} accessibilityLabel="Select female">
          <View style={styles.radioButton} />
          <Text style={styles.radioLabel}>Female</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.datePicker} accessibilityLabel="Select date of birth">
        <Text>Date of Birth</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.checkbox} accessibilityLabel="Agree to terms and conditions">
        <Text>I agree to the terms and conditions</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} accessibilityRole="button">
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} accessibilityLabel="Go back">
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Accessible Form</Text>
      </View>

      <View style={styles.content}>
        <DemoForm />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accessibility Considerations</Text>
        <View style={styles.sectionContent}>
          <View style={styles.bullet}>
            <Ionicons name="checkmark-circle" size={20} color="#007AFF" />
            <Text style={styles.bulletText}>Use semantic HTML tags for form elements</Text>
          </View>
          <View style={styles.bullet}>
            <Ionicons name="checkmark-circle" size={20} color="#007AFF" />
            <Text style={styles.bulletText}>Provide accessible labels for each input</Text>
          </View>
          <View style={styles.bullet}>
            <Ionicons name="checkmark-circle" size={20} color="#007AFF" />
            <Text style={styles.bulletText}>Ensure error messages are properly announced</Text>
          </View>
          <View style={styles.bullet}>
            <Ionicons name="checkmark-circle" size={20} color="#007AFF" />
            <Text style={styles.bulletText}>Use proper keyboard navigation and focus management</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Code Snippet</Text>
        <View style={styles.codeCard}>
          <Text style={styles.codeText}>{`import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const AccessibleForm = () => (
  <View>
    <Text>Name</Text>
    <TextInput accessibilityLabel="Enter your name" />

    <Text>Email</Text>
    <TextInput accessibilityLabel="Enter your email" keyboardType="email-address" />

    <Text>Password</Text>
    <TextInput accessibilityLabel="Enter your password" secureTextEntry />

    <Text>Gender</Text>
    <View>
      <TouchableOpacity accessibilityLabel="Select male">
        <Text>Male</Text>
      </TouchableOpacity>
      <TouchableOpacity accessibilityLabel="Select female">
        <Text>Female</Text>
      </TouchableOpacity>
    </View>

    <TouchableOpacity accessibilityLabel="Select date of birth">
      <Text>Date of Birth</Text>
    </TouchableOpacity>

    <TouchableOpacity accessibilityLabel="Agree to terms and conditions">
      <Text>I agree to the terms and conditions</Text>
    </TouchableOpacity>

    <TouchableOpacity accessibilityRole="button">
      <Text>Submit</Text>
    </TouchableOpacity>
  </View>
);

export default AccessibleForm;`}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  content: {
    padding: 16,
  },
  form: {
    gap: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 16,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 8,
  },
  radioLabel: {
    fontSize: 16,
  },
  datePicker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sectionContent: {
    gap: 12,
  },
  bullet: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bulletText: {
    marginLeft: 8,
    fontSize: 16,
  },
  codeCard: {
    backgroundColor: '#1c1c1e',
    padding: 16,
    borderRadius: 8,
  },
  codeText: {
    color: '#fff',
    fontFamily: 'monospace',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default AccessibleFormExample;