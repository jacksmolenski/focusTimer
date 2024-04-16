import React, {useState} from 'react';
import { View, Text, StyleSheet, Vibration } from 'react-native';
import { Countdown } from '../components/Countdown';
import { colors } from '../utils/colors';
import { spacing, fontSizes } from '../utils/sizes';
import { ProgressBar } from 'react-native-paper';
import { RoundedButton } from '../components/RoundedButton';
import { Timing } from '../features/Timing';
import { useKeepAwake } from 'expo-keep-awake';

const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
  ];

  export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
    useKeepAwake();
    const [progress, setProgress] = useState(1);
    const [isStarted, setIsStarted] = useState(false);
    const [minutes, setMinutes] = useState(0.1);
  
    const onEnd = (reset) => {
      Vibration.vibrate(PATTERN);
      setIsStarted(false);
      setProgress(1);
      reset();
      onTimerEnd(focusSubject);
    };
    return (
      <View style={styles.container}>
        <View style={styles.countdown}>
          <Countdown
            minutes={minutes}
            isPaused={!isStarted}
            onProgress={setProgress}
            onEnd={onEnd}
          />
        </View>
        <Text style={styles.title}>Focus Feature: </Text>
        <Text style={styles.task}>{focusSubject}</Text>
        <ProgressBar
          style={styles.progress}
          progress={progress}
          color={colors.sienaGreen}
        />
            <View style={styles.timingWrapper}>
              <Timing onChangeTime={setMinutes} />
            </View>
            <View style={styles.buttonWrapper}>
                {!isStarted && (<RoundedButton title="Start" onPress={() => setIsStarted(true)} />)}
                {isStarted && (<RoundedButton title="Pause" onPress={() => setIsStarted(false)} />)}
            </View>
            <Text style={styles.focusFeature}>Focus Feature:</Text>
            <Text style={styles.focusSubject}>{focusSubject}</Text>
            <View style={styles.clearSubjectWrapper}>
                <RoundedButton
                size={50} 
                title="-" 
                onPress={clearSubject} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    focusFeature: {
        marginTop: spacing.xxxl,
        color: colors.white,
        textAlign: 'center',
        fontSize: fontSizes.xl,
    },
    focusSubject: {
        marginTop: spacing.md,
        color: colors.white,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: fontSizes.xxl,
    },
    progress: {
        height: 10,
    },
    countdown: {
        flex: 0.3,
        alignItems: 'center',
    },
    buttonWrapper: {
        alignItems: 'center',
        flex: 0.3,
        justifyContent: 'center',
    },
    timingWrapper: {
        flex: 0.3,
        flexDirection: 'row',
        padding: spacing.md,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    clearSubjectWrapper: {
       alignItems: 'center',
       padding: spacing.lg,
    },
});
