
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const CustomCard = ({ type, label, placeholder, imageUri, onUpload }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      {type !== 'selfie' && (
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#999999"
        />
      )}
      <TouchableOpacity style={styles.uploadButton} onPress={() => onUpload(type)}>
        <Text style={styles.buttonText}>
          {imageUri
            ? `✅ ${label} Uploaded`
            : type === 'selfie'
            ? '📸 Take Selfie'
            : `📎 Upload ${label}`}
        </Text>
      </TouchableOpacity>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  imagePreview: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginTop: 12,
    resizeMode: 'cover',
  },
});

export default CustomCard;