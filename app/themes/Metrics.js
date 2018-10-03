import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const circular = (size) => ({
  width: size,
  height: size,
  borderRadius: size / 2,
});

const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  doubleSection: 50,
  horizontalLineHeight: 1,
  searchBarHeight: 30,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: (Platform.OS === 'ios') ? 44 : 54,
  tabBarHeight: 50,
  buttonRadius: 4,
  spacingXXSmall: 2,
  spacingXSmall: 4,
  spacingSmall: 8,
  spacingSmedium: 12,
  spacingMedium: 16,
  spacingMedular: 20,
  spacingLarge: 24,
  spacingMassive: 32,
  spacingGigantic: 48,
  buttons: {
    small: 24,
    medium: 32,
    large: 40,
    xl: 48,
  },
  icons: {
    tiny: 16,
    small: 24,
    medium: 32,
    large: 40,
    xl: 50,
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200,
  },
  devices: {
    small: 320,
  },
  deviceHeights: {
    small: 568,
    medium: 667,
    large: 736,
  },
};

export const isSmallDevice = Dimensions.get('window').width <= metrics.devices.small;

export default metrics;
