import { StyleSheet } from 'react-native';
import Metrics from '../../themes/Metrics';
import Colors, { systemColors } from '../../themes/Colors';
import Fonts from '../../themes/Fonts';

export const highlightUnderlayColor = Colors.athensGray;

export default StyleSheet.create({
  listItem: {
    backgroundColor: Colors.white,
  },
  listItemContents: {
    paddingVertical: Metrics.spacingSmedium,
    paddingHorizontal: Metrics.spacingMedium,
    flexDirection: 'row',
  },
  listItemText: {
    flex: 1,
    marginRight: Metrics.spacingSmall,
  },
  listTitle: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.medium,
    color: systemColors.text,
  },
  listSubtitle: {
    marginTop: Metrics.spacingSmall,
    marginLeft: 0,
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.base,
    color: Colors.cornflowerblue,
  },
  listItemIcon: {
    alignSelf: 'center',
    ...Fonts.formatIcon(Metrics.icons.medium),
    color: Colors.mineShaft,
  },
});
