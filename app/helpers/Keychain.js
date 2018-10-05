import * as Keychain from 'react-native-keychain';

export function storeAuth(url, token) {
  const uid = 'skillsmap-user';

  return Keychain.setInternetCredentials(url, uid, token)
    .then(() => ({ ok: true, error: null }))
    .catch(() => ({ ok: false, error: 'Failed to get credentials!' }));
}

export function fetchAuth(url) {
  // You might want to parse the credentials that you get
  // out of the keychain here before returning them.
  return Keychain.getInternetCredentials(url)
    .then((credentials) => ({ ok: true, credentials }))
    .catch(() => ({ ok: false, error: 'Failed to get credentials!' }));
}

export function deleteAuth(url) {
  return Keychain.resetInternetCredentials(url)
    .then(() => ({ ok: true, error: null }))
    .catch(() => ({ ok: false, error: 'Failed to delete credentials!' }));
}
