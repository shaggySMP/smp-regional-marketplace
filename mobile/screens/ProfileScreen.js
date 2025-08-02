import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          setUser(JSON.parse(userData));
        }
        
        // In a real implementation, this would fetch user items and reviews from the API
        // For now, we'll use mock data
        const mockItems = [
          { id: '1', title: 'Vintage Camera', price: 150 },
          { id: '2', title: 'Wooden Chair', price: 75 },
        ];
        
        const mockReviews = [
          { id: '1', reviewer: 'User A', rating: 5, comment: 'Great seller!' },
          { id: '2', reviewer: 'User B', rating: 4, comment: 'Good communication' },
        ];
        
        setItems(mockItems);
        setReviews(mockReviews);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userToken');
              await AsyncStorage.removeItem('userData');
              navigation.replace('CountrySelect');
            } catch (error) {
              console.error('Error logging out:', error);
            }
          },
        },
      ]
    );
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImagePlaceholder} />
        <Text style={styles.userName}>{user.email}</Text>
        <Text style={styles.userCountry}>Country: {user.country}</Text>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Listings</Text>
          <TouchableOpacity onPress={() => navigation.navigate('CreateItem')}>
            <Text style={styles.addLink}>+ Add New</Text>
          </TouchableOpacity>
        </View>
        
        {items.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemPrice}>€{item.price}</Text>
          </View>
        ))}
        
        {items.length === 0 && (
          <Text style={styles.emptyText}>No listings yet</Text>
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reviews</Text>
        
        {reviews.map((review) => (
          <View key={review.id} style={styles.reviewRow}>
            <Text style={styles.reviewerName}>{review.reviewer}</Text>
            <Text style={styles.rating}>{'★'.repeat(review.rating)}</Text>
            <Text style={styles.reviewComment}>{review.comment}</Text>
          </View>
        ))}
        
        {reviews.length === 0 && (
          <Text style={styles.emptyText}>No reviews yet</Text>
        )}
      </View>
      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    marginBottom: 15,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userCountry: {
    fontSize: 16,
    color: '#666666',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addLink: {
    color: '#000000',
    fontWeight: 'bold',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemTitle: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 14,
    color: '#ff9900',
    marginVertical: 5,
  },
  reviewComment: {
    fontSize: 14,
    color: '#333333',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999999',
    paddingVertical: 20,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    padding: 15,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
