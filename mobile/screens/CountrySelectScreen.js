import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CountrySelectScreen = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const countries = [
    { name: 'Latvia', code: 'LV' },
    { name: 'Estonia', code: 'EE' },
    { name: 'Lithuania', code: 'LT' },
  ];

  const handleCountrySelect = async (country) => {
    setSelectedCountry(country);
    
    try {
      // Save selected country to AsyncStorage
      await AsyncStorage.setItem('selectedCountry', country);
      
      // Check if user is logged in
      const userToken = await AsyncStorage.getItem('userToken');
      
      if (userToken) {
        navigation.replace('HomeTabs');
      } else {
        navigation.replace('Login');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save country selection');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Country</Text>
      <Text style={styles.subtitle}>Choose your location to see local listings</Text>
      
      {countries.map((country) => (
        <TouchableOpacity
          key={country.code}
          style={[
            styles.countryButton,
            selectedCountry === country.name && styles.selectedCountryButton,
          ]}
          onPress={() => handleCountrySelect(country.name)}
        >
          <Text style={styles.countryText}>{country.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#666666',
    textAlign: 'center',
  },
  countryButton: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedCountryButton: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  countryText: {
    fontSize: 18,
    color: '#000000',
  },
});

export default CountrySelectScreen;
