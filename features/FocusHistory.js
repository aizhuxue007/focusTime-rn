import { FlatList, View, Text, StyleSheet } from 'react-native'
import colors from '../utils/Colors'
import { fontSizes, spacing } from '../utils/Sizes'

const ListItem = ({ title }) => <Text style={styles.listItem}>-{title}</Text>

const FocusHistory = ({ history }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Focus History</Text>
      <FlatList
        data={ history }
        renderItem={({ item }) => <ListItem title={item} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.sm,
    flex: 1,
  },
  heading: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSizes.lg,
    marginTop: spacing.xxl,
    marginBottom: spacing.md,
  },
  listItem: {
    color: colors.white,
    paddingLeft: spacing.md,
    marginBottom: spacing.sm,
  },
  
})


export default FocusHistory