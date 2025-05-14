import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Alert,
    ScrollView,
    Platform
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomCard from '../../components/CardUpload';
import CustomButton from '../../components/CustomButton';

const DocumentsVerification = ({ navigation }) => {
    const [aadhaar, setAadhaar] = useState(null);
    const [pan, setPan] = useState(null);
    const [selfie, setSelfie] = useState(null);

    const handleUpload = async (type) => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert("Permission Required", "You need to grant camera roll permission.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            if (type === 'aadhaar') setAadhaar(uri);
            if (type === 'pan') setPan(uri);
            if (type === 'selfie') setSelfie(uri);
        }
    };

    const isNextEnabled = aadhaar && pan && selfie;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                                                      <View style={styles.headerLine} />
                <Text style={styles.appTitle}>Document Verification</Text>

                <ScrollView
                    style={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                >
                    <CustomCard
                        type="aadhaar"
                        label="Aadhaar Number "
                        placeholder="Enter Aadhaar Number"
                        imageUri={aadhaar}
                        onUpload={() => handleUpload('aadhaar')}
                    />
                    <CustomCard
                        type="pan"
                        label="PAN Number"
                        placeholder="Enter PAN Number"
                        imageUri={pan}
                        onUpload={() => handleUpload('pan')}
                    />
                    <CustomCard
                        type="selfie"
                        label="Selfie"
                        placeholder="Take Selfie"
                        imageUri={selfie}
                        onUpload={() => handleUpload('selfie')}
                    />
                </ScrollView>

                <View style={styles.bottomButtonContainer}>
                    <CustomButton
                        title={'Next'}
                        onPress={() => navigation.navigate("ProfessionalDocuments")}
                        isActive={isNextEnabled}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    innerContainer: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
    },
    appTitle: {
        fontSize: 24,
        color: '#6200ee',
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: 'bold',
    },
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

export default DocumentsVerification;
