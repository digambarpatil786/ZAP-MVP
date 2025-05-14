import React, { useState, useCallback } from 'react';
import {
  View, Text, SafeAreaView, StyleSheet, ScrollView, TextInput,
  TouchableOpacity, Alert, Image, Platform, StatusBar
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from '../../components/CustomButton';

// Constants for service options
const SERVICE_OPTIONS = [
  'Small scale service',
  'Mid scale service',
  'Large scale service',
];

// Reusable Input Component
const FormInput = ({ placeholder, value, onChangeText, style, ...props }) => (
  <TextInput
    style={[styles.input, style]}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    {...props}
  />
);


const ServiceButton = React.memo(({ service, isSelected, onPress }) => (
  <TouchableOpacity
    style={[styles.serviceButton, isSelected && styles.selectedService]}
    onPress={() => onPress(service)}
    accessibilityLabel={`Select ${service}`}
  >
    <Text style={[styles.serviceButtonText, isSelected && styles.selectedServiceText]}>
      {service}
    </Text>
  </TouchableOpacity>
));

// Main Component
const ProfessionalDocuments = ({ navigation }) => {
  // Single state object for form data
  const [formData, setFormData] = useState({
    experience: '',
    projects: '',
    domain: '',
    longTerm: '',
    shortTerm: '',
    description: '',
    selectedService: null,
    licenseImage: null,
  });


  const handleInputChange = useCallback((key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }, []);


  const pickImage = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Gallery access is required to upload an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      handleInputChange('licenseImage', result.assets[0].uri);
    }
  }, [handleInputChange]);


  const handleServiceSelection = useCallback((service) => {
    handleInputChange('selectedService', service);
  }, [handleInputChange]);


  const handleConfirmation = useCallback(() => {
    const { experience, projects, domain, longTerm, shortTerm, description, selectedService } = formData;
    if (!experience || !projects || !domain || !longTerm || !shortTerm || !description || !selectedService) {
      Alert.alert('Incomplete Form', 'Please fill all required fields.');
      return;
    }
    navigation.navigate('ServiceDomainSelection')
  }, [formData]);


  const isNextEnabled = Object.values(formData).every((value) => value !== '' && value !== null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
            <View style={styles.headerLine} />
      
        <Text style={styles.appTitle}>Professional Documents</Text>
        <ScrollView
          style={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}

        >
          <View style={styles.card}>
            {/* License Upload */}
            <View style={styles.licenseRow}>
              <Text style={styles.label}>Legal License</Text>
              <CustomButton
                title={"Upload License"}
                onPress={pickImage}
                isActive={true}
                containerStyle={styles.uploadButton}
                textStyle={styles.uploadButtonText}
              />

            </View>
            {formData.licenseImage && (
              <Image source={{ uri: formData.licenseImage }} style={styles.licenseImage} />
            )}

            {/* Experience and Projects */}
            <View style={styles.experienceBox}>
              <View style={styles.experienceRow}>
                <Text style={styles.experienceLabel}>Total Experience</Text>
                <FormInput
                  placeholder="Years"
                  keyboardType="numeric"
                  value={formData.experience}
                  onChangeText={(value) => handleInputChange('experience', value)}
                  style={styles.inputSmall}
                />
              </View>
              <View style={styles.experienceRow}>
                <Text style={styles.experienceLabel}>Total Projects</Text>
                <FormInput
                  placeholder="Projects"
                  keyboardType="numeric"
                  value={formData.projects}
                  onChangeText={(value) => handleInputChange('projects', value)}
                  style={styles.inputSmall}
                />
              </View>
            </View>


            <FormInput
              placeholder="Domain Name"
              value={formData.domain}
              onChangeText={(value) => handleInputChange('domain', value)}
            />
            <View style={styles.termRow}>
              <FormInput
                placeholder="Long Term"
                value={formData.longTerm}
                onChangeText={(value) => handleInputChange('longTerm', value)}
                style={styles.halfInput}
              />
              <FormInput
                placeholder="Short Term"
                value={formData.shortTerm}
                onChangeText={(value) => handleInputChange('shortTerm', value)}
                style={styles.halfInput}
              />
            </View>
            <FormInput
              placeholder="Experience Description"
              multiline
              numberOfLines={4}
              value={formData.description}
              onChangeText={(value) => handleInputChange('description', value)}
              style={styles.textArea}
            />

            {/* Confirmation Button */}
            {/* <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirmation}
            accessibilityLabel="Confirm details"
          >
            <Text style={styles.confirmButtonText}>I am sure!</Text>
          </TouchableOpacity> */}

            {/* Service Level Selection */}
            <Text style={styles.sectionTitle}>Service Level</Text>
            <View style={styles.serviceRow}>
              {SERVICE_OPTIONS.map((service) => (
                <ServiceButton
                  key={service}
                  service={service}
                  isSelected={formData.selectedService === service}
                  onPress={handleServiceSelection}
                />
              ))}
            </View>
          </View>
        </ScrollView>
        <View style={styles.bottomButtonContainer}>
          <CustomButton
            title={'Go to next screen'}
            onPress={handleConfirmation}
            isActive={isNextEnabled}

          />
        </View>


      </View>
    </SafeAreaView>
  );
};

// Styles (unchanged for brevity, but consider extracting to a separate file)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  innerContainer: {
    flex: 1,
  },
  appTitle: { fontSize: 24, color: '#6200ee', textAlign: 'center', marginVertical: 10, fontWeight: 'bold' },
  scrollContainer: {
    flex: 1,
  },
  card: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  licenseRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  label: { fontSize: 16 },
  uploadButton: { backgroundColor: '#6200ee', width: '30%', borderRadius: 4, height: 35 },
  uploadButtonText: { color: '#FFFFFF', fontSize: 12 },
  licenseImage: { width: '100%', height: 200, borderRadius: 8, marginVertical: 10 },
  experienceBox: { backgroundColor: '#E8F0FE', padding: 8, borderRadius: 8, marginVertical: 5 },
  experienceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  experienceLabel: { color: '#333333' },
  inputSmall: { borderWidth: 1, borderColor: '#DDDDDD', borderRadius: 4, padding: 5, width: 80, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#DDDDDD', borderRadius: 4, padding: 12, marginBottom: 12 },
  termRow: { flexDirection: 'row', justifyContent: 'space-between' },
  halfInput: { width: '48%' },
  textArea: { height: 100, textAlignVertical: 'top' },
  confirmButton: { backgroundColor: '#6200ee', padding: 16, borderRadius: 4, alignItems: 'center', marginVertical: 20 },
  confirmButtonText: { color: '#FFFFFF', fontWeight: 'bold' },
  sectionTitle: { fontSize: 16, marginBottom: 12 },
  serviceRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  serviceButton: { borderWidth: 1, borderColor: '#DDDDDD', borderRadius: 16, paddingVertical: 6, paddingHorizontal: 12 },
  selectedService: { backgroundColor: '#6200ee', borderColor: '#6200ee' },
  serviceButtonText: { color: '#000' },
  selectedServiceText: { color: '#FFFFFF' },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
   headerLine: {
                            height: 3,
                            backgroundColor: '#6200ee',
                            width: '30%',
              },
});

export default ProfessionalDocuments;