// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// export default function App() {
//   const [result, setResult] = useState('0');
//   const [expression, setExpression] = useState('');

//   const handleButtonPress = (value) => {
//     if (value === '=') {
//       try {
//         const evalResult = eval(expression).toString();
//         setResult(evalResult);
//         setExpression(evalResult);
//       } catch (error) {
//         setResult('Error');
//       }
//     } else if (value === 'C') {
//       setResult('0');
//       setExpression('');
//     } else {
//       setExpression((prev) => prev + value);
//     }
//   };

//   const buttons = [
//     ['7', '8', '9', '/'],
//     ['4', '5', '6', '*'],
//     ['1', '2', '3', '-'],
//     ['C', '0', '=', '+'],
//   ];

//   return (
//     <View style={styles.container}>
//       <Text style={styles.developerText}>Developed by Yohannes Yeneakla </Text>
//       <View style={styles.calculator}>
//         <Text style={styles.expression}>{expression}</Text>
//         <Text style={styles.result}>{result}</Text>
//         <View style={styles.buttons}>
//           {buttons.map((row, rowIndex) => (
//             <View key={rowIndex} style={styles.row}>
//               {row.map((button) => (
//                 <TouchableOpacity
//                   key={button}
//                   style={styles.button}
//                   onPress={() => handleButtonPress(button)}
//                 >
//                   <Text style={styles.buttonText}>{button}</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           ))}
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//   },
//   developerText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#333',
//   },
//   calculator: {
//     width: '80%',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   expression: {
//     fontSize: 24,
//     textAlign: 'right',
//     color: '#888',
//     marginBottom: 10,
//   },
//   result: {
//     fontSize: 36,
//     textAlign: 'right',
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#333',
//   },
//   buttons: {
//     marginTop: 10,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   button: {
//     width: '23%',
//     aspectRatio: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#e0e0e0',
//     borderRadius: 10,
//   },
//   buttonText: {
//     fontSize: 24,
//     color: '#333',
//   },
// });

import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";

const App = () => {
  const tailwind = useTailwind();
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");

  const addStudent = () => {
    if (name && age && grade) {
      const newStudent = { id: Date.now(), name, age, grade };
      setStudents([...students, newStudent]);
      setName("");
      setAge("");
      setGrade("");
    }
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <SafeAreaView style={tailwind("flex-1 bg-gray-100")}>
      <ScrollView contentContainerStyle={tailwind("p-4")}>
        <Text style={tailwind("text-2xl font-bold text-center mb-4")}>Student Management System</Text>

        {/* Input Form */}
        <View style={tailwind("mb-6")}>
          <TextInput
            style={tailwind("bg-white p-2 border border-gray-300 rounded mb-2")}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={tailwind("bg-white p-2 border border-gray-300 rounded mb-2")}
            placeholder="Age"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />
          <TextInput
            style={tailwind("bg-white p-2 border border-gray-300 rounded mb-2")}
            placeholder="Grade"
            value={grade}
            onChangeText={setGrade}
          />
          <TouchableOpacity
            style={tailwind("bg-blue-500 p-3 rounded items-center")}
            onPress={addStudent}
          >
            <Text style={tailwind("text-white font-bold")}>Add Student</Text>
          </TouchableOpacity>
        </View>

        {/* Student List */}
        <View>
          {students.map((student) => (
            <View
              key={student.id}
              style={tailwind("bg-white p-4 border border-gray-300 rounded mb-2")}
            >
              <Text style={tailwind("text-lg font-bold")}>{student.name}</Text>
              <Text style={tailwind("text-gray-600")}>Age: {student.age}</Text>
              <Text style={tailwind("text-gray-600")}>Grade: {student.grade}</Text>
              <TouchableOpacity
                style={tailwind("mt-2 bg-red-500 p-2 rounded items-center")}
                onPress={() => deleteStudent(student.id)}
              >
                <Text style={tailwind("text-white font-bold")}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;