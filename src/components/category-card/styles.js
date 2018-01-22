import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
export default StyleSheet.create({
    container: { flex: 1, justifyContent: 'center' },
    cardContainer: { width: width / 1.5, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', elevation: 5},
    cardText: {fontSize: 20, margin: 10}
})