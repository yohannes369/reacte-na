// import React, { useState, useEffect, useRef } from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { Text, View, Button, Animated } from 'react-native';
// import tw from 'tailwind-react-native-classnames';

// export default function App() {
//   const [message, setMessage] = useState("Welcome to Yohannes Yeneakl's first app!");
//   const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity value of 0

//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start();
//   }, [message]);

//   const handleLeftButtonPress = () => {
//     setMessage((prevMessage) =>
//       prevMessage === "Welcome to Yohannes Yeneakl's first app!"
//         ? "Yohannes Yeneakl's first app!"
//         : "Welcome to Yohannes Yeneakl's first app!"
//     );
//     fadeAnim.setValue(0); // Reset animation
//   };

//   const handleMiddleButtonPress = () => {
//     setMessage("Middle button pressed!");
//     fadeAnim.setValue(0); // Reset animation
//   };

//   const handleRightButtonPress = () => {
//     setMessage("Right button pressed!");
//     fadeAnim.setValue(0); // Reset animation
//   };

//   return (
//     <View style={tw`flex-1 bg-pink-200 bg-opacity-80 items-center justify-center p-5`}>
//       <Animated.Text style={[tw`text-4xl font-bold mb-5`, { opacity: fadeAnim }]}>
//         {message}
//       </Animated.Text>
//       <View style={tw`flex-row justify-between w-4/5 p-5 border-4 border-gray-400 rounded-lg bg-white shadow-lg`}>
//         <Button title="Left" onPress={handleLeftButtonPress} />
//         <Button title="Middle" onPress={handleMiddleButtonPress} />
//         <Button title="Right" onPress={handleRightButtonPress} />
//       </View>
//       <StatusBar style="auto" />
//     </View>
//   );
// }
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function App() {
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('Guess a number between 1 and 100!');
  const [attempts, setAttempts] = useState(0);

  const handleGuess = () => {
    const userGuess = parseInt(guess, 10);
    setAttempts(attempts + 1);

    if (isNaN(userGuess)) {
      setMessage('Please enter a valid number!');
    } else if (userGuess === randomNumber) {
      Alert.alert(
        'Congratulations!',
        `You guessed the number in ${attempts + 1} attempts!`,
        [{ text: 'Play Again', onPress: resetGame }]
      );
    } else if (userGuess < randomNumber) {
      setMessage('Too low! Try again.');
    } else {
      setMessage('Too high! Try again.');
    }

    setGuess('');
  };

  const resetGame = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('Guess a number between 1 and 100!');
    setAttempts(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guess the Number Game</Text>
      <Text style={styles.message}>{message}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter your guess"
        value={guess}
        onChangeText={setGuess}
      />
      <Button title="Submit Guess" onPress={handleGuess} />
      <Text style={styles.attempts}>Attempts: {attempts}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  attempts: {
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
});