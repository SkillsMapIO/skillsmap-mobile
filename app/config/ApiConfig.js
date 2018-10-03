import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';

export const USER_AGENT = `SkillsMap Mobile app ${DeviceInfo.getSystemName()}/${DeviceInfo.getSystemVersion()} ${DeviceInfo.getModel()} ${DeviceInfo.getVersion()}`;
export const WEB_VIEW_USER_AGENT = Platform.OS === 'ios' ? null : `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36 SkillsMap Mobile app android - ${DeviceInfo.getSystemName()} ${DeviceInfo.getModel()} ${DeviceInfo.getSystemVersion()}`;

export const ApiConfig = {
  baseUrl: 'https://app.skillsmap.io',
  userAgent: USER_AGENT,
  jsonHeaders: {
    Accept: 'application/json',
    'User-Agent': USER_AGENT,
    'Content-type': 'application/json',
    'Cache-Control': 'no-cache',
  },
};
