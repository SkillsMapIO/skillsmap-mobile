export const hexToRgb = (hex, alpha) => {
  hex = hex.replace('#', '');
  const r = parseInt(hex.length === 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
  const g = parseInt(hex.length === 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
  const b = parseInt(hex.length === 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);
  if (alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return `rgb(${r}, ${g}, ${b})`;
};

const colors = {
  transparent: 'rgba(0,0,0,0)',
  error: 'rgba(200, 0, 0, 0.8)',
  fern: '#5CB85C',
  mineShaft: '#333333',
  outOfSpace: '#29363D',
  blueBayoux: '#536C79',
  boulder: '#777777',
  iron: '#E4E5E6',
  athensGray: '#EDF1F3',
  white: '#FFFFFF',
  downRiver: '#0D3555',
  cornflowerblue: '#6F9CEC',
  astral: '#337AB7',
  curiousBlue: '#20A8D8',
  scooter: '#3EAFD8',
  viking: '#5BC0DE',
  tropicalBlue: '#C9D9FA',
  pumice: '#D6D7D6',
  butterMilk: '#FFECB3',
  beautyBush: '#F4CCCD',
};

export const systemColors = {
  primaryButton: colors.astral,
  touchableHighlight: colors.astral,
  appBackground: colors.white,
  activityIndicator: colors.blueBayoux,
  text: colors.mineShaft,
  subText: colors.mineShaft,
  navHeader: colors.outOfSpace,
  skillYes: colors.tropicalBlue,
  skillNo: colors.pumice,
  skillMaybe: colors.butterMilk,
  skillObjective: colors.beautyBush,
};

export default colors;
