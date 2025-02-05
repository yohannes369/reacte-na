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
import React, { useState, useContext, useCallback } from "react";
import { 
  SafeAreaView, 
  ScrollView, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  StyleSheet, 
  Switch, 
  Modal 
} from "react-native";

// Create a Context for the theme (Dark/Light mode)
const ThemeContext = React.createContext();

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
  const [attendance, setAttendance] = useState({});
  const [calendar, setCalendar] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [darkMode, setDarkMode] = useState(false); // state for dark mode
  const [isSidebarVisible, setSidebarVisible] = useState(false); // Sidebar visibility
  
  // Function to toggle the theme
  const toggleTheme = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  // Get today's date
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

  // Submit attendance
  const submitAttendance = () => {
    const today = getTodayDate();
    setCalendar((prev) => ({
      ...prev,
      [today]: attendance,
    }));
    setAttendance({});
  };

  // Add new student
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
      setShowAddForm(false);
    }
  };

  // Delete a student
  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  // Sorted students by name
  const sortedStudents = [...students].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <ThemeContext.Provider value={darkMode}>
      <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.headerTitle, darkMode && styles.darkText]}>Bonga University</Text>
            <Text style={[styles.headerSubtitle, darkMode && styles.darkText]}>
              Student Management System
            </Text>
          </View>

          {/* Add Student Button */}
          <TouchableOpacity style={styles.addButton} onPress={() => setShowAddForm(!showAddForm)}>
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
            {sortedStudents.map((student) => {
              const studentAttendance = attendance[student.id] || "Absent";
              return (
                <View key={student.id} style={[styles.studentCard, darkMode && styles.darkCard]}>
                  <Text style={[styles.studentName, darkMode && styles.darkText]}>{student.name}</Text>
                  <Text style={[styles.studentInfo, darkMode && styles.darkText]}>
                    Age: {student.age}
                  </Text>
                  <Text style={[styles.studentInfo, darkMode && styles.darkText]}>
                    Grade: {student.grade}
                  </Text>
                  <Text style={[styles.studentInfo, darkMode && styles.darkText]}>
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
            <View key={date} style={[styles.calendarEntry, darkMode && styles.darkCard]}>
              <Text style={[styles.calendarDate, darkMode && styles.darkText]}>{date}</Text>
              {Object.entries(attendanceData).map(([studentId, status]) => {
                const student = students.find((s) => s.id === Number(studentId));
                return (
                  <Text key={studentId} style={[styles.calendarText, darkMode && styles.darkText]}>
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

          {/* Sidebar / Settings */}
          <Modal visible={isSidebarVisible} animationType="slide">
            <View style={[styles.sidebar, darkMode && styles.darkCard]}>
              <Text style={[styles.sidebarTitle, darkMode && styles.darkText]}>Settings</Text>
              <View style={styles.sidebarOption}>
                <Text style={[styles.sidebarOptionText, darkMode && styles.darkText]}>
                  Dark Mode
                </Text>
                <Switch
                  value={darkMode}
                  onValueChange={toggleTheme}
                  thumbColor={darkMode ? "#f8fafc" : "#2563eb"}
                />
              </View>
              <TouchableOpacity onPress={() => setSidebarVisible(false)} style={styles.sidebarButton}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>

          <TouchableOpacity style={styles.sidebarButton} onPress={() => setSidebarVisible(true)}>
            <Text style={styles.buttonText}>Developer Settings</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ThemeContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  darkContainer: {
    backgroundColor: "#2c2c2c",
  },
  darkText: {
    color: "#f8fafc",
  },
  darkCard: {
    backgroundColor: "#3a3a3a",
  },
  scrollViewContent: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563eb",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#4b5563",
  },
  addButton: {
    backgroundColor: "#2563eb",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#ffffff",
  },
  studentCard: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  studentName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
  },
  studentInfo: {
    fontSize: 14,
    color: "#4b5563",
  },
  attendanceText: {
    fontWeight: "bold",
  },
  attendancePresent: {
    color: "#16a34a",
  },
  attendanceLate: {
    color: "#f59e0b",
  },
  attendanceAbsent: {
    color: "#dc2626",
  },
  attendanceButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  attendanceButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  presentButton: {
    backgroundColor: "#16a34a",
  },
  lateButton: {
    backgroundColor: "#f59e0b",
  },
  absentButton: {
    backgroundColor: "#dc2626",
  },
  submitButton: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  calendarTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e293b",
    marginTop: 20,
  },
  calendarEntry: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  calendarDate: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
  },
  calendarText: {
    fontSize: 14,
    color: "#4b5563",
  },
  sidebar: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  sidebarTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 20,
  },
  sidebarOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  sidebarOptionText: {
    fontSize: 16,
    color: "#1e293b",
  },
  sidebarButton: {
    backgroundColor: "#2563eb",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
});

export default App;
