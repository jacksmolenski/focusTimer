import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../utils/colors';
import { fontSizes, spacing } from '../utils/sizes';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../components/RoundedButton';

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);
  return (
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.textInput}
            label="What would you like to focus on?" 
            onChangeText={setSubject}
            />
            <View>
                <RoundedButton title="+" size={50}
                onPress={() => 
                  addSubject(subject)
                }
                />
            </View>
          </View> 
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sienaGreen,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'top',
    padding: spacing.lg,
  },
  textInput: {
    flex: 1,
    marginRight: spacing.lg, 
  },
  text: {
    color: colors.offWhite,
    fontSize: fontSizes.lg,
    fontFamily: 'Times New Roman',
  },
});
