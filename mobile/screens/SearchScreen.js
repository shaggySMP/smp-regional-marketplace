import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    'All',
    'Electronics',
    'Furniture',
    'Clothing',
    'Books',
    'Sports',
    'Home & Garden',
    'Toys & Games',
    'Other',
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    
    // In a real implementation, this would be an API call
    // For now, we'll use mock data
    if (query.length > 0 || selectedCategory !== 'All' && selectedCategory !== '') {
      const mockResults = [
        {
          id: '1',
          title: 'Vintage Camera',
          price: 150,
          description: 'Classic film camera in good condition',
          category: 'Electronics',
          images: ['https://via.placeholder.com/300x300'],
        },
        {
          id: '2',
          title: 'Wooden Chair',
          price: 75,
          description: 'Handcrafted wooden chair',
          category: 'Furniture',
          images: ['https://via.placeholder.com/300x300'],
        },
        {
          id: '3',
          title: 'Winter Jacket',
          price: 60,
          description: 'Warm winter jacket, size M',
          category: 'Clothing',
          images: ['https://via.placeholder.com/300x300'],
        },
      ];

      setSearchResults(mockResults);
    } else {
      setSearchResults([]);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    // Trigger search when category changes
    handleSearch(searchQuery);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => navigation.navigate('ItemDetail', { item })}
    >
      <View style={styles.resultImagePlaceholder} />
      <View style={styles.resultDetails}>
        <Text style={styles.resultTitle}>{item.title}</Text>
        <Text style={styles.resultPrice}>€{item.price}</Text>
        <Text style={styles.resultCategory}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search items..."
          value={searchQuery}
          onChangeText={handleSearch}
          autoFocus
        />
      </View>
      
      <View style={styles.categoriesContainer}>
        <Text style={styles.categoriesTitle}>Categories</Text>
        <View style={styles.categoriesList}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategoryButton,
              ]}
              onPress={() => handleCategorySelect(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.resultsContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Enter a search term to find items</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  searchContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  categoriesContainer: {
    padding: 15,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoriesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryButton: {
    padding: 8,
    margin: 5,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 20,
  },
  selectedCategoryButton: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  categoryText: {
    color: '#000000',
  },
  selectedCategoryText: {
    color: '#ffffff',
  },
  resultsContainer: {
    padding: 15,
  },
  resultItem: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    overflow: 'hidden',
  },
  resultImagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#e0e0e0',
  },
  resultDetails: {
    flex: 1,
    padding: 10,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  resultPrice: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 5,
  },
  resultCategory: {
    fontSize: 12,
    color: '#666666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999999',
  },
});

export default SearchScreen;
