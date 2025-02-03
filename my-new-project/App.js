import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';

export default function App() {
  const [message, setMessage] = useState("Welcome to Yohannes Yeneakl's first app! man");

  const handleLeftButtonPress = () => {
    setMessage("Left button pressed!");
  };

  const handleRightButtonPress = () => {
    setMessage("Right button pressed!");
  };

  return (
    <ImageBackground
      source={{ uri: 'https://www.example.com/background-image.jpg' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.text}>{message}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Left Button" onPress={handleLeftButtonPress} />
          <Button title="Right Button" onPress={handleRightButtonPress} />
        </View>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 2,
    backgroundColor: 'rgba(255, 192, 203, 0.8)', // semi-transparent pink
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: 'white',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});
