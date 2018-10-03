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
  header: '#ffffff',
  background: '#ffffff',
  transparent: 'rgba(0,0,0,0)',
  silver: '#F7F7F7',
  steel: '#CCCCCC',
  error: 'rgba(200, 0, 0, 0.8)',
  ember: 'rgba(164, 0, 48, 0.5)',
  fire: '#e73536',

  k87: '#222222',
  k70: '#4C4C4C',
  k60: '#666666',
  k40: '#999999',
  k25: '#Bfbfbf',
  k16: '#D6D6D6',
  k07: '#Ededed',
  k04: '#F5F5F5',
  white: '#Ffffff',

  appPurple: '#4d4a74',
};

export const systemColors = {
  primaryButton: colors.appPurple,
  link: 'blue',
  touchableHighlight: colors.appPurple,
  separatorLine: colors.k07,
  appBackground: colors.k04,
  activityIndicator: colors.k87,
  text: colors.k87,
  subText: colors.k40,
  icon: colors.k87,
  tabBar: 'yellow',
  listItemSelected: colors.silver,
};

export default colors;
