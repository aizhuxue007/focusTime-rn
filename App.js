import { useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet, StatusBar } from 'react-native'
import Focus from './features/Focus'
import FocusHistory from './features/FocusHistory'
import Timer from './features/Timer'
import colors from './utils/Colors'
import { fontSizes, spacing } from './utils/Sizes'

export default function App() {
  const [ currentSubject, setCurrentSubject ] = useState(null)
  const [ history, setHistory ] = useState([])
 

  return (
    <SafeAreaView style={styles.safeContainer}>
      { 
        currentSubject ? <Timer 
                            focusSubject={ currentSubject } 
                            clearSubject={setCurrentSubject} 
                            onTimerEnd={(subject) => setHistory([...history, subject])}
                          /> : 
        (<View style={styles.container}>
          <Text style={styles.heading}>FocusTime</Text>
          <Focus addSubject={setCurrentSubject} /> 
          { history.length <= 0 ? <Text style={styles.text}> Have not focused on anything yet</Text> : 
            <FocusHistory 
              history={history}

            />  
          }
        </View>)
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    paddingVertical: StatusBar.currentHeight,
    backgroundColor: colors.darkBlue,
  },
  container: {
    flex: 1,
  },
  heading: {
    color: colors.white,
    fontSize: fontSizes.xl,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  text: {
    color: colors.white,
    fontSize: fontSizes.md,
    marginVertical: spacing.md
  },
});
