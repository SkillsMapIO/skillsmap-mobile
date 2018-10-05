import { StyleSheet } from 'react-native';
import Metrics from '../../themes/Metrics';
import { systemColors } from '../../themes/Colors';
import Fonts from '../../themes/Fonts';

export default StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  skillContainer: {
    paddingTop: Metrics.spacingLarge,
    paddingBottom: Metrics.spacingMassive,
    paddingHorizontal: Metrics.spacingLarge,
    borderBottomWidth: 1,
    borderBottomColor: systemColors.border,
  },
  title: {
    marginBottom: Metrics.spacingMedium,
    fontSize: Fonts.size.large,
    fontFamily: Fonts.type.bold,
    color: systemColors.text,
  },
  criteria: {
    marginBottom: Metrics.spacingMedium,
    fontSize: Fonts.size.medular,
    fontFamily: Fonts.type.base,
    color: systemColors.text,
  },
  questionContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: Metrics.spacingMedium,
  },
  questionBullet: {
    flexGrow: 0,
    width: Metrics.spacingLarge,
    fontSize: Fonts.size.medular,
    fontFamily: Fonts.type.base,
    color: systemColors.text,
  },
  question: {
    flex: 1,
    fontSize: Fonts.size.medular,
    fontFamily: Fonts.type.base,
    color: systemColors.text,
  },
  notesContainer: {
    paddingTop: Metrics.spacingLarge,
    paddingBottom: Metrics.spacingMedium,
    paddingHorizontal: Metrics.spacingLarge,
  },
  noteContainer: {
    marginBottom: Metrics.spacingMedium,
  },
});
