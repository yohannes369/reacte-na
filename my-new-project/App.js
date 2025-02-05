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
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

const App = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");

  const addStudent = () => {
    if (name && age && grade) {
      const newStudent = {
        id: Date.now(),
        name,
        age,
        grade,
        attendance: "Absent", // Default attendance status
      };
      setStudents([...students, newStudent]);
      setName("");
      setAge("");
      setGrade("");
    }
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const updateAttendance = (id, status) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, attendance: status } : student
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Bonga University Student Management System</Text>

        {/* Input Form */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Age"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Grade"
            value={grade}
            onChangeText={setGrade}
          />
          <TouchableOpacity style={styles.addButton} onPress={addStudent}>
            <Text style={styles.buttonText}>Add Student</Text>
          </TouchableOpacity>
        </View>

        {/* Student List */}
        <View>
          {students.map((student) => (
            <View key={student.id} style={styles.studentCard}>
              <Text style={styles.studentName}>{student.name}</Text>
              <Text style={styles.studentInfo}>Age: {student.age}</Text>
              <Text style={styles.studentInfo}>Grade: {student.grade}</Text>
              <Text style={styles.studentInfo}>
                Attendance:{" "}
                <Text
                  style={[
                    styles.attendanceText,
                    student.attendance === "Present"
                      ? styles.attendancePresent
                      : student.attendance === "Late"
                      ? styles.attendanceLate
                      : styles.attendanceAbsent,
                  ]}
                >
                  {student.attendance}
                </Text>
              </Text>

              {/* Attendance Buttons */}
              <View style={styles.attendanceButtonsContainer}>
                <TouchableOpacity
                  style={[styles.attendanceButton, styles.presentButton]}
                  onPress={() => updateAttendance(student.id, "Present")}
                >
                  <Text style={styles.buttonText}>Present</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.attendanceButton, styles.lateButton]}
                  onPress={() => updateAttendance(student.id, "Late")}
                >
                  <Text style={styles.buttonText}>Late</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.attendanceButton, styles.absentButton]}
                  onPress={() => updateAttendance(student.id, "Absent")}
                >
                  <Text style={styles.buttonText}>Absent</Text>
                </TouchableOpacity>
              </View>

              {/* Delete Button */}
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteStudent(student.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6", // bg-gray-100
  },
  scrollViewContent: {
    padding: 16, // p-4
  },
  title: {
    fontSize: 24, // text-2xl
    fontWeight: "bold", // font-bold
    textAlign: "center", // text-center
    marginBottom: 16, // mb-4
  },
  inputContainer: {
    marginBottom: 24, // mb-6
  },
  input: {
    backgroundColor: "#ffffff", // bg-white
    padding: 8, // p-2
    borderWidth: 1, // border
    borderColor: "#d1d5db", // border-gray-300
    borderRadius: 4, // rounded
    marginBottom: 8, // mb-2
  },
  addButton: {
    backgroundColor: "#3b82f6", // bg-blue-500
    padding: 12, // p-3
    borderRadius: 4, // rounded
    alignItems: "center", // items-center
  },
  buttonText: {
    color: "#ffffff", // text-white
    fontWeight: "bold", // font-bold
  },
  studentCard: {
    backgroundColor: "#ffffff", // bg-white
    padding: 16, // p-4
    borderWidth: 1, // border
    borderColor: "#d1d5db", // border-gray-300
    borderRadius: 4, // rounded
    marginBottom: 8, // mb-2
  },
  studentName: {
    fontSize: 18, // text-lg
    fontWeight: "bold", // font-bold
  },
  studentInfo: {
    color: "#4b5563", // text-gray-600
  },
  attendanceText: {
    fontWeight: "bold",
  },
  attendancePresent: {
    color: "#22c55e", // text-green-500
  },
  attendanceLate: {
    color: "#eab308", // text-yellow-500
  },
  attendanceAbsent: {
    color: "#ef4444", // text-red-500
  },
  attendanceButtonsContainer: {
    flexDirection: "row", // flex-row
    marginTop: 8, // mt-2
  },
  attendanceButton: {
    flex: 1, // flex-1
    padding: 8, // p-2
    borderRadius: 4, // rounded
    alignItems: "center", // items-center
    marginHorizontal: 4, // mx-1
  },
  presentButton: {
    backgroundColor: "#22c55e", // bg-green-500
  },
  lateButton: {
    backgroundColor: "#eab308", // bg-yellow-500
  },
  absentButton: {
    backgroundColor: "#ef4444", // bg-red-500
  },
  deleteButton: {
    backgroundColor: "#ef4444", // bg-red-500
    padding: 8, // p-2
    borderRadius: 4, // rounded
    alignItems: "center", // items-center
    marginTop: 8, // mt-2
  },
});

export default App;