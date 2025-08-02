import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ItemDetailScreen = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params || {};

  if (!item) {
    return (
      <View style={styles.container}>
        <Text>Item not found</Text>
      </View>
    );
  }

  const handleSendMessage = () => {
    // In a real implementation, this would create or navigate to a chat
    navigation.navigate('Chat', { item });
  };

  const handleMakeOffer = () => {
    // In a real implementation, this would open the offer modal or screen
    Alert.alert('Make Offer', 'This would open the offer functionality');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagePlaceholder} />
      
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>€{item.price}</Text>
        <Text style={styles.category}>{item.category}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{item.description}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.sectionTitle}>Seller</Text>
        <Text style={styles.sellerInfo}>User ID: {item.sellerId}</Text>
        
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>
            ⚠️ All transactions are offline. Contact the seller directly.
          </Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
            <Text style={styles.buttonText}>Send Message</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.button, styles.offerButton]} onPress={handleMakeOffer}>
            <Text style={styles.buttonText}>Make Offer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  imagePlaceholder: {
    height: 300,
    backgroundColor: '#e0e0e0',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: '#000000',
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333333',
  },
  sellerInfo: {
    fontSize: 16,
    marginBottom: 20,
  },
  warningContainer: {
    backgroundColor: '#fff3cd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  warningText: {
    color: '#856404',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 8,
    flex: 0.48,
    alignItems: 'center',
  },
  offerButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ItemDetailScreen;
