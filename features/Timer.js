import { useState } from 'react';
import { View, SafeAreaView, Text, StyleSheet, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake'
import Countdown from './Countdown';
import RoundedButton from '../components/RoundedButton';
import { fontSizes, spacing } from '../utils/Sizes';
import colors from '../utils/Colors';

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];

export default function Timer({ focusSubject, clearSubject, onTimerEnd }) {
  useKeepAwake()
  const [running, setRunning] = useState(false)
  const [progress, setProgress] = useState(1)
  const [minutes, setMinutes] = useState(0.1)

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN)
    setRunning(false)
    setProgress(1)
    setMinutes()
    reset()
    onTimerEnd(focusSubject)
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Countdown
          isPaused={!running}
          minutes={minutes}
          onProgress={setProgress}
          onEnd={onEnd}
        />
        <Text style={styles.heading}>Focusing on</Text>
        <Text style={styles.text}>{focusSubject}</Text>
        <View style={styles.progressView}>
          <ProgressBar
            progress={progress}
            color={colors.progress}
            style={{ height: 10, width: 400 }}
          />
        </View>
        <View style={styles.buttons}>
          <View style={styles.topButtons}>
            <RoundedButton size={80} title={'10'} onPress={() => setMinutes(10)}/>
            <RoundedButton size={80} title={'15'} onPress={() => setMinutes(15)}/>
            <RoundedButton size={80} title={'20'} onPress={() => setMinutes(20)}/>
          </View>
          <RoundedButton
            title={running ? 'Pause' : 'Start'}
            size={150}
            onPress={() => setRunning(!running)}
          />
          <RoundedButton size={80} title={'-'} onPress={() => clearSubject(null)}/>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
  },
  heading: {
    color: colors.white,
    fontSize: fontSizes.xxl,
    fontWeight: 'bold',
  },
  topButtons: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  text: {
    fontSize: fontSizes.lg,
    color: colors.white,
  },
  progressView: {
    paddingVertical: spacing.xxxl,
  },
  buttons: {
    gap: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
});
