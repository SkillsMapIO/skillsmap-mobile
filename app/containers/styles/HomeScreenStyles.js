import { StyleSheet } from 'react-native';
import Metrics from '../../themes/Metrics';
import Fonts from '../../themes/Fonts';
import { systemColors } from '../../themes/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: systemColors.appBackground,
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
    color: systemColors.text,
  },
});
