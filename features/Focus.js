import { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'
import { RoundedButton } from '../components/RoundedButton'
import colors from '../utils/Colors'
import { spacing } from '../utils/Sizes'

const Focus = ({ addSubject }) => {
  const [ input, setInput ] = useState('');

  return (
    <View style={styles.container}>
      
      <TextInput 
        label="What to focus on?"
        onChangeText={ setInput }
        style={styles.input}
      />
      
      <RoundedButton 
        title='+' 
        size={50}
        onPress={() => addSubject(input)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkBlue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
  },
  
  input: {
    flex: 0.9,
  }
})

export default Focus