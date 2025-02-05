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
  const [students, setStudents] = useState([
    { id: 1, name: "Yohann", age: "20", grade: "A" },
    { id: 2, name: "Ayana", age: "21", grade: "B" },
    { id: 3, name: "Mikiyas", age: "22", grade: "C" },
    { id: 4, name: "Madiso", age: "23", grade: "A" },
    { id: 5, name: "Yosef", age: "24", grade: "B" },
    { id: 6, name: "Biruk", age: "25", grade: "C" },
    { id: 7, name: "Reshid", age: "26", grade: "A" },
    { id: 8, name: "Ibrahim", age: "27", grade: "B" },
  ]);
  const [attendance, setAttendance] = useState({}); // { studentId: "Present/Absent/Late" }
  const [calendar, setCalendar] = useState({}); // { date: { studentId: "Present/Absent/Late" } }
  const [showAddForm, setShowAddForm] = useState(false); // Toggle add student form
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Update attendance for a student
  const updateAttendance = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  // Submit attendance for the current day
  const submitAttendance = () => {
    const today = getTodayDate();
    setCalendar((prev) => ({
      ...prev,
      [today]: attendance,
    }));
    setAttendance({}); // Reset attendance for the next day
  };

  // Add a new student
  const addStudent = () => {
    if (name && age && grade) {
      const newStudent = {
        id: Date.now(),
        name,
        age,
        grade,
      };
      setStudents([...students, newStudent]);
      setName("");
      setAge("");
      setGrade("");
      setShowAddForm(false); // Hide the form after adding
    }
  };

  // Delete a student
  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Bonga University</Text>
          <Text style={styles.headerSubtitle}>Student Management System</Text>
        </View>

        {/* Add Student Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddForm(!showAddForm)}
        >
          <Text style={styles.buttonText}>
            {showAddForm ? "Cancel" : "Add Student"}
          </Text>
        </TouchableOpacity>

        {/* Add Student Form */}
        {showAddForm && (
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
              <Text style={styles.buttonText}>Save Student</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Student List */}
        <View>
          {students.map((student) => {
            const studentAttendance = attendance[student.id] || "Absent"; // Default to "Absent"
            return (
              <View key={student.id} style={styles.studentCard}>
                <Text style={styles.studentName}>{student.name}</Text>
                <Text style={styles.studentInfo}>Age: {student.age}</Text>
                <Text style={styles.studentInfo}>Grade: {student.grade}</Text>
                <Text style={styles.studentInfo}>
                  Attendance:{" "}
                  <Text
                    style={[
                      styles.attendanceText,
                      studentAttendance === "Present"
                        ? styles.attendancePresent
                        : studentAttendance === "Late"
                        ? styles.attendanceLate
                        : styles.attendanceAbsent,
                    ]}
                  >
                    {studentAttendance}
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
              </View>
            );
          })}
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={submitAttendance}>
          <Text style={styles.buttonText}>Submit Attendance</Text>
        </TouchableOpacity>

        {/* Calendar View */}
        <Text style={styles.calendarTitle}>Attendance Calendar</Text>
        {Object.entries(calendar).map(([date, attendanceData]) => (
          <View key={date} style={styles.calendarEntry}>
            <Text style={styles.calendarDate}>{date}</Text>
            {Object.entries(attendanceData).map(([studentId, status]) => {
              const student = students.find((s) => s.id === Number(studentId));
              return (
                <Text key={studentId} style={styles.calendarText}>
                  {student?.name}:{" "}
                  <Text
                    style={[
                      styles.attendanceText,
                      status === "Present"
                        ? styles.attendancePresent
                        : status === "Late"
                        ? styles.attendanceLate
                        : styles.attendanceAbsent,
                    ]}
                  >
                    {status}
                  </Text>
                </Text>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc", // Light background
  },
  scrollViewContent: {
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e3a8a", // Dark blue
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#4b5563", // Gray
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#2563eb", // Blue
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: "#10b981", // Green
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  studentCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    marginBottom: 12,
  },
  studentName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e3a8a", // Dark blue
  },
  studentInfo: {
    fontSize: 16,
    color: "#4b5563", // Gray
    marginBottom: 4,
  },
  attendanceText: {
    fontWeight: "bold",
  },
  attendancePresent: {
    color: "#22c55e", // Green
  },
  attendanceLate: {
    color: "#eab308", // Yellow
  },
  attendanceAbsent: {
    color: "#ef4444", // Red
  },
  attendanceButtonsContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  attendanceButton: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
  },
  presentButton: {
    backgroundColor: "#22c55e", // Green
  },
  lateButton: {
    backgroundColor: "#eab308", // Yellow
  },
  absentButton: {
    backgroundColor: "#ef4444", // Red
  },
  calendarTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e3a8a", // Dark blue
    marginTop: 16,
    marginBottom: 8,
  },
  calendarEntry: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    marginBottom: 12,
  },
  calendarDate: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e3a8a", // Dark blue
    marginBottom: 8,
  },
  calendarText: {
    fontSize: 16,
    color: "#4b5563", // Gray
    marginBottom: 4,
  },
});

export default App;