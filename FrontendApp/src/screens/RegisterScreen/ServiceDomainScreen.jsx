import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Platform,
    StatusBar
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ShopRegistration from './ShopRegistration';

const ServiceDomainSelection = ({ navigation }) => {
    const [selectedSubServices, setSelectedSubServices] = useState([]);
    const [serviceInput, setServiceInput] = useState('');
    const [selectedShop, setSelectedShop] = useState(null);
    const [mainService, setMainService] = useState('');

    const mainServices = [
        'Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Masonry', 'Custom Service'
    ];

    const subServices = ['Pipe Fitting', 'Leak Repairs', 'Water Tank Installation', 'Bathroom Plumbing'];
    const knownShops = ['Sara Hardware', 'Bang Fabrication', 'ABC Supplies'];

    const toggleSubService = (service) => {
        setSelectedSubServices(prev =>
            prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
        );
    };

    const toggleShopSelection = (shop) => {
        setSelectedShop(shop === selectedShop ? null : shop);
    };

    const isNextEnabled = mainService && selectedSubServices.length > 0;

    return (
        <SafeAreaView style={styles.container}>
           <View style={styles.headerLine} />
            <Text style={styles.appTitle}>Service Domain Selection</Text>
         
            <ScrollView 
            style={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}

            >
                <View style={styles.card}>
                    <Text style={styles.title}>Service Domain Selection</Text>

                    {/* Main Service Dropdown */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Main Service</Text>

                        <TextInput
                            placeholder="Service  Name"
                        />
                        <Picker
                            selectedValue={mainService}
                            onValueChange={(itemValue) => setMainService(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select a Service" value="" />
                            {mainServices.map((service, index) => (
                                <Picker.Item key={index} label={service} value={service} />
                            ))}
                        </Picker>
                    </View>

                    {/* Sub Service Multi-Select */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>🔧 Sub Service</Text>
                        <View style={styles.tagsContainer}>
                            {subServices.map((service, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.tag,
                                        selectedSubServices.includes(service) && styles.selectedTag,
                                    ]}
                                    onPress={() => toggleSubService(service)}
                                >
                                    <Text
                                        style={[
                                            styles.tagText,
                                            selectedSubServices.includes(service) && styles.selectedTagText,
                                        ]}
                                    >
                                        {service}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Suggested Shops */}
                    <View style={styles.section}>
                        <TextInput
                            placeholder="Shop   Name"
                        />
                        <Text style={styles.sectionTitle}>📋 Suggested Shops You Know</Text>
                        <View style={styles.tagsContainer}>
                            {knownShops.map((shop, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.shopTag, shop === selectedShop && styles.selectedShopTag]}
                                    onPress={() => toggleShopSelection(shop)}
                                >
                                    <Text style={[styles.shopTagText, shop === selectedShop && styles.selectedShopTagText]}>
                                        {shop}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Next Button */}
                    {/* <TouchableOpacity
                        onPress={() => navigation.navigate("ShopRegistration")}

                        style={[styles.nextButton, isNextEnabled && styles.nextButtonEnabled]}
                        disabled={!isNextEnabled}
                    >
                        <Text style={[styles.nextButtonText, isNextEnabled && styles.nextButtonTextEnabled]}>Next</Text>
                    </TouchableOpacity> */}
                </View>
            </ScrollView>

             <View style={styles.bottomButtonContainer}>
          <CustomButton
            title={'Next'}
            onPress={() => navigation.navigate("ShopRegistration")}
            isActive={isNextEnabled}

          />
        </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1,
         backgroundColor: '#FFFFFF' ,
         paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        },
    headerLine: { height: 3, backgroundColor: '#6200ee', width: '50%', marginTop: 10 },
    appTitle: { fontSize: 24, color: '#6200ee', textAlign: 'center', marginVertical: 10, fontWeight: 'bold' },
    scrollContainer: {
    flex: 1,
  },
    card: { margin: 16, padding: 16, backgroundColor: '#FFFFFF', borderRadius: 8, elevation: 5 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
    section: { marginBottom: 20 },
    sectionTitle: { fontSize: 16, marginBottom: 10 },
    picker: { borderWidth: 1, borderColor: '#DDDDDD', borderRadius: 4, marginBottom: 10 },
    tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    tag: { borderWidth: 1, borderColor: '#6200ee', borderRadius: 16, paddingVertical: 6, paddingHorizontal: 12 },
    selectedTag: { backgroundColor: '#6200ee' },
    tagText: { color: '#6200ee', fontSize: 12 },
    selectedTagText: { color: '#FFFFFF' },
    shopTag: { backgroundColor: '#F5F5F5', borderRadius: 16, paddingVertical: 6, paddingHorizontal: 12 },
    selectedShopTag: { backgroundColor: '#6200ee' },
    shopTagText: { color: '#666666', fontSize: 12 },
    selectedShopTagText: { color: '#FFFFFF' },
    nextButton: { backgroundColor: '#F5F5F5', padding: 16, borderRadius: 4, alignItems: 'center', marginTop: 10 },
    nextButtonEnabled: { backgroundColor: '#6200ee' },
    nextButtonText: { color: '#666666' },
    nextButtonTextEnabled: { color: '#FFFFFF' },
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
});

export default ServiceDomainSelection;
