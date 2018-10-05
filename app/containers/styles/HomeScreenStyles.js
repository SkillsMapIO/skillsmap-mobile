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
  listTitleContainer: {
    paddingHorizontal: Metrics.spacingMedium,
    paddingTop: Metrics.spacingLarge,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  listTitle: {
    flex: 1,
  },
  listTitleText: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.large,
    color: systemColors.text,
  },
  evaluationSeparator: {
    marginLeft: Metrics.spacingMedium,
    height: 1,
    backgroundColor: systemColors.separatorLine,
  },
  evaluationsListEmpty: {
    padding: Metrics.spacingMedium,
  },
  evaluationsListEmptyText: {
    fontSize: Fonts.size.medular,
    fontFamily: Fonts.type.base,
    color: systemColors.text,
  },
});
