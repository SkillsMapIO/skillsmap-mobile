import { StyleSheet } from 'react-native';
import Metrics from '../../themes/Metrics';
import Colors, { systemColors } from '../../themes/Colors';
import Fonts from '../../themes/Fonts';

const AVATAR_SIZE = 30;

export default StyleSheet.create({
  note: {
    flexDirection: 'row',
  },
  avatar: {
    flexGrow: 0,
    height: AVATAR_SIZE,
    width: AVATAR_SIZE,
    marginRight: Metrics.spacingSmall,
    borderRadius: AVATAR_SIZE,
    overflow: 'hidden',
  },
  avatarImage: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.demi,
    color: systemColors.text,
  },
  date: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.base,
    color: Colors.boulder,
    marginBottom: Metrics.spacingSmall,
  },
  text: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.base,
    color: systemColors.text,
  },
});
