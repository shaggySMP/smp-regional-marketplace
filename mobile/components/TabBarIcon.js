import React from 'react';
import { Text } from 'react-native';

const TabBarIcon = ({ route, focused, color, size }) => {
  // In a real implementation, you would use actual icons
  // For now, we'll use text placeholders
  let iconName;

  if (route.name === 'Home') {
    iconName = '🏠';
  } else if (route.name === 'CreateItem') {
    iconName = '➕';
  } else if (route.name === 'Profile') {
    iconName = '👤';
  } else {
    iconName = '❓';
  }

  return (
    <Text style={{ fontSize: size, color: focused ? '#000000' : '#cccccc' }}>
      {iconName}
    </Text>
  );
};

export default TabBarIcon;
