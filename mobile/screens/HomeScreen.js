import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [country, setCountry] = useState('');

  useEffect(() => {
    const fetchCountry = async () => {
      const selectedCountry = await AsyncStorage.getItem('selectedCountry');
      setCountry(selectedCountry || 'Latvia');
      // In a real implementation, this would fetch items from the API
      fetchItems(selectedCountry || 'Latvia');
    };

    fetchCountry();
  }, []);

  const fetchItems = (country) => {
    // In a real implementation, this would be an API call
    // For now, we'll use mock data
    const mockItems = [
      {
        id: '1',
        title: 'Vintage Camera',
        price: 150,
        description: 'Classic film camera in good condition',
        category: 'Electronics',
        images: ['https://via.placeholder.com/300x300'],
        sellerId: 'user1',
        country: country,
      },
      {
        id: '2',
        title: 'Wooden Chair',
        price: 75,
        description: 'Handcrafted wooden chair',
        category: 'Furniture',
        images: ['https://via.placeholder.com/300x300'],
        sellerId: 'user2',
        country: country,
      },
      {
        id: '3',
        title: 'Winter Jacket',
        price: 60,
        description: 'Warm winter jacket, size M',
        category: 'Clothing',
        images: ['https://via.placeholder.com/300x300'],
        sellerId: 'user3',
        country: country,
      },
    ];

    setItems(mockItems);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemCard}
      onPress={() => navigation.navigate('ItemDetail', { item })}
    >
      <View style={styles.itemImagePlaceholder} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>€{item.price}</Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Marketplace</Text>
        <Text style={styles.countryText}>Country: {country}</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <TouchableOpacity 
          style={styles.searchBox}
          onPress={() => navigation.navigate('Search')}
        >
          <Text style={styles.searchText}>Search items...</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  countryText: {
    fontSize: 14,
    color: '#666666',
    marginTop: 5,
  },
  searchContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchBox: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
  },
  searchText: {
    color: '#999999',
  },
  listContainer: {
    padding: 15,
  },
  itemCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemImagePlaceholder: {
    height: 200,
    backgroundColor: '#e0e0e0',
  },
  itemDetails: {
    padding: 15,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 5,
  },
  itemCategory: {
    fontSize: 14,
    color: '#666666',
  },
});

export default HomeScreen;
