import { StyleSheet } from 'react-native';
import { Colors } from '../../themes';
import Metrics from '../../themes/Metrics';
import Fonts from '../../themes/Fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.k04,
  },
  header: {
    width: '100%',
    height: 195,
    alignItems: 'center',
    paddingTop: Metrics.spacingSmedium,
  },
  headerWelcomeMessage: {
    marginBottom: Metrics.spacingXSmall,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.demi,
    color: Colors.appPurple,
  },
});
