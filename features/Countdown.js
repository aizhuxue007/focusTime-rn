import { useState, useEffect, useRef } from 'react';
import { Text, StyleSheet } from 'react-native';
import { fontSizes, spacing } from '../utils/Sizes';
import colors from '../utils/Colors.js';

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 0.1, isPaused, onProgress, onEnd }) => {
  const interval = useRef(null);
  const [millis, setMillis] = useState(minutesToMillis(minutes));

  // Reset function to set the timer to the specified minutes
  const reset = () => {
    setMillis(minutesToMillis(minutes));
  };

  // Countdown logic
  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd(reset);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  // Effect to initialize or reset millis when the minutes prop changes
  useEffect(() => {
    reset();
  }, [minutes]);

  // Effect to handle progress and onEnd callback
  useEffect(() => {
    onProgress(millis / minutesToMillis(minutes));
    if (millis === 0) {
      onEnd(reset);
    }
  }, [millis, minutes, onProgress, onEnd]);

  // Effect to start and clear the interval based on isPaused
  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(countDown, 1000);

    // Cleanup on component unmount
    return () => clearInterval(interval.current);
  }, [isPaused]);

  // Calculate minutes and seconds for display
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
  },
});

export default Countdown;
