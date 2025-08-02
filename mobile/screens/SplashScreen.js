import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Check if user is logged in or if country is selected
    // For now, we'll just navigate to the country select screen
    const timer = setTimeout(() => {
      navigation.replace('CountrySelect');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>smp.com</Text>
      <Text style={styles.subtitle}>Local Marketplace</Text>
      <ActivityIndicator size="large" color="#000000" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    color: '#666666',
  },
  loader: {
    marginTop: 20,
  },
});

export default SplashScreen;
