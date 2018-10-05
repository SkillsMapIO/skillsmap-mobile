import { StyleSheet } from 'react-native';
import { systemColors } from '../../themes/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: systemColors.appBackground,
  },
  loading: {
    marginTop: 50,
  },
  itemBadgeContainer: {
    backgroundColor: systemColors.primaryButton,
  },
});
