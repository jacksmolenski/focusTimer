import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Platform } from 'react-native';
import { colors } from './src/utils/colors';
import { Focus } from './src/features/focus.js';
import { Timer } from './src/features/Timer.js';
import React, { useState } from 'react';
import { FocusHistory } from './src/features/FocusHistory.js';

export default function App() {
  const [currentSubject, setCurrentSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      {!currentSubject ? (
      <>
      <Focus addSubject={setCurrentSubject}/>
      <FocusHistory history={focusHistory}
      />
      </>)
      : (
        <Timer
  focusSubject={currentSubject}
  onTimerEnd={(subject) => {
    setFocusHistory([...focusHistory, subject]); // Corrected this line
  }}
  clearSubject={() => setCurrentSubject(null)}
/>

      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sienaGold,
    padding: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: 'center',
  },

  text: {
    color: colors.offWhite,
    fontSize: 40,
    fontFamily: 'Times New Roman',
  },
});
