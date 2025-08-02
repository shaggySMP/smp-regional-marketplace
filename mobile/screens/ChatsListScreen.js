import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const ChatsListScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    // In a real implementation, this would fetch chats from the API
    // For now, we'll use mock data
    const mockChats = [
      {
        id: '1',
        itemId: 'item1',
        itemTitle: 'Vintage Camera',
        lastMessage: 'Hello, is this still available?',
        timestamp: '2023-05-15 14:30',
        unread: true,
      },
      {
        id: '2',
        itemId: 'item2',
        itemTitle: 'Wooden Chair',
        lastMessage: 'I can pick it up tomorrow',
        timestamp: '2023-05-14 09:15',
        unread: false,
      },
      {
        id: '3',
        itemId: 'item3',
        itemTitle: 'Winter Jacket',
        lastMessage: 'Offer accepted!',
        timestamp: '2023-05-13 16:45',
        unread: false,
      },
    ];

    setChats(mockChats);
  }, []);

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate('Chat', { chat: item })}
    >
      <View style={styles.chatInfo}>
        <Text style={styles.itemTitle}>{item.itemTitle}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
      <View style={styles.chatMeta}>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
        {item.unread && <View style={styles.unreadIndicator} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Messages</Text>
      
      {chats.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No messages yet</Text>
        </View>
      ) : (
        <FlatList
          data={chats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  listContainer: {
    padding: 10,
  },
  chatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  chatInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666666',
  },
  chatMeta: {
    alignItems: 'flex-end',
  },
  timestamp: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 5,
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
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

export default ChatsListScreen;
