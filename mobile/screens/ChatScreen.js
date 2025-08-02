import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ChatScreen = ({ navigation }) => {
  const route = useRoute();
  const { item, chat } = route.params || {};
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // In a real implementation, this would fetch messages from the API
    // For now, we'll use mock data
    const mockMessages = [
      {
        id: '1',
        sender: 'other',
        text: 'Hello! Is this still available?',
        timestamp: '14:30',
      },
      {
        id: '2',
        sender: 'me',
        text: 'Yes, it is! What would you like to know?',
        timestamp: '14:32',
      },
      {
        id: '3',
        sender: 'other',
        text: 'I can pick it up tomorrow if that works for you.',
        timestamp: '14:35',
      },
    ];

    setMessages(mockMessages);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: (messages.length + 1).toString(),
      sender: 'me',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const handleMakeOffer = () => {
    // In a real implementation, this would open the offer modal or screen
    alert('Make Offer functionality would be implemented here');
  };

  const renderItem = ({ item }) => (
    <View style={[styles.messageContainer, item.sender === 'me' ? styles.myMessageContainer : styles.otherMessageContainer]}>
      <View style={[styles.messageBubble, item.sender === 'me' ? styles.myMessageBubble : styles.otherMessageBubble]}>
        <Text style={[styles.messageText, item.sender === 'me' ? styles.myMessageText : styles.otherMessageText]}>
          {item.text}
        </Text>
        <Text style={styles.messageTime}>{item.timestamp}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{item ? item.title : chat ? chat.itemTitle : 'Chat'}</Text>
        <TouchableOpacity style={styles.offerButton} onPress={handleMakeOffer}>
          <Text style={styles.offerButtonText}>Make Offer</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesContainer}
        inverted
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  offerButton: {
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 5,
  },
  offerButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  messagesContainer: {
    padding: 10,
  },
  messageContainer: {
    marginBottom: 10,
  },
  myMessageContainer: {
    alignItems: 'flex-end',
  },
  otherMessageContainer: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
  },
  myMessageBubble: {
    backgroundColor: '#007bff',
    borderBottomRightRadius: 0,
  },
  otherMessageBubble: {
    backgroundColor: '#f0f0f0',
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
  },
  myMessageText: {
    color: '#ffffff',
  },
  otherMessageText: {
    color: '#000000',
  },
  messageTime: {
    fontSize: 12,
    color: '#999999',
    marginTop: 5,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 20,
    padding: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 20,
    marginLeft: 10,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default ChatScreen;
