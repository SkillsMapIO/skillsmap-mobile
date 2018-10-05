import { StyleSheet } from 'react-native';
import Colors, { systemColors } from '../../themes/Colors';
import Fonts from '../../themes/Fonts';
import Metrics from '../../themes/Metrics';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: systemColors.appBackground,
  },
  sectionHeader: {
    paddingTop: Metrics.spacingMedium,
    paddingHorizontal: Metrics.spacingMedium,
    backgroundColor: Colors.white,
  },
  sectionHeaderTitle: {
    fontSize: Fonts.size.xLarge,
    fontFamily: Fonts.type.bold,
    color: systemColors.text,
  },
  sectionHeaderLevel: {
    marginBottom: Metrics.spacingSmall,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.base,
    color: systemColors.text,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.athensGray,
    borderRadius: 100,
    overflow: 'hidden',
  },
  progressBarValue: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.cornflowerblue,
    borderRadius: 100,
    overflow: 'hidden',
  },
  skillsGroupList: {
    backgroundColor: Colors.white,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  listItemSpacer: {
    height: 1,
    flex: 1,
    backgroundColor: systemColors.separatorLine,
    marginHorizontal: Metrics.spacingMedium,
  },
});
