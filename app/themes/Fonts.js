import { Platform } from 'react-native';

const type = {
  ...Platform.select({
    ios: {
      base: 'AvenirNext-Medium',
      bold: 'Avenir-Black',
      demi: 'AvenirNext-DemiBold',
      emphasis: 'AvenirNext-DemiBoldItalic',
      emphasisBold: 'AvenirNext-BoldItalic',
    },
    android: {
      base: 'Roboto-Regular',
      bold: 'Roboto-Black',
      demi: 'Roboto-Medium',
      emphasis: 'Roboto-MediumItalic',
      emphasisBold: 'Roboto-BoldItalic',
    },
  }),
};

const goldenRatio = 1.16;
export const lineHeight = (fontSize) => (Math.ceil(fontSize * goldenRatio));

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 18,
  icon: 34,
  superMassive: 34,
  massive: 28,
  xxLarge: 26,
  xLarge: 24,
  large: 20,
  regular: 18,
  medular: 16,
  medium: 14,
  small: 12,
  xSmall: 11,
  xxSmall: 8,
};

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1,
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2,
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3,
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4,
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5,
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: size.h6,
  },
  screenTitle: {
    fontFamily: type.bold,
    fontSize: size.superMassive,
  },
  screenDescription: {
    fontFamily: type.base,
    fontSize: size.large,
  },
  sectionTitle: {
    fontFamily: type.bold,
    fontSize: size.massive,
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular,
  },
  description: {
    fontFamily: type.base,
    fontSize: size.regular,
    lineHeight: size.regular + 8,
    fontWeight: 'normal',
  },
  list: {
    fontFamily: type.base,
    fontSize: size.regular,
    lineHeight: size.regular + 8,
    fontWeight: 'normal',
  },
  table: {
    fontFamily: type.base,
    fontSize: 17,
  },
};

const formatIcon = (iconSize = size.icon, iconContainerSize = iconSize) => ({
  fontSize: iconSize,
  width: iconContainerSize, // Android safe
  height: iconContainerSize, // Android safe
  lineHeight: iconContainerSize, // Android safe
  textAlign: 'center',
  ...Platform.select({
    android: {
      lineHeight: iconContainerSize + 3, // really odd
    },
  }),
});

export default {
  lineHeight,
  formatIcon,
  type,
  size,
  style,
};
