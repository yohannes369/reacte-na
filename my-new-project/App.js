import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, Animated } from 'react-native';
import tw from 'tailwind-react-native-classnames';

export default function App() {
  const [message, setMessage] = useState("Welcome to Yohannes Yeneakl's first app!");
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity value of 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [message]);

  const handleLeftButtonPress = () => {
    setMessage((prevMessage) =>
      prevMessage === "Welcome to Yohannes Yeneakl's first app!"
        ? "Yohannes Yeneakl's first app!"
        : "Welcome to Yohannes Yeneakl's first app!"
    );
    fadeAnim.setValue(0); // Reset animation
  };

  const handleMiddleButtonPress = () => {
    setMessage("Middle button pressed!");
    fadeAnim.setValue(0); // Reset animation
  };

  const handleRightButtonPress = () => {
    setMessage("Right button pressed!");
    fadeAnim.setValue(0); // Reset animation
  };

  return (
    <View style={tw`flex-1 bg-pink-200 bg-opacity-80 items-center justify-center p-5`}>
      <Animated.Text style={[tw`text-4xl font-bold mb-5`, { opacity: fadeAnim }]}>
        {message}
      </Animated.Text>
      <View style={tw`flex-row justify-between w-4/5 p-5 border-4 border-gray-400 rounded-lg bg-white shadow-lg`}>
        <Button title="Left" onPress={handleLeftButtonPress} />
        <Button title="Middle" onPress={handleMiddleButtonPress} />
        <Button title="Right" onPress={handleRightButtonPress} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
