import { StyleSheet } from 'react-native';
import Colors, { systemColors } from '../../themes/Colors';
import Metrics from '../../themes/Metrics';
import Fonts from '../../themes/Fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: systemColors.appBackground,
  },
  skillDetailContainer: {
    flex: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
    flexGrow: 0,
    flexWrap: 'wrap',
    padding: Metrics.spacingSmall,
  },
  actionButtonContainer: {
    width: '50%',
    marginLeft: 0,
    marginRight: 0,
    padding: Metrics.spacingXSmall,
  },
  actionButton: {
    height: 44,
    padding: 0,
    borderRadius: 100,
    backgroundColor: Colors.white,
    borderWidth: 2,
  },
  actionButtonNo: {
    borderColor: systemColors.skillNo,
  },
  actionButtonYes: {
    borderColor: systemColors.skillYes,
  },
  actionButtonMaybe: {
    borderColor: systemColors.skillMaybe,
  },
  actionButtonObjective: {
    borderColor: systemColors.skillObjective,
  },
  actionButtonText: {
    fontSize: Fonts.size.medular,
    fontFamily: Fonts.type.demi,
    color: systemColors.text,
    textAlign: 'left',
  },
});
